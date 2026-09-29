// One-off porting tool: converts a Claude Design ".dc.html" template (the <x-dc> markup with
// {{ expr }}, <sc-if> and <sc-for>) into a JSX expression, so the prototype's markup, copy and
// inline styles are carried over exactly rather than retyped.
//
//   node scripts/dc-to-jsx.mjs <input.html> <startLine> <endLine> <ComponentName> <out.tsx>
//
// Output is a component `function Name({ v }: { v: any })` where every top-level template
// value is read from `v`. The generated file is committed and then edited like normal source.
import fs from 'node:fs';
import { parseFragment } from 'parse5';

const [, , input, startLine, endLine, name, out] = process.argv;
const src = fs.readFileSync(input, 'utf8').split('\n').slice(Number(startLine) - 1, Number(endLine)).join('\n');
const frag = parseFragment(src);

const ATTR = {
  class: 'className', for: 'htmlFor', tabindex: 'tabIndex', readonly: 'readOnly', maxlength: 'maxLength',
  minlength: 'minLength', inputmode: 'inputMode', autocomplete: 'autoComplete', novalidate: 'noValidate',
  onclick: 'onClick', oninput: 'onInput', onsubmit: 'onSubmit', onscroll: 'onScroll', onchange: 'onChange',
  'stroke-width': 'strokeWidth', 'stroke-linecap': 'strokeLinecap', 'stroke-linejoin': 'strokeLinejoin',
  'fill-rule': 'fillRule', 'clip-rule': 'clipRule', 'stroke-dasharray': 'strokeDasharray', viewbox: 'viewBox',
  'accept-charset': 'acceptCharset', crossorigin: 'crossOrigin', enctype: 'encType', colspan: 'colSpan', rowspan: 'rowSpan',
};
const BOOL = new Set(['required', 'disabled', 'checked', 'open', 'noValidate', 'readOnly', 'multiple', 'selected', 'hidden', 'autoFocus', 'download']);
const NUM = new Set(['maxLength', 'minLength', 'tabIndex', 'aria-valuemin', 'aria-valuemax', 'aria-valuenow', 'colSpan', 'rowSpan', 'aria-level', 'aria-setsize', 'aria-posinset']);
const VOID = new Set(['img', 'input', 'br', 'hr', 'meta', 'link', 'source', 'area', 'col', 'wbr']);

