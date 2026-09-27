window.OTZARIA_SIGNATURES={
"app.getInfo":"app.getInfo()","app.getTheme":"app.getTheme()","app.getLocale":"app.getLocale()","app.getConnectivity":"app.getConnectivity()","app.openUrl":"app.openUrl({ url })",
"storage.get":"storage.get({ key })","storage.set":"storage.set({ key, value })","storage.remove":"storage.remove({ key })","storage.list":"storage.list()",
"library.findBooks":"library.findBooks({ query, limit? })","library.resolveRef":"library.resolveRef({ ref, bookUid? })","library.getBookMetadata":"library.getBookMetadata({ bookUid | bookId, type? })","library.getBookDetails":"library.getBookDetails({ bookUid | bookId, type? })","library.listRecentBooks":"library.listRecentBooks({ limit? })","library.getTree":"library.getTree()","library.getBookContent":"library.getBookContent({ bookUid | bookId, type? })","library.getBookToc":"library.getBookToc({ bookUid | bookId, type? })","library.getLinks":"library.getLinks({ bookUid | bookId, ref? })",
"reader.openBook":"reader.openBook({ bookUid | bookId/id, type?, source? })","reader.openBookAtRef":"reader.openBookAtRef({ bookUid | bookId, ref })","reader.getCurrentState":"reader.getCurrentState()","reader.getCurrentRef":"reader.getCurrentRef()","reader.getSelection":"reader.getSelection()","reader.addToolbarItem":"reader.addToolbarItem({ id, title, iconName?, order?, onClick? })","reader.addContextMenuItem":"reader.addContextMenuItem({ id, label, iconName?, order? })","reader.setHighlight":"reader.setHighlight({ ... })",
"search.fullText":"search.fullText({ query, ...options })","search.query":"search.query({ query, ...options })","search.getOptions":"search.getOptions()",
"ui.showMessage":"ui.showMessage({ message })","ui.showSuccess":"ui.showSuccess({ message })","ui.showError":"ui.showError({ message })","ui.showWarning":"ui.showWarning({ message })","ui.showConfirm":"ui.showConfirm({ title?, message })","ui.pickFolder":"ui.pickFolder({ ...options })",
"workspace.list":"workspace.list()","workspace.getActive":"workspace.getActive()","workspace.create":"workspace.create({ name, ...options })","workspace.switch":"workspace.switch({ id })",
"bookmarks.list":"bookmarks.list({ ...filters })","bookmarks.add":"bookmarks.add({ bookUid | bookId, ...data })","bookmarks.remove":"bookmarks.remove({ id | bookUid, ...identity })",
"notes.list":"notes.list({ ...filters })","notes.add":"notes.add({ ...note })","notes.update":"notes.update({ id, ...changes })","notes.delete":"notes.delete({ id })",
"history.list":"history.list({ ...filters })","history.remove":"history.remove({ bookUid | bookId, ...identity })",
"settings.get":"settings.get({ key })","settings.getMany":"settings.getMany({ keys })",
"calendar.getSelectedDate":"calendar.getSelectedDate()","calendar.getEvents":"calendar.getEvents({ ...options })","calendar.getCities":"calendar.getCities()",
"database.listSources":"database.listSources()","database.describeSource":"database.describeSource({ id })","database.query":"database.query({ sourceId, ...query })",
"plugin.openSelf":"plugin.openSelf({ ...options })","plugin.openOther":"plugin.openOther({ pluginId, ...options })","plugin.listInstalled":"plugin.listInstalled()"
};
window.OTZARIA_VALUE_HINTS={
"stability":["stable","beta","experimental"],"mode":["light","dark"],"type":["text","pdf","docx","epub"],"order":["0","100","500","1000"],"limit":["10","20","50","100"]
};