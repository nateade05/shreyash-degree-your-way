/* eslint-disable */
// Generated from the design prototype by scripts/dc-to-jsx.mjs, then maintained by hand.
import { Fragment } from 'react';
import './PathfinderReportView.css';

export default function PathfinderReportView({ v }: { v: any }) {
  return (
    <>
    <div ref={v.rootRef} data-screen-label="Pathfinder report" style={{ background: "var(--warm-white)", color: "var(--blackberry)", fontFamily: "'Source Sans 3',sans-serif" }}>
      {" "}
      {v.ready ? (
        <>
          {" "}
          <div style={{ maxWidth: "680px", margin: "0 auto", padding: "20px 20px 0" }}>
            {" "}
            <ol aria-label="Your steps" style={{ listStyle: "none", margin: "0", padding: "0", display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "4px" }}>
              {" "}
              {(v.journey || []).map((j: any, j_i: number) => (
                <Fragment key={j_i}>
                  <li aria-current={j.cur} style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
                    <span style={{ height: "3px", borderRadius: "2px", background: j.bar, transition: "background-color 200ms ease-out" }}></span>
                    <span style={{ fontSize: "12px", lineHeight: "1.3", fontWeight: j.w, color: j.fg }}>
                      <span className="sc-interp">{j.label}</span>
                    </span>
                  </li>
                </Fragment>
              ))}
              {" "}
            </ol>
            {" "}
            <div style={{ marginTop: "14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "12px 14px", background: "var(--bone)", borderRadius: "2px" }} className="gi-bgbone">
              {" "}
              <span style={{ fontSize: "15px", lineHeight: "1.4", minWidth: "0" }}>
                <span style={{ fontWeight: "600" }}>
                  Now:
                </span>
                {" "}<span className="sc-interp">{v.nowText}</span>
              </span>
              {" "}
              {v.nowBtn ? (
                <>
                  <button type="button" onClick={v.nowGo} style={{ all: "unset", flex: "none", whiteSpace: "nowrap", cursor: "pointer", minHeight: "40px", padding: "0 14px", display: "inline-flex", alignItems: "center", gap: "6px", border: "1px solid var(--blackberry)", borderRadius: "2px", font: "600 14px 'Source Sans 3',sans-serif", transition: "background-color 150ms ease-out,color 150ms ease-out" }} className="dc-pathfinderreportview-h1">
                    <span className="sc-interp">{v.nowBtn}</span>
                    <span aria-hidden="true">
                      ↓
                    </span>
                  </button>
                </>
              ) : null}
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <div style={{ maxWidth: "680px", margin: "0 auto", padding: "24px 20px 0", display: "flex", flexDirection: "column", gap: "20px" }}>
            {" "}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "8px 16px" }}>
              {" "}
              <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", whiteSpace: "nowrap", flex: "none" }} className="gi-up">
                Your Pathfinder report
              </p>
              {" "}
              <span aria-live="polite" style={{ whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--muted)" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: v.srcDot, transition: "background-color 200ms ease-out" }}></span>
                <span className="sc-interp">{v.srcText}</span>
              </span>
              {" "}
            </div>
            {" "}
            <h1 ref={v.headRef} tabIndex={-1} style={{ margin: "0", outline: "none", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(38px,9vw,60px)", lineHeight: "1.02", letterSpacing: "-0.025em", textWrap: "balance" }}>
              <span className="sc-interp">{v.sector}</span>
            </h1>
            {" "}
            {v.hasMeter ? (
              <>
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {" "}
                  <p style={{ margin: "0", fontSize: "14px", fontWeight: "600" }}>
                    Where your grades stand
                  </p>
                  {" "}
                  <ol aria-label="Where your grades stand against the usual entry bar" style={{ listStyle: "none", margin: "0", padding: "0", display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "4px" }}>
                    {" "}
                    {(v.meter || []).map((m: any, m_i: number) => (
                      <Fragment key={m_i}>
                        <li aria-current={m.cur} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          <span style={{ height: "4px", borderRadius: "14px", background: m.bar }}></span>
                          <span style={{ fontSize: "14px", lineHeight: "1.3", color: m.fg, fontWeight: m.w }}>
                            <span className="sc-interp">{m.label}</span>
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
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.6", color: "var(--blackberry-soft)", textWrap: "pretty" }}>
              <span className="sc-interp">{v.read}</span>
            </p>
            {" "}
            <p style={{ margin: "0", display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "4px 12px" }}>
              <span style={{ flex: "none", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", whiteSpace: "nowrap" }} className="gi-up">
                Also a fit
              </span>
              <span style={{ flex: "1 1 auto", minWidth: "0", fontSize: "16px" }}>
                <span className="sc-interp">{v.also}</span>
              </span>
            </p>
            {" "}
          </div>
          {" "}
          {v.unlocked ? (
            <>
              {" "}
              <nav aria-label="Report sections" style={{ position: "sticky", top: "0", zIndex: "3", background: "var(--warm-white)", borderBottom: "1px solid var(--rule)", marginTop: "28px" }}>
                {" "}
                <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 12px", display: "flex", gap: "4px", overflowX: "auto", scrollbarWidth: "none" }}>
                  {" "}
                  {(v.nav || []).map((n: any, n_i: number) => (
                    <Fragment key={n_i}>
                      <button type="button" onClick={n.go} aria-current={n.cur} style={{ all: "unset", flex: "none", cursor: "pointer", minHeight: "48px", padding: "0 10px", display: "inline-flex", alignItems: "center", fontSize: "14px", fontWeight: "600", color: n.fg, boxShadow: `inset 0 -2px 0 ${n.line}`, transition: "color 150ms ease-out,box-shadow 150ms ease-out" }} className="dc-pathfinderreportview-h2">
                        <span className="sc-interp">{n.label}</span>
                      </button>
                    </Fragment>
                  ))}
                  {" "}
                </div>
                {" "}
              </nav>
              {" "}
            </>
          ) : null}
          {" "}
          <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 20px 120px", display: "flex", flexDirection: "column", gap: "48px" }}>
            {" "}
            {v.locked ? (
              <>
                {" "}
                <div style={{ paddingTop: "28px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  {" "}
                  <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                    In your full report
                  </p>
                  {" "}
                  <ul style={{ listStyle: "none", margin: "0", padding: "0", borderTop: "1px solid var(--rule)" }}>
                    {" "}
                    {(v.teaser || []).map((t: any, t_i: number) => (
                      <Fragment key={t_i}>
                        <li style={{ display: "grid", gridTemplateColumns: "20px minmax(0,1fr)", gap: "10px", alignItems: "baseline", padding: "10px 0", borderBottom: "1px solid var(--rule)", fontSize: "16px", lineHeight: "1.45" }}>
                          <svg width="14" height="14" viewBox="0 0 256 256" aria-hidden="true" fill="none" stroke="var(--oxblood)" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="40 144 96 200 224 72"></polyline>
                          </svg>
                          <span>
                            <span style={{ fontWeight: "600" }}>
                              <span className="sc-interp">{t.a}</span>
                            </span>
                            {" "}<span className="sc-interp">{t.b}</span>
                          </span>
                        </li>
                      </Fragment>
                    ))}
                    {" "}
                  </ul>
                  {" "}
                </div>
                {" "}
              </>
            ) : null}
            {" "}
            <div style={{ position: "relative" }}>
              {" "}
              {v.locked ? (
                <>
                  {" "}
                  <div ref={v.secGate} style={{ position: "absolute", zIndex: "2", left: "0", right: "0", top: "56px", background: "var(--bone)", border: "1px solid var(--blackberry)", padding: "24px 20px", display: "flex", flexDirection: "column", gap: "18px", boxShadow: "0 16px 40px -20px rgba(48,32,42,0.18)", scrollMarginTop: "24px" }} className="gi-bgbone">
                    {" "}
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {" "}
                      <h2 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "28px", lineHeight: "1.15" }}>
                        Get your full report.
                      </h2>
                      {" "}
                      <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.55", color: "var(--blackberry-soft)" }}>
                        Add your details to see every match, your month-by-month plan, how to prepare for each stage and your backups. We'll email you the PDF too.
                      </p>
                      {" "}
                    </div>
                    {" "}
                    <form onSubmit={v.submit} noValidate={true} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                      {" "}
                      <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "15px", fontWeight: "600" }}>
                        First name
                        <input ref={v.nameRef} name="name" autoComplete="given-name" value={v.fName} onChange={v.setName} aria-invalid={v.nameInv} style={{ width: "100%", boxSizing: "border-box", font: "400 16px 'Source Sans 3',sans-serif", height: "48px", padding: "0 14px", border: `1px solid ${v.nameBd}`, background: "var(--warm-white)", color: "var(--blackberry)", borderRadius: "14px" }} />
                        {v.nameErr ? (
                          <>
                            <span style={{ fontSize: "14px", fontWeight: "400", color: "var(--oxblood)" }}>
                              Add your first name.
                            </span>
                          </>
                        ) : null}
                      </label>
                      {" "}
                      <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "15px", fontWeight: "600" }}>
                        Your email
                        <input ref={v.emailRef} type="email" name="email" autoComplete="email" inputMode="email" value={v.fEmail} onChange={v.setEmail} aria-invalid={v.emailInv} style={{ width: "100%", boxSizing: "border-box", font: "400 16px 'Source Sans 3',sans-serif", height: "48px", padding: "0 14px", border: `1px solid ${v.emailBd}`, background: "var(--warm-white)", color: "var(--blackberry)", borderRadius: "14px" }} />
                        {v.emailErr ? (
                          <>
                            <span style={{ fontSize: "14px", fontWeight: "400", color: "var(--oxblood)" }}>
                              That email doesn't look right. Check for a missing @ or full stop.
                            </span>
                          </>
                        ) : null}
                      </label>
                      {" "}
                      <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "15px", fontWeight: "600" }}>
                        <span style={{ display: "flex", flexWrap: "wrap", gap: "4px 8px" }}>
                          A parent's email
                          <span style={{ fontWeight: "400", color: "var(--muted)" }}>
                            Optional
                          </span>
                        </span>
                        <input type="email" name="parent" autoComplete="off" inputMode="email" value={v.fParent} onChange={v.setParent} style={{ width: "100%", boxSizing: "border-box", font: "400 16px 'Source Sans 3',sans-serif", height: "48px", padding: "0 14px", border: "1px solid var(--input-border)", background: "var(--warm-white)", color: "var(--blackberry)", borderRadius: "14px" }} />
                      </label>
                      {" "}
                      <button type="submit" aria-busy={v.busyAttr} style={{ all: "unset", boxSizing: "border-box", cursor: "pointer", height: "52px", padding: "0 24px", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "12px", background: "var(--oxblood)", color: "var(--warm-white)", borderRadius: "999px", font: "600 15px 'Source Sans 3',sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", transition: "background-color 150ms ease-out,transform 120ms ease-out" }} className="dc-pathfinderreportview-h3 dc-pathfinderreportview-a4">
                        <span className="sc-interp">{v.btn}</span>
                      </button>
                      {" "}
                      <span style={{ fontSize: "14px", lineHeight: "1.5", color: "var(--muted)" }}>
                        One email. No newsletter unless you ask.
                      </span>
                      {" "}
                      {v.fail ? (
                        <>
                          <p role="alert" style={{ margin: "0", fontSize: "14px", color: "var(--oxblood)" }}>
                            That didn't send. Check your connection and try again.
                          </p>
                        </>
                      ) : null}
                      {" "}
                    </form>
                    {" "}
                  </div>
                  {" "}
                </>
              ) : null}
              {" "}
              <div aria-hidden={v.lockedAttr} style={{ display: "flex", flexDirection: "column", gap: "48px", filter: `blur(${v.blur})`, opacity: v.lockOp, maxHeight: v.lockMax, overflow: "hidden", userSelect: v.lockSel, pointerEvents: v.lockPE, WebkitMaskImage: v.lockMask, maskImage: v.lockMask, transition: "filter 320ms ease-out,opacity 320ms ease-out" }}>
                {" "}
                {v.unlocked ? (
                  <>
                    {" "}
                    <section id="pf-cv" ref={v.secCv} aria-labelledby="pf-cv-h" style={{ marginTop: "28px", border: "2px solid var(--blackberry)", background: "var(--warm-white)", padding: "24px 20px", display: "flex", flexDirection: "column", gap: "20px", scrollMarginTop: "64px" }}>
                      {" "}
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {" "}
                        <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--oxblood)" }} className="gi-up">
                          Your next step
                        </p>
                        {" "}
                        <h2 id="pf-cv-h" style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "30px", lineHeight: "1.1", textWrap: "balance" }}>
                          <span className="sc-interp">{v.cvHead}</span>
                        </h2>
                        {" "}
                        <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.55", color: "var(--blackberry-soft)" }}>
                          See what's already working, what's missing, and how to close each gap before you apply. About 30 seconds.
                        </p>
                        {" "}
                      </div>
                      {" "}
                      {v.cvIdle ? (
                        <>
                          {" "}
                          <div role="tablist" aria-label="How to check" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: "1px solid var(--blackberry)", borderRadius: "14px" }}>
                            {" "}
                            {(v.cvTabs || []).map((tb: any, tb_i: number) => (
                              <Fragment key={tb_i}>
                                <button type="button" role="tab" aria-selected={tb.sel} onClick={tb.pick} style={{ all: "unset", boxSizing: "border-box", cursor: "pointer", minHeight: "48px", padding: "8px 10px", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", font: "600 15px 'Source Sans 3',sans-serif", background: tb.bg, color: tb.fg, transition: "background-color 150ms ease-out,color 150ms ease-out" }}>
                                  <span className="sc-interp">{tb.label}</span>
                                </button>
                              </Fragment>
                            ))}
                            {" "}
                          </div>
                          {" "}
                          {v.cvModeUpload ? (
                            <>
                              {" "}
                              <label style={{ position: "relative", boxSizing: "border-box", minHeight: "132px", border: "1px dashed var(--input-border)", background: "var(--bone)", borderRadius: "14px", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", textAlign: "center", cursor: "pointer", transition: "border-color 150ms ease-out" }} className="gi-bgbone dc-pathfinderreportview-h5">
                                {" "}
                                <svg width="24" height="24" viewBox="0 0 256 256" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="128" y1="168" x2="128" y2="48"></line>
                                  <polyline points="80 96 128 48 176 96"></polyline>
                                  <path d="M216 168v40a8 8 0 0 1-8 8H48a8 8 0 0 1-8-8v-40"></path>
                                </svg>
                                {" "}
                                <span style={{ fontSize: "16px", fontWeight: "600" }}>
                                  <span className="sc-interp">{v.cvFileLabel}</span>
                                </span>
                                {" "}
                                <span style={{ fontSize: "14px", color: "var(--muted)" }}>
                                  PDF, Word (.docx) or .txt, up to 8 MB
                                </span>
                                {" "}
                                <input type="file" accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain" onChange={v.cvOnFile} style={{ position: "absolute", width: "1px", height: "1px", opacity: "0", overflow: "hidden" }} />
                                {" "}
                              </label>
                              {" "}
                            </>
                          ) : null}
                          {" "}
                          {v.cvModeQs ? (
                            <>
                              {" "}
                              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                                {" "}
                                <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.5", color: "var(--blackberry-soft)" }}>
                                  A sentence or two each is enough. These are the examples application forms ask for.
                                </p>
                                {" "}
                                {(v.cvQs || []).map((cq: any, cq_i: number) => (
                                  <Fragment key={cq_i}>
                                    <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "15px", fontWeight: "600" }}>
                                      <span className="sc-interp">{cq.label}</span>
                                      <textarea rows={2} maxLength={600} placeholder={cq.ph} value={cq.val} onChange={cq.set} style={{ width: "100%", boxSizing: "border-box", font: "400 16px/1.5 'Source Sans 3',sans-serif", padding: "12px 14px", border: "1px solid var(--input-border)", background: "var(--warm-white)", color: "var(--blackberry)", borderRadius: "14px", resize: "vertical" }}></textarea>
                                    </label>
                                  </Fragment>
                                ))}
                                {" "}
                              </div>
                              {" "}
                            </>
                          ) : null}
                          {" "}
                          {v.cvErr ? (
                            <>
                              <p role="alert" style={{ margin: "0", fontSize: "14px", lineHeight: "1.5", color: "var(--oxblood)" }}>
                                <span className="sc-interp">{v.cvErr}</span>
                              </p>
                            </>
                          ) : null}
                          {" "}
                          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            {" "}
                            <button type="button" onClick={v.cvCheck} aria-disabled={v.cvDis} style={{ all: "unset", boxSizing: "border-box", height: "52px", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", background: "var(--oxblood)", color: "var(--warm-white)", borderRadius: "999px", font: "600 15px 'Source Sans 3',sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", transition: "background-color 150ms ease-out,transform 120ms ease-out,opacity 150ms ease-out", opacity: v.cvOp, cursor: v.cvCursor }} className="dc-pathfinderreportview-h6 dc-pathfinderreportview-a7">
                              <span className="sc-interp">{v.cvBtn}</span>
                              <span aria-hidden="true">
                                →
                              </span>
                            </button>
                            {" "}
                            <span style={{ fontSize: "14px", lineHeight: "1.5", color: "var(--muted)" }}>
                              <span className="sc-interp">{v.cvNeed}</span>
                            </span>
                            {" "}
                          </div>
                          {" "}
                        </>
                      ) : null}
                      {" "}
                      {v.cvBusy ? (
                        <>
                          {" "}
                          <div role="status" style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "8px 0" }}>
                            {" "}
                            <span style={{ height: "3px", borderRadius: "999px", background: "var(--rule)", position: "relative", overflow: "hidden" }}>
                              <span style={{ position: "absolute", inset: "0", background: "var(--oxblood)", transformOrigin: "left center", transform: `scaleX(${v.cvProg})`, transition: "transform 900ms cubic-bezier(0.23,1,0.32,1)" }}></span>
                            </span>
                            {" "}
                            <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.5" }}>
                              <span className="sc-interp">{v.cvBusyText}</span>
                            </p>
                            {" "}
                          </div>
                          {" "}
                        </>
                      ) : null}
                      {" "}
                      {v.cvDone ? (
                        <>
                          {" "}
                          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
                            {" "}
                            {v.cvNote ? (
                              <>
                                <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.5", color: "var(--muted)" }}>
                                  <span className="sc-interp">{v.cvNote}</span>
                                </p>
                              </>
                            ) : null}
                            {" "}
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                              {" "}
                              <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                                What's working
                              </p>
                              {" "}
                              <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
                                {(v.cvStrengths || []).map((sg: any, sg_i: number) => (
                                  <Fragment key={sg_i}>
                                    <li style={{ display: "grid", gridTemplateColumns: "20px minmax(0,1fr)", gap: "8px", fontSize: "16px", lineHeight: "1.45" }}>
                                      <svg width="14" height="14" viewBox="0 0 256 256" aria-hidden="true" style={{ marginTop: "4px" }} fill="none" stroke="var(--blackberry)" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="40 144 96 200 224 72"></polyline>
                                      </svg>
                                      <span>
                                        <span className="sc-interp">{sg.t}</span>
                                      </span>
                                    </li>
                                  </Fragment>
                                ))}
                              </ul>
                              {" "}
                            </div>
                            {" "}
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                              {" "}
                              <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                                <span className="sc-interp">{v.cvGapLabel}</span>
                              </p>
                              {" "}
                              <ol style={{ listStyle: "none", margin: "0", padding: "0", borderTop: "2px solid var(--blackberry)" }}>
                                {" "}
                                {(v.cvGaps || []).map((g: any, g_i: number) => (
                                  <Fragment key={g_i}>
                                    {" "}
                                    <li style={{ padding: "14px 0", borderBottom: "1px solid var(--rule)", display: "grid", gridTemplateColumns: "28px minmax(0,1fr)", gap: "4px 8px" }}>
                                      {" "}
                                      <span style={{ fontSize: "13px", fontWeight: "600", letterSpacing: "0.08em", color: "var(--oxblood)", fontVariantNumeric: "tabular-nums", lineHeight: "24px" }}>
                                        <span className="sc-interp">{g.n}</span>
                                      </span>
                                      {" "}
                                      <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
                                        {" "}
                                        <span style={{ fontSize: "17px", fontWeight: "600", lineHeight: "1.35" }}>
                                          <span className="sc-interp">{g.title}</span>
                                        </span>
                                        {" "}
                                        <span style={{ fontSize: "15px", lineHeight: "1.5", color: "var(--blackberry-soft)" }}>
                                          <span className="sc-interp">{g.detail}</span>
                                        </span>
                                        {" "}
                                        <span style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "4px 8px", fontSize: "14px", lineHeight: "1.4" }}>
                                          <span style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                                            Fixed on the course
                                          </span>
                                          <span style={{ fontWeight: "600" }}>
                                            <span className="sc-interp">{g.part}</span>
                                          </span>
                                        </span>
                                        {" "}
                                      </div>
                                      {" "}
                                    </li>
                                    {" "}
                                  </Fragment>
                                ))}
                                {" "}
                              </ol>
                              {" "}
                            </div>
                            {" "}
                            <div style={{ background: "var(--bone)", padding: "22px 18px", display: "flex", flexDirection: "column", gap: "14px" }} className="gi-bgbone">
                              {" "}
                              <h3 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "26px", lineHeight: "1.15", textWrap: "balance" }}>
                                <span className="sc-interp">{v.cvOfferHead}</span>
                              </h3>
                              {" "}
                              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.55", color: "var(--blackberry-soft)" }}>
                                Go through them with Shreyash on a free 30-minute call. You'll leave knowing which gap to fix first and whether the course is worth it for you.
                              </p>
                              {" "}
                              <a href={v.cvCallHref} target="_blank" rel="noopener" onClick={v.cvCallTap} style={{ all: "unset", boxSizing: "border-box", cursor: "pointer", height: "52px", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", background: "var(--oxblood)", color: "var(--warm-white)", borderRadius: "999px", font: "600 15px 'Source Sans 3',sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", transition: "background-color 150ms ease-out,transform 120ms ease-out,opacity 150ms ease-out" }} className="dc-pathfinderreportview-h8 dc-pathfinderreportview-a9">
                                Go through my gaps on a free call
                              </a>
                              {" "}
                              <span style={{ fontSize: "14px", color: "var(--muted)" }}>
                                Opens WhatsApp with your gaps filled in.
                              </span>
                              {" "}
                            </div>
                            {" "}
                            <div style={{ borderTop: "2px solid var(--blackberry)", paddingTop: "18px", display: "flex", flexDirection: "column", gap: "14px" }}>
                              {" "}
                              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "6px 16px" }}>
                                {" "}
                                <h3 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "24px", lineHeight: "1.15" }}>
                                  Or fix every gap in two days.
                                </h3>
                                {" "}
                                <span style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                                  <span style={{ fontFamily: "'Newsreader',serif", fontSize: "28px", lineHeight: "1", letterSpacing: "-0.02em" }}>
                                    <span className="sc-interp">{v.price}</span>
                                  </span>
                                  <span style={{ fontSize: "14px", color: "var(--muted)" }}>
                                    founding price
                                  </span>
                                </span>
                                {" "}
                              </div>
                              {" "}
                              <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.5", color: "var(--blackberry-soft)" }}>
                                The DegreeYourWay course, in London. Each gap above maps to a part of it:
                              </p>
                              {" "}
                              <ul style={{ margin: "0", padding: "0", listStyle: "none", borderTop: "1px solid var(--rule)" }}>
                                {" "}
                                {(v.cvParts || []).map((cp: any, cp_i: number) => (
                                  <Fragment key={cp_i}>
                                    <li style={{ padding: "10px 0", borderBottom: "1px solid var(--rule)", display: "grid", gridTemplateColumns: "20px minmax(0,1fr)", gap: "8px" }}>
                                      <svg width="14" height="14" viewBox="0 0 256 256" aria-hidden="true" style={{ marginTop: "4px" }} fill="none" stroke="var(--oxblood)" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="40 144 96 200 224 72"></polyline>
                                      </svg>
                                      <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                                        <span style={{ fontSize: "16px", fontWeight: "600" }}>
                                          <span className="sc-interp">{cp.part}</span>
                                        </span>
                                        <span style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--blackberry-soft)" }}>
                                          <span className="sc-interp">{cp.what}</span>
                                        </span>
                                      </span>
                                    </li>
                                  </Fragment>
                                ))}
                                {" "}
                              </ul>
                              {" "}
                              <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
                                {" "}
                                {(v.guarantee || []).map((gu: any, gu_i: number) => (
                                  <Fragment key={gu_i}>
                                    <li style={{ display: "grid", gridTemplateColumns: "20px minmax(0,1fr)", gap: "8px", fontSize: "14px", lineHeight: "1.5", color: "var(--blackberry-soft)" }}>
                                      <svg width="14" height="14" viewBox="0 0 256 256" aria-hidden="true" style={{ marginTop: "3px" }} fill="none" stroke="currentColor" strokeWidth="18" strokeLinejoin="round">
                                        <path d="M128 24 40 56v64c0 56 38 96 88 112 50-16 88-56 88-112V56Z"></path>
                                      </svg>
                                      <span>
                                        <span className="sc-interp">{gu.t}</span>
                                      </span>
                                    </li>
                                  </Fragment>
                                ))}
                                {" "}
                              </ul>
                              {" "}
                              <a href={v.bookHref} target="_blank" rel="noopener" onClick={v.bookTap} style={{ boxSizing: "border-box", height: "52px", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--blackberry)", borderRadius: "14px", color: "var(--blackberry)", textDecoration: "none", font: "600 15px 'Source Sans 3',sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", transition: "background-color 150ms ease-out,color 150ms ease-out" }} className="dc-pathfinderreportview-h10">
                                {"Reserve a place · "}<span className="sc-interp">{v.deposit}</span>{" deposit"}
                              </a>
                              {" "}
                              <span style={{ fontSize: "14px", color: "var(--muted)" }}>
                                <span className="sc-interp">{v.seats}</span>{" seats per cohort."}
                              </span>
                              {" "}
                            </div>
                            {" "}
                            <button type="button" onClick={v.cvReset} style={{ all: "unset", cursor: "pointer", alignSelf: "flex-start", minHeight: "44px", fontSize: "15px", color: "var(--muted)", textDecoration: "underline", textUnderlineOffset: "4px" }} className="dc-pathfinderreportview-h11">
                              Check a different version
                            </button>
                            {" "}
                          </div>
                          {" "}
                        </>
                      ) : null}
                      {" "}
                    </section>
                    {" "}
                  </>
                ) : null}
                {" "}
                <section id="pf-matches" ref={v.secMatches} style={{ paddingTop: "32px", display: "flex", flexDirection: "column", gap: "16px", scrollMarginTop: "56px" }}>
                  {" "}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <h2 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "30px", lineHeight: "1.1" }}>
                      Your matches, ranked
                    </h2>
                    <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.5", color: "var(--muted)" }}>
                      Ranked by fit with what you enjoy, your grades and your subjects.
                    </p>
                  </div>
                  {" "}
                  <ol style={{ listStyle: "none", margin: "0", padding: "0", borderTop: "2px solid var(--blackberry)" }}>
                    {" "}
                    {(v.matches || []).map((s: any, s_i: number) => (
                      <Fragment key={s_i}>
                        {" "}
                        <li style={{ padding: "18px 0", borderBottom: "1px solid var(--rule)", display: "grid", gridTemplateColumns: "32px minmax(0,1fr)", gap: "4px 8px" }}>
                          {" "}
                          <span style={{ fontSize: "13px", fontWeight: "600", letterSpacing: "0.08em", color: "var(--muted)", fontVariantNumeric: "tabular-nums", lineHeight: "24px" }}>
                            <span className="sc-interp">{s.n}</span>
                          </span>
                          {" "}
                          <div style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "0" }}>
                            {" "}
                            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "6px 12px" }}>
                              {" "}
                              <span style={{ fontSize: "18px", lineHeight: "1.3" }}>
                                <span style={{ fontWeight: "600" }}>
                                  <span className="sc-interp">{s.emp}</span>
                                </span>
                              </span>
                              {" "}
                              <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 8px", borderRadius: "14px", border: `1px ${s.tagLine} ${s.tagBd}`, background: s.tagBg, color: s.tagFg, whiteSpace: "nowrap" }} className="gi-up">
                                <span className="sc-interp">{s.fit}</span>
                              </span>
                              {" "}
                            </div>
                            {" "}
                            <span style={{ fontSize: "15px", lineHeight: "1.4", color: "var(--blackberry-soft)" }}>
                              <span className="sc-interp">{s.scheme}</span>
                            </span>
                            {" "}
                            {s.hasData ? (
                              <>
                                <dl style={{ margin: "0", display: "grid", gridTemplateColumns: "auto minmax(0,1fr)", gap: "2px 12px", fontSize: "14px", lineHeight: "1.45" }}>
                                  <dt style={{ color: "var(--muted)" }}>
                                    Entry bar
                                  </dt>
                                  <dd style={{ margin: "0" }}>
                                    <span className="sc-interp">{s.bar}</span>
                                  </dd>
                                  <dt style={{ color: "var(--muted)" }}>
                                    Window
                                  </dt>
                                  <dd style={{ margin: "0" }}>
                                    <span className="sc-interp">{s.win}</span>
                                  </dd>
                                </dl>
                              </>
                            ) : null}
                            {" "}
                            <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "4px" }}>
                              {" "}
                              {(s.reasons || []).map((r: any, r_i: number) => (
                                <Fragment key={r_i}>
                                  <li style={{ display: "grid", gridTemplateColumns: "12px minmax(0,1fr)", gap: "6px", fontSize: "15px", lineHeight: "1.45" }}>
                                    <span aria-hidden="true" style={{ color: "var(--muted)" }}>
                                      –
                                    </span>
                                    <span>
                                      <span className="sc-interp">{r.t}</span>
                                    </span>
                                  </li>
                                </Fragment>
                              ))}
                              {" "}
                            </ul>
                            {" "}
                            {s.unverified ? (
                              <>
                                <p style={{ margin: "0", fontSize: "13px", lineHeight: "1.45", color: "var(--muted)" }}>
                                  Suggested for you, not in our checked list. Check the employer's page for entry bar and dates.
                                </p>
                              </>
                            ) : null}
                            {" "}
                          </div>
                          {" "}
                        </li>
                        {" "}
                      </Fragment>
                    ))}
                    {" "}
                  </ol>
                  {" "}
                  {v.mMoreHas ? (
                    <>
                      <button type="button" onClick={v.mMoreTog} aria-expanded={v.mMoreExp} style={{ all: "unset", cursor: "pointer", alignSelf: "flex-start", minHeight: "44px", display: "inline-flex", alignItems: "center", gap: "6px", font: "600 15px 'Source Sans 3',sans-serif", color: "var(--blackberry)", textDecoration: "underline", textUnderlineOffset: "4px", transition: "color 150ms ease-out" }} className="dc-pathfinderreportview-h12">
                        <span className="sc-interp">{v.mMoreLabel}</span>
                      </button>
                    </>
                  ) : null}
                  {" "}
                  <p style={{ margin: "0", fontSize: "13px", lineHeight: "1.5", color: "var(--muted)" }}>
                    {"Entry bars and dates checked "}<span className="sc-interp">{v.checked}</span>. Always check the employer's page.
                  </p>
                  {" "}
                </section>
                {" "}
                <section id="pf-plan" ref={v.secPlan} style={{ display: "flex", flexDirection: "column", gap: "16px", scrollMarginTop: "56px" }}>
                  {" "}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <h2 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "30px", lineHeight: "1.1" }}>
                      Your 12 months
                    </h2>
                    <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.5", color: "var(--muted)" }}>
                      <span className="sc-interp">{v.planSub}</span>
                    </p>
                  </div>
                  {" "}
                  <ol style={{ listStyle: "none", margin: "0", padding: "0", borderTop: "2px solid var(--blackberry)" }}>
                    {" "}
                    {(v.plan || []).map((m: any, m_i: number) => (
                      <Fragment key={m_i}>
                        {" "}
                        <li style={{ padding: "14px 0", borderBottom: "1px solid var(--rule)", display: "grid", gridTemplateColumns: "96px minmax(0,1fr)", gap: "12px" }}>
                          {" "}
                          <span style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                            <span style={{ fontSize: "14px", fontWeight: "600", lineHeight: "1.4" }}>
                              <span className="sc-interp">{m.label}</span>
                            </span>
                            {m.now ? (
                              <>
                                <span style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--oxblood)" }} className="gi-up">
                                  This month
                                </span>
                              </>
                            ) : null}
                          </span>
                          {" "}
                          <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
                            {(m.items || []).map((it: any, it_i: number) => (
                              <Fragment key={it_i}>
                                <li style={{ fontSize: "15px", lineHeight: "1.45", fontWeight: it.w }}>
                                  <span className="sc-interp">{it.t}</span>
                                </li>
                              </Fragment>
                            ))}
                          </ul>
                          {" "}
                        </li>
                        {" "}
                      </Fragment>
                    ))}
                    {" "}
                  </ol>
                  {" "}
                  {v.pMoreHas ? (
                    <>
                      <button type="button" onClick={v.pMoreTog} aria-expanded={v.pMoreExp} style={{ all: "unset", cursor: "pointer", alignSelf: "flex-start", minHeight: "44px", display: "inline-flex", alignItems: "center", gap: "6px", font: "600 15px 'Source Sans 3',sans-serif", color: "var(--blackberry)", textDecoration: "underline", textUnderlineOffset: "4px", transition: "color 150ms ease-out" }} className="dc-pathfinderreportview-h13">
                        <span className="sc-interp">{v.pMoreLabel}</span>
                      </button>
                    </>
                  ) : null}
                  {" "}
                </section>
                {" "}
                <section id="pf-prep" ref={v.secPrep} style={{ display: "flex", flexDirection: "column", gap: "16px", scrollMarginTop: "56px" }}>
                  {" "}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <h2 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "30px", lineHeight: "1.1" }}>
                      Stage by stage
                    </h2>
                    <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.5", color: "var(--muted)" }}>
                      Most schemes use these four stages, in this order.
                    </p>
                  </div>
                  {" "}
                  <ol style={{ listStyle: "none", margin: "0", padding: "0", borderTop: "2px solid var(--blackberry)" }}>
                    {" "}
                    {(v.prep || []).map((st: any, st_i: number) => (
                      <Fragment key={st_i}>
                        {" "}
                        <li style={{ padding: "16px 0", borderBottom: "1px solid var(--rule)", display: "flex", flexDirection: "column", gap: "10px" }}>
                          {" "}
                          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "6px 12px" }}>
                            <span style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                              <span style={{ fontSize: "13px", fontWeight: "600", letterSpacing: "0.08em", color: "var(--muted)", fontVariantNumeric: "tabular-nums" }}>
                                <span className="sc-interp">{st.n}</span>
                              </span>
                              <span style={{ fontSize: "18px", fontWeight: "600" }}>
                                <span className="sc-interp">{st.stage}</span>
                              </span>
                            </span>
                            <span style={{ fontSize: "13px", color: st.statusFg, fontWeight: "600" }}>
                              <span className="sc-interp">{st.status}</span>
                            </span>
                          </div>
                          {" "}
                          <ul style={{ margin: "0", padding: "0 0 0 30px", listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
                            {(st.tips || []).map((tp: any, tp_i: number) => (
                              <Fragment key={tp_i}>
                                <li style={{ display: "grid", gridTemplateColumns: "12px minmax(0,1fr)", gap: "6px", fontSize: "15px", lineHeight: "1.5" }}>
                                  <span aria-hidden="true" style={{ color: "var(--muted)" }}>
                                    –
                                  </span>
                                  <span>
                                    <span className="sc-interp">{tp.t}</span>
                                  </span>
                                </li>
                              </Fragment>
                            ))}
                          </ul>
                          {" "}
                        </li>
                        {" "}
                      </Fragment>
                    ))}
                    {" "}
                  </ol>
                  {" "}
                  {v.sMoreHas ? (
                    <>
                      <button type="button" onClick={v.sMoreTog} aria-expanded={v.sMoreExp} style={{ all: "unset", cursor: "pointer", alignSelf: "flex-start", minHeight: "44px", display: "inline-flex", alignItems: "center", gap: "6px", font: "600 15px 'Source Sans 3',sans-serif", color: "var(--blackberry)", textDecoration: "underline", textUnderlineOffset: "4px", transition: "color 150ms ease-out" }} className="dc-pathfinderreportview-h14">
                        <span className="sc-interp">{v.sMoreLabel}</span>
                      </button>
                    </>
                  ) : null}
                  {" "}
                </section>
                {" "}
                {v.hasWorry ? (
                  <>
                    {" "}
                    <section id="pf-worry" ref={v.secWorry} style={{ display: "flex", flexDirection: "column", gap: "14px", scrollMarginTop: "56px" }}>
                      {" "}
                      <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                        You said you're worried about
                      </p>
                      {" "}
                      <h2 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontStyle: "italic", fontWeight: "400", fontSize: "30px", lineHeight: "1.15" }}>
                        <span className="sc-interp">{v.worryQ}</span>
                      </h2>
                      {" "}
                      <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.6", color: "var(--blackberry-soft)", textWrap: "pretty" }}>
                        <span className="sc-interp">{v.worryBody}</span>
                      </p>
                      {" "}
                    </section>
                    {" "}
                  </>
                ) : null}
                {" "}
                <section id="pf-backups" ref={v.secBack} style={{ display: "flex", flexDirection: "column", gap: "16px", scrollMarginTop: "56px" }}>
                  {" "}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <h2 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "30px", lineHeight: "1.1" }}>
                      If it doesn't go to plan
                    </h2>
                    <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.5", color: "var(--muted)" }}>
                      Routes worth having ready, in the order we'd try them.
                    </p>
                  </div>
                  {" "}
                  <ol style={{ listStyle: "none", margin: "0", padding: "0", borderTop: "2px solid var(--blackberry)" }}>
                    {" "}
                    {(v.backups || []).map((b: any, b_i: number) => (
                      <Fragment key={b_i}>
                        <li style={{ padding: "14px 0", borderBottom: "1px solid var(--rule)", display: "flex", flexDirection: "column", gap: "4px" }}>
                          <span style={{ fontSize: "17px", fontWeight: "600" }}>
                            <span className="sc-interp">{b.title}</span>
                          </span>
                          <span style={{ fontSize: "15px", lineHeight: "1.5", color: "var(--blackberry-soft)" }}>
                            <span className="sc-interp">{b.body}</span>
                          </span>
                        </li>
                      </Fragment>
                    ))}
                    {" "}
                  </ol>
                  {" "}
                </section>
                {" "}
                {v.unlocked ? (
                  <>
                    {" "}
                    <section style={{ border: "2px solid var(--blackberry)", padding: "22px 20px", display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start" }}>
                      {" "}
                      <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--oxblood)" }} className="gi-up">
                        Your next step
                      </p>
                      {" "}
                      <h2 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "26px", lineHeight: "1.15", textWrap: "balance" }}>
                        <span className="sc-interp">{v.cvBottomTitle}</span>
                      </h2>
                      {" "}
                      <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.55", color: "var(--blackberry-soft)" }}>
                        <span className="sc-interp">{v.cvBottomBody}</span>
                      </p>
                      {" "}
                      <button type="button" onClick={v.toCv} style={{ all: "unset", boxSizing: "border-box", cursor: "pointer", height: "52px", padding: "0 24px", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px", background: "var(--oxblood)", color: "var(--warm-white)", borderRadius: "999px", font: "600 15px 'Source Sans 3',sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", transition: "background-color 150ms ease-out,transform 120ms ease-out,opacity 150ms ease-out" }} className="dc-pathfinderreportview-h15 dc-pathfinderreportview-a16">
                        <span className="sc-interp">{v.cvBottomBtn}</span>
                        <span aria-hidden="true">
                          ↑
                        </span>
                      </button>
                      {" "}
                    </section>
                    {" "}
                  </>
                ) : null}
                {" "}
              </div>
              {" "}
            </div>
            {" "}
            {v.sent ? (
              <>
                {" "}
                <section id="pf-save" ref={v.secSave} style={{ background: "var(--bone)", padding: "28px 20px", display: "flex", flexDirection: "column", gap: "18px", scrollMarginTop: "56px" }} className="gi-bgbone">
                  {" "}
                  {v.sent ? (
                    <>
                      {" "}
                      <div role="status" style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "flex-start" }}>
                        {" "}
                        <h2 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "28px", lineHeight: "1.15" }}>
                          {"Saved, "}<span className="sc-interp">{v.fName}</span>.
                        </h2>
                        {" "}
                        <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.55", color: "var(--blackberry-soft)" }}>
                          {"A copy is on its way to "}<span className="sc-interp">{v.fEmail}</span>. You can also download it now.
                        </p>
                        {" "}
                        <button type="button" onClick={v.download} style={{ all: "unset", boxSizing: "border-box", cursor: "pointer", height: "48px", padding: "0 20px", display: "inline-flex", alignItems: "center", gap: "10px", border: "1px solid var(--blackberry)", borderRadius: "999px", font: "600 14px 'Source Sans 3',sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--blackberry)", transition: "background-color 150ms ease-out,color 150ms ease-out,transform 120ms ease-out" }} className="dc-pathfinderreportview-h17 dc-pathfinderreportview-a18">
                          <svg width="16" height="16" viewBox="0 0 256 256" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="128" y1="40" x2="128" y2="152"></line>
                            <polyline points="80 104 128 152 176 104"></polyline>
                            <line x1="48" y1="208" x2="208" y2="208"></line>
                          </svg>
                          Download PDF
                        </button>
                        {" "}
                      </div>
                      {" "}
                    </>
                  ) : null}
                  {" "}
                </section>
                {" "}
              </>
            ) : null}
            {" "}
            <section style={{ background: "var(--blackberry)", padding: "28px 20px", display: "flex", flexDirection: "column", gap: "14px", alignItems: "flex-start" }} className="gi-bgbb">
              {" "}
              <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--on-dark-label)" }} className="gi-up">
                Free discovery call · 30 minutes
              </p>
              {" "}
              <h2 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "28px", lineHeight: "1.15", color: "var(--bone)" }}>
                Go through this report with Shreyash.
              </h2>
              {" "}
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "var(--on-dark-body)" }}>
                Shreyash had offers from Deloitte, Goldman Sachs, PwC and Accenture. Bring your report and leave knowing which application to start first.
              </p>
              {" "}
              <a href={v.callHref} target="_blank" rel="noopener" onClick={v.callTap} style={{ boxSizing: "border-box", height: "52px", padding: "0 24px", display: "inline-flex", alignItems: "center", background: "var(--oxblood)", color: "var(--warm-white)", borderRadius: "14px", textDecoration: "none", font: "600 15px 'Source Sans 3',sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", transition: "background-color 150ms ease-out" }} className="dc-pathfinderreportview-h19">
                Book my discovery call
              </a>
              {" "}
              <span style={{ fontSize: "14px", color: "var(--on-dark-muted)" }}>
                Opens WhatsApp with your result filled in.
              </span>
              {" "}
            </section>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {" "}
              <p style={{ margin: "0", fontFamily: "'Newsreader',serif", fontStyle: "italic", fontSize: "22px", lineHeight: "1.35" }}>
                The DegreeYourWay course prepares you for each of the four stages above, with mocks before the real thing.
              </p>
              {" "}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 24px" }}>
                {" "}
                <a href="#course" onClick={v.goCourse} style={{ minHeight: "44px", display: "inline-flex", alignItems: "center", fontSize: "16px", fontWeight: "600", textUnderlineOffset: "4px" }}>
                  See the course
                </a>
                {" "}
                <button type="button" onClick={v.restart} style={{ all: "unset", cursor: "pointer", minHeight: "44px", display: "inline-flex", alignItems: "center", fontSize: "16px", color: "var(--muted)", textDecoration: "underline", textUnderlineOffset: "4px" }} className="dc-pathfinderreportview-h20">
                  Start again
                </button>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          {v.showBar ? (
            <>
              {" "}
              <div style={{ position: "sticky", bottom: "0", zIndex: "4", background: "var(--warm-white)", borderTop: "1px solid var(--rule)", padding: "10px 20px 14px" }}>
                {" "}
                <div style={{ maxWidth: "680px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                  {" "}
                  <span style={{ fontSize: "14px", lineHeight: "1.35", color: "var(--blackberry-soft)" }}>
                    <span className="sc-interp">{v.barText}</span>
                  </span>
                  {" "}
                  <button type="button" onClick={v.toSave} style={{ all: "unset", boxSizing: "border-box", flex: "none", whiteSpace: "nowrap", cursor: "pointer", height: "44px", padding: "0 18px", display: "inline-flex", alignItems: "center", background: "var(--oxblood)", color: "var(--warm-white)", borderRadius: "999px", font: "600 14px 'Source Sans 3',sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", transition: "background-color 150ms ease-out,transform 120ms ease-out" }} className="dc-pathfinderreportview-h21 dc-pathfinderreportview-a22">
                    <span className="sc-interp">{v.barBtn}</span>
                  </button>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </>
          ) : null}
          {" "}
        </>
      ) : null}
      {" "}
    </div>
    </>
  );
}
