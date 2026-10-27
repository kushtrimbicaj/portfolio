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
    "Languages": ["C#", "JavaScript", "SQL"],
    "Frontend": ["HTML", "CSS"],
    "Desktop Development": ["Windows Forms", ".NET"],
    "Databases": ["MySQL"],
    "Tools & Infrastructure": ["Git", "GitHub", "Visual Studio", "XAMPP"]
  },
  principles: [
    ["Readable code", "I write for the next person who opens the file, which is often me a few months later."],
    ["Practical problem-solving", "Start with the problem, choose the simplest approach that works, and add complexity only when it earns its place."],
    ["Maintainability", "Clear names, small pieces and sensible structure keep future changes cheap."],
    ["Continuous learning", "I try new languages and tools, and read other people’s code to see how they solve problems."]
  ],
  projects: [
    { name: "JSON Formatter & Validator", desc: "A developer utility for formatting JSON, validating syntax, and identifying errors directly in the browser.", stack: ["HTML", "CSS", "JavaScript"], visual: "json", status: "Live", demo: "https://kushtrimbicaj.github.io/json-formatter-validator/", source: "https://github.com/kushtrimbicaj/json-formatter-validator", layout: "wide" },
    { name: "Text Diff Tool", desc: "A tool for comparing two blocks of text and highlighting changes.", stack: ["JavaScript", "HTML", "CSS"], visual: "json", status: "Live", demo: "https://kushtrimbicaj.github.io/text-diff-tool/", source: "https://github.com/kushtrimbicaj/text-diff-tool", layout: "" },
    { name: "CSV Data Quality Checker", desc: "A utility for detecting missing values, duplicate rows, and inconsistent data in CSV files.", stack: ["JavaScript", "HTML", "CSS"], visual: "csv", status: "Live", demo: "https://kushtrimbicaj.github.io/csv-data-quality-checker/", source: "https://github.com/kushtrimbicaj/csv-data-quality-checker", layout: "" },
    { name: "API Health Monitor", desc: "A dashboard for monitoring endpoints, tracking response times, and viewing service availability.", stack: ["JavaScript", "HTML", "CSS"], visual: "api", status: "Placeholder", demo: null, source: null, layout: "wide rev" }
  ]
};
