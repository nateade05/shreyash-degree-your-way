/* eslint-disable */
// Generated from the design prototype by scripts/dc-to-jsx.mjs, then maintained by hand.
import { Fragment } from 'react';
import './PathfinderWizardView.css';
import PathfinderReport from './PathfinderReport';

export default function PathfinderWizardView({ v }: { v: any }) {
  return (
    <>
    <div ref={v.scRef} data-screen-label="Pathfinder guided" style={{ height: v.rootH, overflowY: "auto", background: "var(--warm-white)", display: "flex", flexDirection: "column", color: "var(--blackberry)" }}>
      {" "}
      <div style={{ flex: "none", borderBottom: "1px solid var(--rule)" }}>
        {" "}
        <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 20px", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
          {" "}
          <div style={{ display: "flex", alignItems: "baseline", gap: "10px", minWidth: "0" }}>
            <span style={{ fontFamily: "'Newsreader',serif", fontSize: "20px", letterSpacing: "-0.01em" }}>
              DegreeYourWay
            </span>
            <span style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
              Pathfinder
            </span>
          </div>
          {" "}
          <button type="button" onClick={v.exit} aria-label="Close Pathfinder" style={{ all: "unset", cursor: "pointer", width: "44px", height: "44px", display: "grid", placeItems: "center", marginRight: "-12px", color: "var(--blackberry)", transition: "color 150ms ease-out" }} className="dc-pathfinderwizardview-h1">
            <svg width="18" height="18" viewBox="0 0 256 256" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="20" strokeLinecap="round">
              <line x1="200" y1="56" x2="56" y2="200"></line>
              <line x1="200" y1="200" x2="56" y2="56"></line>
            </svg>
          </button>
          {" "}
        </div>
        {" "}
      </div>
      {" "}
      {v.showProg ? (
        <>
          {" "}
          <div style={{ flex: "none", maxWidth: "680px", margin: "0 auto", width: "100%", boxSizing: "border-box", padding: "14px 20px 0", display: "flex", flexDirection: "column", gap: "8px" }}>
            {" "}
            <div role="progressbar" aria-valuemin={0} aria-valuemax={v.qMax} aria-valuenow={v.qNum} aria-label="Questions answered" style={{ display: "grid", gridTemplateColumns: v.partCols, gap: "6px" }}>
              {" "}
              {(v.parts || []).map((pt: any, pt_i: number) => (
                <Fragment key={pt_i}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
                    <span style={{ height: "3px", borderRadius: "999px", background: "var(--rule)", position: "relative", overflow: "hidden" }}>
                      <span style={{ position: "absolute", inset: "0", background: "var(--oxblood)", transformOrigin: "left center", transform: `scaleX(${pt.fill})`, transition: "transform 320ms cubic-bezier(0.23,1,0.32,1)" }}></span>
                    </span>
                    <span style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", color: pt.fg, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} className="gi-up">
                      <span className="sc-interp">{pt.label}</span>
                    </span>
                  </div>
                </Fragment>
              ))}
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </>
      ) : null}
      {" "}
      <main ref={v.screenRef} style={{ flex: "1 0 auto", maxWidth: "680px", margin: "0 auto", width: "100%", boxSizing: "border-box", padding: "28px 20px 0", display: "flex", flexDirection: "column" }}>
        {" "}
        {v.ready ? (
          <>
            {" "}
            {v.isIntro ? (
              <>
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "22px", padding: "12px 0 40px" }}>
                  {" "}
                  <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                    Free Pathfinder, about 3 minutes
                  </p>
                  {" "}
                  <h1 ref={v.headRef} tabIndex={-1} style={{ margin: "0", outline: "none", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(36px,8.4vw,54px)", lineHeight: "1.04", letterSpacing: "-0.02em", textWrap: "balance" }}>
                    Your plan to a degree apprenticeship offer.
                  </h1>
                  {" "}
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.6", color: "var(--blackberry-soft)", textWrap: "pretty" }}>
                    About ten questions on your grades, what you've done and what you want. The report is based on your answers.
                  </p>
                  {" "}
                  <div role="group" aria-labelledby="pf-intro-q" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <p id="pf-intro-q" style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: "600" }}>
                      Start here: {v.introQ.charAt(0).toLowerCase() + v.introQ.slice(1)}
                    </p>
                    {(v.introOpts || []).map((o: any, o_i: number) => (
                      <button key={o_i} type="button" onClick={o.pick} style={{ all: "unset", boxSizing: "border-box", width: "100%", minHeight: "56px", padding: "12px 16px", display: "grid", gridTemplateColumns: "minmax(0,1fr) 20px", alignItems: "center", gap: "14px", border: "1px solid var(--rule)", background: "var(--warm-white)", borderRadius: "14px", cursor: "pointer", font: "400 17px/1.35 'Source Sans 3',sans-serif", color: "var(--blackberry)", transition: "border-color 150ms ease-out,background-color 150ms ease-out,transform 120ms ease-out" }} className="dc-pathfinderwizardview-h4 dc-pathfinderwizardview-a5">
                        <span>{o.label}</span>
                        <span aria-hidden="true" style={{ color: "var(--oxblood)", fontSize: "18px" }}>→</span>
                      </button>
                    ))}
                    <span style={{ fontSize: "14px", color: "var(--muted)" }}>
                      Free. You see your best-fit sector before giving any details.
                    </span>
                  </div>
                  {" "}
                  <ol style={{ listStyle: "none", margin: "0", padding: "0", borderTop: "1px solid var(--rule)" }}>
                    {" "}
                    {(v.introList || []).map((il: any, il_i: number) => (
                      <Fragment key={il_i}>
                        <li style={{ display: "grid", gridTemplateColumns: "32px minmax(0,1fr)", gap: "8px", padding: "12px 0", borderBottom: "1px solid var(--rule)" }}>
                          <span style={{ fontSize: "13px", fontWeight: "600", letterSpacing: "0.08em", color: "var(--muted)", fontVariantNumeric: "tabular-nums", lineHeight: "22px" }}>
                            <span className="sc-interp">{il.n}</span>
                          </span>
                          <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                            <span style={{ fontSize: "16px", fontWeight: "600" }}>
                              <span className="sc-interp">{il.t}</span>
                            </span>
                            <span style={{ fontSize: "15px", lineHeight: "1.45", color: "var(--blackberry-soft)" }}>
                              <span className="sc-interp">{il.d}</span>
                            </span>
                          </span>
                        </li>
                      </Fragment>
                    ))}
                    {" "}
                  </ol>
                  {" "}
                  {" "}
                </div>
                {" "}
              </>
            ) : null}
            {" "}
            {v.isQ ? (
              <>
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "24px", paddingBottom: "28px" }}>
                  {" "}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {" "}
                    <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", fontVariantNumeric: "tabular-nums" }} className="gi-up">
                      <span className="sc-interp">{v.countText}</span>
                    </p>
                    {" "}
                    <h1 id="pf-q" ref={v.headRef} tabIndex={-1} style={{ margin: "0", outline: "none", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(30px,7vw,42px)", lineHeight: "1.08", letterSpacing: "-0.02em", textWrap: "balance" }}>
                      <span className="sc-interp">{v.qTitle}</span>
                    </h1>
                    {" "}
                    {v.qHelp ? (
                      <>
                        <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.5", color: "var(--blackberry-soft)" }}>
                          <span className="sc-interp">{v.qHelp}</span>
                        </p>
                      </>
                    ) : null}
                    {" "}
                  </div>
                  {" "}
                  {v.isList ? (
                    <>
                      {" "}
                      <div role="group" aria-labelledby="pf-q" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {" "}
                        {(v.opts || []).map((o: any, o_i: number) => (
                          <Fragment key={o_i}>
                            {" "}
                            <button type="button" onClick={o.pick} aria-pressed={o.on} style={{ all: "unset", boxSizing: "border-box", width: "100%", minHeight: "56px", padding: "12px 16px", display: "grid", gridTemplateColumns: "minmax(0,1fr) 20px", alignItems: "center", gap: "14px", border: `1px solid ${o.bd}`, boxShadow: `inset 0 0 0 1px ${o.ring}`, background: o.bg, borderRadius: "14px", cursor: "pointer", font: "400 17px/1.35 'Source Sans 3',sans-serif", color: "var(--blackberry)", transition: "border-color 150ms ease-out,background-color 150ms ease-out,transform 120ms ease-out" }} className="dc-pathfinderwizardview-h4 dc-pathfinderwizardview-a5">
                              {" "}
                              <span style={{ minWidth: "0", textWrap: "pretty", display: "flex", flexDirection: "column", gap: "2px" }}>
                                <span className="sc-interp">{o.label}</span>
                                {o.sub ? <span style={{ fontSize: "15px", lineHeight: "1.4", color: "var(--muted)" }}>{o.sub}</span> : null}
                              </span>
                              {" "}
                              <span aria-hidden="true" style={{ width: "20px", height: "20px", boxSizing: "border-box", borderRadius: o.radius, border: `1px solid ${o.dotBd}`, background: o.dotBg, display: "grid", placeItems: "center", color: "var(--warm-white)", boxShadow: `inset 0 0 0 ${o.dotFill} var(--oxblood)`, transition: "box-shadow 150ms ease-out,border-color 150ms ease-out,background-color 150ms ease-out" }}>
                                {o.tick ? (
                                  <>
                                    <svg width="12" height="12" viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="28" strokeLinecap="round" strokeLinejoin="round">
                                      <polyline points="40 144 96 200 224 72"></polyline>
                                    </svg>
                                  </>
                                ) : null}
                              </span>
                              {" "}
                            </button>
                            {" "}
                          </Fragment>
                        ))}
                        {" "}
                      </div>
                      {" "}
                    </>
                  ) : null}
                  {" "}
                  {v.isSubjects ? (
                    <>
                      {" "}
                      <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
                        {" "}
                        {v.showChips ? (<>
                        <span aria-live="polite" style={{ fontSize: "14px", fontWeight: "600", color: v.subCountFg, fontVariantNumeric: "tabular-nums" }}>
                          <span className="sc-interp">{v.subCount}</span>
                        </span>
                        {" "}
                        {(v.groups || []).map((gr: any, gr_i: number) => (
                          <Fragment key={gr_i}>
                            {" "}
                            <div role="group" aria-label={gr.name} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                              {" "}
                              <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                                <span className="sc-interp">{gr.name}</span>
                              </p>
                              {" "}
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                {" "}
                                {(gr.chips || []).map((c: any, c_i: number) => (
                                  <Fragment key={c_i}>
                                    <button type="button" onClick={c.pick} aria-pressed={c.on} style={{ all: "unset", boxSizing: "border-box", minHeight: "44px", padding: "0 14px", display: "inline-flex", alignItems: "center", gap: "6px", border: `1px solid ${c.bd}`, background: c.bg, color: c.fg, borderRadius: "999px", cursor: "pointer", font: "400 15px 'Source Sans 3',sans-serif", transition: "background-color 150ms ease-out,border-color 150ms ease-out,color 150ms ease-out,transform 120ms ease-out" }} className="dc-pathfinderwizardview-h6 dc-pathfinderwizardview-a7">
                                      {c.isOn ? (
                                        <>
                                          <svg width="14" height="14" viewBox="0 0 256 256" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="40 144 96 200 224 72"></polyline>
                                          </svg>
                                        </>
                                      ) : null}
                                      <span className="sc-interp">{c.label}</span>
                                    </button>
                                  </Fragment>
                                ))}
                                {" "}
                              </div>
                              {" "}
                            </div>
                            {" "}
                          </Fragment>
                        ))}
                        {" "}
                        {v.showOther ? (
                          <>
                            <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "15px", fontWeight: "600" }}>
                              Which other subject?
                              <input maxLength={60} value={v.other} onChange={v.setOther} style={{ width: "100%", boxSizing: "border-box", font: "400 16px 'Source Sans 3',sans-serif", height: "48px", padding: "0 14px", border: "1px solid var(--input-border)", background: "var(--warm-white)", color: "var(--blackberry)", borderRadius: "14px" }} />
                            </label>
                          </>
                        ) : null}
                        </>) : null}
                        {v.showGrades ? (
                          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                            {(v.gradeRows || []).map((r: any) => (
                              <div key={r.id} style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "10px 0 14px" }}>
                                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "12px" }}>
                                  <span id={r.id} style={{ fontSize: "16px", fontWeight: "600" }}>{r.name}</span>
                                  <span style={{ fontSize: "14px", color: "var(--muted)", whiteSpace: "nowrap" }}>{r.note}</span>
                                </div>
                                {r.hasSize ? (
                                  <div role="group" aria-label={r.name + " size"} style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "4px" }}>
                                    {r.sizes.map((c: any, c_i: number) => (
                                      <Fragment key={c_i}>
                                  <button type="button" onClick={c.pick} aria-pressed={c.on} aria-label={c.aria} style={{ all: "unset", boxSizing: "border-box", height: "40px", padding: "0 6px", display: "grid", placeItems: "center", textAlign: "center", border: `1px solid ${c.bd}`, background: c.bg, color: c.fg, borderRadius: "999px", cursor: "pointer", font: "400 14px 'Source Sans 3',sans-serif", fontVariantNumeric: "tabular-nums", transition: "background-color 150ms ease-out,border-color 150ms ease-out,color 150ms ease-out,transform 120ms ease-out" }} className="dc-pathfinderwizardview-h8 dc-pathfinderwizardview-a9">
                                    <span className="sc-interp">{c.label}</span>
                                  </button>
                                      </Fragment>
                                    ))}
                                  </div>
                                ) : null}
                                <div role="group" aria-labelledby={r.id} style={{ display: "grid", gridTemplateColumns: r.cols, gap: "4px" }}>
                                  {r.cells.map((c: any, c_i: number) => (
                                    <Fragment key={c_i}>
                                  <button type="button" onClick={c.pick} aria-pressed={c.on} aria-label={c.aria} style={{ all: "unset", boxSizing: "border-box", height: "48px", padding: "0 6px", display: "grid", placeItems: "center", textAlign: "center", border: `1px solid ${c.bd}`, background: c.bg, color: c.fg, borderRadius: "999px", cursor: "pointer", font: "400 20px 'Newsreader',serif", fontVariantNumeric: "tabular-nums", transition: "background-color 150ms ease-out,border-color 150ms ease-out,color 150ms ease-out,transform 120ms ease-out" }} className="dc-pathfinderwizardview-h8 dc-pathfinderwizardview-a9">
                                    <span className="sc-interp">{c.label}</span>
                                  </button>
                                    </Fragment>
                                  ))}
                                </div>
                              </div>
                            ))}
                            {v.gradesHint ? <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.5", color: "var(--muted)" }}>{v.gradesHint}</p> : null}
                            {v.showNoPred ? (
                          <button type="button" onClick={v.toggleNoPred} aria-pressed={v.noPredOn} style={{ all: "unset", boxSizing: "border-box", cursor: "pointer", minHeight: "44px", display: "inline-flex", alignItems: "center", gap: "10px", font: "400 16px 'Source Sans 3',sans-serif", color: "var(--blackberry)" }} className="dc-pathfinderwizardview-a5">
                            <span aria-hidden="true" style={{ width: "20px", height: "20px", boxSizing: "border-box", borderRadius: "6px", border: `1px solid ${v.noPred ? "var(--oxblood)" : "var(--input-border)"}`, background: v.noPred ? "var(--oxblood)" : "var(--warm-white)", display: "grid", placeItems: "center", color: "var(--warm-white)", flex: "none" }}>
                              {v.noPred ? (
                                <svg width="12" height="12" viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="28" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="40 144 96 200 224 72"></polyline>
                                </svg>
                              ) : null}
                            </span>
                            I don't have predicted grades yet
                          </button>
                            ) : null}
                          </div>
                        ) : null}
                        {" "}
                      </div>
                      {" "}
                    </>
                  ) : null}
                  {" "}
                  {v.isGcse ? (
                    <>
                      {" "}
                      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                        {" "}
                        {(v.gcse || []).map((p: any, p_i: number) => (
                          <Fragment key={p_i}>
                            {" "}
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                              {" "}
                              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "12px" }}>
                                <span id={p.id} style={{ fontSize: "16px", fontWeight: "600" }}>
                                  <span className="sc-interp">{p.label}</span>
                                </span>
                                <span style={{ fontSize: "14px", color: "var(--muted)" }}>
                                  <span className="sc-interp">{p.note}</span>
                                </span>
                              </div>
                              {" "}
                              <div role="group" aria-labelledby={p.id} style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "4px" }}>
                                {" "}
                                {(p.cells || []).map((c: any, c_i: number) => (
                                  <Fragment key={c_i}>
                                    <button type="button" onClick={c.pick} aria-pressed={c.on} aria-label={c.aria} style={{ all: "unset", boxSizing: "border-box", height: "52px", display: "grid", placeItems: "center", border: `1px solid ${c.bd}`, background: c.bg, color: c.fg, borderRadius: "999px", cursor: "pointer", fontFamily: c.font, fontSize: c.size, fontVariantNumeric: "tabular-nums", transition: "background-color 150ms ease-out,border-color 150ms ease-out,color 150ms ease-out,transform 120ms ease-out" }} className="dc-pathfinderwizardview-h8 dc-pathfinderwizardview-a9">
                                      <span className="sc-interp">{c.label}</span>
                                    </button>
                                  </Fragment>
                                ))}
                                {" "}
                              </div>
                              {" "}
                            </div>
                            {" "}
                          </Fragment>
                        ))}
                        {" "}
                        <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.5", color: "var(--muted)" }}>
                          Grade 4 is a standard pass. 9 is the top grade.
                        </p>
                        {v.showResit ? (
                          <button type="button" onClick={v.toggleResit} aria-pressed={v.resitOn} style={{ all: "unset", boxSizing: "border-box", cursor: "pointer", minHeight: "44px", display: "inline-flex", alignItems: "center", gap: "10px", font: "400 16px 'Source Sans 3',sans-serif", color: "var(--blackberry)" }} className="dc-pathfinderwizardview-a5">
                            <span aria-hidden="true" style={{ width: "20px", height: "20px", boxSizing: "border-box", borderRadius: "6px", border: `1px solid ${v.resit ? "var(--oxblood)" : "var(--input-border)"}`, background: v.resit ? "var(--oxblood)" : "var(--warm-white)", display: "grid", placeItems: "center", color: "var(--warm-white)", flex: "none" }}>
                              {v.resit ? (
                                <svg width="12" height="12" viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="28" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="40 144 96 200 224 72"></polyline>
                                </svg>
                              ) : null}
                            </span>
                            I'm resitting it
                          </button>
                        ) : null}
                        {" "}
                      </div>
                      {" "}
                    </>
                  ) : null}
                  {" "}
                  {v.showNote ? (
                    <>
                      {" "}
                      <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "15px", fontWeight: "600" }}>
                        <span style={{ display: "flex", flexWrap: "wrap", gap: "4px 8px" }}>
                          <span className="sc-interp">{v.noteLabel}</span>
                          <span style={{ fontWeight: "400", color: "var(--muted)" }}>
                            <span className="sc-interp">{v.noteHint}</span>
                          </span>
                        </span>
                        <textarea rows={3} maxLength={300} value={v.note} onChange={v.setNote} style={{ width: "100%", boxSizing: "border-box", font: "400 16px/1.5 'Source Sans 3',sans-serif", padding: "12px 14px", border: "1px solid var(--input-border)", background: "var(--warm-white)", color: "var(--blackberry)", borderRadius: "14px", resize: "vertical" }}></textarea>
                      </label>
                      {" "}
                    </>
                  ) : null}
                  {" "}
                </div>
                {" "}
              </>
            ) : null}
            {" "}
            {v.isBuilding ? (
              <>
                {" "}
                <div role="status" style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "40px 0" }}>
                  {" "}
                  <p ref={v.headRef} tabIndex={-1} style={{ margin: "0", outline: "none", fontFamily: "'Newsreader',serif", fontSize: "32px", lineHeight: "1.15", letterSpacing: "-0.01em" }}>
                    Building your report.
                  </p>
                  {" "}
                  <ol style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "10px" }}>
                    {" "}
                    {(v.buildSteps || []).map((b: any, b_i: number) => (
                      <Fragment key={b_i}>
                        <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "16px", color: b.fg, transition: "color 200ms ease-out" }}>
                          <span aria-hidden="true" style={{ width: "16px", height: "16px", boxSizing: "border-box", borderRadius: "50%", border: `1px solid ${b.bd}`, boxShadow: `inset 0 0 0 ${b.fill} var(--oxblood)`, transition: "box-shadow 200ms ease-out,border-color 200ms ease-out", flex: "none" }}></span>
                          <span style={{ flex: "1 1 auto", minWidth: "0" }}>
                            <span className="sc-interp">{b.t}</span>
                          </span>
                        </li>
                      </Fragment>
                    ))}
                    {" "}
                  </ol>
                  {" "}
                </div>
                {" "}
              </>
            ) : null}
            {" "}
          </>
        ) : null}
        {" "}
      </main>
      {" "}
      {v.isReport ? (
        <>
          {" "}
          <PathfinderReport report={v.rep} profile={v.prof} aiState={v.aiState} known={v.known} onSave={v.onSave} onLead={v.onLead} onRestart={v.restart} onCourse={v.onCourse} />
          {" "}
        </>
      ) : null}
      {" "}
      {v.showFoot ? (
        <>
          {" "}
          <div style={{ flex: "none", position: "sticky", bottom: "0", zIndex: "2", background: "var(--warm-white)", borderTop: "1px solid var(--rule)" }}>
            {" "}
            <div style={{ maxWidth: "680px", margin: "0 auto", padding: "10px 20px 14px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {" "}
              {v.maxNote ? (
                <span aria-live="polite" style={{ fontSize: "14px", color: "var(--oxblood)", textAlign: "right" }}>
                  {v.maxNote}
                </span>
              ) : null}
              {v.need ? (
                <>
                  <span id="pf-need" style={{ fontSize: "14px", color: "var(--muted)", textAlign: "right" }}>
                    <span className="sc-interp">{v.needText}</span>
                  </span>
                </>
              ) : null}
              {" "}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                {" "}
                <button type="button" onClick={v.back} style={{ all: "unset", cursor: "pointer", minHeight: "44px", paddingRight: "8px", display: "inline-flex", alignItems: "center", gap: "6px", font: "600 15px 'Source Sans 3',sans-serif", color: "var(--blackberry)", transition: "color 150ms ease-out" }} className="dc-pathfinderwizardview-h10">
                  <span aria-hidden="true">
                    ←
                  </span>
                  Back
                </button>
                {" "}
                <button type="button" onClick={v.next} aria-disabled={v.nextDis} aria-describedby="pf-need" style={{ all: "unset", boxSizing: "border-box", cursor: v.nextCursor, height: "52px", padding: "0 24px", whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: "12px", background: "var(--oxblood)", color: "var(--warm-white)", borderRadius: "999px", opacity: v.nextOp, font: "600 15px 'Source Sans 3',sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", transition: "background-color 150ms ease-out,opacity 150ms ease-out,transform 120ms ease-out" }} className="dc-pathfinderwizardview-h11 dc-dyn-style-active">
                  <span className="sc-interp">{v.nextLabel}</span>
                  <span aria-hidden="true">
                    →
                  </span>
                </button>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </>
      ) : null}
      {" "}
    </div>
    </>
  );
}
