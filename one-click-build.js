(()=>{
  const A=window.PluginStudioAPI,$=q=>document.querySelector(q);
  if(!A)return;

  function build(){
    const d=window.Diagnostics3?.scan?.()||[];
    const errors=d.filter(x=>x.level==="error");
    const warnings=d.filter(x=>x.level==="warning");
    const p=window.PackageCenter?.report?.()||{};
    const body='<div class="buildStatus '+(blocked?"bad":"good")+'">'+
      '<b>'+(blocked?"יש דברים שצריך לתקן":"הפרויקט מוכן")+'</b>'+
      '<span>'+errors.length+' שגיאות · '+warnings.length+' אזהרות</span></div>'+
      '<div class="buildChecklist">'+
        '<div><span>'+(p.entrypointExists?"✓":"×")+'</span><b>Entrypoint</b><small>'+(p.entrypointExists?"נמצא":"חסר")+'</small></div>'+
        '<div><span>'+(!p.network?"✓":"×")+'</span><b>Offline</b><small>'+(!p.network?"תקין":"נמצאה יכולת רשת")+'</small></div>'+
        '<div><span>'+(errors.length?"×":"✓")+'</span><b>Diagnostics</b><small>'+(errors.length?errors.length+" לתיקון":"עבר")+'</small></div>'+
        '<div><span>✓</span><b>שמירה</b><small>הפרויקט נשמר מקומית</small></div>'+
      '</div>'+
      (errors.length
        ? '<div id="buildErrors">'+[...errors.map(x=>x.message||x.msg||x.text||"Error"),...(!p.entrypointExists?["Entrypoint חסר"]:[]),...(p.network?["הפרויקט אינו Offline"]:[])].slice(0,8).map(x=>'<div class="problem error">'+A.escapeHtml(x)+'</div>').join("")+'</div><button id="buildFix">פתח Diagnostics</button>'
        : '<div class="notice">הבדיקות עברו. אפשר לעבור ל־Release/Package.</div><button id="buildRelease" class="welcomePrimary">הכן Release</button> <button id="buildPackage">Package Center</button>');
    A.dialog("Build",body);
    if(blocked){
      $("#buildFix").onclick=()=>{$("#dlg").close();$("#diagnosticsBtn").click()};
    }else{
      $("#buildRelease").onclick=()=>{$("#dlg").close();$("#releaseWizardBtn").click()};
      $("#buildPackage").onclick=()=>{$("#dlg").close();$("#packageCenterBtn").click()};
    }
  }

  $("#buildBtn").onclick=build;
  window.OneClickBuild={build};
})();
