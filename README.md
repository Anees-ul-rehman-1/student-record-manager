# Student Record Manager

A multi-page student record management dashboard built with plain HTML, CSS and JavaScript. It lets you add, view, edit, search and delete student records, see summary statistics and charts on a dashboard, and keep everything saved in the browser with no backend required.

This project was built as part of my JavaScript practice series, with the goal of working on a larger, multi-page application that shares one data layer across several screens.

## Live Demo

Live demo: [https://student-record-manager-nine.vercel.app/](https://student-record-manager-nine.vercel.app/)

To explore the app quickly, open **Settings** and use **Load Demo Students** to fill it with sample records.

## Features

**Dashboard**
- Summary cards for total students, male and female counts, and the largest class
- Bar chart of students per class (Chart.js)
- Gender distribution donut chart built with a CSS conic gradient
- Table of the five most recently added students
- Quick actions for adding, browsing, importing and exporting records

**Students**
- Full student table with roll number, class, section, gender, phone and admission date
- View modal with tabbed sections for personal, academic and contact details, including calculated age
- Edit modal for updating any field, including the student photo
- Delete with a confirmation prompt
- Live search by name or roll number from the top bar, available on every page

**Add Student**
- Structured form split into personal, academic and contact sections
- Optional photo upload, resized and compressed in the browser before saving to keep storage small

**Settings**
- Light and dark theme, remembered between visits
- Export all records as a JSON file
- Import records from a JSON file, skipping roll numbers that already exist
- Load demo data or erase all records, both behind a confirmation dialog

**General**
- Collapsible sidebar that remembers its state
- Responsive layout

## Tech Stack

- HTML5
- CSS3 (custom properties for theming, Flexbox, Grid)
- Vanilla JavaScript (ES6+)
- [Chart.js](https://www.chartjs.org/) for the class chart
- [Lucide](https://lucide.dev/) for icons
- Browser `localStorage` for persistence

## Project Structure

```
student-record-manager/
├── index.html              Dashboard
├── pages/
│   ├── students.html       Student list and modals
│   ├── addStudent.html     Add student form
│   └── setting.html        Theme and data management
├── css/
│   ├── style.css           Shared layout and theme variables
│   ├── dashboard.css
│   ├── students.css
│   ├── addStudent.css
│   └── setting.css
├── js/
│   ├── app.js              Sidebar behaviour
│   ├── data.js             Storage, search, theme, import and export
│   ├── dashboard.js
│   ├── students.js
│   ├── addStudent.js
│   └── setting.js
└── assets/
    └── images/
```

## Getting Started

No build step or dependencies are required.

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/student-record-manager.git
   cd student-record-manager
   ```

2. Serve the project from its root folder with any static server, for example the Live Server extension in VS Code, or:

   ```bash
   npx serve .
   ```

3. Open the address shown in your terminal or editor.

Note: the pages reference assets using root-relative paths (for example `/css/style.css`), so the project needs to be served from a local server. Opening `index.html` directly from the file system will not load the styles correctly.

## Data Storage

All data is stored in the browser's `localStorage` on the device you use:

| Key | Contents |
| --- | --- |
| `studentRecordManager` | Student records |
| `theme` | Selected theme |
| `StudentRecord` | Sidebar collapsed or expanded state |

Because the data lives in the browser, it is not shared between devices and is lost if the browser data is cleared. Use **Export** in Settings to keep a backup.

## Known Limitations

- There is no backend, database or user authentication, so this is a front-end application intended for demonstration and learning.
- Some settings options (language, date and time format, notification toggles) are visual placeholders and are not connected yet.
- The student table does not have pagination or sorting yet.

## Possible Improvements

- Backend and database so records are shared across devices
- User accounts with role-based access
- Sorting, filtering and pagination on the student table
- Stronger form validation and duplicate roll number checks per class and section

## Author

Anees Ul Rehman

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