const loopVars = [];
const expr = raw => {
  const e = raw.trim();
  if (/^(true|false|null|-?\d+(\.\d+)?|'[^']*'|"[^"]*")$/.test(e)) return e;
  const head = e.split('.')[0];
  return loopVars.includes(head) ? e : 'v.' + e;
};
const hasTpl = s => /\{\{.*?\}\}/.test(s);
// "a {{ x }} b" -> `a ${v.x} b`; "{{ x }}" -> v.x
const interp = s => {
  const m = s.match(/^\s*\{\{([^}]*)\}\}\s*$/);
  if (m) return expr(m[1]);
  return '`' + s.replace(/[`\\]/g, c => '\\' + c).replace(/\$\{/g, '\\${').replace(/\{\{([^}]*)\}\}/g, (_, x) => '${' + expr(x) + '}') + '`';
};
const camel = p => p.startsWith('--') ? p : p.replace(/^-ms-/, 'ms-').replace(/-([a-z])/g, (_, c) => c.toUpperCase());

function splitDecls(style) {
  const out = []; let cur = '', depth = 0, q = null;
  for (const ch of style) {
    if (q) { cur += ch; if (ch === q) q = null; continue; }
    if (ch === '"' || ch === "'") { q = ch; cur += ch; continue; }
    if (ch === '(') depth++; if (ch === ')') depth--;
    if (ch === ';' && depth === 0) { out.push(cur); cur = ''; continue; }
    cur += ch;
  }
  out.push(cur);
  return out.map(d => d.trim()).filter(Boolean);
}
function styleObj(style) {
  // A property repeated in one style attribute: the later one wins, as in CSS.
  const decls = new Map();
  splitDecls(style).forEach(d => {
    const i = d.indexOf(':');
    const prop = d.slice(0, i).trim(), val = d.slice(i + 1).trim();
    decls.delete(prop); decls.set(prop, val);
  });
  const parts = [...decls].map(([prop, val]) => {
    const key = /^[a-zA-Z]+$/.test(camel(prop)) ? camel(prop) : JSON.stringify(camel(prop));
    return key + ': ' + (hasTpl(val) ? interp(val) : JSON.stringify(val));
  });
  return '{{ ' + parts.join(', ') + ' }}';
}

// The prototype's CSS and rail logic select on the raw style attribute. React re-serialises
// inline styles, so those hooks become classes instead.
function styleHooks(tag, style) {
  const s = style.replace(/\s+/g, '');
  const add = [];
  if (s.includes('background:var(--blackberry)')) add.push('gi-bgbb');
  if (s.includes('background:var(--bone)')) add.push('gi-bgbone');
  if ((tag === 'p' || tag === 'span') && s.includes('text-transform:uppercase')) add.push('gi-up');
  return add;
}

const jsText = t => {
  const norm = t.replace(/\s+/g, ' ');
  if (norm === ' ') return '{" "}';
  if (/^[^{}<>"'`\s][^{}<>]*[^{}<>\s]$/.test(norm) || /^[^{}<>\s]$/.test(norm)) return norm;
  return '{' + JSON.stringify(norm) + '}';
};
// Text keeps the HTML meaning exactly: runs of whitespace collapse to one space but are never
// dropped (a leading space inside a <span> is visible). Interpolated values are wrapped in
// <span class="sc-interp">, as the prototype's runtime renders them; some CSS selectors
// (e.g. `span:last-child`) and flex layouts depend on that extra element.
function textNode(value) {
  if (!hasTpl(value)) return value.trim() ? jsText(value) : '{" "}';
  const bits = [];
  value.split(/(\{\{[^}]*\}\})/).forEach(p => {
    if (!p) return;
    const m = p.match(/^\{\{([^}]*)\}\}$/);
    if (m) bits.push('<span className="sc-interp">{' + expr(m[1]) + '}</span>');
    else bits.push(textNode(p));
  });
  return bits.join('');
}

function attrs(el) {
  const tag = el.tagName;
  const list = [];
  let classExtra = [];
  const styleA = el.attrs.find(a => a.name === 'style');
  if (styleA) classExtra = styleHooks(tag, styleA.value);
  let hadClass = false;
  for (const { name: raw, value } of el.attrs) {
    if (raw.startsWith('hint-')) continue;
    let n = ATTR[raw] || raw;
    if (n === 'onInput' && (tag === 'input' || tag === 'textarea')) n = 'onChange';
    if (n === 'style') { list.push('style=' + styleObj(value)); continue; }
    if (n === 'className') {
      hadClass = true;
      const val = [value, ...classExtra].join(' ').trim();
      list.push('className=' + (hasTpl(val) ? '{' + interp(val) + '}' : JSON.stringify(val)));
      continue;
    }
    if (tag === 'img' && n === 'src' && value.startsWith('assets/')) { list.push('src=' + JSON.stringify('/' + value)); continue; }
    if (hasTpl(value)) { list.push(n + '={' + interp(value) + '}'); continue; }
    if (NUM.has(n) && /^-?\d+$/.test(value)) { list.push(n + '={' + value + '}'); continue; }
    if (BOOL.has(n) && (value === '' || value === n || value === raw)) { list.push(n); continue; }
    if (n === 'value' && tag === 'input' && !el.attrs.some(a => /^type$/.test(a.name) && /radio|checkbox|hidden|submit|button/.test(a.value))) { list.push('defaultValue=' + JSON.stringify(value)); continue; }
    if (n === 'value' && tag === 'textarea') { list.push('defaultValue=' + JSON.stringify(value)); continue; }
    list.push(n + '=' + JSON.stringify(value));
  }
  if (!hadClass && classExtra.length) list.push('className=' + JSON.stringify(classExtra.join(' ')));
  return list.length ? ' ' + list.join(' ') : '';
}

function kids(nodes, ind) {
  const real = nodes.filter(n => n.nodeName !== '#comment');
  const out = [];
  real.forEach((n, i) => {
    const edge = real.length === 1 ? 'only' : i === 0 ? 'first' : i === real.length - 1 ? 'last' : false;
    const s = node(n, ind, edge);
    if (s) out.push(s);
  });
  return out;
}
function node(n, ind, edge) {
  const pad = '  '.repeat(ind);
  if (n.nodeName === '#text') return pad + textNode(n.value);
  if (n.nodeName === '#comment') return '';
  const tag = n.tagName;
  const childNodes = tag === 'template' ? n.content.childNodes : n.childNodes;
  if (tag === 'sc-if') {
    const v = n.attrs.find(a => a.name === 'value').value;
    const body = kids(childNodes, ind + 2);
    return `${pad}{${interp(v)} ? (\n${pad}  <>\n${body.join('\n')}\n${pad}  </>\n${pad}) : null}`;
  }
  if (tag === 'sc-for') {
    const list = n.attrs.find(a => a.name === 'list').value;
    const as = n.attrs.find(a => a.name === 'as').value;
    loopVars.push(as);
    const body = kids(childNodes, ind + 2);
    loopVars.pop();
    return `${pad}{(${interp(list)} || []).map((${as}: any, ${as}_i: number) => (\n${pad}  <Fragment key={${as}_i}>\n${body.join('\n')}\n${pad}  </Fragment>\n${pad}))}`;
  }
  const a = attrs(n);
  if (VOID.has(tag)) return `${pad}<${tag}${a} />`;
  const body = kids(childNodes, ind + 1);
  if (!body.length) return `${pad}<${tag}${a}></${tag}>`;
  return `${pad}<${tag}${a}>\n${body.join('\n')}\n${pad}</${tag}>`;
}

const body = kids(frag.childNodes, 2);
const file = `/* eslint-disable */
// Generated from the design prototype by scripts/dc-to-jsx.mjs, then maintained by hand.
import { Fragment } from 'react';

export default function ${name}({ v }: { v: any }) {
  return (
    <>
${body.join('\n')}
    </>
  );
}
`;
fs.writeFileSync(out, file);
console.log('wrote', out, file.split('\n').length, 'lines');
