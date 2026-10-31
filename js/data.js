const SITE = {
  name: "Kushtrim Bicaj",
  initials: "KB",
  role: "Software Engineer",
  available: false,                      
  availableText: "Open to opportunities",
  email: "kushtrimbicajj@gmail.com",
  github: "https://github.com/kushtrimbicaj",
  linkedin: "https://www.linkedin.com/in/kushtrim-bicaj-75b719367/",
  hero: {
    title: "Hi, I’m Kushtrim. I build <em>practical software</em>.",
    text: "I enjoy building practical software, exploring different technologies, and solving problems through code. This site collects my projects and shows how I approach development."
  },
  about: [
    "I’m Kushtrim, a software engineer who enjoys building practical software, exploring different technologies, and solving problems through code.",
    "I like understanding how something works before I build on top of it, and I try to keep what I write readable enough to come back to.",
    "I value straightforward solutions, readable code, and tools that solve real problems. I am continuing to build projects and expand my skills through hands-on practice."
  ],
  techNote: "", 
  skills: {
    "Languages": ["C#", "JavaScript", "TypeScript", "SQL"],
    "Frontend": ["HTML", "CSS", "React", "Three.js", "React Three Fiber", "Web Audio API", "Canvas"],
    "Desktop Development": ["Windows Forms", ".NET"],
    "Databases": ["MySQL"],
    "Tools & Infrastructure": ["Git", "GitHub", "GitHub Actions", "Visual Studio", "Vite", "XAMPP"]
  },
  principles: [
    ["Readable code", "I write for the next person who opens the file, which is often me a few months later."],
    ["Practical problem-solving", "Start with the problem, choose the simplest approach that works, and add complexity only when it earns its place."],
    ["Maintainability", "Clear names, small pieces and sensible structure keep future changes cheap."],
    ["Continuous learning", "I try new languages and tools, and read other people’s code to see how they solve problems."]
  ],
  // featured: true → shown on the homepage. Every project appears on projects.html.
  projects: [
    { name: "JSON Formatter & Validator", featured: false, desc: "A developer utility for formatting JSON, validating syntax, and identifying errors directly in the browser.", stack: ["HTML", "CSS", "JavaScript"], visual: "json", status: "Live", demo: "https://kushtrimbicaj.github.io/json-formatter-validator/", source: "https://github.com/kushtrimbicaj/json-formatter-validator", layout: "wide" },
    { name: "Text Diff Tool", featured: false, desc: "A tool for comparing two blocks of text and highlighting changes.", stack: ["JavaScript", "HTML", "CSS"], visual: "diff", status: "Live", demo: "https://kushtrimbicaj.github.io/text-diff-tool/", source: "https://github.com/kushtrimbicaj/text-diff-tool", layout: "" },
    { name: "CSV Data Quality Checker", featured: false, desc: "A utility for detecting missing values, duplicate rows, and inconsistent data in CSV files.", stack: ["JavaScript", "HTML", "CSS"], visual: "csv", status: "Live", demo: "https://kushtrimbicaj.github.io/csv-data-quality-checker/", source: "https://github.com/kushtrimbicaj/csv-data-quality-checker", layout: "" },
    { name: "Pathfinding Visualizer", featured: true, desc: "An interactive grid where you draw walls and weighted cells, then watch BFS and Dijkstra search for a path step by step. Includes a side-by-side run mode, a comparison panel for visited cells, path length, cost and runtime, and maze and random-board generators.", stack: ["React", "JavaScript", "Vite", "Vitest"], visual: "grid", status: "Live", demo: "https://kushtrimbicaj.github.io/pathfinding-visualizer/", source: "https://github.com/kushtrimbicaj/pathfinding-visualizer", layout: "wide rev" },
    { name: "SoundScope", featured: true, desc: "A browser-based audio visualizer. Load your own tracks and watch six real-time Canvas visualizations react to the music through the Web Audio API, with live bass, mid and treble meters, a playlist, fullscreen and PNG export. Each track's tempo and musical key are detected in a Web Worker using a hand-written FFT, onset autocorrelation and key-profile matching, with no audio libraries.", stack: ["React", "TypeScript", "Vite", "Web Audio API", "Canvas"], visual: "audio", status: "Live", demo: "https://kushtrimbicaj.github.io/soundscope/", source: "https://github.com/kushtrimbicaj/soundscope", layout: "wide" },
    { name: "OrbitLab", featured: true, desc: "An interactive 3D solar system simulator. Planets move along their real elliptical orbits, computed every frame by solving Kepler's equation from JPL orbital elements. A Now button snaps every planet and the Moon's phase to today's real positions. Click any planet, the Moon or the ISS to fly the camera there and open an information panel with NASA data and a live gallery from NASA's image library. The ISS is tracked live above its real ground position. Also includes side-by-side comparisons, a learn mode with Kepler's third law computed from the data, and an instanced asteroid belt.", stack: ["React", "Three.js", "React Three Fiber", "JavaScript", "Vite"], visual: "orbit", status: "Live", demo: "https://kushtrimbicaj.github.io/orbit-lab/", source: "https://github.com/kushtrimbicaj/orbit-lab", layout: "wide rev" }
  ]
};
