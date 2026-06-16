export default function HomeScreen() {
  return (
    <div className="mg-home">
      <style>{mgStyles}</style>

      {/* status bar inside top safe area */}
      <div className="mg-statusbar">
        <span>9:41</span>
        <span className="mg-signal">
          <svg width="17" height="11" viewBox="0 0 17 11" fill="none" aria-hidden>
            <rect x="0" y="6" width="3" height="5" rx="1" fill="#14110D" />
            <rect x="4.5" y="4" width="3" height="7" rx="1" fill="#14110D" />
            <rect x="9" y="2" width="3" height="9" rx="1" fill="#14110D" />
            <rect x="13.5" y="0" width="3" height="11" rx="1" fill="#14110D" />
          </svg>
        </span>
      </div>

      {/* header */}
      <header className="mg-header">
        <div className="mg-header-top">
          {/* sun / sparkle logo */}
          <svg className="mg-sun" viewBox="0 0 40 40" fill="none" aria-hidden>
            <circle cx="20" cy="20" r="11" fill="#FFC73C" />
            <g stroke="#14110D" strokeWidth="2.4" strokeLinecap="round">
              <path d="M20 2v6M20 32v6M2 20h6M32 20h6M7 7l4 4M29 29l4 4M33 7l-4 4M11 29l-4 4" />
            </g>
            <path d="M20 14l1.6 4.4L26 20l-4.4 1.6L20 26l-1.6-4.4L14 20l4.4-1.6z" fill="#14110D" />
          </svg>
          {/* bell */}
          <div className="mg-bell">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M9 2a4 4 0 0 0-4 4v3l-1.2 2.2c-.3.6.1 1.3.8 1.3h8.8c.7 0 1.1-.7.8-1.3L13 9V6a4 4 0 0 0-4-4z" fill="#fff" />
              <path d="M7.4 14.4a1.7 1.7 0 0 0 3.2 0" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <h1 className="mg-title">
          <span className="mg-spark-a">✦</span>
          <span className="mg-spark-b">⌃⌃</span>
          <span className="mg-ink">먹</span><span className="mg-go">GO</span>
          <span className="mg-ink" style={{ marginLeft: 8 }}>먹</span><span className="mg-nyam">냠</span>
        </h1>
        <p className="mg-subtitle">먹는 모든 순간을<br />저장하고 다시 꺼내요.</p>
      </header>

      {/* cards */}
      <main className="mg-cards">
        {/* EAT OUT */}
        <section className="mg-card mg-eatout">
          <div>
            <p className="mg-eyebrow">EAT OUT</p>
            <h2 className="mg-card-title">
              먹GO
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 2v7M9 2v7M7.5 9v13M16 2c-2 0-3 2-3 6s1 5 3 5v9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </h2>
          </div>
          <div className="mg-bottom-row">
            <p className="mg-desc">밖에서 먹고<br />싶은 곳</p>
            <div className="mg-go-btn">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h13M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          {/* fork-blob mascot + location pin */}
          <svg className="mg-art mg-art-eat" viewBox="0 0 170 170" fill="none" aria-hidden>
            <path d="M120 18c-13 0-23 10-23 22 0 16 23 30 23 30s23-14 23-30c0-12-10-22-23-22z" fill="#fff" stroke="#14110D" strokeWidth="3" />
            <circle cx="120" cy="40" r="7" fill="#14110D" />
            <path d="M70 56c-26 0-44 22-40 50 3 22 22 36 44 35 24-1 41-19 40-44-1-25-19-41-44-41z" fill="#fff" stroke="#14110D" strokeWidth="3.2" />
            <circle cx="62" cy="92" r="4.2" fill="#14110D" />
            <circle cx="86" cy="92" r="4.2" fill="#14110D" />
            <path d="M66 104c4 4 12 4 16 0" stroke="#14110D" strokeWidth="3" strokeLinecap="round" />
            <path d="M104 96c10-2 18-10 18-22" stroke="#14110D" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M120 60v18M126 60v18M123 78v22" stroke="#14110D" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </section>

        {/* COOK AT HOME */}
        <section className="mg-card mg-cook">
          <div>
            <p className="mg-eyebrow mg-eyebrow-dark">COOK AT HOME</p>
            <h2 className="mg-card-title mg-card-title-dark">먹냠</h2>
          </div>
          <div className="mg-bottom-row">
            <p className="mg-desc mg-desc-dark">집에서 해먹고<br />싶은 것</p>
            <div className="mg-go-btn">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h13M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          {/* chef-blob mascot with pot */}
          <svg className="mg-art mg-art-chef" viewBox="0 0 178 178" fill="none" aria-hidden>
            <path d="M58 34c-9 0-15 7-13 15-7 1-11 8-8 15 2 5 7 7 12 7h44c5 0 10-2 12-7 3-7-1-14-8-15 2-8-4-15-13-15-3-6-12-6-15 0-3-3-9-3-13 0z" fill="#fff" stroke="#14110D" strokeWidth="3" />
            <path d="M49 71h62" stroke="#14110D" strokeWidth="3" />
            <path d="M64 72c-14 1-22 12-20 26 1 8 7 13 16 13h40c9 0 15-6 16-14 2-14-7-24-21-25-9-1-22-1-31 0z" fill="#fff" stroke="#14110D" strokeWidth="3.2" />
            <circle cx="74" cy="92" r="4" fill="#14110D" />
            <circle cx="98" cy="92" r="4" fill="#14110D" />
            <path d="M80 102c3 3 9 3 12 0" stroke="#14110D" strokeWidth="2.8" strokeLinecap="round" />
            <path d="M44 120h92l-6 34c-1 6-6 10-12 10H62c-6 0-11-4-12-10l-6-34z" fill="#fff" stroke="#14110D" strokeWidth="3.2" />
            <path d="M36 120h108" stroke="#14110D" strokeWidth="3.4" strokeLinecap="round" />
            <path d="M62 120c2-10 10-14 16-10M82 120c1-12 12-14 18-8M104 120c2-9 9-12 14-8" stroke="#14110D" strokeWidth="3" strokeLinecap="round" />
            <path d="M130 96c8 0 14-6 14-16M141 70l8 14M145 67l6 12M149 64l4 11" stroke="#14110D" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </section>
      </main>

      {/* bottom nav inside bottom safe area */}
      <nav className="mg-tabbar">
        <button className="mg-tab" type="button">
          <svg viewBox="0 0 26 26" fill="none" aria-hidden><path d="M13 22S3 15.5 3 9.2C3 5.8 5.6 3.5 8.6 3.5c1.9 0 3.5 1 4.4 2.5.9-1.5 2.5-2.5 4.4-2.5 3 0 5.6 2.3 5.6 5.7C23 15.5 13 22 13 22z" fill="#FF54B0" /></svg>
          <span className="mg-tab-en">SAVE</span><span className="mg-tab-ko">저장</span>
        </button>
        <button className="mg-tab" type="button">
          <svg viewBox="0 0 26 26" fill="none" aria-hidden><circle cx="11" cy="11" r="7" stroke="#7C5CFF" strokeWidth="2.6" /><path d="M16.5 16.5L22 22" stroke="#7C5CFF" strokeWidth="2.6" strokeLinecap="round" /></svg>
          <span className="mg-tab-en">FIND</span><span className="mg-tab-ko">찾기</span>
        </button>
        <button className="mg-tab" type="button">
          <svg viewBox="0 0 26 26" fill="none" aria-hidden><path d="M7 3.5h12c1 0 1.6.7 1.6 1.6v16.3c0 .9-1 1.4-1.7.9L13 18.2l-5.9 4.1c-.7.5-1.7 0-1.7-.9V5.1c0-.9.6-1.6 1.6-1.6z" fill="#FFC73C" /></svg>
          <span className="mg-tab-en">ORGANIZE</span><span className="mg-tab-ko">정리</span>
        </button>
        <button className="mg-tab" type="button">
          <svg viewBox="0 0 26 26" fill="none" aria-hidden><circle cx="13" cy="13" r="10" stroke="#16CDB4" strokeWidth="2.6" /><circle cx="9.5" cy="11" r="1.6" fill="#16CDB4" /><circle cx="16.5" cy="11" r="1.6" fill="#16CDB4" /><path d="M9 16c1.6 2 6.4 2 8 0" stroke="#16CDB4" strokeWidth="2.4" strokeLinecap="round" /></svg>
          <span className="mg-tab-en">ENJOY</span><span className="mg-tab-ko">즐기기</span>
        </button>
      </nav>
    </div>
  );
}

