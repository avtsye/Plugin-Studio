# Otzaria Plugin Studio

סביבת פיתוח מקומית ומלאה לתוספי **Otzaria**, שרצה כתוסף בתוך אוצריה ועובדת Offline.

## מה יש ב־Plugin Studio 5.5

Plugin Studio מיועד גם למי שרוצה ליצור תוסף במהירות וגם למפתח שרוצה סביבת IDE מלאה. ברירת המחדל היא **מצב פשוט**, וניתן לעבור בכל עת ל־**מצב מתקדם** בלי לאבד כלים או הגדרות.

### התחלה מהירה
- מסך **התחלה מהירה** להמשך בפרויקט, יצירת תוסף, פתיחת תוסף, Preview ו־Build.
- אשף **תוסף חדש** ששואל קודם מה רוצים לבנות, ולא דורש היכרות מוקדמת עם manifest.
- תבניות המבוססות על API אמיתי מתוך מפרט ה־SDK שבמאגר.
- מסלולים לכפתור בסרגל הקורא, תפריט הקשר, ספרייה וחיפוש, Plugin Storage, דוגמת API מלאה ופרויקט ריק.
- הרשאות manifest נגזרות אוטומטית מסוג התוסף.

### סביבת הפיתוח
- Explorer לפרויקטים ולקבצים.
- עורך CodeMirror ל־HTML, CSS, JavaScript ו־JSON.
- Tabs, Recent Files, Pin, Outline, Breadcrumbs ו־Split Editor.
- השלמות SDK, Manifest IntelliSense, מעבר להגדרה, References ו־Rename.
- Quick Fix עם משוב ברור גם כאשר אין תיקון זמין.
- Problems עם Error / Warning / Info, מונים, סינון וניווט מדויק לשורה ולעמודה.
- Command Center וקיצורי מקלדת.
- מצב Zen ופאנלים הניתנים לשינוי גודל.

### בנייה, בדיקה ופיתוח
- Preview ותצוגה בגדלים שונים.
- One-click Build ואריזת `.otzplugin`.
- Visual Builder.
- Otzaria Simulator, Event Simulator ו־Mock/Test tools.
- Diagnostics, Debug tools, API Lab ו־Offline Scanner.
- Test Runner, Release Center, Release Wizard ו־Package Center.
- Recovery, snapshots והמשך session.

### שפות ונגישות
- ממשק עברי RTL ואנגלי LTR.
- מעבר שפה בזמן עבודה.
- תמיכה במקלדת, focus states וממשק responsive.
- מצב פשוט שמסתיר כלי IDE מתקדמים עד שצריך אותם.

## API והרשאות

המפרט המקומי ב־`sdk-spec.js` הוא מקור האמת של סביבת הפיתוח. דוגמאות ברירת המחדל והאשף נבדקות ב־CI מול רשימת ה־API האמיתית ומול ההרשאות הנדרשות.

דוגמאות לפעולות אמיתיות שהפרויקטים שנוצרים יכולים לבצע:
- הוספה והסרה של כפתור בסרגל הקורא.
- הוספה והסרה של פעולה בתפריט ההקשר.
- חיפוש ספרים ופתיחת ספר באוצריה.
- קריאה וכתיבה ב־Plugin Storage.
- קריאת מצב הקורא וה־theme של אוצריה.

Plugin Studio אינו דורש שינוי בקוד הליבה של Otzaria, ואינו מפעיל גישת רשת עבור תוספים אלא אם יכולת כזו הוגדרה במפורש ובהתאם להרשאות.

## פיתוח ובדיקות

GitHub Actions מריץ בדיקות תחביר, תאימות manifest, בדיקות SDK והרשאות, regression tests לממשק ולעורך, בדיקות localization, בדיקות Offline, בדיקות אריזה ושערים ייעודיים לתכונות 5.x.

ה־CI גם מונע מדוגמאות ואשפים להשתמש בשם API שאינו קיים במפרט המקומי.

## מבנה עיקרי

- `app.js` — ליבת הפרויקטים, הקבצים וה־SDK bridge.
- `sdk-spec.js` / `sdk-signatures.js` — מפרט API, הרשאות וחתימות.
- `workspace-5-1.js` — סביבת העבודה והפאנלים.
- `editor-experience-5-2.js` — חוויית העורך.
- `ide-intelligence-5-4.js` — כלי intelligence ו־Quick Fix.
- `stability-5-5.js` — dialogs, session ויציבות.
- `friendly-workspace-5-5.js` — מצב פשוט/מתקדם והתחלה מהירה.
- `new-plugin-wizard-5-5.js` — אשף יצירת תוסף לפי מטרה.

## עיקרון המוצר

המטרה היא **Progressive IDE**: משתמש חדש רואה רק את הפעולות שהוא צריך כדי להתחיל, וכלי הפיתוח המתקדמים נשארים זמינים כאשר הוא בוחר להעמיק.
