/* ---------- preview renderers (abstract mockups from the canvas) ---------- */
function previewHTML(p){
  switch(p.preview){
    case "dashboard": return `<div class="mk"><div class="col"><div class="bar"></div><div class="row"><div class="cell"></div><div class="cell g"></div><div class="cell"></div></div><div class="block"></div></div><div class="side"></div></div>`;
    case "wordmark": return `<span class="wm">${p.wordmark||p.name}</span>`;
    case "play": return `<div class="play"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M8 5.5v13l11-6.5-11-6.5z" fill="#6EE7B7"/></svg></div>`;
    case "phones": return `<div class="mk" style="justify-content:center;gap:10px;"><div style="width:84px;background:var(--inset);border:1px solid var(--line);border-radius:14px;padding:10px;display:flex;flex-direction:column;gap:8px;"><div class="bar" style="width:60%"></div><div style="height:40px;background:var(--surface);border:1px solid var(--line-2);border-radius:8px;"></div><div style="height:40px;background:var(--green);border-radius:8px;"></div></div><div style="width:84px;background:var(--inset);border:1px solid var(--line);border-radius:14px;padding:10px;margin-top:16px;display:flex;flex-direction:column;gap:8px;"><div class="bar" style="width:60%"></div><div style="height:56px;background:var(--surface);border:1px solid var(--line-2);border-radius:8px;"></div></div></div>`;
    case "split": return `<div style="display:flex;flex-direction:column;gap:8px;width:100%;height:100%;padding:16px;"><div style="height:32px;background:var(--inset);border:1px solid var(--line);border-radius:8px;"></div><div style="display:flex;gap:8px;flex-grow:1;"><div style="flex:1;background:var(--inset);border:1px solid var(--line);border-radius:8px;"></div><div style="flex:1;background:var(--green);border-radius:8px;"></div></div></div>`;
    case "grid": return `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%;height:100%;padding:16px;">${Array.from({length:6}).map((_,i)=>`<div style="background:${i===2?'var(--green)':'var(--inset)'};border:1px solid var(--line);border-radius:8px;"></div>`).join("")}</div>`;
    case "web": return `<div class="mk"><div class="col"><div class="bar" style="width:70%"></div><div class="block" style="height:40px"></div><div class="row"><div class="cell"></div><div class="cell"></div></div></div></div>`;
    default: return `<span class="mono" style="font-size:11px;color:var(--faint);">${p.name}</span>`;
  }
}

/* ---------- render tiles ---------- */
function tileHTML(p, variant){
  const featured = variant==="featured";
  const green = p.green;
  const tags = `<div class="tile-tags">
      <span class="pill ${green?'on-green':''}">${p.tag2}</span>
      ${featured?`<span class="pill ${green?'on-green':''}">${p.cat}</span>`:''}
    </div>`;
  const right = p.live
    ? `<span class="pill live"><span class="d"></span>Live</span>`
    : `<span class="year ${green?'light':''}">${p.year}</span>`;
  const prev = green
    ? `<div class="prev tall on-dark-green" style="background:rgba(0,0,0,.18);border-color:transparent;"><span class="wm" style="color:var(--on-green);">${p.wordmark}</span></div>`
    : `<div class="prev ${featured?'tall':''}">${previewHTML(p)}</div>`;
  const body = featured
    ? `<div><div class="pname">${p.name}</div><div class="pdesc">${p.desc}</div></div>`
    : `<div class="pname sm">${p.name}</div>`;
  return `<div class="tile ${featured?'span2':''} ${green?'green':''}" data-case="${p.id}" role="button" tabindex="0">
      <div class="tile-head">${tags}${right}</div>
      ${prev}
      ${body}
    </div>`;
}

