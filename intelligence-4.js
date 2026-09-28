(()=>{const A=window.PluginStudioAPI,$=q=>document.querySelector(q);if(!A)return;
const spec=()=>window.OTZARIA_SDK_SPEC||A.sdk||{},sigs=()=>window.OTZARIA_SIGNATURES||{},icons=()=>window.SymbolLibrary4?.otzariaNames||[];
function cm(){return window.StudioCodeMirror||null}
function beforeCursor(limit=1200){const c=cm();if(!c)return"";const p=c.getCursor(),from=c.posFromIndex(Math.max(0,c.indexFromPos(p)-limit));return c.getRange(from,p)}
function ctx(){const c=cm();if(!c)return null;const p=c.getCursor(),line=c.getLine(p.line),left=line.slice(0,p.ch);
 let m=left.match(/Otzaria\.call\(\s*["']([^"']*)$/);if(m)return{type:"api",q:m[1],from:{line:p.line,ch:p.ch-m[1].length},to:p};
 m=left.match(/Otzaria\.on\(\s*["']([^"']*)$/);if(m)return{type:"event",q:m[1],from:{line:p.line,ch:p.ch-m[1].length},to:p};
 m=left.match(/(?:iconName|icon)\s*[:=]\s*["']([^"']*)$/);if(m)return{type:"icon",q:m[1],from:{line:p.line,ch:p.ch-m[1].length},to:p};
 const api=beforeCursor().match(/Otzaria\.call\(\s*["']([^"']+)["'][\s\S]*$/)?.[1];if(api)return{type:"api-args",api,q:"",from:p,to:p};
 return null}
function completion(){const c=cm(),x=ctx();if(!c||!x||!window.CodeMirror?.showHint)return false;let pool=[],kind=x.type;
 if(x.type==="api")pool=(spec().apiMethods||[]).filter(v=>!v.startsWith("network."));
 else if(x.type==="event")pool=spec().events||[];
 else if(x.type==="icon")pool=icons();
 else if(x.type==="api-args"){const sig=sigs()[x.api]||"";const fields=[...sig.matchAll(/\b([A-Za-z_$][\w$]*)\??(?=\s*[,}|])/g)].map(m=>m[1]).filter(v=>!["args"].includes(v));pool=[...new Set(fields)].map(v=>v+": ");kind=x.api+" args"}
 else return false;
 const q=(x.q||"").toLowerCase(),list=pool.filter(v=>String(v).toLowerCase().includes(q)).slice(0,160).map(v=>({text:String(v),displayText:String(v)+" · "+kind}));
 if(!list.length)return false;CodeMirror.showHint(c,()=>({from:x.from,to:x.to,list}),{completeSingle:false});return true}
function currentString(kind){const c=cm();if(!c)return"";const p=c.getCursor(),line=c.getLine(p.line),ch=p.ch;const re=kind==="event"?/Otzaria\.on\(\s*["']([^"']+)["']/g:/Otzaria\.call\(\s*["']([^"']+)["']/g;let m;while((m=re.exec(line))){const a=m.index,b=re.lastIndex;if(ch>=a&&ch<=b)return m[1]}return""}
function current(){const api=currentString("api");if(api)return{type:"api",name:api};const event=currentString("event");if(event)return{type:"event",name:event};return null}
function permissionForEvent(ev){const p="events.subscribe:"+ev;return (spec().permissions||[]).includes(p)?p:null}
function addPermission(p){if(!p||(spec().baselinePermissions||[]).includes(p))return false;let m;try{m=JSON.parse(A.state.files["manifest.json"]||"{}")}catch{return false}if((m.permissions||[]).includes(p))return false;if(p.startsWith("network."))return false;m.permissions=[...new Set([...(m.permissions||[]),p])].sort();A.state.files["manifest.json"]=JSON.stringify(m,null,2);A.save();return true}
function setMin(v){let m;try{m=JSON.parse(A.state.files["manifest.json"]||"{}")}catch{return false}m.minAppVersion=v;A.state.files["manifest.json"]=JSON.stringify(m,null,2);A.save();return true}
function quickFix(){const x=current();if(!x)return false;if(x.type==="api"){const p=spec().methodPermissions?.[x.name],v=spec().methodMinVersions?.[x.name];let changed=false;if(p)changed=addPermission(p)||changed;let m={};try{m=JSON.parse(A.state.files["manifest.json"]||"{}")}catch{};if(v&&window.ManifestIntelligence?.versionGt?.(v,m.minAppVersion||"0.0.0"))changed=setMin(v)||changed;if(changed){$("#status").textContent="Quick Fix: manifest עודכן עבור "+x.name;return true}}
 if(x.type==="event"){const p=permissionForEvent(x.name);if(addPermission(p)){ $("#status").textContent="Quick Fix: נוספה "+p;return true}}return false}
function describe(){const x=current();if(!x)return false;if(x.type==="api"){const p=spec().methodPermissions?.[x.name]||"baseline",v=spec().methodMinVersions?.[x.name]||"?";A.dialog("Otzaria SDK",'<div class="card"><div dir="ltr"><b>'+A.escapeHtml(x.name)+'</b><br><code>'+A.escapeHtml(sigs()[x.name]||x.name+"(args)")+'</code><br><small>permission: '+A.escapeHtml(p)+' · Otzaria ≥ '+A.escapeHtml(v)+'</small></div></div>');return true}
 if(x.type==="event"){const p=permissionForEvent(x.name)||"baseline / plugin-scoped";A.dialog("Otzaria Event",'<div class="card"><div dir="ltr"><b>'+A.escapeHtml(x.name)+'</b><br><small>permission: '+A.escapeHtml(p)+'</small></div></div>');return true}return false}
function diagnostics(){const out=[],sp=spec(),baseline=new Set(sp.baselinePermissions||[]);let man={};try{man=JSON.parse(A.state.files["manifest.json"]||"{}")}catch{}const declared=new Set([...(man.permissions||[]),...baseline]);
 for(const [file,code] of Object.entries(A.state.files)){if(!/\.(js|html)$/i.test(file))continue;code.split("\n").forEach((line,i)=>{for(const m of line.matchAll(/Otzaria\.on\(\s*["']([^"']+)["']/g)){const ev=m[1];if(!(sp.events||[]).includes(ev)){out.push({level:"error",file,line:i+1,msg:"אירוע Otzaria לא מוכר: "+ev});continue}const p=permissionForEvent(ev);if(p&&!declared.has(p))out.push({level:"warning",file,line:i+1,msg:"חסרה הרשאת אירוע "+p,fix:{type:"permission",value:p}})}})}
 const mi=man?.contributes?.toolTab?.iconName;if(mi&&(!/_24_(regular|filled)$/.test(mi.replace(/^(?:otzaria:|fluent:)/,""))))out.push({level:"warning",file:"manifest.json",line:1,msg:"iconName צריך להסתיים ב-_24_regular או _24_filled"});
 return out}
function status(){const x=current();if(!x)return;if(x.type==="api")$("#status").textContent=(sigs()[x.name]||x.name+"(args)")+" · "+(spec().methodPermissions?.[x.name]||"baseline")+" · ≥ "+(spec().methodMinVersions?.[x.name]||"?");else $("#status").textContent=x.name+" · "+(permissionForEvent(x.name)||"baseline / plugin-scoped")}
function install(){const c=cm();if(!c)return setTimeout(install,100);c.addKeyMap({"Alt-Space":completion,"Ctrl-.":()=>{if(!quickFix())window.EditorAdvanced?.quickFix?.()},"F1":()=>{if(!describe())window.EditorAdvanced?.documentationPopup?.()}});c.on("cursorActivity",status)}
install();window.Intelligence4={context:ctx,completion,current,permissionForEvent,quickFix,describe,diagnostics,status}})();
