import fs from "fs";import path from "path";
const root=process.cwd(),html=fs.readFileSync("index.html","utf8"),files=fs.readdirSync(root).filter(x=>x.endsWith(".js")),srcs=[...html.matchAll(/<script\s+src=["']([^"']+)["']/g)].map(m=>m[1]),errors=[],warn=[];
for(const s of srcs)if(!fs.existsSync(path.join(root,s)))errors.push("Missing script: "+s);
for(const s of new Set(srcs))if(srcs.filter(x=>x===s).length>1)errors.push("Duplicate script: "+s);
const staticIds=new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map(m=>m[1]));
const all=Object.fromEntries(files.map(f=>[f,fs.readFileSync(f,"utf8")]));
const dynamicIds=new Set();for(const c of Object.values(all))for(const m of c.matchAll(/\bid=["']([A-Za-z0-9_-]+)["']/g))dynamicIds.add(m[1]);
for(const [f,c] of Object.entries(all)){for(const m of c.matchAll(/document\.getElementById\(["']([^"']+)["']\)/g))if(!staticIds.has(m[1])&&!dynamicIds.has(m[1]))warn.push(f+": unresolved id #"+m[1]);for(const m of c.matchAll(/\$\(["']#([A-Za-z0-9_-]+)["']\)/g))if(!staticIds.has(m[1])&&!dynamicIds.has(m[1]))warn.push(f+": unresolved selector #"+m[1]);}
const globals=[...html.matchAll(/<script\s+src=["']([^"']+\.js)["']/g)].map(m=>m[1]);const pos=Object.fromEntries(globals.map((x,i)=>[x,i]));
const order=[["i18n.js","studio-polish.js"],["otzaria-simulator.js","event-simulator-3.js"],["symbol-index.js","symbol-tools-3.js"],["testing-studio.js","test-runner-3.js"],["release-center-3.js","release-profiles-3.js"]];
for(const [a,b] of order)if(pos[a]>=pos[b])errors.push("Load order: "+a+" must precede "+b);
const manifest=JSON.parse(fs.readFileSync("manifest.json","utf8"));if(manifest.network?.enabled)errors.push("Studio network must remain disabled");
if(!/^3\.\d+\.\d+$/.test(manifest.version))errors.push("Expected Studio 3.x semantic version");
const sim=all["otzaria-simulator.js"]||"";for(const token of ["window.Otzaria","plugin-studio-simulator","plugin-studio-host","buildDoc","data-sim-file"])if(!sim.includes(token))errors.push("Simulator missing "+token);
const integration=all["studio-integration-3.js"]||"";for(const n of ["OtzariaSimulator","WorkflowBuilder","TestRecorder","ReleaseCenter3","SplitEditor3"])if(!integration.includes(n))errors.push("Integration check missing "+n);
const badBilingual=[];for(const [f,c] of Object.entries(all))if(/עברית\s*\/\s*English|שמור\s*\/\s*Save|חדש\s*\/\s*New|בדיקות\s*\/\s*Tests/.test(c))badBilingual.push(f);if(badBilingual.length)warn.push("Mixed bilingual UI remains: "+[...new Set(badBilingual)].join(", "));
console.log(JSON.stringify({errors,warnings:[...new Set(warn)]},null,2));if(errors.length)process.exit(1);
