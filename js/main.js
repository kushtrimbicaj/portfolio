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
  },
  grid: () => {
    // S start · E end · # wall · w weight · v visited · p path · . empty
    const g = [
      "..vvvv#vv.....",
      ".vppppppppppv.",
      "vvpvvv#vvvvpv.",
      "vvpvv.#.ww.pv.",
      "vSp.v.#..w.pE.",
      "vvv...#.......",
      "..v...#.......",
      ".............."
    ];
    const cls = { S: "st", E: "en", "#": "wl", w: "wt", v: "vs", p: "pa", ".": "" };
    let n = 0, m = 0;
    const cells = g.map(row => row.split("").map(ch => {
      const c = cls[ch];
      const t = ch === "v" ? n++ * 0.03 : ch === "p" ? 1.6 + m++ * 0.05 : null;
      const d = t !== null ? ' style="--d:' + t.toFixed(2) + 's"' : '';
      return '<i' + (c ? ' class="' + c + '"' : '') + d + '></i>';
    }).join("")).join("");
    const lg = (c, t) => '<span><i class="' + c + '"></i>' + t + '</span>';
    return '<div class="pv"><div class="bar"><b></b><b></b><b></b><span>dijkstra.run()</span></div><div class="pf">' + cells + '</div><div class="pfl">' +
      lg("st", "start") + lg("en", "target") + lg("wl", "wall") + lg("wt", "weight") + lg("vs", "visited") + lg("pa", "path") + '</div></div>';
  }
};

const card = (p, wide) => {
  const tagClass = p.status && p.status.toLowerCase() === "live" ? "tag live" : "tag placeholder";
  return '<article class="proj rv ' + (wide ? (p.layout || "") : "") + '"><div class="pvw">' + (VIS[p.visual] || VIS.json)() + '</div><div class="info"><h3>' + esc(p.name) + (p.status ? '<span class="' + tagClass + '">' + esc(p.status) + '</span>' : '') + '</h3><p>' + esc(p.desc) + '</p><ul class="stack">' + p.stack.map(s => '<li>' + esc(s) + '</li>').join("") + '</ul><div class="plinks">' +
    (p.demo ? '<a href="' + esc(p.demo) + '" target="_blank" rel="noopener noreferrer">Live Demo ' + arrow + '</a>' : '<span class="off">Live Demo · coming soon</span>') +
    (p.source ? '<a href="' + esc(p.source) + '" target="_blank" rel="noopener noreferrer">Source Code ' + code + '</a>' : '<span class="off">Source Code · coming soon</span>') + '</div></div></article>';
};

// reveal-on-scroll for elements added at any time
let revealIO = null;
function reveal(root) {
  const els = (root || document).querySelectorAll(".rv:not(.vis)");
  if (!("IntersectionObserver" in window)) { els.forEach(el => el.classList.add("vis")); return; }
  if (!revealIO) revealIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("vis"); revealIO.unobserve(e.target); } }), { threshold: .12 });
  els.forEach(el => revealIO.observe(el));
}

function initCommon(S, page) {
  $("monogram").textContent = S.initials;
  $("monogram").href = page === "home" ? "#home" : "index.html";
  const pre = page === "home" ? "" : "index.html";
  const secs = [["Home", pre + "#home", "home"], ["Projects", page === "home" ? "#projects" : "projects.html", "projects"], ["About", pre + "#about", "about"], ["Contact", pre + "#contact", "contact"]];
  $("navlinks").innerHTML = secs.map(([t, h, i]) => '<a href="' + h + '" data-s="' + i + '"' + (page === "projects" && i === "projects" ? ' class="on" aria-current="page"' : '') + '>' + t + '</a>').join("");
  document.querySelectorAll(".js-gh").forEach(a => a.href = S.github);
  $("navGh").setAttribute("aria-label", "GitHub profile");
  if (S.available) $("navAvailText").textContent = "Available"; else $("navAvail").hidden = true;
  $("foot").textContent = "© " + new Date().getFullYear() + " " + S.name;
}