const mgStyles = `
  .mg-home{
    position:relative;
    display:flex; flex-direction:column;
    min-height:100dvh; width:100%;
    background:#F4EEE1;
    color:#14110D;
    font-family:"Pretendard","SF Pro Display","Inter",system-ui,sans-serif;
    /* SAFE-AREA INSETS — top & bottom */
    padding-top:env(safe-area-inset-top, 59px);
    padding-bottom:env(safe-area-inset-bottom, 34px);
    overflow:hidden;
  }
  .mg-statusbar{
    position:absolute; top:0; left:0; right:0;
    height:env(safe-area-inset-top, 59px);
    display:flex; align-items:flex-end; justify-content:space-between;
    padding:0 26px 8px; font-size:14px; font-weight:700; color:#14110D;
    pointer-events:none;
  }
  .mg-header{ flex:0 0 auto; padding:6px 24px 4px; }
  .mg-header-top{ display:flex; align-items:center; justify-content:space-between; }
  .mg-sun{ width:34px; height:34px; }
  .mg-bell{ width:38px; height:38px; border-radius:50%; background:#14110D; display:flex; align-items:center; justify-content:center; position:relative; }
  .mg-bell::after{ content:""; position:absolute; top:8px; right:9px; width:7px; height:7px; border-radius:50%; background:#FF54B0; border:1.5px solid #14110D; }
  .mg-title{ margin:10px 0 6px; font-size:40px; font-weight:900; letter-spacing:-1px; line-height:1.05; display:flex; align-items:center; gap:2px; position:relative; }
  .mg-ink{ color:#14110D; }
  .mg-go{ background:linear-gradient(135deg,#FF54B0 0%,#7C5CFF 60%); -webkit-background-clip:text; background-clip:text; color:transparent; }
  .mg-nyam{ color:#7C5CFF; }
  .mg-spark-a{ position:absolute; top:-10px; left:96px; color:#FFC73C; font-size:18px; }
  .mg-spark-b{ position:absolute; top:-6px; right:38px; color:#14110D; font-size:20px; font-weight:900; }
  .mg-subtitle{ color:#4a4438; font-size:14px; font-weight:600; line-height:1.5; margin:0 0 2px; }
  .mg-cards{ flex:1 1 auto; min-height:0; display:flex; flex-direction:column; gap:14px; padding:14px 18px 8px; }
  .mg-card{ flex:1 1 0; position:relative; overflow:hidden; border-radius:28px; padding:20px 22px; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 14px 30px rgba(20,15,10,.18); }
  .mg-eatout{ background:linear-gradient(150deg,#8A6BFF 0%,#6E4BF6 100%); }
  .mg-cook{ background:linear-gradient(150deg,#2BE6CF 0%,#13CBB2 100%); }
  .mg-eyebrow{ font-size:12px; font-weight:800; letter-spacing:2px; color:#E7DEFF; margin:0; }
  .mg-eyebrow-dark{ color:#0c5a4f; }
  .mg-card-title{ margin:4px 0 0; font-size:34px; font-weight:900; letter-spacing:-1px; display:flex; align-items:center; gap:8px; color:#fff; }
  .mg-card-title-dark{ color:#14110D; }
  .mg-desc{ font-size:15px; font-weight:700; margin:0; color:#EDE7FF; }
  .mg-desc-dark{ color:#0c5a4f; }
  .mg-bottom-row{ display:flex; align-items:flex-end; justify-content:space-between; }
  .mg-go-btn{ width:46px; height:46px; border-radius:50%; background:#14110D; display:flex; align-items:center; justify-content:center; flex:0 0 auto; }
  .mg-go-btn svg{ width:20px; height:20px; }
  .mg-art{ position:absolute; pointer-events:none; }
  .mg-art-eat{ right:14px; top:50%; transform:translateY(-46%); width:170px; height:170px; }
  .mg-art-chef{ right:10px; top:50%; transform:translateY(-44%); width:178px; height:178px; }
  .mg-tabbar{ flex:0 0 auto; display:flex; justify-content:space-around; align-items:flex-start; padding:12px 14px 2px; }
  .mg-tab{ display:flex; flex-direction:column; align-items:center; gap:4px; flex:1; background:none; border:none; cursor:pointer; }
  .mg-tab svg{ width:26px; height:26px; }
  .mg-tab-en{ font-size:11px; font-weight:800; color:#14110D; letter-spacing:.5px; }
  .mg-tab-ko{ font-size:10px; font-weight:600; color:#9a9384; }
`;