/* ---------- home bento ---------- */
function renderBento(filter){
  const bento = document.getElementById("bento");
  let list = PROJECTS.slice(0,6);
  if(filter && filter!=="All work") list = PROJECTS.filter(p=>p.cat===filter).slice(0,6);
  if(!list.length){ bento.innerHTML = '<div class="empty">No projects in this category yet.</div>'; return; }
  bento.innerHTML = list.map((p,i)=>tileHTML(p, i===0 && (!filter||filter==="All work") ? "featured":"plain")).join("");
  wireCases(bento);
}

/* ---------- work grid ---------- */
function renderWork(filter){
  const grid = document.getElementById("workGrid");
  const list = (!filter||filter==="All") ? PROJECTS : PROJECTS.filter(p=>p.cat===filter);
  document.getElementById("workCount").textContent =
    String(list.length).padStart(2,"0")+" project"+(list.length===1?"":"s")+" · 2021—2026";
  if(!list.length){ grid.innerHTML = '<div class="empty">No projects in this category yet.</div>'; return; }
  grid.innerHTML = list.map(p=>tileHTML(p,"plain")).join("");
  wireCases(grid);
}

/* ---------- filters ---------- */
function buildFilters(){
  const home = document.getElementById("homeFilters");
  const hset = ["All work","Product · UI","Brand","Marketing","Others"];
  home.innerHTML = hset.map((c,i)=>`<span class="chip ${i===0?'active':''}" data-hfilter="${c}">${c}</span>`).join("");
  home.querySelectorAll(".chip").forEach(ch=>ch.addEventListener("click",()=>{
    home.querySelectorAll(".chip").forEach(x=>x.classList.remove("active"));
    ch.classList.add("active"); renderBento(ch.dataset.hfilter);
  }));
  const work = document.getElementById("workFilters");
  const wset = ["All","Product · UI","Brand","Marketing"];
  work.innerHTML = wset.map((c,i)=>`<span class="chip ${i===0?'active':''}" data-wfilter="${c}">${c}</span>`).join("");
  work.querySelectorAll(".chip").forEach(ch=>ch.addEventListener("click",()=>{
    work.querySelectorAll(".chip").forEach(x=>x.classList.remove("active"));
    ch.classList.add("active"); renderWork(ch.dataset.wfilter);
  }));
}

/* ---------- case study ---------- */
function renderCase(id){
  const p = PROJECTS.find(x=>x.id===id) || PROJECTS[0];
  const idx = PROJECTS.findIndex(x=>x.id===p.id);
  const next = PROJECTS[(idx+1)%PROJECTS.length];
  document.getElementById("csBackName").textContent = p.name.split(" — ")[0];
  document.getElementById("csCrumb").textContent = p.tag2+" project";
  document.getElementById("csBody").innerHTML = `
    <div class="cs-title">
      <span class="k mono">${p.tag2} · ${p.cat}</span>
      <h1 class="bebas">${p.name.split(" — ")[0]}</h1>
      <div class="cs-facts">
        <div class="f"><div class="l">Role</div><div class="v">${p.role}</div></div>
        <div class="f"><div class="l">Client</div><div class="v">${p.client}</div></div>
        <div class="f"><div class="l">Year</div><div class="v">${p.year}</div></div>
        <div class="f"><div class="l">Timeline</div><div class="v">${p.timeline}</div></div>
      </div>
    </div>
    <div class="cs-hero"><span class="hint">Hero visual — drop real screen here</span></div>
    <div class="cs-overview">
      <div class="lead"><div class="k">Overview</div><p>${p.overview}</p></div>
      <div class="cs-side">
        <div><div class="l">Deliverables</div><div class="v">${p.deliverables}</div></div>
        <div><div class="l">Tools</div><div class="v">${p.tools}</div></div>
      </div>
    </div>
    <div class="ca-row">
      <div class="ca-card"><div class="l">The challenge</div><p>${p.challenge}</p></div>
      <div class="ca-card"><div class="l">The approach</div><p>${p.approach}</p></div>
    </div>
    <div class="ca-row"><div class="cs-strip"><span class="hint">Screen sequence — 2–3 key flows</span></div></div>
    <div class="cs-outcome">
      <div class="lead"><div class="k">Outcome</div><p>${p.outcome}</p></div>
      <div class="cs-stat"><div class="big bebas">${p.statBig}</div><div class="cap">${p.statCap}</div></div>
    </div>
    <div class="cs-next">
      <div><div class="l">Next project</div><div class="n bebas" data-case="${next.id}">${next.name.split(" — ")[0]} →</div></div>
      <span class="cs-back" data-go="work">Back to all work</span>
    </div>`;
  document.querySelectorAll("#csBody [data-case]").forEach(el=>el.addEventListener("click",()=>openCase(el.dataset.case)));
  document.querySelectorAll("#csBody [data-go]").forEach(el=>el.addEventListener("click",()=>go(el.dataset.go)));
}

