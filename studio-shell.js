(()=>{const A=window.PluginStudioAPI,$=q=>document.querySelector(q);if(!A)return;
const sections={
develop:[["פרויקטים","projects"],["Plugin Generator","pluginGeneratorBtn"],["תבניות","templates"],["חיפוש בפרויקט","projectSearch"],["פקודות","quickOpen"],["API Lab","apiLabBtn"]],
design:[["Visual Builder","visualBuilderBtn"],["Manifest Designer","designer"],["Theme / Preview","preview"],["SDK Explorer","sdkInfo"]],
test:[["Testing Studio","testingStudioBtn"],["Diagnostics","diagnosticsBtn"],["Plugin Doctor","doctorBtn"],["Build","buildBtn"]],
debug:[["Debug Inspector","debugBtn"],["אירועים","eventsBtn"],["גרסאות","historyBtn"],["כלי פיתוח","toolsBtn"]],
release:[["Release Center","releaseProBtn"],["Release Wizard","releaseWizardBtn"],["Package Center","packageCenterBtn"],["ייצוא פרויקט","exportProject"]]
};
function shell(){let bar=document.querySelector(".studioSections");if(bar)return;bar=document.createElement("nav");bar.className="studioSections";for(const [key,label] of [["develop","Develop"],["design","Design"],["test","Test"],["debug","Debug"],["release","Release"]]){const b=document.createElement("button");b.dataset.section=key;b.textContent=label;b.onclick=()=>open(key);bar.appendChild(b)}document.querySelector("header").after(bar)}
function open(key){const items=sections[key]||[];A.dialog("Studio 3.0 · "+key[0].toUpperCase()+key.slice(1),'<div class="studioHub">'+items.map(([label,id])=>'<button class="hubCard" data-target="'+id+'"><b>'+A.escapeHtml(label)+'</b><small>פתח כלי</small></button>').join("")+'</div>');document.querySelectorAll("[data-target]").forEach(b=>b.onclick=()=>{const id=b.dataset.target;$("#dlg").close();document.getElementById(id)?.click()})}
shell();window.StudioShell={open,sections}})();