function initHome(S) {
  document.title = S.name + " — Software Engineer";
  $("ctLi").href = S.linkedin;
  $("heroTitle").innerHTML = S.hero.title;
  $("heroText").textContent = S.hero.text;
  $("heroRole").textContent = S.name + " · " + S.role;
  $("aboutText").innerHTML = S.about.map(t => "<p>" + esc(t) + "</p>").join("");
  $("techNote").textContent = S.techNote || "";
  if (S.available) $("heroStatusText").textContent = S.availableText; else $("heroStatus").hidden = true;
  $("skills").innerHTML = Object.entries(S.skills).map(([k,v]) => '<div><h3>' + esc(k) + '</h3><p>' + v.map(x => '<span>' + esc(x) + '</span>').join("") + '</p></div>').join("");
  $("pr").innerHTML = S.principles.map((p,i) => '<li><span class="no">0' + (i+1) + '</span><h3>' + esc(p[0]) + '</h3><p>' + esc(p[1]) + '</p></li>').join("");

  // homepage shows only featured projects; projects.html shows them all
  const featured = S.projects.filter(p => p.featured);
  $("projGrid").innerHTML = featured.map(p => card(p, true)).join("");
  $("allCount").textContent = S.projects.length;

  $("mailLabel").textContent = S.email;
  $("mailTo").href = "mailto:" + S.email;

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

  // back-to-top button: appears after scrolling past the hero
  const top = $("toTop");
  if (top) {
    top.hidden = false;
    const onScroll = () => top.classList.toggle("show", window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    // eased scroll: starts slowly, speeds up, then settles gently at the top
    const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; // easeInOutCubic
    let raf = 0;
    const stop = () => { cancelAnimationFrame(raf); raf = 0; document.documentElement.style.scrollBehavior = ""; ["wheel", "touchstart", "keydown"].forEach(ev => window.removeEventListener(ev, stop)); };
    top.addEventListener("click", () => {
      history.replaceState(null, "", location.pathname + location.search);
      $("monogram").focus({ preventScroll: true });
      const from = window.scrollY;
      const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || from <= 0) { window.scrollTo(0, 0); return; }
      stop();
      // longer pages get a little more time, within 0.9–1.6s
      const dur = Math.min(1600, Math.max(900, from * 0.35));
      const t0 = performance.now();
      document.documentElement.style.scrollBehavior = "auto"; // avoid fighting CSS smooth scrolling
      const step = now => {
        const t = Math.min(1, (now - t0) / dur);
        window.scrollTo(0, Math.round(from * (1 - ease(t))));
        if (t < 1) raf = requestAnimationFrame(step); else stop();
      };
      // if the visitor scrolls manually mid-animation, hand control back to them
      ["wheel", "touchstart", "keydown"].forEach(ev => window.addEventListener(ev, stop, { passive: true }));
      raf = requestAnimationFrame(step);
    });
  }

  // active nav while scrolling
  if ("IntersectionObserver" in window) {
    const map = { tech: "about", principles: "about" };
    const so = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { const id = map[e.target.id] || e.target.id; document.querySelectorAll(".links a").forEach(a => a.classList.toggle("on", a.dataset.s === id)); } }), { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section").forEach(s => so.observe(s));
  }
}

function initProjects(S) {
  document.title = "Projects — " + S.name;
  const all = S.projects;
  // filter chips: every technology used, most common first
  const counts = {};
  all.forEach(p => p.stack.forEach(t => counts[t] = (counts[t] || 0) + 1));
  const techs = Object.keys(counts).sort((a, b) => counts[b] - counts[a] || a.localeCompare(b));
  let active = "All", swapTimer = 0;
  try { const q = new URLSearchParams(location.search).get("tech"); if (q && counts[q]) active = q; } catch (e) {}

  const render = () => {
    const list = active === "All" ? all : all.filter(p => p.stack.includes(active));
    $("filters").innerHTML = ["All", ...techs].map(t => '<button type="button" class="chip' + (t === active ? ' on' : '') + '" aria-pressed="' + (t === active) + '" data-t="' + esc(t) + '">' + esc(t) + '<span>' + (t === "All" ? all.length : counts[t]) + '</span></button>').join("");
    $("allGrid").innerHTML = list.map(p => card(p, false)).join("");
    $("resultNote").textContent = active === "All" ? all.length + " projects" : list.length + " of " + all.length + " projects use " + active;
    reveal($("allGrid"));
  };
  $("filters").addEventListener("click", e => {
    const b = e.target.closest(".chip"); if (!b) return;
    if (b.dataset.t === active) return;
    active = b.dataset.t;
    try { const u = new URL(location.href); if (active === "All") u.searchParams.delete("tech"); else u.searchParams.set("tech", active); history.replaceState(null, "", u); } catch (e) {}
    // fade the current cards out, swap the list, then let the new cards fade in
    const grid = $("allGrid");
    clearTimeout(swapTimer);
    if (reducedMotion()) { render(); return; }
    grid.classList.add("swap");
    swapTimer = setTimeout(() => { render(); grid.querySelectorAll(".rv").forEach(el => el.classList.add("vis")); grid.classList.remove("swap"); }, 180);
  });
  render();
}

const reducedMotion = () => !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

// page transitions: fade out before leaving for another page of this site (the fade-in is pure CSS)
function initPageTransitions() {
  const body = document.body;
  document.addEventListener("click", e => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest("a[href]");
    if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
    let url;
    try { url = new URL(a.href, location.href); } catch (err) { return; }
    if (url.origin !== location.origin || !/^https?:|^file:/.test(url.protocol)) return;
    if (url.pathname === location.pathname) return; // same page (e.g. #about) → normal smooth scroll
    if (reducedMotion()) return;
    e.preventDefault();
    body.classList.add("leaving");
    setTimeout(() => { location.href = url.href; }, 260);
  });
  // coming back via the browser's back/forward cache: undo the fade-out
  window.addEventListener("pageshow", e => { if (e.persisted) body.classList.remove("leaving"); });
}

function init() {
  const S = SITE;
  const page = document.body.dataset.page || "home";
  initCommon(S, page);
  initPageTransitions();
  if (page === "projects") initProjects(S); else initHome(S);
  reveal();
}
init();
