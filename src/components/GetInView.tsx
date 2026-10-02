/* eslint-disable */
// Generated from the design prototype by scripts/dc-to-jsx.mjs, then maintained by hand.
import { Fragment } from 'react';

export default function GetInView({ v }: { v: any }) {
  return (
    <>
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--warm-white)" }}>
      {" "}
      <header style={{ position: "sticky", top: "0", zIndex: "10", background: "var(--bone)", borderBottom: "1px solid var(--rule)", boxShadow: v.headShadow }} className="gi-bgbone">
        {" "}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "14px clamp(20px,5vw,64px)", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px 32px" }}>
          {" "}
          <a href="/" onClick={v.goHome} className="gi-ghost" aria-label="DegreeYourWay, home" style={{ all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: "16px" }}>
            {" "}
            <span style={{ fontFamily: "'Newsreader',serif", fontSize: "30px", fontWeight: "500", letterSpacing: "-0.03em", lineHeight: "1", whiteSpace: "nowrap" }}>
              DegreeYourWay
              <span style={{ color: "var(--blackberry)" }}>
                .
              </span>
            </span>
            {" "}
            <span className="gi-tag" style={{ width: "1px", alignSelf: "stretch", background: "var(--rule)" }}></span>
            {" "}
            <span className="gi-tag gi-up" style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", lineHeight: "1.45", maxWidth: "190px" }}>
              Entrance preparation for degree apprenticeships
            </span>
            {" "}
          </a>
          {" "}
          <nav className="gi-navrow" style={{ display: "flex", flexWrap: "nowrap", gap: "28px", marginLeft: "auto", overflowX: "auto" }} aria-label="Pages">
            {" "}
            {(v.navItems || []).map((n: any, n_i: number) => (
              <Fragment key={n_i}>
                {" "}
                <a href={n.href} onClick={n.go} className="gi-nav" aria-current={n.current} style={{ all: "unset", cursor: "pointer", whiteSpace: "nowrap", fontSize: "15px", fontWeight: "500", padding: "16px 0 12px", color: n.color, borderBottom: `2px solid ${n.border}` }}>
                  <span className="gi-long">
                    <span className="sc-interp">{n.label}</span>
                  </span>
                  <span className="gi-short">
                    <span className="sc-interp">{n.short}</span>
                  </span>
                </a>
                {" "}
              </Fragment>
            ))}
            {" "}
          </nav>
          {" "}
          {v.showHeadCta ? (
            <>
              <button onClick={v.cta.header} data-cta="call_booked" className="gi-btn gi-hcta gi-bgbb" style={{ textTransform: "uppercase", letterSpacing: "0.08em", marginLeft: "auto", whiteSpace: "nowrap", cursor: "pointer", border: "0", background: "var(--blackberry)", color: "var(--warm-white)", font: "600 16px 'Source Sans 3',sans-serif", padding: "16px 24px", minHeight: "48px", borderRadius: "2px" }}>
                <span className="sc-interp">{v.ctaLabel}</span>
              </button>
            </>
          ) : null}
          {v.isSchools ? (
            <>
              <button onClick={v.goSchoolForm} data-cta="header_schools" className="gi-btn gi-hcta gi-bgbb" style={{ textTransform: "uppercase", letterSpacing: "0.08em", marginLeft: "auto", whiteSpace: "nowrap", cursor: "pointer", border: "0", background: "var(--blackberry)", color: "var(--warm-white)", font: "600 16px 'Source Sans 3',sans-serif", padding: "16px 24px", minHeight: "48px", borderRadius: "2px" }}>
                Book a talk
              </button>
            </>
          ) : null}
          {" "}
        </div>
        {" "}
      </header>
      {" "}
      <main style={{ flex: "1" }}>
        {" "}
        {v.isHome ? (
          <>
            {" "}
            <section aria-label="Founding cohort" style={{ background: "var(--blackberry)", color: "var(--warm-white)" }} className="gi-bgbb">
              {" "}
              <div className="gi-pbanner" style={{ maxWidth: "1280px", margin: "0 auto", padding: "10px clamp(20px,5vw,64px)" }}>
                {" "}
                <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "4px 16px", minWidth: "0" }}>
                  {" "}
                  <span className="gi-pbk gi-up" style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--on-dark-label)" }}>
                    Founding cohort
                  </span>
                  {" "}
                  <span style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                    <span style={{ fontFamily: "'Newsreader',serif", fontSize: "26px", lineHeight: "1", letterSpacing: "-0.02em" }}>
                      £595
                    </span>
                    <span className="gi-strike" style={{ fontFamily: "'Newsreader',serif", fontSize: "16px", color: "var(--on-dark-muted)" }}>
                      £695
                    </span>
                  </span>
                  {" "}
                  <span className="gi-pbsub" style={{ fontSize: "14px", color: "var(--on-dark-muted)" }}>
                    <span style={{ color: "var(--on-dark-label)", fontWeight: "600" }}>
                      {"Save £100 · "}<span className="sc-interp">{v.seatsOnly}</span>
                    </span>
                    <span className="gi-pbdep">
                      {" · £100 refundable deposit"}
                    </span>
                  </span>
                  {" "}
                </div>
                {" "}
                <button onClick={v.cta.panel} data-cta="call_booked" className="gi-btn" style={{ textTransform: "uppercase", letterSpacing: "0.08em", cursor: "pointer", whiteSpace: "nowrap", border: "0", font: "600 15px 'Source Sans 3',sans-serif", height: "44px", padding: "0 22px", borderRadius: "2px" }}>
                  <span className="sc-interp">{v.ctaLabel}</span>
                </button>
                {" "}
              </div>
              {" "}
            </section>
            {" "}
            <section data-screen-label="01 Home" id="why" style={{ background: "var(--bone)" }} className="gi-bgbone">
              {" "}
              <div className="gi-hero gi-hero2" style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(36px,5vw,80px) clamp(20px,5vw,64px) clamp(32px,4vw,64px)" }}>
                {" "}
                <div style={{ minWidth: "0", display: "flex", flexDirection: "column" }}>
                  {" "}
                  <h1 aria-label="11 apply. 1 gets in." style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(52px,7.4vw,112px)", lineHeight: "0.9", letterSpacing: "-0.03em", display: "grid", gridTemplateColumns: "auto 1fr", columnGap: "0.22em", alignItems: "baseline", fontVariantNumeric: "lining-nums" }}>
                    {" "}
                    <span aria-hidden="true" style={{ fontSize: "1.7em", lineHeight: "0.8", fontStyle: "italic", letterSpacing: "-0.06em", justifySelf: "end" }}>
                      11
                    </span>
                    {" "}
                    <span aria-hidden="true">
                      apply.
                    </span>
                    {" "}
                    <span aria-hidden="true" style={{ fontSize: "1.7em", lineHeight: "0.8", fontStyle: "italic", color: "var(--oxblood)", justifySelf: "end" }}>
                      1
                    </span>
                    {" "}
                    <span aria-hidden="true" style={{ color: "var(--oxblood)" }}>
                      gets in.
                    </span>
                    {" "}
                  </h1>
                  {" "}
                  <a href="https://www.bbc.co.uk/news/education" target="_blank" rel="noopener" className="gi-src" style={{ fontSize: "11px", lineHeight: "1.45", color: "var(--muted)", textDecoration: "none", textUnderlineOffset: "3px", maxWidth: "44ch" }}>
                    BBC FOI, Aug 2026
                  </a>
                  {" "}
                  <p style={{ margin: "24px 0 0", fontFamily: "'Newsreader',serif", fontSize: "clamp(24px,2.6vw,34px)", lineHeight: "1.15", letterSpacing: "-0.01em", color: "var(--blackberry)", maxWidth: "22ch" }}>
                    {"A real degree, paid for by the employer. "}
                    <span style={{ color: "var(--oxblood)", fontStyle: "italic" }}>
                      Getting in is the hard part.
                    </span>
                  </p>
                  {" "}
                  <p style={{ margin: "16px 0 0", fontSize: "17px", lineHeight: "1.55", color: "var(--blackberry-soft)", maxWidth: "40ch" }}>
                    This isn't UCAS. There are five stages, and we prepare your child for each one.
                  </p>
                  {" "}
                  <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "8px" }}>
                    <button type="button" onClick={v.goQuiz} data-cta="pathfinder" className="gi-pfcta">
                      <svg className="gi-pfico" width="18" height="18" viewBox="0 0 256 256" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="128" cy="128" r="96"></circle>
                        <polygon points="168 88 112 112 88 168 144 144 168 88" fill="currentColor" stroke="none"></polygon>
                      </svg>
                      Try the Pathfinder
                      <span className="gi-bprice">
                        <span className="gi-bstrike">
                          £20
                        </span>
                        Free
                      </span>
                    </button>
                    <span style={{ fontSize: "13px", color: "var(--muted)" }}>
                      90 seconds. Your roadmap PDF.
                    </span>
                  </div>
                  {" "}
                </div>
                {" "}
                <div style={{ minWidth: "0", display: "flex", flexDirection: "column" }}>
                  {" "}
                  <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                    Same degree, two routes
                  </span>
                  {" "}
                  <h2 style={{ margin: "10px 0 0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(26px,2.6vw,36px)", lineHeight: "1.12", letterSpacing: "-0.02em", color: "var(--blackberry)", textWrap: "balance" }}>
                    {"University: "}
                    <span style={{ color: "var(--loss)", whiteSpace: "nowrap" }}>
                      −£47,900
                    </span>
                    {". Apprenticeship: "}
                    <span style={{ color: "var(--gain)", whiteSpace: "nowrap" }}>
                      +£96,000
                    </span>
                    .
                  </h2>
                  {" "}
                  <div style={{ marginTop: "20px", background: "var(--warm-white)", borderTop: "2px solid var(--blackberry)", padding: "clamp(24px,3vw,40px)" }}>
                    {" "}
                    <div role="img" aria-label="University: £47,900 owed at the end. Degree apprentice: about £96,000 paid over four years, before tax." style={{ position: "relative" }}>
                      {" "}
                      <div aria-hidden="true" className="gi-axis" style={{ position: "absolute", inset: "0 0 32px 0", pointerEvents: "none" }}>
                        {" "}
                        <span style={{ position: "absolute", top: "0", bottom: "0", left: "0", width: "1px", background: "var(--rule)" }}></span>
                        {" "}
                        <span style={{ position: "absolute", top: "0", bottom: "0", left: "33.333%", width: "2px", marginLeft: "-1px", background: "var(--blackberry)" }} className="gi-bgbb"></span>
                        {" "}
                        <span style={{ position: "absolute", top: "0", bottom: "0", left: "66.667%", width: "1px", background: "var(--rule)" }}></span>
                        {" "}
                        <span style={{ position: "absolute", top: "0", bottom: "0", right: "0", width: "1px", background: "var(--rule)" }}></span>
                        {" "}
                      </div>
                      {" "}
                      <div className="gi-rows" style={{ position: "relative", display: "flex", flexDirection: "column", gap: "32px", padding: "8px 0 24px" }}>
                        {" "}
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                          {" "}
                          <span className="gi-numlab" style={{ width: "33.333%", paddingRight: "16px", boxSizing: "border-box", textAlign: "right", fontSize: "16px", fontWeight: "600", lineHeight: "1.35", color: "var(--blackberry)" }}>
                            University, owed at the end
                          </span>
                          {" "}
                          <div className="gi-debtbar" style={{ marginLeft: "1.4%", width: "31.933%", height: "clamp(52px,5vw,64px)", background: "var(--loss)", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "16px", boxSizing: "border-box" }}>
                            {" "}
                            <span className="gi-debtval" style={{ fontFamily: "'Newsreader',serif", fontSize: "clamp(24px,2.4vw,32px)", lineHeight: "1", color: "var(--warm-white)", whiteSpace: "nowrap", fontVariantNumeric: "lining-nums" }}>
                              −£47,900
                            </span>
                            {" "}
                          </div>
                          {" "}
                        </div>
                        {" "}
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                          {" "}
                          <span className="gi-paylab" style={{ marginLeft: "33.333%", paddingLeft: "16px", fontSize: "16px", fontWeight: "600", lineHeight: "1.35", color: "var(--blackberry)" }}>
                            Degree apprentice, paid over four years, before tax
                          </span>
                          {" "}
                          <div className="gi-paybar" style={{ marginLeft: "33.333%", width: "64%", height: "clamp(52px,5vw,64px)", background: "var(--gain)", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "16px", boxSizing: "border-box" }}>
                            {" "}
                            <span style={{ fontFamily: "'Newsreader',serif", fontSize: "clamp(24px,2.4vw,32px)", lineHeight: "1", color: "var(--warm-white)", whiteSpace: "nowrap", fontVariantNumeric: "lining-nums" }}>
                              +£96,000
                            </span>
                            {" "}
                          </div>
                          {" "}
                        </div>
                        {" "}
                      </div>
                      {" "}
                      <div aria-hidden="true" className="gi-axis" style={{ position: "relative", height: "32px", fontSize: "12px", color: "var(--muted)", fontVariantNumeric: "tabular-nums" }}>
                        {" "}
                        <span style={{ position: "absolute", left: "0", top: "8px" }}>
                          −£50k
                        </span>
                        {" "}
                        <span style={{ position: "absolute", left: "33.333%", top: "8px", transform: "translateX(-50%)", color: "var(--blackberry)", fontWeight: "600" }}>
                          £0
                        </span>
                        {" "}
                        <span style={{ position: "absolute", left: "66.667%", top: "8px", transform: "translateX(-50%)" }}>
                          £50k
                        </span>
                        {" "}
                        <span style={{ position: "absolute", right: "0", top: "8px" }}>
                          £100k
                        </span>
                        {" "}
                      </div>
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                  <p style={{ margin: "12px 0 0", fontSize: "11px", lineHeight: "1.5", color: "var(--muted)", maxWidth: "120ch" }}>
                    Debt: 2023 cohort, Commons Library. Pay: 4 years at the £24,000 median starting salary (ISE 2025), before tax.
                  </p>
                  {" "}
                  <div className="gi-value" style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid var(--rule)" }}>
                    {" "}
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                        DegreeYourWay costs
                      </span>
                      <span style={{ fontFamily: "'Newsreader',serif", fontSize: "clamp(32px,3.4vw,44px)", lineHeight: "1", letterSpacing: "-0.03em", color: "var(--blackberry)" }}>
                        £595
                      </span>
                    </div>
                    {" "}
                    <span aria-hidden="true" style={{ fontFamily: "'Newsreader',serif", fontSize: "26px", color: "var(--muted)" }}>
                      →
                    </span>
                    {" "}
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                        The place is worth
                      </span>
                      <span style={{ fontFamily: "'Newsreader',serif", fontSize: "clamp(32px,3.4vw,44px)", lineHeight: "1", letterSpacing: "-0.03em", color: "var(--gain)" }}>
                        £143,900
                      </span>
                    </div>
                    {" "}
                  </div>
                  {" "}
                  <p style={{ margin: "10px 0 0", fontSize: "14px", lineHeight: "1.5", color: "var(--muted)" }}>
                    Debt avoided plus four years' pay.
                    <a href="https://commonslibrary.parliament.uk/research-briefings/sn01079/" target="_blank" rel="noopener" className="gi-src" style={{ fontSize: "11px", lineHeight: "1.45", color: "var(--muted)", textDecoration: "none", textUnderlineOffset: "3px" }}>
                      Commons Library, Aug 2026
                    </a>
                  </p>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </section>
            {" "}
            <section aria-label="Run by degree apprentices from Deloitte, Goldman Sachs, Bloomberg and PwC" style={{ background: "var(--bone)", borderBottom: "1px solid var(--rule)" }} className="gi-bgbone">
              {" "}
              <div className="gi-cred" style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(20px,3vw,36px) clamp(20px,5vw,64px)" }}>
                {" "}
                <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                  Run by degree apprentices from
                </span>
                {" "}
                <div className="gi-cred-logos">
                  <img src="/assets/logo-deloitte-t.png" alt="Deloitte" className="gi-cred-logo" style={{ display: "block", mixBlendMode: "multiply" }} />
                  <img src="/assets/logo-goldman-t.png" alt="Goldman Sachs" className="gi-cred-logo" style={{ display: "block", mixBlendMode: "multiply" }} />
                  <img src="/assets/logo-bloomberg-t.png" alt="Bloomberg" className="gi-cred-logo" style={{ display: "block", mixBlendMode: "multiply" }} />
                  <img src="/assets/logo-pwc-t.png" alt="PwC" className="gi-cred-logo" style={{ display: "block", mixBlendMode: "multiply" }} />
                </div>
                {" "}
              </div>
              {" "}
            </section>
            {" "}
            <section aria-label="How it works" style={{ background: "var(--warm-white)" }}>
              {" "}
              <div className="gi-planwrap" style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(52px,7vw,96px) clamp(20px,5vw,64px)" }}>
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", minWidth: "0" }}>
                  {" "}
                  <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                    How it works
                  </p>
                  {" "}
                  <h2 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(32px,3.6vw,52px)", lineHeight: "1.04", letterSpacing: "-0.02em", textWrap: "balance", color: "var(--blackberry)", maxWidth: "13ch" }}>
                    Three steps from not sure to ready.
                  </h2>
                  {" "}
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.6", color: "var(--blackberry-soft)", maxWidth: "40ch" }}>
                    The first two steps are free. Only book once you know it fits.
                  </p>
                  {" "}
                  <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "8px" }}>
                    <button type="button" onClick={v.goQuiz} data-cta="plan" className="gi-pfcta">
                      <svg className="gi-pfico" width="18" height="18" viewBox="0 0 256 256" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="128" cy="128" r="96"></circle>
                        <polygon points="168 88 112 112 88 168 144 144 168 88" fill="currentColor" stroke="none"></polygon>
                      </svg>
                      Start step 1
                      <span className="gi-bprice">
                        <span className="gi-bstrike">
                          £20
                        </span>
                        Free
                      </span>
                    </button>
                    <span style={{ fontSize: "13px", color: "var(--muted)" }}>
                      90 seconds. No payment.
                    </span>
                  </div>
                  {" "}
                </div>
                {" "}
                <div style={{ minWidth: "0", display: "flex", flexDirection: "column", gap: "24px" }}>
                  {" "}
                  <ol className="gi-plan" style={{ margin: "0", padding: "0", listStyle: "none" }}>
                    {" "}
                    {(v.planSteps || []).map((p: any, p_i: number) => (
                      <Fragment key={p_i}>
                        {" "}
                        <li className={`gi-planstep ${p.cls}`}>
                          {" "}
                          <span className="gi-plandot" aria-hidden="true">
                            <span className="sc-interp">{p.n}</span>
                          </span>
                          {" "}
                          <details className="gi-faq gi-plandet" open={p.open}>
                            {" "}
                            <summary className="gi-plansum">
                              <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
                                <span className="gi-plant">
                                  <span className="sc-interp">{p.title}</span>
                                </span>
                                <span className="gi-planm">
                                  {p.hasWas ? (
                                    <>
                                      <span className="gi-bstrike" style={{ marginRight: "6px", color: "var(--muted)" }}>
                                        <span className="sc-interp">{p.was}</span>
                                      </span>
                                    </>
                                  ) : null}
                                  <span style={{ color: p.tagC }}>
                                    <span className="sc-interp">{p.tag}</span>
                                  </span>
                                  {" · "}<span className="sc-interp">{p.meta}</span>
                                </span>
                              </span>
                              <span aria-hidden="true" className="gi-plus">
                                +
                              </span>
                            </summary>
                            {" "}
                            <div className="gi-ans" style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "0 40px 20px 0" }}>
                              {" "}
                              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "var(--blackberry-soft)", maxWidth: "56ch" }}>
                                <span className="sc-interp">{p.body}</span>
                              </p>
                              {" "}
                              <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.5", color: "var(--blackberry)" }}>
                                <span style={{ fontWeight: "600" }}>
                                  You leave with:
                                </span>
                                {" "}<span className="sc-interp">{p.get}</span>
                              </p>
                              {" "}
                            </div>
                            {" "}
                          </details>
                          {" "}
                        </li>
                        {" "}
                      </Fragment>
                    ))}
                    {" "}
                  </ol>
                  {" "}
                  <ul className="gi-promises" aria-label="Our promises" style={{ margin: "0", padding: "16px 0 0", listStyle: "none", borderTop: "1px solid var(--rule)" }}>
                    {" "}
                    {(v.planPromises || []).map((x: any, x_i: number) => (
                      <Fragment key={x_i}>
                        <li style={{ display: "flex", gap: "8px", alignItems: "baseline", fontSize: "15px", lineHeight: "1.45", color: "var(--blackberry)" }}>
                          <span aria-hidden="true" style={{ color: "var(--gain)", fontWeight: "600" }}>
                            ✓
                          </span>
                          <span className="sc-interp">{x}</span>
                        </li>
                      </Fragment>
                    ))}
                    {" "}
                  </ul>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </section>
            {" "}
            <section style={{ background: "var(--bone)" }} className="gi-bgbone">
              {" "}
              <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(52px,7vw,96px) clamp(20px,5vw,64px)" }}>
                {" "}
                <div className="gi-jhead">
                  {" "}
                  <div style={{ minWidth: "0" }}>
                    {" "}
                    <p style={{ margin: "0 0 16px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--blackberry)" }} className="gi-up">
                      The five stages
                    </p>
                    {" "}
                    <h2 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(32px,3.6vw,52px)", lineHeight: "1.04", letterSpacing: "-0.02em", textWrap: "balance" }}>
                      {"Most prep covers one stage. "}
                      <span style={{ display: "block", color: "var(--oxblood)", fontStyle: "italic" }}>
                        We cover all five.
                      </span>
                    </h2>
                    {" "}
                  </div>
                  {" "}
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.55", color: "var(--blackberry-soft)", maxWidth: "40ch", textWrap: "pretty" }}>
                    Each one practised the way employers run it.
                  </p>
                  {" "}
                </div>
                {" "}
                <ol className="gi-tl gi-car" data-cur={v.tlCur} ref={v.tlRef} onScroll={v.tlScroll} aria-label="The five stages" style={{ margin: "48px 0 0", padding: "0", listStyle: "none" }}>
                  {" "}
                  {(v.stagesTL || []).map((st: any, st_i: number) => (
                    <Fragment key={st_i}>
                      {" "}
                      <li className={`gi-tls ${st.cls}`}>
                        {" "}
                        <div className="gi-tlrail" aria-hidden="true">
                          <span className="gi-tldot"></span>
                          <span className="gi-tlseg"></span>
                        </div>
                        {" "}
                        <div className="gi-tlbody">
                          {" "}
                          <span className="gi-tltag">
                            <span className="sc-interp">{st.tag}</span>
                          </span>
                          {" "}
                          <span className="gi-tlnum">
                            0<span className="sc-interp">{st.n}</span>
                          </span>
                          {" "}
                          <span className="gi-tlname">
                            <span className="sc-interp">{st.name}</span>
                          </span>
                          {" "}
                          <span className="gi-tltext">
                            <span className="sc-interp">{st.short}</span>
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
                <div className="gi-tlpager" role="group" aria-label="Choose a stage">
                  {" "}
                  {(v.tlDots || []).map((d: any, d_i: number) => (
                    <Fragment key={d_i}>
                      <button type="button" onClick={d.go} className={`gi-tlpip ${d.cls}`} aria-label={d.label} aria-current={d.cur}></button>
                    </Fragment>
                  ))}
                  {" "}
                </div>
                {" "}
                <div style={{ marginTop: "40px", paddingTop: "24px", borderTop: "1px solid var(--rule)" }}>
                  {" "}
                  <button onClick={v.goDays} className="gi-textbtn" style={{ all: "unset", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "12px", minHeight: "44px", fontSize: "15px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--blackberry)" }}>
                    {" "}
                    <span className="gi-textbtn-l">
                      See how we prepare for each stage
                    </span>
                    {" "}
                    <span className="gi-textbtn-c" aria-hidden="true">
                      →
                    </span>
                    {" "}
                  </button>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </section>
            {" "}
            <section style={{ background: "var(--warm-white)" }}>
              {" "}
              <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(52px,7vw,96px) clamp(20px,5vw,64px)" }}>
                {" "}
                <p style={{ margin: "0 0 16px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--blackberry)" }} className="gi-up">
                  What your child leaves with
                </p>
                {" "}
                <h2 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(32px,3.6vw,52px)", lineHeight: "1.04", letterSpacing: "-0.02em", textWrap: "balance", maxWidth: "17ch" }}>
                  By the end, your child leaves with:
                </h2>
                {" "}
                <div className="gi-pack gi-pack3 gi-car" data-cur={v.pkCur} ref={v.pkRef} onScroll={v.pkScroll} style={{ marginTop: "56px" }}>
                  {" "}
                  <div>
                    {" "}
                    <div className="gi-paper" style={{ background: "var(--warm-white)", border: "1px solid var(--rule)", padding: "24px", display: "flex", flexDirection: "column", gap: "12px", minHeight: "250px", boxSizing: "border-box" }}>
                      {" "}
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", alignItems: "center", lineHeight: "1", paddingBottom: "12px", borderBottom: "1px solid var(--blackberry)" }}>
                        <span style={{ flex: "1 1 auto", minWidth: "0", whiteSpace: "nowrap" }}>
                          Route Map
                        </span>
                        <span style={{ color: "var(--blackberry)" }}>
                          Sample
                        </span>
                      </div>
                      {" "}
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", paddingBottom: "8px", borderBottom: "1px solid var(--rule)", fontSize: "14px" }}>
                        <span style={{ flex: "1 1 auto", minWidth: "0" }}>
                          A · Professional services
                        </span>
                        <span style={{ fontWeight: "600", whiteSpace: "nowrap", flex: "0 0 auto" }}>
                          Closes Nov
                        </span>
                      </div>
                      {" "}
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", paddingBottom: "8px", borderBottom: "1px solid var(--rule)", fontSize: "14px" }}>
                        <span style={{ flex: "1 1 auto", minWidth: "0" }}>
                          B · Bank, technology
                        </span>
                        <span style={{ fontWeight: "600", whiteSpace: "nowrap", flex: "0 0 auto" }}>
                          Closes Dec
                        </span>
                      </div>
                      {" "}
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", paddingBottom: "8px", borderBottom: "1px solid var(--rule)", fontSize: "14px" }}>
                        <span style={{ flex: "1 1 auto", minWidth: "0" }}>
                          C · Engineering
                        </span>
                        <span style={{ fontWeight: "600", whiteSpace: "nowrap", flex: "0 0 auto" }}>
                          Rolling
                        </span>
                      </div>
                      {" "}
                      <span style={{ fontSize: "14px", color: "var(--blackberry-soft)" }}>
                        Apply to A first. Its tests open a week after applying.
                      </span>
                      {" "}
                    </div>
                    {" "}
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "20px" }}>
                      <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", color: "var(--blackberry)" }}>
                        01
                      </span>
                      <span style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <span style={{ fontSize: "17px", fontWeight: "600" }}>
                          A target scheme and deadline plan
                        </span>
                        <span style={{ fontSize: "16px", lineHeight: "1.45", color: "var(--blackberry-soft)" }}>
                          Which schemes, in what order, sent within 48 hours.
                        </span>
                      </span>
                    </div>
                    {" "}
                  </div>
                  {" "}
                  <div>
                    {" "}
                    <div className="gi-paper" style={{ background: "var(--warm-white)", border: "1px solid var(--rule)", padding: "24px", display: "flex", flexDirection: "column", gap: "12px", minHeight: "250px", boxSizing: "border-box" }}>
                      {" "}
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", alignItems: "center", lineHeight: "1", paddingBottom: "12px", borderBottom: "1px solid var(--blackberry)" }}>
                        <span style={{ flex: "1 1 auto", minWidth: "0", whiteSpace: "nowrap" }}>
                          Assessment centre
                        </span>
                        <span style={{ color: "var(--blackberry)" }}>
                          Sample
                        </span>
                      </div>
                      {" "}
                      {(v.scorecard || []).map((r: any, r_i: number) => (
                        <Fragment key={r_i}>
                          {" "}
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", paddingBottom: "8px", borderBottom: "1px solid var(--rule)", fontSize: "14px" }}>
                            {" "}
                            <span>
                              <span className="sc-interp">{r.k}</span>
                            </span>
                            {" "}
                            <span style={{ display: "flex", gap: "4px" }}>
                              {(r.pips || []).map((p: any, p_i: number) => (
                                <Fragment key={p_i}>
                                  <span style={{ width: "16px", height: "7px", background: p }}></span>
                                </Fragment>
                              ))}
                            </span>
                            {" "}
                          </div>
                          {" "}
                        </Fragment>
                      ))}
                      {" "}
                      <span style={{ fontSize: "14px", lineHeight: "1.5", color: "var(--blackberry-soft)", fontStyle: "italic" }}>
                        {"\"Strong case study. In the group, bring others in before you summarise.\""}
                      </span>
                      {" "}
                    </div>
                    {" "}
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "20px" }}>
                      <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", color: "var(--blackberry)" }}>
                        02
                      </span>
                      <span style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <span style={{ fontSize: "17px", fontWeight: "600" }}>
                          Mock assessment-centre feedback
                        </span>
                        <span style={{ fontSize: "16px", lineHeight: "1.45", color: "var(--blackberry-soft)" }}>
                          Every exercise scored, in a written report.
                        </span>
                      </span>
                    </div>
                    {" "}
                  </div>
                  {" "}
                  <div>
                    {" "}
                    <div className="gi-paper" style={{ background: "var(--warm-white)", border: "1px solid var(--rule)", padding: "24px", display: "flex", flexDirection: "column", gap: "12px", minHeight: "250px", boxSizing: "border-box" }}>
                      {" "}
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", alignItems: "center", lineHeight: "1", paddingBottom: "12px", borderBottom: "1px solid var(--blackberry)" }}>
                        <span style={{ flex: "1 1 auto", minWidth: "0", whiteSpace: "nowrap" }}>
                          Application
                        </span>
                        <span style={{ color: "var(--blackberry)" }}>
                          Sample
                        </span>
                      </div>
                      {" "}
                      <p style={{ margin: "0", fontFamily: "'Newsreader',serif", fontSize: "17px", lineHeight: "1.55" }}>
                        {"I want to join because "}
                        <span style={{ textDecoration: "line-through", color: "var(--muted)" }}>
                          I am passionate about technology
                        </span>
                        {" "}
                        <span style={{ background: "rgba(130,61,72,0.14)", padding: "1px 4px", WebkitBoxDecorationBreak: "clone", boxDecorationBreak: "clone" }}>
                          I built a budgeting app for my sixth form's charity week.
                        </span>
                      </p>
                      {" "}
                      <span style={{ fontSize: "14px", lineHeight: "1.5", color: "var(--blackberry-soft)", paddingLeft: "12px", borderLeft: "2px solid var(--blackberry)" }}>
                        Every scheme reads "passionate". Replace it with something you did.
                      </span>
                      {" "}
                    </div>
                    {" "}
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "20px" }}>
                      <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", color: "var(--blackberry)" }}>
                        03
                      </span>
                      <span style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <span style={{ fontSize: "17px", fontWeight: "600" }}>
                          A reviewed application
                        </span>
                        <span style={{ fontSize: "16px", lineHeight: "1.45", color: "var(--blackberry-soft)" }}>
                          Their real application, reviewed twice, line by line.
                        </span>
                      </span>
                    </div>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
                <div className="gi-pkpager" role="group" aria-label="Choose a document">
                  {" "}
                  {(v.pkDots || []).map((d: any, d_i: number) => (
                    <Fragment key={d_i}>
                      <button type="button" onClick={d.go} className={`gi-tlpip ${d.cls}`} aria-label={d.label} aria-current={d.cur}></button>
                    </Fragment>
                  ))}
                  {" "}
                </div>
                {" "}
                <div style={{ marginTop: "40px", paddingTop: "20px", borderTop: "1px solid var(--rule)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", gap: "12px 40px" }}>
                  {" "}
                  <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.5", color: "var(--blackberry-soft)", maxWidth: "60ch" }}>
                    Plus a test baseline, a scored video interview and a next-step plan.
                  </p>
                  {" "}
                  <button onClick={v.goDays} className="gi-ghost" style={{ all: "unset", cursor: "pointer", fontSize: "16px", fontWeight: "600", color: "var(--blackberry)", textDecoration: "underline", textUnderlineOffset: "4px", whiteSpace: "nowrap" }}>
                    {"See everything they'll leave with "}
                    <span className="gi-arr" aria-hidden="true">
                      →
                    </span>
                  </button>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </section>
            {" "}
            <section style={{ background: "var(--bone)" }} className="gi-bgbone">
              {" "}
              <div className="gi-profile gi-teach" style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(52px,7vw,96px) clamp(20px,5vw,64px)", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.1fr)", alignItems: "start" }}>
                {" "}
                <div style={{ minWidth: "0", display: "flex", flexDirection: "column", gap: "24px" }}>
                  {" "}
                  <p className="gi-t1 gi-up" style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }}>
                    Who teaches them
                  </p>
                  {" "}
                  <h2 className="gi-t2" style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(32px,3.6vw,52px)", lineHeight: "1.04", letterSpacing: "-0.02em", textWrap: "balance", maxWidth: "16ch" }}>
                    Taught by people who got the offers.
                  </h2>
                  {" "}
                  <p className="gi-t5" style={{ margin: "0", fontSize: "18px", lineHeight: "1.6", color: "var(--blackberry-soft)", maxWidth: "44ch", textWrap: "pretty" }}>
                    Shreyash applied from sixth form at 17 and used this process to get four offers. Every assessor on the course has been through a real scheme and received an offer.
                  </p>
                  {" "}
                  <div className="gi-t3" style={{ display: "flex", flexDirection: "column", gap: "2px", paddingTop: "16px", borderTop: "1px solid var(--rule)" }}>
                    <span style={{ fontSize: "16px", fontWeight: "600", color: "var(--blackberry)" }}>
                      Shreyash Singh
                    </span>
                    <span style={{ fontSize: "14px", color: "var(--muted)" }}>
                      Founder · Deloitte degree apprentice, 2021–25
                    </span>
                  </div>
                  {" "}
                </div>
                {" "}
                <div style={{ minWidth: "0", display: "flex", flexDirection: "column", gap: "32px" }}>
                  {" "}
                  <div className="gi-t4" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {" "}
                    <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                      Degree apprenticeship offers
                    </span>
                    {" "}
                    <ul className="gi-offers" style={{ margin: "0", padding: "0", listStyle: "none", borderTop: "2px solid var(--blackberry)" }}>
                      {" "}
                      {(v.offerFirms || []).map((o: any, o_i: number) => (
                        <Fragment key={o_i}>
                          <li style={{ padding: "18px 0", borderBottom: "1px solid var(--rule)", fontFamily: "'Newsreader',serif", fontSize: "clamp(24px,2.4vw,32px)", lineHeight: "1.1", color: "var(--blackberry)" }}>
                            <span className="sc-interp">{o}</span>
                          </li>
                        </Fragment>
                      ))}
                      {" "}
                    </ul>
                    {" "}
                    <span style={{ fontSize: "14px", lineHeight: "1.5", color: "var(--muted)" }}>
                      Ask to see the offer letters on your discovery call.
                    </span>
                    {" "}
                  </div>
                  {" "}
                  <dl className="gi-t6" style={{ margin: "0", borderTop: "1px solid var(--rule)" }}>
                    {" "}
                    {(v.creds || []).map((c: any, c_i: number) => (
                      <Fragment key={c_i}>
                        {" "}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 24px", padding: "14px 0", borderBottom: "1px solid var(--rule)" }}>
                          {" "}
                          <dt style={{ flex: "0 0 140px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", paddingTop: "4px" }}>
                            <span className="sc-interp">{c.k}</span>
                          </dt>
                          {" "}
                          <dd style={{ margin: "0", flex: "1 1 220px", fontSize: "16px", lineHeight: "1.5", color: "var(--blackberry)" }}>
                            <span className="sc-interp">{c.v}</span>
                          </dd>
                          {" "}
                        </div>
                        {" "}
                      </Fragment>
                    ))}
                    {" "}
                  </dl>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </section>
            {" "}
            <section aria-label="What success looks like" style={{ background: "var(--bone)" }} className="gi-bgbone">
              {" "}
              <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(52px,7vw,96px) clamp(20px,5vw,64px)", display: "flex", flexDirection: "column", gap: "40px" }}>
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                    What success looks like
                  </p>
                  {" "}
                  <h2 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(32px,3.6vw,52px)", lineHeight: "1.04", letterSpacing: "-0.02em", textWrap: "balance", color: "var(--blackberry)", maxWidth: "20ch" }}>
                    On the day of the real assessment centre, they've done it before.
                  </h2>
                </div>
                {" "}
                <div className="gi-ba" role="table" aria-label="Without and with DegreeYourWay">
                  {" "}
                  <div role="row" className="gi-bahead">
                    <span role="columnheader">
                      Without preparation
                    </span>
                    <span role="columnheader" style={{ color: "var(--gain)" }}>
                      After DegreeYourWay
                    </span>
                  </div>
                  {" "}
                  {(v.baRows || []).map((r: any, r_i: number) => (
                    <Fragment key={r_i}>
                      {" "}
                      <div role="row" className="gi-barow">
                        <span role="cell" className="gi-bawo">
                          <span className="sc-interp">{r.a}</span>
                        </span>
                        <span role="cell" className="gi-bawi">
                          <span aria-hidden="true" style={{ color: "var(--gain)", fontWeight: "600" }}>
                            ✓
                          </span>
                          {" "}<span className="sc-interp">{r.b}</span>
                        </span>
                      </div>
                      {" "}
                    </Fragment>
                  ))}
                  {" "}
                </div>
                {" "}
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px 24px" }}>
                  <button type="button" onClick={v.goQuiz} data-cta="pathfinder" className="gi-pfcta">
                    <svg className="gi-pfico" width="18" height="18" viewBox="0 0 256 256" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="128" cy="128" r="96"></circle>
                      <polygon points="168 88 112 112 88 168 144 144 168 88" fill="currentColor" stroke="none"></polygon>
                    </svg>
                    Try the Pathfinder
                    <span className="gi-bprice">
                      <span className="gi-bstrike">
                        £20
                      </span>
                      Free
                    </span>
                  </button>
                  <span style={{ fontSize: "14px", color: "var(--muted)" }}>
                    See where your child stands in 90 seconds.
                  </span>
                </div>
                {" "}
              </div>
              {" "}
            </section>
            {" "}
            <section style={{ background: "var(--warm-white)", color: "var(--blackberry)", borderTop: "2px solid var(--blackberry)" }}>
              {" "}
              <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(64px,9vw,128px) clamp(20px,5vw,64px)" }}>
                {" "}
                <p style={{ margin: "0 0 16px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--blackberry)" }} className="gi-up">
                  Two promises
                </p>
                {" "}
                <div className="gi-split gi-half" style={{ alignItems: "start" }}>
                  {" "}
                  <div style={{ display: "flex", flexDirection: "column", gap: "24px", minWidth: "0" }}>
                    {" "}
                    <h2 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(34px,4vw,58px)", lineHeight: "1", letterSpacing: "-0.02em", textWrap: "balance" }}>
                      No offer within 12 months? Come back free.
                    </h2>
                    {" "}
                    <ol style={{ margin: "0", padding: "0", listStyle: "none", borderTop: "1px solid var(--rule)" }}>
                      {" "}
                      {(v.guarSteps || []).map((g: any, g_i: number) => (
                        <Fragment key={g_i}>
                          {" "}
                          <li style={{ display: "flex", gap: "16px", padding: "12px 0", borderBottom: "1px solid var(--rule)", fontSize: "16px", lineHeight: "1.45", color: "var(--blackberry-soft)", alignItems: "baseline" }}>
                            <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em", color: "var(--blackberry)" }}>
                              0<span className="sc-interp">{g.n}</span>
                            </span>
                            <span style={{ flex: "1 1 auto", minWidth: "0" }}>
                              <span className="sc-interp">{g.text}</span>
                            </span>
                          </li>
                          {" "}
                        </Fragment>
                      ))}
                      {" "}
                    </ol>
                    {" "}
                    <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.5", color: "var(--muted)" }}>
                      Employers make every hiring decision. We guarantee the preparation, not the outcome.
                    </p>
                    {" "}
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px 28px" }}>
                      <button onClick={v.cta.promise} data-cta="call_booked" className="gi-btn gi-promcta gi-bgbb" style={{ textTransform: "uppercase", letterSpacing: "0.08em", cursor: "pointer", whiteSpace: "nowrap", border: "0", background: "var(--blackberry)", color: "var(--warm-white)", font: "600 16px 'Source Sans 3',sans-serif", padding: "20px 32px", borderRadius: "2px" }}>
                        <span className="sc-interp">{v.ctaLabel}</span>
                      </button>
                      <button onClick={v.goTerms} className="gi-ghost" style={{ all: "unset", cursor: "pointer", fontSize: "16px", fontWeight: "600", color: "var(--blackberry)", textDecoration: "underline", textUnderlineOffset: "4px", whiteSpace: "nowrap" }}>
                        {"Read the full guarantee "}
                        <span className="gi-arr" aria-hidden="true">
                          →
                        </span>
                      </button>
                    </div>
                    {" "}
                    <span style={{ fontSize: "14px", color: "var(--muted)" }}>
                      {"£100 deposit, refundable. "}<span className="sc-interp">{v.seatShort}</span>.
                    </span>
                    {" "}
                  </div>
                  {" "}
                  <div style={{ display: "flex", flexDirection: "column", gap: "24px", minWidth: "0", paddingLeft: "clamp(0px,3vw,48px)", borderLeft: "1px solid var(--rule)" }} className="gi-promise2">
                    {" "}
                    <h2 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(34px,4vw,58px)", lineHeight: "1", letterSpacing: "-0.02em", textWrap: "balance" }}>
                      The Deadline Line
                    </h2>
                    {" "}
                    <p style={{ margin: "0", fontFamily: "'Newsreader',serif", fontSize: "clamp(22px,2vw,26px)", lineHeight: "1.3", color: "var(--blackberry)", maxWidth: "30ch" }}>
                      Support until their last application deadline.
                    </p>
                    {" "}
                    <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.6", color: "var(--blackberry-soft)", maxWidth: "46ch" }}>
                      WhatsApp our team 24/7 about applications, tests and interviews. Message 24/7. Replies within 24 hours, every day.
                    </p>
                    {" "}
                    <ul style={{ margin: "0", padding: "0", listStyle: "none", borderTop: "1px solid var(--rule)" }}>
                      {" "}
                      <li style={{ padding: "12px 0", borderBottom: "1px solid var(--rule)", fontSize: "16px", lineHeight: "1.45", color: "var(--blackberry-soft)" }}>
                        {"Application due? "}
                        <span style={{ fontWeight: "600", color: "var(--blackberry)" }}>
                          Ask.
                        </span>
                      </li>
                      {" "}
                      <li style={{ padding: "12px 0", borderBottom: "1px solid var(--rule)", fontSize: "16px", lineHeight: "1.45", color: "var(--blackberry-soft)" }}>
                        {"Interview coming up? "}
                        <span style={{ fontWeight: "600", color: "var(--blackberry)" }}>
                          Ask.
                        </span>
                      </li>
                      {" "}
                      <li style={{ padding: "12px 0", borderBottom: "1px solid var(--rule)", fontSize: "16px", lineHeight: "1.45", color: "var(--blackberry-soft)" }}>
                        {"Assessment centre next week? "}
                        <span style={{ fontWeight: "600", color: "var(--blackberry)" }}>
                          Ask.
                        </span>
                      </li>
                      {" "}
                    </ul>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </section>
            {" "}
            <section aria-label="Questions parents ask" style={{ background: "var(--bone)" }} className="gi-bgbone">
              {" "}
              <div className="gi-faqwrap" style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(48px,6vw,80px) clamp(20px,5vw,64px)" }}>
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", minWidth: "0" }}>
                  <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                    Questions parents ask
                  </p>
                  <h2 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(28px,3vw,40px)", lineHeight: "1.1", letterSpacing: "-0.02em", color: "var(--blackberry)" }}>
                    Before you book.
                  </h2>
                </div>
                {" "}
                <div style={{ minWidth: "0", borderTop: "1px solid var(--blackberry)" }}>
                  {" "}
                  {(v.faqTop || []).map((f: any, f_i: number) => (
                    <Fragment key={f_i}>
                      {" "}
                      <details className="gi-faq" style={{ borderBottom: "1px solid var(--rule)" }}>
                        {" "}
                        <summary className="gi-faqsum">
                          <span className="sc-interp">{f.q}</span>
                          <span aria-hidden="true" className="gi-plus">
                            +
                          </span>
                        </summary>
                        {" "}
                        <p className="gi-ans" style={{ margin: "0", padding: "0 40px 20px 0", fontSize: "16px", lineHeight: "1.6", color: "var(--blackberry-soft)", maxWidth: "62ch" }}>
                          <span className="sc-interp">{f.a}</span>
                        </p>
                        {" "}
                      </details>
                      {" "}
                    </Fragment>
                  ))}
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </section>
            {" "}
            <section style={{ background: "var(--blackberry)", color: "var(--warm-white)" }} className="gi-bgbb">
              {" "}
              <div className="gi-final" style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(72px,9vw,136px) clamp(20px,5vw,64px)" }}>
                {" "}
                <h2 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", lineHeight: "0.97", letterSpacing: "-0.025em", textWrap: "balance", fontSize: "clamp(40px,5vw,72px)" }}>
                  Two days to practise what employers test.
                </h2>
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {" "}
                  <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--on-dark-label)" }} className="gi-up">
                    Founding cohort
                  </span>
                  {" "}
                  <span style={{ fontFamily: "'Newsreader',serif", fontSize: "clamp(64px,6.4vw,96px)", lineHeight: "0.85", letterSpacing: "-0.04em" }}>
                    £595
                  </span>
                  {" "}
                  <span style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                    <span style={{ position: "relative", display: "inline-block", fontFamily: "'Newsreader',serif", fontSize: "24px", lineHeight: "1", color: "var(--on-dark-muted)" }}>
                      <span className="gi-strike">
                        £695
                      </span>
                    </span>
                    <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 10px", borderRadius: "2px", background: "transparent", color: "inherit", boxShadow: "inset 0 0 0 1px currentColor", font: "600 12px 'Source Sans 3',sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap" }} className="gi-up">
                      Save £100
                    </span>
                  </span>
                  {" "}
                  <span style={{ fontSize: "14px", color: "var(--on-dark-muted)" }}>
                    Founding price. Full price £695.
                  </span>
                  {" "}
                </div>
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", minWidth: "0" }}>
                  {" "}
                  <button onClick={v.cta.final} data-cta="call_booked" className="gi-btn gi-bgbb" style={{ textTransform: "uppercase", letterSpacing: "0.08em", cursor: "pointer", whiteSpace: "nowrap", border: "0", background: "var(--blackberry)", color: "var(--warm-white)", font: "600 16px 'Source Sans 3',sans-serif", borderRadius: "2px", width: "100%", padding: "24px 20px" }}>
                    <span className="sc-interp">{v.ctaLabel}</span>
                  </button>
                  {" "}
                  <span style={{ fontSize: "14px", color: "var(--on-dark-muted)", textAlign: "center" }}>
                    {"£100 deposit to reserve · "}<span className="sc-interp">{v.seatShort}</span>
                  </span>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </section>
            {" "}
          </>
        ) : null}
        {" "}
        {v.isDays ? (
          <>
            {" "}
            <section data-screen-label="02 The course" style={{ background: "var(--bone)", borderBottom: "1px solid var(--rule)" }} className="gi-bgbone">
              {" "}
              <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(36px,5vw,88px) clamp(20px,5vw,64px) clamp(40px,5vw,72px)", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px" }}>
                {" "}
                <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                  The course · Two days · London
                </p>
                {" "}
                <h1 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(40px,5.6vw,80px)", lineHeight: "1", letterSpacing: "-0.025em", maxWidth: "16ch", textWrap: "balance", color: "var(--blackberry)" }}>
                  {"All five stages, "}
                  <span style={{ color: "var(--oxblood)", fontStyle: "italic" }}>
                    practised before they're real.
                  </span>
                </h1>
                {" "}
                <ol className="gi-cstages" aria-label="The five stages">
                  {" "}
                  <li className="gi-cstage">
                    <span className="gi-cstagen">
                      01
                    </span>
                    Application
                  </li>
                  <li className="gi-cstage">
                    <span className="gi-cstagen">
                      02
                    </span>
                    Tests
                  </li>
                  <li className="gi-cstage">
                    <span className="gi-cstagen">
                      03
                    </span>
                    Video interview
                  </li>
                  <li className="gi-cstage is-key">
                    <span className="gi-cstagen">
                      04
                    </span>
                    Assessment centre
                  </li>
                  <li className="gi-cstage">
                    <span className="gi-cstagen">
                      05
                    </span>
                    Final interview
                  </li>
                  {" "}
                </ol>
                {" "}
                <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.55", color: "var(--blackberry-soft)", maxWidth: "44ch" }}>
                  {"Practice tests online cover one stage. We cover all five, "}
                  <span style={{ fontWeight: "600", color: "var(--blackberry)" }}>
                    scored by degree apprentices who passed them.
                  </span>
                </p>
                {" "}
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px 24px", marginTop: "4px" }}>
                  {" "}
                  <button onClick={v.cta.coursehero} data-cta="call_booked" className="gi-btn">
                    <span className="sc-interp">{v.ctaLabel}</span>
                  </button>
                  {" "}
                  <button onClick={v.goPrice} className="gi-ghost" style={{ all: "unset", cursor: "pointer", fontSize: "15px", fontWeight: "600", color: "var(--blackberry)", textDecoration: "underline", textUnderlineOffset: "4px", whiteSpace: "nowrap" }}>
                    {"See prices "}
                    <span className="gi-arr" aria-hidden="true">
                      →
                    </span>
                  </button>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </section>
            {" "}
            <section aria-label="Everything included" style={{ background: "var(--warm-white)" }}>
              {" "}
              <div className="gi-planwrap" style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(52px,7vw,96px) clamp(20px,5vw,64px)" }}>
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", minWidth: "0" }}>
                  {" "}
                  <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                    Everything included · £595
                  </p>
                  {" "}
                  <h2 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(32px,3.6vw,52px)", lineHeight: "1.04", letterSpacing: "-0.02em", textWrap: "balance", color: "var(--blackberry)", maxWidth: "12ch" }}>
                    Six parts. One price.
                  </h2>
                  {" "}
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.55", color: "var(--blackberry-soft)", maxWidth: "36ch" }}>
                    Each part removes one reason students fail. Tap any one to see a sample.
                  </p>
                  {" "}
                  <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "8px" }}>
                    <button onClick={v.cta.coursepack} data-cta="call_booked" className="gi-btn">
                      <span className="sc-interp">{v.ctaLabel}</span>
                    </button>
                    <span style={{ fontSize: "14px", color: "var(--muted)" }}>
                      £595 founding price · £100 off the £695 full price
                    </span>
                  </div>
                  {" "}
                </div>
                {" "}
                <div style={{ minWidth: "0", display: "flex", flexDirection: "column" }}>
                  <ol className="gi-stack" style={{ margin: "0", padding: "0", listStyle: "none", borderTop: "2px solid var(--blackberry)", minWidth: "0" }}>
                    {" "}
                    {(v.stackItems || []).map((k: any, k_i: number) => (
                      <Fragment key={k_i}>
                        {" "}
                        <li className={`gi-stackrow ${k.cls}`}>
                          {" "}
                          <span className="gi-stackn">
                            0<span className="sc-interp">{k.n}</span>
                          </span>
                          {" "}
                          <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
                            <span className="gi-stackt">
                              <span className="sc-interp">{k.name}</span>
                            </span>
                            <span className="gi-stackd">
                              <span className="sc-interp">{k.fixes}</span>
                            </span>
                          </div>
                          {" "}
                          <button type="button" onClick={k.open} aria-haspopup="dialog" aria-label={k.label} className="gi-stackview">
                            {"View sample "}
                            <span className="gi-arr" aria-hidden="true">
                              →
                            </span>
                          </button>
                          {" "}
                        </li>
                        {" "}
                      </Fragment>
                    ))}
                    {" "}
                  </ol>
                  {" "}
                  <div className="gi-addon">
                    {" "}
                    <p style={{ margin: "0", flex: "1 1 auto", minWidth: "0", fontSize: "15px", lineHeight: "1.45", color: "var(--blackberry)" }}>
                      <span className="gi-addon-tag">
                        + Included
                      </span>
                      {" "}
                      <span style={{ fontWeight: "600" }}>
                        The DegreeYourWay Guarantee.
                      </span>
                      {" No offer in 12 months? Next course free. "}
                      <button type="button" onClick={v.goTerms} className="gi-addon-link">
                        Terms
                      </button>
                    </p>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </section>
            {" "}
            <section style={{ background: "var(--bone)" }} className="gi-bgbone">
              {" "}
              <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(52px,7vw,96px) clamp(20px,5vw,64px)" }}>
                {" "}
                <p style={{ margin: "0 0 16px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                  The five stages, in depth
                </p>
                {" "}
                <h2 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(32px,3.6vw,52px)", lineHeight: "1.04", letterSpacing: "-0.02em", textWrap: "balance", maxWidth: "20ch" }}>
                  Each stage, in depth.
                </h2>
                {" "}
                <ol style={{ margin: "48px 0 0", padding: "0", listStyle: "none", borderBottom: "1px solid var(--rule)" }}>
                  {" "}
                  {(v.stages5 || []).map((st: any, st_i: number) => (
                    <Fragment key={st_i}>
                      {" "}
                      <li className={`gi-stg ${st.openCls}`} style={{ borderTop: "1px solid var(--rule)" }}>
                        {" "}
                        <div className="gi-stgrow">
                          {" "}
                          <span style={{ fontFamily: "'Newsreader',serif", fontSize: "clamp(28px,3vw,40px)", lineHeight: "1", letterSpacing: "-0.02em", color: st.numColor }}>
                            0<span className="sc-interp">{st.n}</span>
                          </span>
                          {" "}
                          <div style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "0" }}>
                            {" "}
                            <span style={{ fontFamily: "'Newsreader',serif", fontSize: "clamp(24px,2.4vw,32px)", lineHeight: "1.1", color: st.nameColor }}>
                              <span className="sc-interp">{st.name}</span>
                            </span>
                            {" "}
                            <span style={{ fontSize: "16px", lineHeight: "1.5", color: "var(--blackberry)", maxWidth: "60ch" }}>
                              <span className="sc-interp">{st.prep}</span>
                            </span>
                            {" "}
                            <button type="button" onClick={st.toggle} aria-expanded={st.expanded} aria-controls={st.pid} className="gi-stgbtn">
                              <span>
                                What employers test
                              </span>
                              <span aria-hidden="true" className="gi-stgchev">
                                +
                              </span>
                            </button>
                            {" "}
                            <div id={st.pid} className="gi-stgpanel">
                              <div style={{ minHeight: "0", overflow: "hidden" }}>
                                <p style={{ margin: "0", padding: "12px 0 4px", fontSize: "16px", lineHeight: "1.5", color: "var(--blackberry-soft)", maxWidth: "60ch" }}>
                                  <span className="sc-interp">{st.tests}</span>
                                </p>
                              </div>
                            </div>
                            {" "}
                          </div>
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
            </section>
            {" "}
            <section style={{ background: "var(--blackberry)", color: "var(--warm-white)" }} className="gi-bgbb">
              {" "}
              <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(52px,7vw,96px) clamp(20px,5vw,64px)" }}>
                {" "}
                <p style={{ margin: "0 0 16px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--on-dark-label)" }} className="gi-up">
                  Assessment centre, in depth
                </p>
                {" "}
                <h2 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(44px,6vw,88px)", lineHeight: "0.97", letterSpacing: "-0.025em", textWrap: "balance", maxWidth: "15ch" }}>
                  Don't let the real assessment centre be their first.
                </h2>
                {" "}
                <p style={{ margin: "28px 0 0", fontSize: "18px", lineHeight: "1.6", color: "var(--on-dark-body)", maxWidth: "52ch" }}>
                  Most applicants fall here. Four exercises, an assessor watching each one. Your child sits all four, scored the way employers score them.
                </p>
                {" "}
                <div className="gi-ex" style={{ marginTop: "48px", borderTop: "1px solid var(--rule-dark)", maxWidth: "880px" }}>
                  {" "}
                  {(v.acDay || []).map((a: any, a_i: number) => (
                    <Fragment key={a_i}>
                      {" "}
                      <details className="gi-faq gi-acx" style={{ borderBottom: "1px solid var(--rule-dark)" }}>
                        {" "}
                        <summary className="gi-acxsum">
                          <span style={{ display: "flex", alignItems: "baseline", gap: "16px", minWidth: "0" }}>
                            <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", color: "var(--on-dark-label)", fontVariantNumeric: "tabular-nums" }}>
                              0<span className="sc-interp">{a.n}</span>
                            </span>
                            <span style={{ fontFamily: "'Newsreader',serif", fontSize: "clamp(24px,2.4vw,30px)", lineHeight: "1.15" }}>
                              <span className="sc-interp">{a.title}</span>
                            </span>
                          </span>
                          <span aria-hidden="true" className="gi-plus">
                            +
                          </span>
                        </summary>
                        {" "}
                        <div className="gi-ans" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))", gap: "16px 40px", padding: "0 40px 24px 0" }}>
                          {" "}
                          <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.55", color: "var(--on-dark-body)" }}>
                            <span className="sc-interp">{a.body}</span>
                          </p>
                          {" "}
                          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                            <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--on-dark-label)" }} className="gi-up">
                              What gets assessed
                            </span>
                            <span style={{ fontSize: "16px", lineHeight: "1.5", color: "var(--warm-white)" }}>
                              <span className="sc-interp">{a.assessed}</span>
                            </span>
                          </div>
                          {" "}
                        </div>
                        {" "}
                      </details>
                      {" "}
                    </Fragment>
                  ))}
                  {" "}
                </div>
                {" "}
                <div style={{ marginTop: "64px", paddingTop: "32px", borderTop: "1px solid var(--rule-dark)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", gap: "24px 64px" }}>
                  {" "}
                  <h3 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(26px,2.4vw,34px)", lineHeight: "1.1" }}>
                    How feedback is given
                  </h3>
                  {" "}
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.6", color: "var(--on-dark-body)", maxWidth: "52ch" }}>
                    Every exercise is scored against four competencies. Headlines before they leave, the full written report within 48 hours.
                  </p>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </section>
            {" "}
            <section style={{ background: "var(--bone)" }} className="gi-bgbone">
              {" "}
              <div className="gi-split" style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(52px,7vw,96px) clamp(20px,5vw,64px)", alignItems: "start" }}>
                {" "}
                <div style={{ minWidth: "0" }}>
                  {" "}
                  <p style={{ margin: "0 0 16px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                    How feedback works
                  </p>
                  {" "}
                  <h2 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(32px,3.6vw,52px)", lineHeight: "1.04", letterSpacing: "-0.02em", textWrap: "balance", maxWidth: "14ch" }}>
                    Every piece of work comes back scored.
                  </h2>
                  {" "}
                  <ol style={{ margin: "40px 0 0", padding: "0", listStyle: "none", borderTop: "2px solid var(--blackberry)" }}>
                    {" "}
                    {(v.callouts || []).map((c: any, c_i: number) => (
                      <Fragment key={c_i}>
                        {" "}
                        <li style={{ display: "flex", gap: "16px", padding: "16px 0", borderBottom: "1px solid var(--rule)", alignItems: "baseline" }}>
                          <span style={{ flex: "0 0 26px", height: "26px", borderRadius: "50%", background: "var(--blackberry)", color: "var(--warm-white)", fontSize: "14px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center" }} className="gi-bgbb">
                            <span className="sc-interp">{c.n}</span>
                          </span>
                          <span style={{ flex: "1 1 auto", minWidth: "0", fontSize: "17px", lineHeight: "1.5", color: c.vc, fontStyle: c.fs }}>
                            <span className="sc-interp">{c.t}</span>
                          </span>
                        </li>
                        {" "}
                      </Fragment>
                    ))}
                    {" "}
                  </ol>
                  {" "}
                  <dl style={{ margin: "32px 0 0" }}>
                    {" "}
                    {(v.feedbackOther || []).map((r: any, r_i: number) => (
                      <Fragment key={r_i}>
                        {" "}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 20px", padding: "12px 0", borderBottom: "1px solid var(--rule)" }}>
                          <dt style={{ flex: "0 0 140px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", paddingTop: "4px" }}>
                            <span className="sc-interp">{r.k}</span>
                          </dt>
                          <dd style={{ margin: "0", flex: "1 1 220px", fontSize: "15px", lineHeight: "1.5", color: "var(--blackberry-soft)" }}>
                            <span className="sc-interp">{r.v}</span>
                          </dd>
                        </div>
                        {" "}
                      </Fragment>
                    ))}
                    {" "}
                  </dl>
                  {" "}
                </div>
                {" "}
                <div style={{ position: "relative", background: "var(--warm-white)", border: "1px solid var(--rule)", padding: "clamp(24px,3vw,40px)", display: "flex", flexDirection: "column", gap: "20px", minWidth: "0" }}>
                  {" "}
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", paddingBottom: "12px", borderBottom: "1px solid var(--blackberry)" }}>
                    <span style={{ flex: "1 1 auto", minWidth: "0", whiteSpace: "nowrap" }}>
                      Assessment-centre report
                    </span>
                    <span style={{ color: "var(--blackberry)", flex: "0 0 auto" }}>
                      Sample
                    </span>
                  </div>
                  {" "}
                  <div style={{ position: "relative" }}>
                    {" "}
                    <span aria-hidden="true" style={{ position: "absolute", left: "-40px", top: "0", width: "24px", height: "24px", borderRadius: "50%", background: "var(--blackberry)", color: "var(--warm-white)", fontSize: "12px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center" }} className="gi-mark gi-bgbb">
                      1
                    </span>
                    {" "}
                    <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.2fr) auto minmax(0,1.4fr)", gap: "12px 20px", alignItems: "center", fontSize: "15px" }}>
                      {" "}
                      <span style={{ fontSize: "12px", color: "var(--muted)" }}>
                        Competency
                      </span>
                      <span style={{ fontSize: "12px", color: "var(--muted)" }}>
                        Score
                      </span>
                      <span style={{ fontSize: "12px", color: "var(--muted)", position: "relative" }}>
                        Priority
                      </span>
                      {" "}
                      {(v.reportRows || []).map((r: any, r_i: number) => (
                        <Fragment key={r_i}>
                          {" "}
                          <span>
                            <span className="sc-interp">{r.k}</span>
                          </span>
                          <span style={{ display: "flex", gap: "4px" }}>
                            {(r.pips || []).map((p: any, p_i: number) => (
                              <Fragment key={p_i}>
                                <span style={{ width: "18px", height: "8px", background: p }}></span>
                              </Fragment>
                            ))}
                          </span>
                          <span style={{ fontSize: "14px", color: "var(--blackberry-soft)" }}>
                            <span className="sc-interp">{r.p}</span>
                          </span>
                          {" "}
                        </Fragment>
                      ))}
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                  <div style={{ position: "relative", padding: "16px 0 0", borderTop: "1px solid var(--rule)" }}>
                    {" "}
                    <span aria-hidden="true" className="gi-mark gi-bgbb" style={{ position: "absolute", left: "-40px", top: "16px", width: "24px", height: "24px", borderRadius: "50%", background: "var(--blackberry)", color: "var(--warm-white)", fontSize: "12px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      2
                    </span>
                    {" "}
                    <span style={{ display: "block", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                      Assessor's notes
                    </span>
                    {" "}
                    <p style={{ margin: "8px 0 0", fontFamily: "'Newsreader',serif", fontSize: "18px", lineHeight: "1.5" }}>
                      Group exercise: strong structure, but summarised before two people had spoken. Case study: a clear recommendation, one figure misread.
                    </p>
                    {" "}
                  </div>
                  {" "}
                  <div style={{ position: "relative", padding: "16px 0 0", borderTop: "1px solid var(--rule)" }}>
                    {" "}
                    <span aria-hidden="true" className="gi-mark gi-bgbb" style={{ position: "absolute", left: "-40px", top: "16px", width: "24px", height: "24px", borderRadius: "50%", background: "var(--blackberry)", color: "var(--warm-white)", fontSize: "12px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      3
                    </span>
                    {" "}
                    <span style={{ display: "block", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                      Before the real one
                    </span>
                    {" "}
                    <p style={{ margin: "8px 0 0", fontSize: "15px", lineHeight: "1.5", color: "var(--blackberry-soft)" }}>
                      Practise bringing others in during the first five minutes of a group task.
                    </p>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </section>
            {" "}
            <section style={{ background: "var(--bone)" }} className="gi-bgbone">
              {" "}
              <div className="gi-founder" style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(52px,7vw,96px) clamp(20px,5vw,64px)", alignItems: "start" }}>
                {" "}
                <div>
                  <p style={{ margin: "0 0 16px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                    Who teaches and assesses
                  </p>
                  <h2 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(32px,3.6vw,52px)", lineHeight: "1.04", letterSpacing: "-0.02em", textWrap: "balance", maxWidth: "16ch" }}>
                    Assessed by people who passed.
                  </h2>
                </div>
                {" "}
                <dl style={{ margin: "0", borderTop: "2px solid var(--blackberry)" }}>
                  {" "}
                  {(v.whoTeaches || []).map((r: any, r_i: number) => (
                    <Fragment key={r_i}>
                      {" "}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 32px", padding: "16px 0", borderBottom: "1px solid var(--rule)" }}>
                        {" "}
                        <dt style={{ flex: "0 0 170px", fontSize: "14px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", paddingTop: "4px" }}>
                          <span className="sc-interp">{r.k}</span>
                        </dt>
                        {" "}
                        <dd style={{ margin: "0", flex: "1 1 260px", minWidth: "0", fontSize: "17px", lineHeight: "1.5", color: r.vc, fontStyle: r.fs }}>
                          <span className="sc-interp">{r.v}</span>
                        </dd>
                        {" "}
                      </div>
                      {" "}
                    </Fragment>
                  ))}
                  {" "}
                </dl>
                {" "}
              </div>
              {" "}
            </section>
            {" "}
            <section aria-label="The Deadline Line" style={{ background: "var(--blackberry)", color: "var(--warm-white)" }} className="gi-bgbb">
              {" "}
              <div className="gi-dl" style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(52px,7vw,96px) clamp(20px,5vw,64px)" }}>
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", minWidth: "0" }}>
                  {" "}
                  <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--on-dark-label)" }} className="gi-up">
                    The Deadline Line · included
                  </p>
                  {" "}
                  <h2 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(32px,3.6vw,52px)", lineHeight: "1.04", letterSpacing: "-0.02em", textWrap: "balance", color: "var(--warm-white)", maxWidth: "14ch" }}>
                    They're never applying alone.
                  </h2>
                  {" "}
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.55", color: "var(--on-dark-body)", maxWidth: "40ch" }}>
                    From booking until their last application closes, your child can WhatsApp our team about anything: a test tomorrow, an interview on Friday, an offer to weigh up.
                  </p>
                  {" "}
                </div>
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "24px", minWidth: "0" }}>
                  {" "}
                  <div className="gi-dlstats">
                    {" "}
                    <div>
                      <span className="gi-dlbig">
                        24/7
                      </span>
                      <span className="gi-dlsub">
                        Message any time, any day
                      </span>
                    </div>
                    {" "}
                    <div>
                      <span className="gi-dlbig">
                        {"<24h"}
                      </span>
                      <span className="gi-dlsub">
                        Reply from the team, every day
                      </span>
                    </div>
                    {" "}
                    <div>
                      <span className="gi-dlbig">
                        Every
                      </span>
                      <span className="gi-dlsub">
                        Stage covered, until the last deadline
                      </span>
                    </div>
                    {" "}
                  </div>
                  {" "}
                  <ul style={{ margin: "0", padding: "0", listStyle: "none", borderTop: "1px solid var(--rule-dark)" }}>
                    {" "}
                    {(v.dlAsk || []).map((q: any, q_i: number) => (
                      <Fragment key={q_i}>
                        <li style={{ display: "flex", justifyContent: "space-between", gap: "16px", padding: "12px 0", borderBottom: "1px solid var(--rule-dark)", fontSize: "16px", lineHeight: "1.4" }}>
                          <span style={{ color: "var(--warm-white)" }}>
                            <span className="sc-interp">{q.q}</span>
                          </span>
                          <span style={{ color: "var(--on-dark-label)", fontWeight: "600", whiteSpace: "nowrap" }}>
                            Ask.
                          </span>
                        </li>
                      </Fragment>
                    ))}
                    {" "}
                  </ul>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </section>
            {" "}
            <section id="placement" style={{ background: "var(--bone)" }} className="gi-bgbone">
              {" "}
              <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(52px,7vw,96px) clamp(20px,5vw,64px)" }}>
                {" "}
                <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "16px" }} className="gi-up">
                  The placement
                </p>
                {" "}
                <h2 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(32px,3.6vw,52px)", lineHeight: "1.04", letterSpacing: "-0.02em", textWrap: "balance" }}>
                  Add a placement: £950.
                </h2>
                {" "}
                <p style={{ margin: "20px 0 0", fontSize: "17px", lineHeight: "1.6", color: "var(--blackberry-soft)", maxWidth: "60ch" }}>
                  {"Two to three days at a small firm, working on one real question the owner wants answered. They leave with a written brief, a reference on the firm's letterhead, and something most 17-year-olds can't put on an application: "}
                  <span style={{ fontWeight: "600", color: "var(--blackberry)" }}>
                    a client, a deadline, and a finding.
                  </span>
                  {" Five seats, arranged by hand."}
                </p>
                {" "}
                <ol className="gi-stats3" style={{ margin: "40px 0 0", padding: "0", listStyle: "none" }}>
                  {" "}
                  {(v.placementSteps || []).map((p: any, p_i: number) => (
                    <Fragment key={p_i}>
                      {" "}
                      <li style={{ padding: "24px 0", borderTop: "2px solid var(--blackberry)", display: "flex", flexDirection: "column", gap: "12px", minWidth: "0" }}>
                        {" "}
                        <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", color: "var(--oxblood)" }}>
                          0<span className="sc-interp">{p.n}</span>
                        </span>
                        {" "}
                        <span style={{ fontFamily: "'Newsreader',serif", fontSize: "clamp(24px,2.2vw,30px)", lineHeight: "1.1" }}>
                          <span className="sc-interp">{p.title}</span>
                        </span>
                        {" "}
                        <span style={{ fontSize: "16px", lineHeight: "1.55", color: "var(--blackberry-soft)" }}>
                          <span className="sc-interp">{p.body}</span>
                        </span>
                        {" "}
                      </li>
                      {" "}
                    </Fragment>
                  ))}
                  {" "}
                </ol>
                {" "}
                <div style={{ marginTop: "32px" }}>
                  <button onClick={v.cta.placement} data-cta="placement_interest" className="gi-btn">
                    Ask about a placement
                  </button>
                </div>
                {" "}
              </div>
              {" "}
            </section>
            {" "}
            <section style={{ background: "var(--blackberry)", color: "var(--warm-white)" }} className="gi-bgbb">
              {" "}
              <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(52px,7vw,96px) clamp(20px,5vw,64px)", display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "32px" }}>
                {" "}
                <div>
                  <h2 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", lineHeight: "0.97", letterSpacing: "-0.025em", textWrap: "balance", fontSize: "clamp(40px,5vw,72px)" }}>
                    Practise it here, not on the day.
                  </h2>
                  <ul className="gi-endpromise" style={{ margin: "20px 0 0", padding: "0", listStyle: "none" }}>
                    <li>
                      {"£595 founding price · "}<span className="sc-interp">{v.seatLine}</span>
                    </li>
                    <li>
                      £100 deposit, refundable
                    </li>
                    <li>
                      No offer in 12 months? Next course free
                    </li>
                    <li>
                      24/7 team support until the last deadline
                    </li>
                  </ul>
                </div>
                {" "}
                <button onClick={v.cta.courseend} data-cta="call_booked" className="gi-btn gi-bgbb" style={{ textTransform: "uppercase", letterSpacing: "0.08em", cursor: "pointer", whiteSpace: "nowrap", border: "0", background: "var(--blackberry)", color: "var(--warm-white)", font: "600 16px 'Source Sans 3',sans-serif", padding: "20px 32px", borderRadius: "2px" }}>
                  <span className="sc-interp">{v.ctaLabel}</span>
                </button>
                {" "}
                <p style={{ margin: "0", flexBasis: "100%", fontSize: "15px", lineHeight: "1.5", color: "var(--on-dark-body)" }}>
                  {"Not sure which scheme? "}
                  <a href="/pathfinder" onClick={v.goQuizLink} className="gi-ghost" style={{ color: "var(--bone)", fontWeight: "600", textUnderlineOffset: "4px" }}>
                    Try the free Pathfinder
                  </a>
                </p>
                {" "}
              </div>
              {" "}
            </section>
            {" "}
          </>
        ) : null}
        {" "}
        {v.isPrice ? (
          <>
            {" "}
            <section data-screen-label="03 Prices and booking" style={{ background: "var(--bone)" }} className="gi-bgbone">
              {" "}
              <div className="gi-split" style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(40px,5vw,80px) clamp(20px,5vw,64px) clamp(52px,6vw,88px)", alignItems: "start" }}>
                {" "}
                <div style={{ minWidth: "0" }}>
                  {" "}
                  <p style={{ margin: "0 0 16px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--blackberry)" }} className="gi-up">
                    Founding cohort
                  </p>
                  {" "}
                  <div style={{ margin: "0 0 20px", display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                    <span style={{ position: "relative", display: "inline-block", fontFamily: "'Newsreader',serif", fontSize: "clamp(32px,3.4vw,44px)", lineHeight: "1", color: "var(--muted)" }}>
                      <span className="gi-strike">
                        £695
                      </span>
                    </span>
                    <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 10px", borderRadius: "2px", background: "transparent", color: "inherit", boxShadow: "inset 0 0 0 1px currentColor", font: "600 12px 'Source Sans 3',sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap" }} className="gi-up">
                      Save £100
                    </span>
                  </div>
                  {" "}
                  <span style={{ display: "block", fontFamily: "'Newsreader',serif", fontSize: "clamp(104px,14vw,200px)", lineHeight: "0.8", letterSpacing: "-0.05em" }}>
                    £595
                  </span>
                  {" "}
                  <p style={{ margin: "20px 0 0", fontSize: "18px", color: "var(--muted)" }}>
                    Founding price for the first cohort. Full price £695. All five stages, one price, less than 1.5% of the student debt it can help them avoid.
                  </p>
                  {" "}
                  <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "12px", maxWidth: "440px" }}>
                    {" "}
                    <button onClick={v.cta.pricehero} data-cta="call_booked" className="gi-btn gi-bgbb" style={{ textTransform: "uppercase", letterSpacing: "0.08em", cursor: "pointer", whiteSpace: "nowrap", border: "0", background: "var(--blackberry)", color: "var(--warm-white)", font: "600 16px 'Source Sans 3',sans-serif", borderRadius: "2px", width: "100%", padding: "24px 20px" }}>
                      <span className="sc-interp">{v.ctaLabel}</span>
                    </button>
                    {" "}
                    <span style={{ fontSize: "15px", color: "var(--muted)", textAlign: "center" }}>
                      <span className="sc-interp">{v.seatShort}</span>{" · £100 deposit today, refundable"}
                    </span>
                    {" "}
                  </div>
                  {" "}
                  <p style={{ margin: "24px 0 0", fontSize: "15px", color: "var(--muted)" }}>
                    With a 2–3 day placement and a reference: £950. Five seats.
                  </p>
                  {" "}
                </div>
                {" "}
                <div style={{ minWidth: "0" }}>
                  {" "}
                  <span style={{ display: "block", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", paddingBottom: "12px", borderBottom: "2px solid var(--blackberry)" }} className="gi-up">
                    Everything included
                  </span>
                  {" "}
                  <ul style={{ margin: "0", padding: "0", listStyle: "none" }}>
                    {" "}
                    {(v.inclAll || []).map((it: any, it_i: number) => (
                      <Fragment key={it_i}>
                        {" "}
                        <li style={{ display: "flex", gap: "12px", padding: "12px 0", borderBottom: "1px solid var(--rule)", fontSize: "17px" }}>
                          <span style={{ color: "var(--blackberry)" }}>
                            ✓
                          </span>
                          <span style={{ flex: "1 1 auto", minWidth: "0" }}>
                            <span className="sc-interp">{it}</span>
                          </span>
                        </li>
                        {" "}
                      </Fragment>
                    ))}
                    {" "}
                  </ul>
                  {" "}
                  <div style={{ marginTop: "20px" }}>
                    <button onClick={v.goDays} className="gi-ghost" style={{ all: "unset", cursor: "pointer", fontSize: "16px", fontWeight: "600", color: "var(--blackberry)", textDecoration: "underline", textUnderlineOffset: "4px", whiteSpace: "nowrap" }}>
                      {"See full course details "}
                      <span className="gi-arr" aria-hidden="true">
                        →
                      </span>
                    </button>
                  </div>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </section>
            {" "}
            <section style={{ background: "var(--warm-white)" }}>
              {" "}
              <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(52px,7vw,96px) clamp(20px,5vw,64px)" }}>
                {" "}
                <p style={{ margin: "0 0 16px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--blackberry)" }} className="gi-up">
                  Dates, location and logistics
                </p>
                {" "}
                <h2 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(32px,3.6vw,52px)", lineHeight: "1.04", letterSpacing: "-0.02em", textWrap: "balance" }}>
                  The practical details.
                </h2>
                {" "}
                <div className="gi-facts" style={{ marginTop: "40px" }}>
                  {" "}
                  {(v.facts4 || []).map((f: any, f_i: number) => (
                    <Fragment key={f_i}>
                      {" "}
                      <div style={{ padding: "20px 0", borderTop: "2px solid var(--blackberry)" }}>
                        <span style={{ display: "block", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                          <span className="sc-interp">{f.k}</span>
                        </span>
                        <span style={{ display: "block", marginTop: "8px", fontFamily: "'Newsreader',serif", fontSize: "clamp(28px,3vw,40px)", lineHeight: "1.05" }}>
                          <span className="sc-interp">{f.v}</span>
                        </span>
                      </div>
                      {" "}
                    </Fragment>
                  ))}
                  {" "}
                </div>
                {" "}
                <dl style={{ margin: "32px 0 0", maxWidth: "820px" }}>
                  {" "}
                  {(v.logistics || []).map((r: any, r_i: number) => (
                    <Fragment key={r_i}>
                      {" "}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 32px", padding: "16px 0", borderBottom: "1px solid var(--rule)" }}>
                        <dt style={{ flex: "0 0 170px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", paddingTop: "4px" }}>
                          <span className="sc-interp">{r.k}</span>
                        </dt>
                        <dd style={{ margin: "0", flex: "1 1 260px", minWidth: "0", fontSize: "17px", lineHeight: "1.5", color: r.vc, fontStyle: r.fs }}>
                          <span className="sc-interp">{r.v}</span>
                        </dd>
                      </div>
                      {" "}
                    </Fragment>
                  ))}
                  {" "}
                </dl>
                {" "}
              </div>
              {" "}
            </section>
            {" "}
            <section style={{ background: "var(--bone)" }} className="gi-bgbone">
              {" "}
              <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(52px,7vw,96px) clamp(20px,5vw,64px)" }}>
                {" "}
                <p style={{ margin: "0 0 16px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--blackberry)" }} className="gi-up">
                  Payment and deposit
                </p>
                {" "}
                <h2 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(32px,3.6vw,52px)", lineHeight: "1.04", letterSpacing: "-0.02em", textWrap: "balance" }}>
                  What you pay, and when.
                </h2>
                {" "}
                <ol className="gi-flow" style={{ margin: "40px 0 0", padding: "0", listStyle: "none" }}>
                  {" "}
                  <li style={{ padding: "24px 0", borderTop: "2px solid var(--blackberry)" }}>
                    <span style={{ display: "block", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--blackberry)" }} className="gi-up">
                      Today
                    </span>
                    <span style={{ display: "block", marginTop: "8px", fontFamily: "'Newsreader',serif", fontSize: "clamp(36px,4vw,52px)", lineHeight: "1" }}>
                      £100
                    </span>
                    <span style={{ display: "block", marginTop: "8px", fontSize: "15px", color: "var(--blackberry-soft)" }}>
                      Refundable.
                    </span>
                  </li>
                  {" "}
                  <li aria-hidden="true" className="gi-arrow" style={{ fontSize: "28px", color: "var(--blackberry)" }}>
                    →
                  </li>
                  {" "}
                  <li style={{ padding: "24px 0", borderTop: "2px solid var(--blackberry)" }}>
                    <span style={{ display: "block", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                      Balance
                    </span>
                    <span style={{ display: "block", marginTop: "8px", fontFamily: "'Newsreader',serif", fontSize: "clamp(36px,4vw,52px)", lineHeight: "1" }}>
                      £495
                    </span>
                    <span style={{ display: "block", marginTop: "8px", fontSize: "15px", color: "var(--blackberry-soft)" }}>
                      Due before the course.
                    </span>
                  </li>
                  {" "}
                  <li aria-hidden="true" className="gi-arrow" style={{ fontSize: "28px", color: "var(--blackberry)" }}>
                    →
                  </li>
                  {" "}
                  <li style={{ padding: "24px 0", borderTop: "2px solid var(--blackberry)" }}>
                    <span style={{ display: "block", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                      Then
                    </span>
                    <span style={{ display: "block", marginTop: "8px", fontFamily: "'Newsreader',serif", fontSize: "clamp(36px,4vw,52px)", lineHeight: "1" }}>
                      Confirmed
                    </span>
                    <span style={{ display: "block", marginTop: "8px", fontSize: "15px", color: "var(--blackberry-soft)" }}>
                      Confirmed on WhatsApp. No room is booked until the cohort is confirmed.
                    </span>
                  </li>
                  {" "}
                </ol>
                {" "}
                <dl style={{ margin: "32px 0 0", maxWidth: "820px" }}>
                  {" "}
                  {(v.payment || []).map((r: any, r_i: number) => (
                    <Fragment key={r_i}>
                      {" "}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 32px", padding: "16px 0", borderBottom: "1px solid var(--rule)" }}>
                        <dt style={{ flex: "0 0 170px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", paddingTop: "4px" }}>
                          <span className="sc-interp">{r.k}</span>
                        </dt>
                        <dd style={{ margin: "0", flex: "1 1 260px", minWidth: "0", fontSize: "17px", lineHeight: "1.5", color: r.vc, fontStyle: r.fs }}>
                          <span className="sc-interp">{r.v}</span>
                        </dd>
                      </div>
                      {" "}
                    </Fragment>
                  ))}
                  {" "}
                </dl>
                {" "}
              </div>
              {" "}
            </section>
            {" "}
            <section id="guarantee" style={{ background: "var(--blackberry)", color: "var(--warm-white)", scrollMarginTop: "96px" }} className="gi-bgbb">
              {" "}
              <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(52px,7vw,96px) clamp(20px,5vw,64px)" }}>
                {" "}
                <p style={{ margin: "0 0 16px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--on-dark-label)" }} className="gi-up">
                  The DegreeYourWay Guarantee, in full
                </p>
                {" "}
                <h2 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(34px,4vw,58px)", lineHeight: "0.97", letterSpacing: "-0.025em", textWrap: "balance", maxWidth: "15ch" }}>
                  No offer within 12 months? Come back free.
                </h2>
                {" "}
                <div style={{ marginTop: "56px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", gap: "40px 80px", alignItems: "start" }}>
                  {" "}
                  <ol style={{ margin: "0", padding: "0", listStyle: "none", borderTop: "1px solid var(--rule-dark)" }}>
                    {" "}
                    {(v.guarFull || []).map((g: any, g_i: number) => (
                      <Fragment key={g_i}>
                        {" "}
                        <li style={{ display: "flex", gap: "16px", padding: "16px 0", borderBottom: "1px solid var(--rule-dark)", alignItems: "baseline" }}>
                          <span style={{ fontFamily: "'Newsreader',serif", fontSize: "22px", color: "var(--on-dark-label)" }}>
                            <span className="sc-interp">{g.n}</span>
                          </span>
                          <span style={{ flex: "1 1 auto", minWidth: "0", fontSize: "17px", lineHeight: "1.5", color: g.vc, fontStyle: g.fs }}>
                            <span className="sc-interp">{g.text}</span>
                          </span>
                        </li>
                        {" "}
                      </Fragment>
                    ))}
                    {" "}
                  </ol>
                  {" "}
                  <div>
                    {" "}
                    <p style={{ margin: "0", fontFamily: "'Newsreader',serif", fontSize: "clamp(22px,2.2vw,28px)", lineHeight: "1.3", maxWidth: "30ch" }}>
                      Employers make every hiring decision. We guarantee the preparation, not the outcome.
                    </p>
                    {" "}
                    <div id="terms" style={{ marginTop: "28px", paddingTop: "20px", borderTop: "1px solid var(--rule-dark)", scrollMarginTop: "96px" }}>
                      {" "}
                      <span style={{ display: "block", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--on-dark-muted)" }} className="gi-up">
                        Full terms
                      </span>
                      {" "}
                      <p style={{ margin: "12px 0 0", fontSize: "14px", lineHeight: "1.6", color: "var(--on-dark-body)", maxWidth: "60ch" }}>
                        The student attends every module in full. They submit at least one application, reviewed by us, to at least three Level 6 or 7 apprenticeship schemes with deadlines within twelve months of the course. If no offer is received from any scheme applied to in that window, and a claim is made within thirteen months, they get one free place on a later cohort, in person or online, at our choice of date. An offer the student declines counts as an offer. Not transferable. No cash alternative.
                      </p>
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </section>
            {" "}
            <section style={{ background: "var(--warm-white)" }}>
              {" "}
              <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(52px,7vw,96px) clamp(20px,5vw,64px)" }}>
                {" "}
                <p style={{ margin: "0 0 16px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--blackberry)" }} className="gi-up">
                  Is it right for your child?
                </p>
                {" "}
                <h2 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(32px,3.6vw,52px)", lineHeight: "1.04", letterSpacing: "-0.02em", textWrap: "balance", maxWidth: "18ch" }}>
                  Who it's for, and who it isn't.
                </h2>
                {" "}
                <div style={{ marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", gap: "40px 64px" }}>
                  {" "}
                  <div>
                    <span style={{ display: "block", paddingBottom: "12px", borderBottom: "2px solid var(--blackberry)", fontSize: "14px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase" }} className="gi-up">
                      A good fit
                    </span>
                    {" "}
                    {(v.fitYes || []).map((f: any, f_i: number) => (
                      <Fragment key={f_i}>
                        <p style={{ margin: "0", padding: "16px 0", borderBottom: "1px solid var(--rule)", fontSize: "17px", lineHeight: "1.5" }}>
                          <span className="sc-interp">{f}</span>
                        </p>
                      </Fragment>
                    ))}
                  </div>
                  {" "}
                  <div>
                    <span style={{ display: "block", paddingBottom: "12px", borderBottom: "2px solid var(--muted)", fontSize: "14px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                      Not a good fit
                    </span>
                    {" "}
                    {(v.fitNo || []).map((f: any, f_i: number) => (
                      <Fragment key={f_i}>
                        <p style={{ margin: "0", padding: "16px 0", borderBottom: "1px solid var(--rule)", fontSize: "17px", lineHeight: "1.5", color: "var(--blackberry-soft)" }}>
                          <span className="sc-interp">{f}</span>
                        </p>
                      </Fragment>
                    ))}
                  </div>
                  {" "}
                </div>
                {" "}
                <p style={{ margin: "32px 0 0", padding: "20px 0", borderTop: "2px solid var(--blackberry)", fontFamily: "'Newsreader',serif", fontSize: "clamp(22px,2.2vw,28px)", lineHeight: "1.3" }}>
                  Outside London, or 19–23? The online cohort, four evenings, £450.
                </p>
                {" "}
              </div>
              {" "}
            </section>
            {" "}
            <section aria-label="Questions parents ask" style={{ background: "var(--bone)" }} className="gi-bgbone">
              {" "}
              <div className="gi-faqwrap" style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(48px,6vw,80px) clamp(20px,5vw,64px)" }}>
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", minWidth: "0" }}>
                  <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                    Questions parents ask
                  </p>
                  <h2 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(28px,3vw,40px)", lineHeight: "1.1", letterSpacing: "-0.02em", color: "var(--blackberry)" }}>
                    Booking questions.
                  </h2>
                </div>
                {" "}
                <div style={{ minWidth: "0", borderTop: "1px solid var(--blackberry)" }}>
                  {" "}
                  {(v.faqBooking || []).map((f: any, f_i: number) => (
                    <Fragment key={f_i}>
                      {" "}
                      <details className="gi-faq" style={{ borderBottom: "1px solid var(--rule)" }}>
                        {" "}
                        <summary className="gi-faqsum">
                          <span className="sc-interp">{f.q}</span>
                          <span aria-hidden="true" className="gi-plus">
                            +
                          </span>
                        </summary>
                        {" "}
                        <p className="gi-ans" style={{ margin: "0", padding: "0 40px 20px 0", fontSize: "16px", lineHeight: "1.6", color: "var(--blackberry-soft)", maxWidth: "62ch" }}>
                          <span className="sc-interp">{f.a}</span>
                        </p>
                        {" "}
                      </details>
                      {" "}
                    </Fragment>
                  ))}
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </section>
            {" "}
            <section id="book" ref={v.bookRef} style={{ background: "var(--warm-white)", scrollMarginTop: "96px" }}>
              {" "}
              <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(56px,8vw,112px) clamp(20px,5vw,64px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))", gap: "40px 80px" }}>
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  {" "}
                  <p style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--blackberry)", margin: "0" }} className="gi-up">
                    Reserve a place
                  </p>
                  {" "}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontFamily: "'Newsreader',serif", fontSize: "clamp(30px,3.2vw,44px)", lineHeight: "1.1", letterSpacing: "-0.01em" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                      <span style={{ position: "relative", display: "inline-block", fontFamily: "'Newsreader',serif", fontSize: "clamp(24px,2.4vw,32px)", lineHeight: "1", color: "var(--muted)" }}>
                        <span className="gi-strike">
                          £695
                        </span>
                      </span>
                      <span style={{ display: "inline-flex", alignItems: "center", height: "24px", padding: "0 10px", borderRadius: "2px", background: "transparent", color: "inherit", boxShadow: "inset 0 0 0 1px currentColor", font: "600 12px 'Source Sans 3',sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap" }} className="gi-up">
                        Save £100
                      </span>
                    </span>
                    <span style={{ fontSize: "clamp(64px,7vw,96px)", lineHeight: "0.9", letterSpacing: "-0.04em" }}>
                      <span className="sc-interp">{v.myPrice}</span>
                    </span>
                    <span style={{ fontSize: "16px", fontFamily: "'Source Sans 3',sans-serif", color: "var(--muted)" }}>
                      <span className="sc-interp">{v.myPriceNote}</span>
                    </span>
                  </div>
                  {" "}
                  <p style={{ margin: "0", fontSize: "15px", color: "var(--muted)" }}>
                    {"£100 refundable deposit · DegreeYourWay Guarantee · "}<span className="sc-interp">{v.seatShort}</span>
                  </p>
                  {" "}
                  <span style={{ fontSize: "15px", color: "var(--muted)" }}>
                    {"Not ready yet? "}
                    <a href="#guide" onClick={v.openGuide} className="gi-ghost" style={{ fontWeight: "600", color: "var(--blackberry)", textUnderlineOffset: "4px" }}>
                      Get the free Parent's Guide
                    </a>
                  </span>
                  {" "}
                </div>
                {" "}
                {v.submitted ? (
                  <>
                    {" "}
                    <div role="status" className="gi-fade" style={{ gridColumn: "span 1", display: "flex", flexDirection: "column", gap: "12px", paddingTop: "8px" }}>
                      {" "}
                      <span style={{ fontFamily: "'Newsreader',serif", fontSize: "32px", lineHeight: "1.1" }}>
                        {"Thank you, "}<span className="sc-interp">{v.parentName}</span>.
                      </span>
                      {" "}
                      <span style={{ fontSize: "17px", lineHeight: "1.5", color: "var(--blackberry-soft)" }}>
                        WhatsApp has opened with your details. Press send and the founder replies with the next steps.
                      </span>
                      {" "}
                      <a href={v.waBookHref} target="_blank" rel="noopener" className="gi-ghost" style={{ fontSize: "16px", fontWeight: "600", color: "var(--blackberry)", textUnderlineOffset: "4px" }}>
                        {"WhatsApp didn't open? Tap here "}
                        <span className="gi-arr" aria-hidden="true">
                          →
                        </span>
                      </a>
                      {" "}
                    </div>
                    {" "}
                  </>
                ) : null}
                {" "}
                {v.notSubmitted ? (
                  <>
                    {" "}
                    <form onSubmit={v.submit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                      {" "}
                      <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "15px", fontWeight: "600" }}>
                        {"Parent's name "}
                        <input className="gi-in" required name="parent" autoComplete="name" onChange={v.setParent} style={{ font: "400 17px 'Source Sans 3',sans-serif", padding: "16px", border: "1px solid var(--input-border)", background: "var(--warm-white)", color: "var(--blackberry)", borderRadius: "2px" }} />
                        {" "}
                      </label>
                      {" "}
                      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,2fr) minmax(0,1fr)", gap: "16px" }}>
                        {" "}
                        <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "15px", fontWeight: "600" }}>
                          {"Student's name "}
                          <input className="gi-in" required name="student" style={{ font: "400 17px 'Source Sans 3',sans-serif", padding: "16px", border: "1px solid var(--input-border)", background: "var(--warm-white)", color: "var(--blackberry)", borderRadius: "2px" }} />
                          {" "}
                        </label>
                        {" "}
                        <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "15px", fontWeight: "600" }}>
                          {"Year "}
                          <select className="gi-in" required name="year" style={{ font: "400 17px 'Source Sans 3',sans-serif", padding: "16px 12px", border: "1px solid var(--input-border)", background: "var(--warm-white)", color: "var(--blackberry)", borderRadius: "2px" }}>
                            {" "}
                            <option value="12">
                              Year 12
                            </option>
                            {" "}
                            <option value="13">
                              Year 13
                            </option>
                            {" "}
                            <option value="19-23">
                              Aged 19–23
                            </option>
                            {" "}
                          </select>
                          {" "}
                        </label>
                        {" "}
                      </div>
                      {" "}
                      <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "15px", fontWeight: "600" }}>
                        {"Email "}
                        <input className="gi-in" required type="email" name="email" autoComplete="email" onChange={v.setEmail} style={{ font: "400 17px 'Source Sans 3',sans-serif", padding: "16px", border: "1px solid var(--input-border)", background: "var(--warm-white)", color: "var(--blackberry)", borderRadius: "2px" }} />
                        {" "}
                      </label>
                      {" "}
                      <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "15px", fontWeight: "600" }}>
                        {"Mobile "}
                        <input className="gi-in" required type="tel" name="mobile" autoComplete="tel" style={{ font: "400 17px 'Source Sans 3',sans-serif", padding: "16px", border: "1px solid var(--input-border)", background: "var(--warm-white)", color: "var(--blackberry)", borderRadius: "2px" }} />
                        {" "}
                      </label>
                      {" "}
                      <fieldset style={{ margin: "0", padding: "0", border: "0", display: "flex", flexDirection: "column", gap: "8px" }}>
                        {" "}
                        <legend style={{ fontSize: "15px", fontWeight: "600", marginBottom: "8px", padding: "0" }}>
                          Place
                        </legend>
                        {" "}
                        {(v.places || []).map((pl: any, pl_i: number) => (
                          <Fragment key={pl_i}>
                            {" "}
                            <label className="gi-opt" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px 16px", border: `1px solid ${pl.bd}`, background: pl.bg, cursor: "pointer", fontSize: "17px", borderRadius: "2px" }}>
                              {" "}
                              <input className="gi-in" type="radio" name="place" value={pl.id} checked={pl.checked} onChange={pl.pick} style={{ width: "18px", height: "18px", margin: "0", accentColor: "var(--blackberry)" }} />
                              {" "}
                              <span style={{ flex: "1" }}>
                                <span className="sc-interp">{pl.label}</span>
                              </span>
                              {" "}
                              <span style={{ fontFamily: "'Newsreader',serif", fontSize: "22px" }}>
                                <span className="sc-interp">{pl.price}</span>
                              </span>
                              {" "}
                            </label>
                            {" "}
                          </Fragment>
                        ))}
                        {" "}
                      </fieldset>
                      {" "}
                      <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "15px", fontWeight: "600" }}>
                        {"Where are they in the process? "}
                        <select className="gi-in" name="stage" style={{ font: "400 17px 'Source Sans 3',sans-serif", padding: "16px 12px", border: "1px solid var(--input-border)", background: "var(--warm-white)", color: "var(--blackberry)", borderRadius: "2px" }}>
                          {" "}
                          <option>
                            Not applied yet
                          </option>
                          {" "}
                          <option>
                            Applications sent
                          </option>
                          {" "}
                          <option>
                            Tests or video interview
                          </option>
                          {" "}
                          <option>
                            Assessment centre booked
                          </option>
                          {" "}
                        </select>
                        {" "}
                      </label>
                      {" "}
                      <button type="submit" className="gi-btn gi-btn-ox gi-bgbb" style={{ textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "8px", cursor: "pointer", border: "0", background: "var(--blackberry)", color: "var(--warm-white)", font: "600 16px 'Source Sans 3',sans-serif", padding: "20px 32px", borderRadius: "2px" }}>
                        <span className="sc-interp">{v.submitLabel}</span>
                      </button>
                      {" "}
                      <p style={{ margin: "0", fontSize: "14px", lineHeight: "1.5", color: "var(--muted)" }}>
                        This opens WhatsApp with your details filled in. Nothing is charged here.
                      </p>
                      {" "}
                      <p style={{ margin: "0", fontSize: "13px", lineHeight: "1.5", color: "var(--muted)" }}>
                        By sending this you agree to our {" "}<a href="/privacy" target="_blank" rel="noopener" style={{ color: "inherit", textUnderlineOffset: "3px" }}>privacy policy</a>.
                      </p>
                    </form>
                    {" "}
                  </>
                ) : null}
                {" "}
              </div>
              {" "}
            </section>
            {" "}
          </>
        ) : null}
        {" "}
        {v.isSchools ? (
          <>
            {" "}
            <section data-screen-label="04 For schools" style={{ background: "var(--bone)" }} className="gi-bgbone">
              {" "}
              <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(36px,5vw,88px) clamp(20px,5vw,64px) clamp(40px,5vw,72px)", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px" }}>
                {" "}
                <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                  For schools · Free
                </p>
                {" "}
                <h1 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(40px,5.6vw,80px)", lineHeight: "1", letterSpacing: "-0.025em", maxWidth: "16ch", textWrap: "balance", color: "var(--blackberry)" }}>
                  {"Apprenticeship talks from someone "}
                  <span style={{ color: "var(--oxblood)", fontStyle: "italic" }}>
                    who got one.
                  </span>
                </h1>
                {" "}
                <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.55", color: "var(--blackberry-soft)", maxWidth: "46ch" }}>
                  {"Your students ask about degree apprenticeships. Most talks cover what they are. "}
                  <span style={{ fontWeight: "600", color: "var(--blackberry)" }}>
                    Ours show how to get one:
                  </span>
                  {" the schemes, the pay, and the five stages employers test."}
                </p>
                {" "}
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px 20px", marginTop: "4px" }}>
                  {" "}
                  <button onClick={v.goSchoolForm} data-cta="schools_hero" className="gi-btn">
                    Book a free talk
                  </button>
                  {" "}
                  <span style={{ fontSize: "14px", color: "var(--muted)" }}>
                    Counts toward Gatsby Benchmarks 5 and 6
                  </span>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </section>
            {" "}
            <section aria-label="What we offer schools" style={{ background: "var(--warm-white)" }}>
              {" "}
              <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(48px,6vw,88px) clamp(20px,5vw,64px)", display: "flex", flexDirection: "column", gap: "32px" }}>
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                    Two sessions
                  </p>
                  <h2 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(32px,3.6vw,52px)", lineHeight: "1.04", letterSpacing: "-0.02em", textWrap: "balance", color: "var(--blackberry)", maxWidth: "18ch" }}>
                    One for students. One for parents.
                  </h2>
                </div>
                {" "}
                <div className="gi-school2">
                  {" "}
                  {(v.schoolOffers || []).map((o: any, o_i: number) => (
                    <Fragment key={o_i}>
                      {" "}
                      <div className="gi-school2card">
                        {" "}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px" }}>
                          <span style={{ fontFamily: "'Newsreader',serif", fontSize: "clamp(26px,2.6vw,34px)", lineHeight: "1.1", color: "var(--blackberry)" }}>
                            <span className="sc-interp">{o.title}</span>
                          </span>
                          <span className="gi-school2tag">
                            <span className="sc-interp">{o.meta}</span>
                          </span>
                        </div>
                        {" "}
                        <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--muted)" }}>
                          <span className="sc-interp">{o.who}</span>
                        </span>
                        {" "}
                        <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", borderTop: "1px solid var(--rule)", paddingTop: "14px" }}>
                          {" "}
                          {(o.pts || []).map((p: any, p_i: number) => (
                            <Fragment key={p_i}>
                              <li style={{ display: "flex", gap: "10px", fontSize: "16px", lineHeight: "1.45", color: "var(--blackberry)" }}>
                                <span aria-hidden="true" style={{ color: "var(--gain)", fontWeight: "600" }}>
                                  ✓
                                </span>
                                <span className="sc-interp">{p}</span>
                              </li>
                            </Fragment>
                          ))}
                          {" "}
                        </ul>
                        {" "}
                      </div>
                      {" "}
                    </Fragment>
                  ))}
                  {" "}
                </div>
                {" "}
                <p style={{ margin: "0", paddingTop: "16px", borderTop: "1px solid var(--rule)", fontSize: "15px", lineHeight: "1.5", color: "var(--blackberry-soft)" }}>
                  <span style={{ fontWeight: "600", color: "var(--blackberry)" }}>
                    Delivered by Shreyash Singh,
                  </span>
                  {" Deloitte degree apprentice, who applied from sixth form at 17 and received four offers."}
                </p>
                {" "}
              </div>
              {" "}
            </section>
            {" "}
            <section aria-label="Student handout" style={{ background: "var(--warm-white)" }}>
              {" "}
              <div className="gi-planwrap" style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(48px,6vw,88px) clamp(20px,5vw,64px)" }}>
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "14px", minWidth: "0" }}>
                  {" "}
                  <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                    Included with every talk
                  </p>
                  {" "}
                  <h2 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(32px,3.6vw,52px)", lineHeight: "1.04", letterSpacing: "-0.02em", textWrap: "balance", color: "var(--blackberry)", maxWidth: "14ch" }}>
                    A two-page handout for every student.
                  </h2>
                  {" "}
                  <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.55", color: "var(--blackberry-soft)", maxWidth: "38ch" }}>
                    Page 1 makes the case against university in pounds and years. Page 2 shows who hires, when, and how to pass each stage.
                  </p>
                  {" "}
                  <ul style={{ margin: "4px 0 0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {" "}
                    <li style={{ display: "flex", gap: "10px", fontSize: "15px", color: "var(--blackberry)" }}>
                      <span aria-hidden="true" style={{ color: "var(--gain)", fontWeight: "600" }}>
                        ✓
                      </span>
                      University vs apprenticeship, side by side
                    </li>
                    {" "}
                    <li style={{ display: "flex", gap: "10px", fontSize: "15px", color: "var(--blackberry)" }}>
                      <span aria-hidden="true" style={{ color: "var(--gain)", fontWeight: "600" }}>
                        ✓
                      </span>
                      Six industries, employers and entry bars
                    </li>
                    {" "}
                    <li style={{ display: "flex", gap: "10px", fontSize: "15px", color: "var(--blackberry)" }}>
                      <span aria-hidden="true" style={{ color: "var(--gain)", fontWeight: "600" }}>
                        ✓
                      </span>
                      The five stages, with a tip for each
                    </li>
                    {" "}
                  </ul>
                  {" "}
                  <div style={{ marginTop: "6px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "8px" }}>
                    <button onClick={v.goSchoolForm} data-cta="schools_handout" className="gi-btn">
                      Book a talk to get it
                    </button>
                    <span style={{ fontSize: "13px", color: "var(--muted)" }}>
                      Sent once your school's details are in.
                    </span>
                  </div>
                  {" "}
                </div>
                {" "}
                <div className="gi-hoprev">
                  {" "}
                  <div className="gi-hopage" aria-hidden="true">
                    {" "}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid var(--blackberry)", paddingBottom: "6px" }}>
                      <span style={{ fontFamily: "'Newsreader',serif", fontSize: "15px" }}>
                        DegreeYourWay.
                      </span>
                      <span style={{ fontSize: "9px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                        1 of 2
                      </span>
                    </div>
                    {" "}
                    <span style={{ fontFamily: "'Newsreader',serif", fontSize: "19px", lineHeight: "1.1", color: "var(--blackberry)" }}>
                      {"Same degree. "}
                      <em style={{ color: "var(--oxblood)" }}>
                        Four years ahead.
                      </em>
                    </span>
                    {" "}
                    <span className="gi-hoLine">
                      <span style={{ fontWeight: "600", color: "var(--blackberry)" }}>
                        £47,900
                      </span>
                      {" debt vs £0"}
                    </span>
                    <span className="gi-hoLine">
                      <span style={{ fontWeight: "600", color: "var(--blackberry)" }}>
                        £24,000
                      </span>
                      {" a year, paid"}
                    </span>
                    <span className="gi-hoLine">
                      <span style={{ fontWeight: "600", color: "var(--blackberry)" }}>
                        4 years
                      </span>
                      {" in a real team by 22"}
                    </span>
                    <span className="gi-hoLine">
                      <span style={{ fontWeight: "600", color: "var(--blackberry)" }}>
                        1 in 11
                      </span>
                      {" gets a place"}
                    </span>
                    {" "}
                    <span style={{ marginTop: "auto", background: "var(--blackberry)", color: "var(--bone)", fontSize: "11px", fontWeight: "600", padding: "8px 10px", borderRadius: "2px" }} className="gi-bgbb">
                      Free Pathfinder · QR code
                    </span>
                    {" "}
                  </div>
                  {" "}
                  <div className="gi-hopage" aria-hidden="true">
                    {" "}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid var(--blackberry)", paddingBottom: "6px" }}>
                      <span style={{ fontFamily: "'Newsreader',serif", fontSize: "15px" }}>
                        DegreeYourWay.
                      </span>
                      <span style={{ fontSize: "9px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                        2 of 2
                      </span>
                    </div>
                    {" "}
                    <span style={{ fontFamily: "'Newsreader',serif", fontSize: "19px", lineHeight: "1.1", color: "var(--blackberry)" }}>
                      {"Who hires, when, and "}
                      <em style={{ color: "var(--oxblood)" }}>
                        how to get in.
                      </em>
                    </span>
                    {" "}
                    <span className="gi-hoLine">
                      <span style={{ fontWeight: "600", color: "var(--blackberry)" }}>
                        6
                      </span>
                      {" industries and entry bars"}
                    </span>
                    <span className="gi-hoLine">
                      <span style={{ fontWeight: "600", color: "var(--blackberry)" }}>
                        Sep–Jan
                      </span>
                      {" when windows open"}
                    </span>
                    <span className="gi-hoLine">
                      <span style={{ fontWeight: "600", color: "var(--blackberry)" }}>
                        5
                      </span>
                      {" stages, with tips"}
                    </span>
                    <span className="gi-hoLine">
                      <span style={{ fontWeight: "600", color: "var(--blackberry)" }}>
                        3
                      </span>
                      {" things to do this month"}
                    </span>
                    {" "}
                  </div>
                  {" "}
                  <span className="gi-holock" aria-hidden="true">
                    Preview
                  </span>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </section>
            {" "}
            <section aria-label="How it works for schools" style={{ background: "var(--bone)" }} className="gi-bgbone">
              {" "}
              <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(40px,5vw,72px) clamp(20px,5vw,64px) 0" }}>
                {" "}
                <ol className="gi-stats3" style={{ margin: "0", padding: "0", listStyle: "none" }}>
                  {" "}
                  {(v.schoolSteps || []).map((t: any, t_i: number) => (
                    <Fragment key={t_i}>
                      <li style={{ padding: "18px 0", borderTop: "2px solid var(--blackberry)", display: "flex", flexDirection: "column", gap: "6px" }}>
                        <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", color: "var(--oxblood)" }}>
                          0<span className="sc-interp">{t.n}</span>
                        </span>
                        <span style={{ fontFamily: "'Newsreader',serif", fontSize: "24px", lineHeight: "1.15", color: "var(--blackberry)" }}>
                          <span className="sc-interp">{t.title}</span>
                        </span>
                        <span style={{ fontSize: "15px", lineHeight: "1.5", color: "var(--blackberry-soft)" }}>
                          <span className="sc-interp">{t.body}</span>
                        </span>
                      </li>
                    </Fragment>
                  ))}
                  {" "}
                </ol>
                {" "}
              </div>
              {" "}
            </section>
            {" "}
            <section style={{ background: "var(--warm-white)" }}>
              {" "}
              <div className="gi-founder" style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(52px,7vw,96px) clamp(20px,5vw,64px)", alignItems: "start" }}>
                {" "}
                <div id="school-form" style={{ scrollMarginTop: "96px" }}>
                  <p style={{ margin: "0 0 16px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--blackberry)" }} className="gi-up">
                    Step 1 · Send your dates
                  </p>
                  <h2 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(32px,3.6vw,52px)", lineHeight: "1.04", letterSpacing: "-0.02em", textWrap: "balance", maxWidth: "12ch" }}>
                    Book a free talk.
                  </h2>
                </div>
                {" "}
                {v.schoolSent ? (
                  <>
                    {" "}
                    <div role="status" className="gi-fade" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <p style={{ margin: "0", fontFamily: "'Newsreader',serif", fontSize: "28px", lineHeight: "1.25" }}>
                        WhatsApp has opened with your school's details. Press send and we'll reply with dates.
                      </p>
                      <a href={v.handoutHref} target="_blank" rel="noopener" onClick={v.handoutTap} className="gi-btn" style={{ alignSelf: "flex-start" }}>
                        Open the student handout
                      </a>
                      <span style={{ fontSize: "13px", color: "var(--muted)" }}>
                        One A4 page. Print a copy for each student.
                      </span>
                      <a href={v.waSchoolHref} target="_blank" rel="noopener" className="gi-ghost" style={{ fontSize: "16px", fontWeight: "600", color: "var(--blackberry)", textUnderlineOffset: "4px" }}>
                        {"WhatsApp didn't open? Tap here "}
                        <span className="gi-arr" aria-hidden="true">
                          →
                        </span>
                      </a>
                    </div>
                    {" "}
                  </>
                ) : null}
                {" "}
                {v.schoolNotSent ? (
                  <>
                    {" "}
                    <form onSubmit={v.sendSchool} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                      {" "}
                      <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "15px", fontWeight: "600" }}>
                        School
                        <input className="gi-in" required name="school" style={{ font: "400 17px 'Source Sans 3',sans-serif", padding: "16px", border: "1px solid var(--input-border)", background: "var(--warm-white)", color: "var(--blackberry)", borderRadius: "2px" }} />
                      </label>
                      {" "}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,200px),1fr))", gap: "16px" }}>
                        {" "}
                        <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "15px", fontWeight: "600" }}>
                          Your name
                          <input className="gi-in" required name="name" autoComplete="name" style={{ font: "400 17px 'Source Sans 3',sans-serif", padding: "16px", border: "1px solid var(--input-border)", background: "var(--warm-white)", color: "var(--blackberry)", borderRadius: "2px" }} />
                        </label>
                        {" "}
                        <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "15px", fontWeight: "600" }}>
                          Role
                          <input className="gi-in" required name="role" style={{ font: "400 17px 'Source Sans 3',sans-serif", padding: "16px", border: "1px solid var(--input-border)", background: "var(--warm-white)", color: "var(--blackberry)", borderRadius: "2px" }} />
                        </label>
                        {" "}
                      </div>
                      {" "}
                      <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "15px", fontWeight: "600" }}>
                        Email
                        <input className="gi-in" required type="email" name="email" autoComplete="email" onChange={v.setSchoolEmail} style={{ font: "400 17px 'Source Sans 3',sans-serif", padding: "16px", border: "1px solid var(--input-border)", background: "var(--warm-white)", color: "var(--blackberry)", borderRadius: "2px" }} />
                      </label>
                      {" "}
                      <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "15px", fontWeight: "600" }}>
                        Preferred dates
                        <input className="gi-in" name="dates" style={{ font: "400 17px 'Source Sans 3',sans-serif", padding: "16px", border: "1px solid var(--input-border)", background: "var(--warm-white)", color: "var(--blackberry)", borderRadius: "2px" }} />
                      </label>
                      {" "}
                      <button type="submit" className="gi-btn gi-bgbb" style={{ textTransform: "uppercase", letterSpacing: "0.08em", cursor: "pointer", border: "0", background: "var(--blackberry)", color: "var(--warm-white)", font: "600 16px 'Source Sans 3',sans-serif", padding: "20px 32px", borderRadius: "2px" }}>
                        Book a talk
                      </button>
                      {" "}
                      <p style={{ margin: "0", fontSize: "13px", lineHeight: "1.5", color: "var(--muted)" }}>
                        By sending this you agree to our {" "}<a href="/privacy" target="_blank" rel="noopener" style={{ color: "inherit", textUnderlineOffset: "3px" }}>privacy policy</a>.
                      </p>
                    </form>
                    {" "}
                  </>
                ) : null}
                {" "}
              </div>
              {" "}
            </section>
            {" "}
            <section style={{ background: "var(--warm-white)", borderTop: "1px solid var(--rule)" }}>
              {" "}
              <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "24px clamp(20px,5vw,64px)", display: "flex", flexWrap: "wrap", gap: "8px 24px", fontSize: "15px", color: "var(--blackberry-soft)" }}>
                <span>
                  <span style={{ fontWeight: "600", color: "var(--blackberry)" }}>
                    Free for schools.
                  </span>
                  {" No catch."}
                </span>
                <span>
                  Parents who want more can book the course. The school is never asked to promote it.
                </span>
              </div>
              {" "}
            </section>
            {" "}
          </>
        ) : null}
        {" "}
        
        {" "}
        {v.isTerms ? (
          <>
            {" "}
            <section data-screen-label="06 Terms" style={{ background: "var(--warm-white)" }}>
              {" "}
              <div style={{ maxWidth: "680px", margin: "0 auto", padding: "clamp(40px,6vw,88px) clamp(20px,5vw,32px)", display: "flex", flexDirection: "column", gap: "28px" }}>
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                    Terms
                  </p>
                  <h1 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(36px,4.6vw,56px)", lineHeight: "1.04", letterSpacing: "-0.02em", color: "var(--blackberry)" }}>
                    Terms and the DegreeYourWay Guarantee
                  </h1>
                </div>
                {" "}
                <section style={{ padding: "28px 0 0", borderTop: "1px solid var(--rule)" }}>
                  <h2 style={{ margin: "0 0 12px", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "24px", lineHeight: "1.2", color: "var(--blackberry)" }}>
                    1. Who this agreement is with
                  </h2>
                  <p style={{ margin: "0 0 12px", fontSize: "16px", lineHeight: "1.65", color: "var(--blackberry-soft)" }}>
                    DegreeYourWay Ltd. For students under 18, the contract is with their parent or guardian.
                  </p>
                </section>
                {" "}
                <section style={{ padding: "28px 0 0", borderTop: "1px solid var(--rule)" }}>
                  <h2 style={{ margin: "0 0 12px", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "24px", lineHeight: "1.2", color: "var(--blackberry)" }}>
                    2. What’s included
                  </h2>
                  <p style={{ margin: "0 0 12px", fontSize: "16px", lineHeight: "1.65", color: "var(--blackberry-soft)" }}>
                    Two days of preparation in London: two timed test sittings with marks explained, a scored video interview, a full mock assessment centre with a written report, two application reviews, the Route Map and the Deadline Line.
                  </p>
                </section>
                {" "}
                <section style={{ padding: "28px 0 0", borderTop: "1px solid var(--rule)" }}>
                  <h2 style={{ margin: "0 0 12px", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "24px", lineHeight: "1.2", color: "var(--blackberry)" }}>
                    3. Dates and venue
                  </h2>
                  <p style={{ margin: "0 0 12px", fontSize: "16px", lineHeight: "1.65", color: "var(--blackberry-soft)" }}>
                    Central London. Exact dates are confirmed to deposit holders first. If the confirmed dates don’t suit you, the deposit is refunded in full.
                  </p>
                </section>
                {" "}
                <section style={{ padding: "28px 0 0", borderTop: "1px solid var(--rule)" }}>
                  <h2 style={{ margin: "0 0 12px", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "24px", lineHeight: "1.2", color: "var(--blackberry)" }}>
                    4. Deposit, balance and refunds
                  </h2>
                  <p style={{ margin: "0 0 12px", fontSize: "16px", lineHeight: "1.65", color: "var(--blackberry-soft)" }}>
                    A £100 deposit holds a seat and is refundable until the balance is due. The £495 balance is due before the course. One free move to a later cohort.
                  </p>
                </section>
                {" "}
                <section style={{ padding: "28px 0 0", borderTop: "1px solid var(--rule)" }}>
                  <h2 style={{ margin: "0 0 12px", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "24px", lineHeight: "1.2", color: "var(--blackberry)" }}>
                    5. The Deadline Line
                  </h2>
                  <p style={{ margin: "0 0 12px", fontSize: "16px", lineHeight: "1.65", color: "var(--blackberry-soft)" }}>
                    From booking until the student’s last application deadline, they can message our team on WhatsApp at any time. We reply within 24 hours, every day, on applications, tests, interviews and assessment centres.
                  </p>
                </section>
                {" "}
                <section style={{ padding: "28px 0 0", borderTop: "1px solid var(--rule)" }}>
                  <h2 style={{ margin: "0 0 12px", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "24px", lineHeight: "1.2", color: "var(--blackberry)" }}>
                    6. Conduct and safeguarding
                  </h2>
                  <p style={{ margin: "0 0 12px", fontSize: "16px", lineHeight: "1.65", color: "var(--blackberry-soft)" }}>
                    Under-18s are supervised throughout. On placements they work with a named supervisor, at our venue or with the owner present, and the firm’s employer’s liability cover is confirmed before day one.
                  </p>
                </section>
                {" "}
                <section style={{ padding: "28px 0 0", borderTop: "1px solid var(--rule)" }}>
                  <h2 style={{ margin: "0 0 12px", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "24px", lineHeight: "1.2", color: "var(--blackberry)" }}>
                    7. The DegreeYourWay Guarantee
                  </h2>
                  <p style={{ margin: "0 0 12px", fontSize: "16px", lineHeight: "1.65", color: "var(--blackberry-soft)" }}>
                    The student attends every module in full. They submit at least one application, reviewed by us, to at least three Level 6 or 7 apprenticeship schemes with deadlines within twelve months of the course. If no offer is received from any scheme applied to in that window, and a claim is made within thirteen months, they get one free place on a later cohort, in person or online, at our choice of date. An offer the student declines counts as an offer. Not transferable. No cash alternative.
                  </p>
                  <p style={{ margin: "0 0 12px", fontSize: "16px", lineHeight: "1.65", color: "var(--blackberry-soft)" }}>
                    To claim, message us with the application confirmations and outcomes within thirteen months of the course.
                  </p>
                </section>
                {" "}
                <section style={{ padding: "28px 0 0", borderTop: "1px solid var(--rule)" }}>
                  <h2 style={{ margin: "0 0 12px", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "24px", lineHeight: "1.2", color: "var(--blackberry)" }}>
                    8. What we don’t promise
                  </h2>
                  <p style={{ margin: "0 0 12px", fontSize: "16px", lineHeight: "1.65", color: "var(--blackberry-soft)" }}>
                    Employers make every hiring decision. We guarantee the preparation, not the outcome. DegreeYourWay is not affiliated with any employer or scheme named on this site.
                  </p>
                </section>
                {" "}
                <section style={{ padding: "28px 0 0", borderTop: "1px solid var(--rule)" }}>
                  <h2 style={{ margin: "0 0 12px", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "24px", lineHeight: "1.2", color: "var(--blackberry)" }}>
                    9. Changes to these terms
                  </h2>
                  <p style={{ margin: "0 0 12px", fontSize: "16px", lineHeight: "1.65", color: "var(--blackberry-soft)" }}>
                    If we change these terms we’ll update the date below. Changes never apply to a booking already paid for.
                  </p>
                </section>
                {" "}
                <p style={{ margin: "0", fontSize: "14px", color: "var(--muted)" }}>
                  Last updated 29 September 2026.
                </p>
                {" "}
              </div>
              {" "}
            </section>
            {" "}
          </>
        ) : null}
        {" "}
        {v.isBooked ? (
          <>
            {" "}
            <section data-screen-label="07 Call booked" style={{ background: "var(--bone)", minHeight: "60vh" }} className="gi-bgbone">
              {" "}
              <div style={{ maxWidth: "680px", margin: "0 auto", padding: "clamp(56px,8vw,120px) clamp(20px,5vw,32px)", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px" }}>
                {" "}
                <p style={{ margin: "0", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }} className="gi-up">
                  Free call · 30 minutes
                </p>
                {" "}
                <h1 style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(48px,6vw,80px)", lineHeight: "1", letterSpacing: "-0.025em", color: "var(--blackberry)" }}>
                  Booked.
                </h1>
                {" "}
                <p style={{ margin: "0", fontSize: "18px", lineHeight: "1.6", color: "var(--blackberry-soft)", maxWidth: "44ch" }}>
                  {"You'll get a calendar invite now and a WhatsApp from Shreyash before the call. "}
                  <span style={{ fontWeight: "600", color: "var(--blackberry)" }}>
                    Bring your child's subjects and predicted grades.
                  </span>
                </p>
                {" "}
                <button type="button" onClick={v.goQuiz} data-cta="pathfinder" className="gi-pfcta">
                  Try the Pathfinder before the call
                  <span className="gi-bprice">
                    <span className="gi-bstrike">
                      £20
                    </span>
                    Free
                  </span>
                </button>
                {" "}
              </div>
              {" "}
            </section>
            {" "}
          </>
        ) : null}
        {" "}
      </main>
      {" "}
      {v.showBarPage ? (
        <>
          {" "}
          <div className="gi-mbar gi-bgbb" aria-hidden={v.barHidden} style={{ transform: v.barT, opacity: v.barO, pointerEvents: v.barPE, position: "fixed", left: "0", right: "0", top: "var(--gi-head,117px)", zIndex: "9", background: "var(--blackberry)", color: "var(--warm-white)", padding: "12px 20px", borderBottom: "1px solid var(--rule-dark)", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
            {" "}
            <span className="gi-mbar-price" style={{ display: "flex", flexDirection: "column", gap: "2px", lineHeight: "1.2" }}>
              <span style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                <span style={{ fontFamily: "'Newsreader',serif", fontSize: "24px" }}>
                  <span className="sc-interp">{v.myPrice}</span>
                </span>
                <span style={{ fontFamily: "'Newsreader',serif", fontSize: "16px", color: "var(--on-dark-muted)" }} className="gi-strike">
                  £695
                </span>
              </span>
              <span style={{ fontSize: "12px", color: "var(--on-dark-label)", fontWeight: "600", letterSpacing: "0.06em" }}>
                <span className="sc-interp">{v.mySave}</span>{" · "}<span className="sc-interp">{v.seatShort}</span>
              </span>
            </span>
            {" "}
            <span className="gi-mbar-acts">
              <button type="button" onClick={v.goQuiz} className="gi-pfbtn">
                <svg className="gi-pfico" width="18" height="18" viewBox="0 0 256 256" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="128" cy="128" r="96"></circle>
                  <polygon points="168 88 112 112 88 168 144 144 168 88" fill="currentColor" stroke="none"></polygon>
                </svg>
                Free Pathfinder
              </button>
              <button onClick={v.cta.mobile} data-cta="call_booked" className="gi-btn gi-bgbb" style={{ textTransform: "uppercase", letterSpacing: "0.08em", cursor: "pointer", whiteSpace: "nowrap", border: "0", background: "var(--blackberry)", color: "var(--warm-white)", font: "600 16px 'Source Sans 3',sans-serif", padding: "16px 24px", minHeight: "48px", borderRadius: "2px" }}>
                <span className="sc-interp">{v.ctaLabel}</span>
              </button>
            </span>
            {" "}
          </div>
          {" "}
        </>
      ) : null}
      {" "}
      {v.sampleOpen ? (
        <>
          {" "}
          <div onClick={v.closeSample} className="gi-backdrop" style={{ position: "fixed", inset: "0", zIndex: "50", background: "rgba(48,32,42,0.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
            {" "}
            <div role="dialog" id="dlg-sample" aria-modal="true" aria-labelledby="sample-title" onClick={v.stop} className="gi-pop gi-bgbone" style={{ background: "var(--bone)", maxWidth: "760px", width: "100%", maxHeight: "calc(100vh - 32px)", overflow: "auto", boxSizing: "border-box", padding: "clamp(22px,4vw,44px)", display: "flex", flexDirection: "column", gap: "24px" }}>
              {" "}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "0" }}>
                  {" "}
                  <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--blackberry)" }} className="gi-up">
                    {"Sample "}<span className="sc-interp">{v.sampleNum}</span>{" of 6"}
                  </span>
                  {" "}
                  <h2 id="sample-title" style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "clamp(28px,3.4vw,40px)", lineHeight: "1.05", letterSpacing: "-0.02em" }}>
                    <span className="sc-interp">{v.sampleTitle}</span>
                  </h2>
                  {" "}
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.5", color: "var(--blackberry-soft)" }}>
                    <span className="sc-interp">{v.sampleBenefit}</span>
                  </p>
                  {" "}
                </div>
                {" "}
                <button type="button" onClick={v.closeSample} aria-label="Close" className="gi-ghost" style={{ all: "unset", cursor: "pointer", fontSize: "28px", lineHeight: "1", color: "var(--blackberry)", padding: "4px 8px" }}>
                  ×
                </button>
                {" "}
              </div>
              {" "}
              {v.sample0 ? (
                <>
                  <div className="gi-bigpaper">
                    <div className="gi-paper" style={{ background: "var(--warm-white)", border: "1px solid var(--rule)", padding: "24px", display: "flex", flexDirection: "column", gap: "12px", minHeight: "0", boxSizing: "border-box" }}>
                      {" "}
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", alignItems: "center", lineHeight: "1", paddingBottom: "12px", borderBottom: "1px solid var(--blackberry)" }}>
                        <span style={{ flex: "1 1 auto", minWidth: "0", whiteSpace: "nowrap" }}>
                          Route Map
                        </span>
                        <span style={{ color: "var(--blackberry)" }}>
                          Sample
                        </span>
                      </div>
                      {" "}
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", paddingBottom: "8px", borderBottom: "1px solid var(--rule)", fontSize: "14px" }}>
                        <span style={{ flex: "1 1 auto", minWidth: "0" }}>
                          A · Professional services
                        </span>
                        <span style={{ fontWeight: "600", whiteSpace: "nowrap", flex: "0 0 auto" }}>
                          Closes Nov
                        </span>
                      </div>
                      {" "}
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", paddingBottom: "8px", borderBottom: "1px solid var(--rule)", fontSize: "14px" }}>
                        <span style={{ flex: "1 1 auto", minWidth: "0" }}>
                          B · Bank, technology
                        </span>
                        <span style={{ fontWeight: "600", whiteSpace: "nowrap", flex: "0 0 auto" }}>
                          Closes Dec
                        </span>
                      </div>
                      {" "}
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", paddingBottom: "8px", borderBottom: "1px solid var(--rule)", fontSize: "14px" }}>
                        <span style={{ flex: "1 1 auto", minWidth: "0" }}>
                          C · Engineering
                        </span>
                        <span style={{ fontWeight: "600", whiteSpace: "nowrap", flex: "0 0 auto" }}>
                          Rolling
                        </span>
                      </div>
                      {" "}
                      <span style={{ fontSize: "14px", color: "var(--blackberry-soft)" }}>
                        Apply to A first. Its tests open a week after applying.
                      </span>
                      {" "}
                    </div>
                  </div>
                </>
              ) : null}
              {" "}
              {v.sample1 ? (
                <>
                  <div className="gi-bigpaper">
                    <div className="gi-paper" style={{ background: "var(--warm-white)", border: "1px solid var(--rule)", padding: "24px", display: "flex", flexDirection: "column", gap: "12px", minHeight: "0", boxSizing: "border-box" }}>
                      {" "}
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", alignItems: "center", lineHeight: "1", paddingBottom: "12px", borderBottom: "1px solid var(--blackberry)" }}>
                        <span style={{ flex: "1 1 auto", minWidth: "0", whiteSpace: "nowrap" }}>
                          Test scorecard
                        </span>
                        <span style={{ color: "var(--blackberry)" }}>
                          Sample
                        </span>
                      </div>
                      {" "}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "8px 16px", fontSize: "14px", alignItems: "baseline" }}>
                        {" "}
                        <span style={{ color: "var(--muted)", fontSize: "12px" }}>
                          Test
                        </span>
                        <span style={{ color: "var(--muted)", fontSize: "12px", whiteSpace: "nowrap" }}>
                          1st
                        </span>
                        <span style={{ color: "var(--muted)", fontSize: "12px", whiteSpace: "nowrap" }}>
                          2nd
                        </span>
                        {" "}
                        <span>
                          Numerical
                        </span>
                        <span>
                          58%
                        </span>
                        <span style={{ fontWeight: "600", color: "var(--blackberry)" }}>
                          74%
                        </span>
                        {" "}
                        <span>
                          Verbal
                        </span>
                        <span>
                          66%
                        </span>
                        <span style={{ fontWeight: "600", color: "var(--blackberry)" }}>
                          71%
                        </span>
                        {" "}
                        <span>
                          Situational judgement
                        </span>
                        <span>
                          70%
                        </span>
                        <span style={{ fontWeight: "600", color: "var(--blackberry)" }}>
                          82%
                        </span>
                        {" "}
                      </div>
                      {" "}
                      <span style={{ fontSize: "14px", color: "var(--blackberry-soft)" }}>
                        Numerical marks lost on percentage change. Practise set 3.
                      </span>
                      {" "}
                    </div>
                  </div>
                </>
              ) : null}
              {" "}
              {v.sample2 ? (
                <>
                  <div className="gi-bigpaper">
                    <div className="gi-paper" style={{ background: "var(--warm-white)", border: "1px solid var(--rule)", padding: "24px", display: "flex", flexDirection: "column", gap: "12px", minHeight: "0", boxSizing: "border-box" }}>
                      {" "}
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", alignItems: "center", lineHeight: "1", paddingBottom: "12px", borderBottom: "1px solid var(--blackberry)" }}>
                        <span style={{ flex: "1 1 auto", minWidth: "0", whiteSpace: "nowrap" }}>
                          Video interview
                        </span>
                        <span style={{ color: "var(--blackberry)" }}>
                          Sample
                        </span>
                      </div>
                      {" "}
                      <span style={{ fontSize: "15px", fontWeight: "600" }}>
                        Q2. Tell us about a time you worked in a team.
                      </span>
                      {" "}
                      <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                        <span style={{ fontFamily: "'Newsreader',serif", fontSize: "44px", lineHeight: "1" }}>
                          3
                        </span>
                        <span style={{ fontSize: "14px", color: "var(--muted)" }}>
                          out of 5
                        </span>
                      </div>
                      {" "}
                      <span style={{ fontSize: "14px", lineHeight: "1.5", color: "var(--blackberry-soft)" }}>
                        Clear situation and task. The result is missing: say what changed because of you. 40 seconds over.
                      </span>
                      {" "}
                    </div>
                  </div>
                </>
              ) : null}
              {" "}
              {v.sample3 ? (
                <>
                  <div className="gi-bigpaper">
                    <div className="gi-paper" style={{ background: "var(--warm-white)", border: "1px solid var(--rule)", padding: "24px", display: "flex", flexDirection: "column", gap: "12px", minHeight: "0", boxSizing: "border-box" }}>
                      {" "}
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", alignItems: "center", lineHeight: "1", paddingBottom: "12px", borderBottom: "1px solid var(--blackberry)" }}>
                        <span style={{ flex: "1 1 auto", minWidth: "0", whiteSpace: "nowrap" }}>
                          Assessment centre
                        </span>
                        <span style={{ color: "var(--blackberry)" }}>
                          Sample
                        </span>
                      </div>
                      {" "}
                      {(v.scorecard || []).map((r: any, r_i: number) => (
                        <Fragment key={r_i}>
                          {" "}
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", paddingBottom: "8px", borderBottom: "1px solid var(--rule)", fontSize: "14px" }}>
                            {" "}
                            <span>
                              <span className="sc-interp">{r.k}</span>
                            </span>
                            {" "}
                            <span style={{ display: "flex", gap: "4px" }}>
                              {(r.pips || []).map((p: any, p_i: number) => (
                                <Fragment key={p_i}>
                                  <span style={{ width: "16px", height: "7px", background: p }}></span>
                                </Fragment>
                              ))}
                            </span>
                            {" "}
                          </div>
                          {" "}
                        </Fragment>
                      ))}
                      {" "}
                      <span style={{ fontSize: "14px", lineHeight: "1.5", color: "var(--blackberry-soft)", fontStyle: "italic" }}>
                        {"\"Strong case study. In the group, bring others in before you summarise.\""}
                      </span>
                      {" "}
                    </div>
                  </div>
                </>
              ) : null}
              {" "}
              {v.sample4 ? (
                <>
                  <div className="gi-bigpaper">
                    <div className="gi-paper" style={{ background: "var(--warm-white)", border: "1px solid var(--rule)", padding: "24px", display: "flex", flexDirection: "column", gap: "12px", minHeight: "0", boxSizing: "border-box" }}>
                      {" "}
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", alignItems: "center", lineHeight: "1", paddingBottom: "12px", borderBottom: "1px solid var(--blackberry)" }}>
                        <span style={{ flex: "1 1 auto", minWidth: "0", whiteSpace: "nowrap" }}>
                          Application
                        </span>
                        <span style={{ color: "var(--blackberry)" }}>
                          Sample
                        </span>
                      </div>
                      {" "}
                      <p style={{ margin: "0", fontFamily: "'Newsreader',serif", fontSize: "17px", lineHeight: "1.55" }}>
                        {"I want to join because "}
                        <span style={{ textDecoration: "line-through", color: "var(--muted)" }}>
                          I am passionate about technology
                        </span>
                        {" "}
                        <span style={{ background: "rgba(130,61,72,0.14)", padding: "1px 4px", WebkitBoxDecorationBreak: "clone", boxDecorationBreak: "clone" }}>
                          I built a budgeting app for my sixth form's charity week.
                        </span>
                      </p>
                      {" "}
                      <span style={{ fontSize: "14px", lineHeight: "1.5", color: "var(--blackberry-soft)", paddingLeft: "12px", borderLeft: "2px solid var(--blackberry)" }}>
                        Every scheme reads "passionate". Replace it with something you did.
                      </span>
                      {" "}
                    </div>
                  </div>
                </>
              ) : null}
              {" "}
              {v.sample5 ? (
                <>
                  <div className="gi-bigpaper">
                    <div className="gi-paper" style={{ background: "var(--warm-white)", border: "1px solid var(--rule)", padding: "24px", display: "flex", flexDirection: "column", gap: "12px", minHeight: "0", boxSizing: "border-box" }}>
                      {" "}
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", alignItems: "center", lineHeight: "1", paddingBottom: "12px", borderBottom: "1px solid var(--blackberry)" }}>
                        <span style={{ flex: "1 1 auto", minWidth: "0", whiteSpace: "nowrap" }}>
                          Action plan
                        </span>
                        <span style={{ color: "var(--blackberry)" }}>
                          Sample
                        </span>
                      </div>
                      {" "}
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", paddingBottom: "8px", borderBottom: "1px solid var(--rule)", fontSize: "14px" }}>
                        <span style={{ flex: "1 1 auto", minWidth: "0" }}>
                          Week 1
                        </span>
                        <span style={{ fontWeight: "600", whiteSpace: "nowrap", flex: "0 0 auto" }}>
                          3 numerical practice sets
                        </span>
                      </div>
                      {" "}
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", paddingBottom: "8px", borderBottom: "1px solid var(--rule)", fontSize: "14px" }}>
                        <span style={{ flex: "1 1 auto", minWidth: "0" }}>
                          Week 2
                        </span>
                        <span style={{ fontWeight: "600", whiteSpace: "nowrap", flex: "0 0 auto" }}>
                          Rewrite motivation answer
                        </span>
                      </div>
                      {" "}
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", paddingBottom: "8px", borderBottom: "1px solid var(--rule)", fontSize: "14px" }}>
                        <span style={{ flex: "1 1 auto", minWidth: "0" }}>
                          Before each centre
                        </span>
                        <span style={{ fontWeight: "600", whiteSpace: "nowrap", flex: "0 0 auto" }}>
                          Group exercise run-through
                        </span>
                      </div>
                      {" "}
                      <span style={{ fontSize: "14px", color: "var(--blackberry-soft)" }}>
                        Questions go to the Deadline Line. The founder replies on WhatsApp within 24 hours, every day.
                      </span>
                      {" "}
                    </div>
                  </div>
                </>
              ) : null}
              {" "}
              <p style={{ margin: "0", fontSize: "14px", color: "var(--muted)" }}>
                Illustrative sample. Your child's version is written about them.
              </p>
              {" "}
              <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", paddingTop: "16px", borderTop: "1px solid var(--rule)" }}>
                {" "}
                <button type="button" onClick={v.prevSample} className="gi-ghost" style={{ all: "unset", cursor: "pointer", fontSize: "16px", fontWeight: "600", color: "var(--blackberry)", textDecoration: "underline", textUnderlineOffset: "4px" }}>
                  ← Previous
                </button>
                {" "}
                <button type="button" onClick={v.nextSample} className="gi-ghost" style={{ all: "unset", cursor: "pointer", fontSize: "16px", fontWeight: "600", color: "var(--blackberry)", textDecoration: "underline", textUnderlineOffset: "4px" }}>
                  Next →
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
      {v.guideOpen ? (
        <>
          {" "}
          <div onClick={v.closeGuide} className="gi-backdrop" style={{ position: "fixed", inset: "0", zIndex: "50", background: "rgba(48,32,42,0.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
            {" "}
            <div role="dialog" id="dlg-guide" aria-modal="true" aria-labelledby="guide-title" onClick={v.stop} className="gi-pop" style={{ background: "var(--warm-white)", maxWidth: "480px", width: "100%", boxSizing: "border-box", padding: "clamp(28px,4vw,44px)", display: "flex", flexDirection: "column", gap: "20px" }}>
              {" "}
              <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "flex-start" }}>
                {" "}
                <h2 id="guide-title" style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "34px", lineHeight: "1.05", letterSpacing: "-0.02em" }}>
                  The free Parent's Guide
                </h2>
                {" "}
                <button onClick={v.closeGuide} aria-label="Close" className="gi-ghost" style={{ all: "unset", cursor: "pointer", fontSize: "26px", lineHeight: "1", padding: "4px 8px" }}>
                  ×
                </button>
                {" "}
              </div>
              {" "}
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.5", color: "var(--blackberry-soft)" }}>
                How degree apprenticeship applications work, stage by stage, and when to start preparing. 15 pages, every figure sourced.
              </p>
              {" "}
              {v.guideLocked ? (
                <>
                  {" "}
                  <form onSubmit={v.unlockGuide} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {" "}
                    <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "15px", fontWeight: "600", color: "var(--blackberry)" }}>
                      Email
                      <input className="gi-in" required type="email" name="email" autoComplete="email" style={{ width: "100%", boxSizing: "border-box", font: "400 16px 'Source Sans 3',sans-serif", height: "48px", padding: "0 14px", border: "1px solid var(--input-border)", background: "var(--warm-white)", color: "var(--blackberry)", borderRadius: "2px" }} />
                    </label>
                    {" "}
                    <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "15px", fontWeight: "600", color: "var(--blackberry)" }}>
                      Mobile number
                      <input className="gi-in" required type="tel" name="phone" autoComplete="tel" inputMode="tel" pattern="[0-9 +]{10,16}" minLength={10} maxLength={16} title="A UK mobile number, for example 07700 900123" placeholder="07700 900123" style={{ width: "100%", boxSizing: "border-box", font: "400 16px 'Source Sans 3',sans-serif", height: "48px", padding: "0 14px", border: "1px solid var(--input-border)", background: "var(--warm-white)", color: "var(--blackberry)", borderRadius: "2px" }} />
                    </label>
                    {" "}
                    <button type="submit" className="gi-btn gi-bgbb" style={{ cursor: "pointer", border: "0", textTransform: "uppercase", letterSpacing: "0.08em", background: "var(--blackberry)", color: "var(--warm-white)", font: "600 16px 'Source Sans 3',sans-serif", height: "52px", borderRadius: "2px" }}>
                      Get the free guide
                    </button>
                    {" "}
                    <span style={{ fontSize: "13px", lineHeight: "1.5", color: "var(--muted)" }}>
                      We use these to send the guide and course updates. No spam, and you can opt out any time.
                    </span>
                    {" "}
                    <p style={{ margin: "0", fontSize: "13px", lineHeight: "1.5", color: "var(--muted)" }}>
                      By sending this you agree to our {" "}<a href="/privacy" target="_blank" rel="noopener" style={{ color: "inherit", textUnderlineOffset: "3px" }}>privacy policy</a>.
                    </p>
                  </form>
                  {" "}
                </>
              ) : null}
              {" "}
              {v.guideUnlocked ? (
                <>
                  {" "}
                  <div role="status" className="gi-fade" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {" "}
                    <a href="/assets/get-in-parents-guide-2026-27.pdf" download="DegreeYourWay - Parents' Guide 2026-27.pdf" onClick={v.guideTap} className="gi-btn gi-bgbb" style={{ display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em", cursor: "pointer", background: "var(--blackberry)", color: "var(--warm-white)", font: "600 16px 'Source Sans 3',sans-serif", height: "52px", borderRadius: "2px" }}>
                      Download the PDF
                    </a>
                    {" "}
                    <a href={v.waGuideHref} target="_blank" rel="noopener" onClick={v.guideTap} className="gi-ghost" style={{ alignSelf: "flex-start", fontSize: "16px", fontWeight: "600", color: "var(--blackberry)", textUnderlineOffset: "4px" }}>
                      {"Or send it to me on WhatsApp "}
                      <span className="gi-arr" aria-hidden="true">
                        →
                      </span>
                    </a>
                    {" "}
                  </div>
                  {" "}
                </>
              ) : null}
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </>
      ) : null}
      {" "}
      <nav aria-label="Sections on this page" className={`gi-rail ${v.railDark}`}>
        {" "}
        <span className="gi-railtrack" aria-hidden="true">
          <span ref={v.railFillRef} className="gi-railfill"></span>
        </span>
        {" "}
        <ol style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "4px" }}>
          {" "}
          {(v.railItems || []).map((r: any, r_i: number) => (
            <Fragment key={r_i}>
              {" "}
              <li>
                <button type="button" onClick={r.go} aria-current={r.cur} aria-label={r.label} className={`gi-railbtn ${r.cls}`}>
                  <span className="gi-raillab">
                    <span className="sc-interp">{r.label}</span>
                  </span>
                  <span className="gi-railnum">
                    <span className="sc-interp">{r.num}</span>
                  </span>
                  <span className="gi-raildot" aria-hidden="true"></span>
                </button>
              </li>
              {" "}
            </Fragment>
          ))}
          {" "}
        </ol>
        {" "}
      </nav>
      {" "}
      <div className="gi-railm" aria-hidden="true">
        <span ref={v.railFillMRef} className="gi-railmfill"></span>
      </div>
      {" "}
      {v.offerOpen ? (
        <>
          {" "}
          <div onClick={v.closeOffer} className="gi-backdrop" style={{ position: "fixed", inset: "0", zIndex: "55", background: "rgba(48,32,42,0.38)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
            {" "}
            <div role="dialog" id="dlg-offer" aria-modal="true" aria-labelledby="offer-title" onClick={v.stop} className="gi-pop gi-offer" style={{ position: "relative", background: "var(--slate)", color: "var(--warm-white)", width: "100%", maxWidth: "380px", maxHeight: "calc(100dvh - 48px)", overflow: "auto", boxSizing: "border-box", padding: "24px 22px 18px", display: "flex", flexDirection: "column", gap: "14px", borderRadius: "8px", boxShadow: "0 24px 60px -12px rgba(20,14,18,0.55),0 2px 8px rgba(20,14,18,0.25)" }}>
              {" "}
              <button type="button" onClick={v.closeOffer} aria-label="Close" style={{ all: "unset", cursor: "pointer", position: "absolute", top: "6px", right: "6px", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", color: "var(--on-dark-muted)", borderRadius: "50%" }}>
                ×
              </button>
              {" "}
              {v.offerNotSent ? (
                <>
                  {" "}
                  <h2 id="offer-title" style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "26px", lineHeight: "1.1", letterSpacing: "-0.02em", paddingRight: "28px" }}>
                    Not sure where to apply?
                  </h2>
                  {" "}
                  <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.5", color: "var(--on-dark-body)" }}>
                    {"Get a free 30-minute call with Shreyash, who used this process to get offers from "}
                    <span style={{ color: "var(--warm-white)", fontWeight: "600" }}>
                      Deloitte, Goldman Sachs, PwC and Accenture
                    </span>
                    .
                  </p>
                  {" "}
                  <form onSubmit={v.sendOffer} noValidate={true} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {" "}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "10px" }}>
                      {" "}
                      <label style={{ position: "relative" }}>
                        <span style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>
                          First name
                        </span>
                        <input className="gi-in" required name="name" autoComplete="given-name" placeholder="First name" aria-invalid={v.oNameErr} style={{ width: "100%", boxSizing: "border-box", font: "400 16px 'Source Sans 3',sans-serif", height: "44px", padding: "0 12px", border: "1px solid var(--input-border-dark)", background: "var(--input-dark)", color: "var(--warm-white)", borderRadius: "4px" }} />
                      </label>
                      {" "}
                      <label style={{ position: "relative" }}>
                        <span style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>
                          Mobile (optional)
                        </span>
                        <input className="gi-in" type="tel" name="phone" autoComplete="tel" inputMode="tel" pattern="[0-9 +]{10,16}" maxLength={16} placeholder="Mobile (optional)" style={{ width: "100%", boxSizing: "border-box", font: "400 16px 'Source Sans 3',sans-serif", height: "44px", padding: "0 12px", border: "1px solid var(--input-border-dark)", background: "var(--input-dark)", color: "var(--warm-white)", borderRadius: "4px" }} />
                      </label>
                      {" "}
                    </div>
                    {" "}
                    <label style={{ position: "relative" }}>
                      <span style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>
                        Email
                      </span>
                      <input className="gi-in" required type="email" name="email" autoComplete="email" placeholder="Email" aria-invalid={v.oEmailErr} style={{ width: "100%", boxSizing: "border-box", font: "400 16px 'Source Sans 3',sans-serif", height: "44px", padding: "0 12px", border: "1px solid var(--input-border-dark)", background: "var(--input-dark)", color: "var(--warm-white)", borderRadius: "4px" }} />
                    </label>
                    {" "}
                    {v.oHasErr ? (
                      <>
                        <p role="alert" className="gi-oerr">
                          <span className="sc-interp">{v.oErrText}</span>
                        </p>
                      </>
                    ) : null}
                    {" "}
                    <button type="submit" className="gi-btn gi-btn-ox" style={{ cursor: "pointer", border: "0", font: "600 16px 'Source Sans 3',sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", height: "52px", borderRadius: "2px", width: "100%" }}>
                      Book my discovery call
                      <span className="gi-bprice">
                        <span className="gi-bstrike">
                          £50
                        </span>
                        Free
                      </span>
                    </button>
                    {" "}
                    <div className="gi-oor" aria-hidden="true">
                      <span>
                        or
                      </span>
                    </div>
                    {" "}
                    <button type="button" onClick={v.offerQuiz} className="gi-osec">
                      <svg className="gi-pfico" width="18" height="18" viewBox="0 0 256 256" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="128" cy="128" r="96"></circle>
                        <polygon points="168 88 112 112 88 168 144 144 168 88" fill="currentColor" stroke="none"></polygon>
                      </svg>
                      Try the Pathfinder
                      <span className="gi-bprice">
                        <span className="gi-bstrike">
                          £20
                        </span>
                        Free
                      </span>
                    </button>
                    {" "}
                    <span style={{ fontSize: "12px", lineHeight: "1.4", color: "var(--on-dark-muted)", textAlign: "center" }}>
                      90 seconds · no details needed to start
                    </span>
                    {" "}
                    <p style={{ margin: "0", fontSize: "13px", lineHeight: "1.5", color: "var(--on-dark-muted)" }}>
                      By sending this you agree to our {" "}<a href="/privacy" target="_blank" rel="noopener" style={{ color: "inherit", textUnderlineOffset: "3px" }}>privacy policy</a>.
                    </p>
                  </form>
                  {" "}
                </>
              ) : null}
              {" "}
              {v.offerSent ? (
                <>
                  {" "}
                  <div role="status" className="gi-fade" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {" "}
                    <h2 id="offer-title" style={{ margin: "0", fontFamily: "'Newsreader',serif", fontWeight: "400", fontSize: "32px", lineHeight: "1.1" }}>
                      {"Thanks, "}<span className="sc-interp">{v.offerName}</span>. Your discovery call is requested.
                    </h2>
                    {" "}
                    <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.5", color: "var(--on-dark-body)" }}>
                      {"Shreyash will email "}<span className="sc-interp">{v.offerEmail}</span>{" to find a time. Try the Pathfinder first and bring your roadmap PDF to the call."}
                    </p>
                    {" "}
                    <a href={v.calHref} target="_blank" rel="noopener" onClick={v.calTap} data-cta="call_booked" className="gi-btn gi-btn-ox" style={{ width: "100%" }}>
                      Pick a time for the call
                    </a>
                    {" "}
                    <button type="button" onClick={v.offerQuiz} className="gi-osec" style={{ cursor: "pointer", border: "0", font: "600 16px 'Source Sans 3',sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", height: "52px", borderRadius: "2px", width: "100%" }}>
                      Try the free Pathfinder
                    </button>
                    {" "}
                  </div>
                  {" "}
                </>
              ) : null}
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </>
      ) : null}
      {" "}
      {v.pingOn ? (
        <>
          {" "}
          <div className={`gi-ping ${v.pingCls}`} role="status" aria-live="polite">
            {" "}
            <span className="gi-pingdot" aria-hidden="true"></span>
            {" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: "0", flex: "1 1 auto" }}>
              {" "}
              <span style={{ fontSize: "15px", fontWeight: "600", lineHeight: "1.3", color: "var(--warm-white)" }}>
                A seat was just reserved
              </span>
              {" "}
              <span style={{ fontSize: "13px", lineHeight: "1.35", color: "var(--on-dark-muted)" }}>
                {"Only "}<span className="sc-interp">{v.pingLeft}</span>{" of "}<span className="sc-interp">{v.pingTotal}</span>{" founding seats left."}
              </span>
              {" "}
            </div>
            {" "}
            <button type="button" onClick={v.pingReserve} className="gi-pingcta">
              Reserve
            </button>
            {" "}
            <button type="button" onClick={v.pingClose} aria-label="Dismiss" className="gi-pingx">
              ×
            </button>
            {" "}
          </div>
          {" "}
        </>
      ) : null}
      {" "}
      {v.chatClosed ? (
        <>
          {" "}
          <div className="gi-fabs">
            <button type="button" onClick={v.goQuiz} className="gi-fab gi-fab-pf" aria-label="Free Pathfinder: your degree apprenticeship roadmap in 90 seconds" title="Free Pathfinder">
              <svg width="24" height="24" viewBox="0 0 256 256" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="128" cy="128" r="96"></circle>
                <polygon points="168 88 112 112 88 168 144 144 168 88"></polygon>
              </svg>
              <span className="gi-fabtip" aria-hidden="true">
                Free Pathfinder
              </span>
            </button>
            <button type="button" onClick={v.openChat} className="gi-fab gi-fab-q gi-chatbtn" aria-label="Questions: instant answers" title="Questions">
              <svg width="24" height="24" viewBox="0 0 256 256" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round">
                <path d="M79.93,211.11a96,96,0,1,0-35-35h0L32.42,213.46a8,8,0,0,0,10.12,10.12l37.39-12.47Z"></path>
                <path d="M128,152v-4a28,28,0,1,0-28-28"></path>
                <circle cx="128" cy="184" r="4" fill="currentColor" stroke="none"></circle>
              </svg>
              <span className="gi-fabtip" aria-hidden="true">
                Questions
              </span>
            </button>
          </div>
          {" "}
        </>
      ) : null}
      {" "}
      {v.chatOpen ? (
        <>
          {" "}
          <div id="dlg-chat" role="dialog" aria-modal="false" aria-labelledby="chat-title" className="gi-chat gi-pop gi-bgbone" style={{ position: "fixed", right: "16px", bottom: "16px", zIndex: "45", width: "min(380px,calc(100vw - 32px))", height: "min(560px,calc(100dvh - 32px))", background: "var(--bone)", border: "1px solid var(--blackberry)", display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
            {" "}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", padding: "16px 20px", background: "var(--blackberry)", color: "var(--warm-white)" }} className="gi-bgbb">
              {" "}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
                <span id="chat-title" style={{ fontFamily: "'Newsreader',serif", fontSize: "22px", lineHeight: "1.1" }}>
                  Questions about DegreeYourWay
                </span>
                <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--on-dark-label)" }} className="gi-up">
                  Instant answers · founder on WhatsApp
                </span>
              </div>
              {" "}
              <button type="button" onClick={v.closeChat} aria-label="Close chat" style={{ all: "unset", cursor: "pointer", fontSize: "28px", lineHeight: "1", padding: "4px 8px", color: "var(--warm-white)" }}>
                ×
              </button>
              {" "}
            </div>
            {" "}
            <div ref={v.chatLogRef} aria-live="polite" style={{ flex: "1 1 auto", overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {" "}
              {(v.chatMsgs || []).map((m: any, m_i: number) => (
                <Fragment key={m_i}>
                  {" "}
                  <div style={{ alignSelf: m.align, maxWidth: "88%", background: m.bg, color: m.fg, border: `1px solid ${m.bd}`, padding: "12px 16px", fontSize: "16px", lineHeight: "1.5", whiteSpace: "pre-line" }}>
                    <span className="sc-interp">{m.text}</span>
                  </div>
                  {" "}
                  {m.hasAction ? (
                    <>
                      {" "}
                      <button type="button" onClick={m.act} className="gi-ghost" style={{ all: "unset", alignSelf: "flex-start", cursor: "pointer", fontSize: "15px", fontWeight: "600", color: "var(--blackberry)", textDecoration: "underline", textUnderlineOffset: "4px" }}>
                        <span className="sc-interp">{m.actLabel}</span>{" "}
                        <span className="gi-arr" aria-hidden="true">
                          →
                        </span>
                      </button>
                      {" "}
                    </>
                  ) : null}
                  {" "}
                </Fragment>
              ))}
              {" "}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "4px" }}>
                {" "}
                {(v.chatChips || []).map((c: any, c_i: number) => (
                  <Fragment key={c_i}>
                    {" "}
                    <button type="button" onClick={c.ask} className="gi-chip" style={{ cursor: "pointer", background: "transparent", border: "1px solid var(--blackberry)", color: "var(--blackberry)", font: "600 14px 'Source Sans 3',sans-serif", padding: "8px 12px", minHeight: "40px", borderRadius: "2px" }}>
                      <span className="sc-interp">{c.label}</span>
                    </button>
                    {" "}
                  </Fragment>
                ))}
                {" "}
              </div>
              {" "}
            </div>
            {" "}
            <form onSubmit={v.chatSend} style={{ display: "flex", gap: "8px", padding: "12px", borderTop: "1px solid var(--rule)", background: "var(--warm-white)" }}>
              {" "}
              <label style={{ flex: "1 1 auto", minWidth: "0" }}>
                <span style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}>
                  Your question
                </span>
                <input className="gi-in" value={v.chatDraft} onChange={v.setChatDraft} placeholder="Type a question" style={{ width: "100%", boxSizing: "border-box", font: "400 16px 'Source Sans 3',sans-serif", padding: "12px", border: "1px solid var(--input-border)", background: "var(--warm-white)", color: "var(--blackberry)", borderRadius: "2px", minHeight: "48px" }} />
              </label>
              {" "}
              <button type="submit" className="gi-btn gi-bgbb" style={{ cursor: "pointer", border: "0", background: "var(--blackberry)", color: "var(--warm-white)", font: "600 15px 'Source Sans 3',sans-serif", padding: "12px 16px", minHeight: "48px", borderRadius: "2px" }}>
                Ask
              </button>
              {" "}
            </form>
            {" "}
            <a href={v.waChatHref} target="_blank" rel="noopener" className="gi-ghost" style={{ display: "block", textAlign: "center", padding: "12px", fontSize: "15px", fontWeight: "600", color: "var(--blackberry)", textUnderlineOffset: "4px", background: "var(--warm-white)", borderTop: "1px solid var(--rule)" }}>
              {"Ask the founder on WhatsApp "}
              <span className="gi-arr" aria-hidden="true">
                →
              </span>
            </a>
            {" "}
          </div>
          {" "}
        </>
      ) : null}
      {" "}
      <footer style={{ borderTop: "1px solid var(--rule)" }}>
        {" "}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px clamp(20px,5vw,64px) 40px", display: "flex", flexWrap: "wrap", gap: "16px 48px", justifyContent: "space-between", alignItems: "baseline" }}>
          {" "}
          <span style={{ fontFamily: "'Newsreader',serif", fontSize: "22px", fontWeight: "500" }}>
            DegreeYourWay
          </span>
          {" "}
          <p style={{ margin: "0", maxWidth: "72ch", fontSize: "14px", lineHeight: "1.55", color: "var(--muted)" }}>
            {"Run by DegreeYourWay Ltd. Employers decide offers; no outcome is promised. Not affiliated with Deloitte or any employer or scheme named here. "}
          </p>
          {" "}
          <nav aria-label="Footer" style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px", fontSize: "14px" }}>
            {" "}
            <a href="/terms" onClick={v.goTermsLink} className="gi-ghost" style={{ all: "unset", cursor: "pointer", color: "var(--blackberry)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
              Terms and the Guarantee
            </a>
            {" "}
            <a href="/pathfinder" onClick={v.goQuizLink} className="gi-ghost" style={{ all: "unset", cursor: "pointer", color: "var(--blackberry)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
              Pathfinder
            </a>
            {" "}
            <a href="/privacy" style={{ color: "var(--blackberry)", textUnderlineOffset: "3px" }}>
              Privacy policy
            </a>
            {v.showCookieSettings ? (
              <button type="button" onClick={v.openCookieSettings} className="gi-ghost" style={{ all: "unset", cursor: "pointer", color: "var(--blackberry)", textDecoration: "underline", textUnderlineOffset: "3px" }}>Cookie settings</button>
            ) : null}
            {" "}
          </nav>
          {" "}
        </div>
        {" "}
      </footer>
      {" "}
    </div>
    </>
  );
}