function wireCases(root){
  root.querySelectorAll("[data-case]").forEach(el=>{
    el.addEventListener("click",()=>openCase(el.dataset.case));
    el.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openCase(el.dataset.case);}});
  });
}
function openCase(id){ location.hash = "case/"+id; }

/* ---------- routing ---------- */
const VIEWS = ["home","work","case","about","contact"];
function go(view){ location.hash = view==="home" ? "" : view; }
function setActiveNav(view){
  document.querySelectorAll("#nav a").forEach(a=>a.classList.toggle("active",a.dataset.go===view||(view==="case"&&a.dataset.go==="work")));
}
function route(){
  const raw = location.hash.replace(/^#\/?/,"");
  const [seg,arg] = raw.split("/");
  let view = VIEWS.includes(seg)?seg:"home";
  if(seg==="case" && arg) renderCase(arg);
  else if(seg==="case") renderCase(PROJECTS[0].id);
  document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
  document.getElementById("view-"+view).classList.add("active");
  setActiveNav(view);
  document.getElementById("nav").classList.remove("open");
  window.scrollTo({top:0,behavior:"auto"});
  runReveal();
}

/* ---------- reveal on scroll (from visible rest; degrades to visible) ---------- */
let io;
function runReveal(){
  const els = document.querySelectorAll(".view.active .reveal");
  if(!("IntersectionObserver" in window)){ els.forEach(e=>e.classList.add("in")); return; }
  if(io) io.disconnect();
  io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target);} });
  },{threshold:0.08});
  els.forEach(e=>{ e.classList.remove("in"); io.observe(e); });
}

/* ---------- contact form ---------- */
function wireForm(){
  const form = document.getElementById("contactForm");
  const types = document.getElementById("projTypes");
  types.querySelectorAll(".chip").forEach(ch=>ch.addEventListener("click",()=>{
    types.querySelectorAll(".chip").forEach(x=>x.classList.remove("active"));
    ch.classList.add("active");
  }));
  form.addEventListener("submit",e=>{
    e.preventDefault();
    const note = document.getElementById("formNote");
    const name = form.name.value.trim(), email = form.email.value.trim();
    if(!name || !email || !/.+@.+\..+/.test(email)){
      note.style.color="var(--mint)"; note.textContent="Add your name and a valid email and I'll get it.";
      return;
    }
    note.style.color="var(--mint)";
    note.textContent="Thanks "+name.split(" ")[0]+" — message ready. Hook this form to your inbox or Formspree to send for real.";
    form.querySelector(".submit").textContent="Sent ✓";
  });
}

/* ---------- boot ---------- */
document.documentElement.classList.add("js");
document.querySelectorAll("[data-go]").forEach(el=>el.addEventListener("click",()=>go(el.dataset.go)));
document.getElementById("menuBtn").addEventListener("click",()=>document.getElementById("nav").classList.toggle("open"));
buildFilters();
renderBento();
renderWork();
wireForm();
window.addEventListener("hashchange",route);
route();
