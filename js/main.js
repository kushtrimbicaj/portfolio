const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const arrow = '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>';
const code = '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></svg>';

const VIS = {
  json: () => '<div class="pv"><div class="bar"><b></b><b></b><b></b><span>input.json</span></div><pre><span class="c">{</span>\n  <span class="k">"name"</span>: <span class="s">"example"</span>,\n  <span class="k">"items"</span>: [<span class="n">1</span>, <span class="n">2</span>, <span class="n">3</span>],\n  <span class="k">"active"</span>: <span class="n">true</span>,\n<span class="del" style="padding:0">  <span class="k">"tags"</span>: [<span class="s">"a"</span>,]  ✕ trailing comma</span><span class="c">}</span></pre></div>',
  diff: () => '<div class="pv"><div class="bar"><b></b><b></b><b></b><span>diff</span></div><pre style="padding:12px 0"><span class="ctx">  function greet(name) {</span><span class="del">-   return "Hello " + name;</span><span class="add">+   return `Hello, ${name}!`;</span><span class="ctx">  }</span><span class="del">-   greet("world");</span><span class="add">+   greet("developer");</span></pre></div>',
  csv: () => '<div class="pv" style="overflow-x:auto"><div class="bar"><b></b><b></b><b></b><span>data.csv</span></div><table><tr><th>id</th><th>email</th><th>country</th></tr><tr><td>1</td><td>a@site.io</td><td>US</td></tr><tr><td>2</td><td class="miss">— missing</td><td>DE</td></tr><tr><td class="dup">3</td><td class="dup">c@site.io</td><td class="dup">FR</td></tr><tr><td class="dup">3</td><td class="dup">c@site.io</td><td class="dup">FR</td></tr><tr><td>4</td><td>d@site.io</td><td class="miss">usa / U.S.</td></tr></table></div>',
  api: () => {
    const sp = p => '<svg viewBox="0 0 90 22" aria-hidden="true"><polyline fill="none" stroke="var(--acc)" stroke-width="1.5" points="' + p + '"/></svg>';
    const r = (n, c, ms, p) => '<div class="row"><i class="dot" style="background:' + c + ';animation:none"></i><span class="nm">' + n + '</span>' + sp(p) + '<span class="ms">' + ms + '</span></div>';
    return '<div class="pv"><div class="bar"><b></b><b></b><b></b><span>sample data</span></div><div class="rows">' +
      r("GET /api/users", "var(--ok)", "— ms", "0,14 12,10 24,13 36,8 48,11 60,9 72,12 90,7") +
      r("POST /api/orders", "var(--ok)", "— ms", "0,12 12,13 24,9 36,12 48,10 60,13 72,8 90,11") +
      r("GET /api/search", "var(--warn)", "— ms", "0,16 12,14 24,10 36,6 48,4 60,8 72,5 90,3") +
      r("GET /health", "var(--bad)", "down", "0,10 12,11 24,10 36,11 48,10 60,21 72,21 90,21") + '</div></div>';
  }
};

function init() {
  const S = SITE;
  document.title = S.name + " — Software Engineer";
  $("monogram").textContent = S.initials;
  const secs = [["Home","home"],["Projects","projects"],["About","about"],["Contact","contact"]];
  $("navlinks").innerHTML = secs.map(([t,i]) => '<a href="#' + i + '" data-s="' + i + '">' + t + '</a>').join("");
  ["navGh","heroGh","ctGh","footGh"].forEach(i => $(i).href = S.github);
  $("navGh").setAttribute("aria-label", "GitHub profile");
  $("ctLi").href = S.linkedin;
  $("heroTitle").innerHTML = S.hero.title;
  $("heroText").textContent = S.hero.text;
  $("heroRole").textContent = S.name + " · " + S.role;
  $("aboutText").innerHTML = S.about.map(t => "<p>" + esc(t) + "</p>").join("");
  $("techNote").textContent = S.techNote || "";
  if (S.available) { $("navAvailText").textContent = "Available"; $("heroStatusText").textContent = S.availableText; }
  else { $("navAvail").hidden = true; $("heroStatus").hidden = true; }
  $("skills").innerHTML = Object.entries(S.skills).map(([k,v]) => '<div><h3>' + esc(k) + '</h3><p>' + v.map(x => '<span>' + esc(x) + '</span>').join("") + '</p></div>').join("");
  $("pr").innerHTML = S.principles.map((p,i) => '<li><span class="no">0' + (i+1) + '</span><h3>' + esc(p[0]) + '</h3><p>' + esc(p[1]) + '</p></li>').join("");
  
  // Render projects with distinct classes for Live vs Placeholder tags
  $("projGrid").innerHTML = S.projects.map(p => {
    let tagClass = p.status && p.status.toLowerCase() === 'live' ? 'tag live' : 'tag placeholder';
    return '<article class="proj rv ' + (p.layout||"") + '"><div class="pvw">' + (VIS[p.visual]||VIS.json)() + '</div><div class="info"><h3>' + esc(p.name) + (p.status ? '<span class="' + tagClass + '">' + esc(p.status) + '</span>' : '') + '</h3><p>' + esc(p.desc) + '</p><ul class="stack">' + p.stack.map(s => '<li>' + esc(s) + '</li>').join("") + '</ul><div class="plinks">' +
    (p.demo ? '<a href="' + esc(p.demo) + '" target="_blank" rel="noopener noreferrer">Live Demo ' + arrow + '</a>' : '<span class="off">Live Demo · coming soon</span>') +
    (p.source ? '<a href="' + esc(p.source) + '" target="_blank" rel="noopener noreferrer">Source Code ' + code + '</a>' : '<span class="off">Source Code · coming soon</span>') + '</div></div></article>';
  }).join("");

  $("mailLabel").textContent = S.email;
  $("mailTo").href = "mailto:" + S.email;
  $("foot").textContent = "© " + new Date().getFullYear() + " " + S.name;

  // terminal
  const lines = [
    '<span class="c">$ cat about.ts</span>',
    '<span class="k">const</span> kushtrim = {',
    '  role: <span class="s">"Software Engineer"</span>,',
    '  likes: [<span class="s">"practical software"</span>, <span class="s">"readable code"</span>],',
    '  exploring: <span class="s">"different technologies"</span>,',
    '  solves: <span class="s">"problems through code"</span>,',
    '};',
    '<span class="c">$</span> <i class="caret"></i>'
  ];
  $("term").innerHTML = lines.map((l,i) => '<span class="l" style="animation-delay:' + (0.4 + i*0.35) + 's">' + l + '</span>').join("");

  // copy email
  $("copyMail").addEventListener("click", async () => {
    let ok = false;
    try { await navigator.clipboard.writeText(S.email); ok = true; } catch (e) {}
    if (!ok) { try { const t = document.createElement("textarea"); t.value = S.email; t.style.position = "fixed"; t.style.opacity = "0"; document.body.appendChild(t); t.select(); ok = document.execCommand("copy"); t.remove(); } catch (e) {} }
    const el = $("toast"); el.textContent = ok ? "Email copied" : "Copy failed — use Send email"; el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), 1800);
  });

  // reveal + active nav
  const rv = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("vis"); io.unobserve(e.target); } }), { threshold: .12 });
    rv.forEach(el => io.observe(el));
    const map = { tech: "about", principles: "about" };
    const so = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { const id = map[e.target.id] || e.target.id; document.querySelectorAll(".links a").forEach(a => a.classList.toggle("on", a.dataset.s === id)); } }), { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section").forEach(s => so.observe(s));
  } else rv.forEach(el => el.classList.add("vis"));
}
init();