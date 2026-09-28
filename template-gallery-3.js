(()=>{const A=window.PluginStudioAPI,$=q=>document.querySelector(q);if(!A)return;
const templates=[
 {name:"Toolbar",desc:"reader toolbar",permissions:["reader.toolbar"],files:{"plugin.js":'Otzaria.on("plugin.boot",async()=>{\n  await Otzaria.call("reader.addToolbarItem",{id:"action",title:"Action",icon:"book_24_regular"});\n});'}},
 {name:"Context Menu",desc:"reader context menu",permissions:["reader.context_menu"],files:{"plugin.js":'Otzaria.on("plugin.boot",async()=>{\n  await Otzaria.call("reader.addContextMenuItem",{id:"action",label:"Action",icon:"book_24_regular"});\n});'}},
 {name:"Settings",desc:"local settings",permissions:["settings.read"],files:{"plugin.js":'async function load(){return Otzaria.call("settings.getMany",{keys:[]});}'}}
];
function applyPermissions(x){let m;try{m=JSON.parse(A.state.files["manifest.json"]||"{}")}catch{return}m.permissions=[...new Set([...(m.permissions||[]),...(x.permissions||[])])].sort();A.state.files["manifest.json"]=JSON.stringify(m,null,2)}
function open(){A.dialog("גלריית תבניות / Template Gallery",templates.map((x,i)=>'<div class="card"><b>'+x.name+'</b><small>'+x.desc+'</small><button data-tpl="'+i+'">השתמש / Use</button></div>').join(""));document.querySelectorAll("[data-tpl]").forEach(b=>b.onclick=()=>{const x=templates[+b.dataset.tpl];for(const [n,c] of Object.entries(x.files))A.state.files[n]=c;applyPermissions(x);A.save();$("#dlg").close();A.openFile(Object.keys(x.files)[0])})}
window.TemplateGallery3={templates,open}})();
