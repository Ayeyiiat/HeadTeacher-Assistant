# Head Teacher Assistant

A minimalist student records management system for elementary school administrators.

## Problem

Head teachers at elementary schools still rely on paper files to manage:
- Student records
- Report cards / grade sheets  
- Parent contact information

This app digitizes and organizes student data by graduation year, with historical tracking.

---

## Features

### ✅ Completed (v1.0)

**Class Management**
- Create classes by graduation year (e.g., Class of 2028)
- Assign form teachers to each class
- Edit/update form teachers anytime
- Auto-calculate current grade level (Grade 1-9)
- Archive graduated classes

**Student Management**
- Add/edit/delete students by class
- Store comprehensive parent information:
  - Parent name
  - Phone number
  - Email address
  - Physical address
- Search students globally by name, parent name, or phone

**Grade Tracking**
- Record both percentage (0-100) AND letter grade (A, B+, C, etc.)
- Track grades by:
  - Academic year (e.g., 2024-2025)
  - Subject (customizable)
  - Term/Semester (customizable)
- Historical grade records preserved year-over-year

**Settings**
- Configure subjects (Math, English, Science, etc.)
- Configure terms/semesters (Term 1, Term 2, Term 3, etc.)
- Flexible grade format support

**UI/UX**
- Clean, minimalist interface
- Sidebar navigation by class
- Form teacher displayed on each class
- Real-time search
- Mobile-responsive design

---

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS v4
- **Storage**: Browser localStorage (Phase 1)
- **State Management**: React hooks (useState, useEffect)

---

## Data Model

### Classes
```javascript
{
  year: number,          // Graduation year (2028, 2029, etc.)
  formTeacher: string    // Form teacher name (optional)
}
```

### Students
```javascript
{
  id: string,
  name: string,
  graduationYear: number,
  parentInfo: {
    name: string,
    phone: string,
    email: string,
    address: string
  },
  academicRecords: {
    "2024-2025": {        // Academic year
      subjects: {
        "Mathematics": {   // Subject name
          "Term 1": {      // Term name
            percentage: "85",
            letter: "A"
          }
        }
      }
    }
  }
}
```

### Settings
```javascript
{
  subjects: ["Math", "English", "Science", ...],
  gradeFormat: "percentage" | "letter",
  terms: ["Term 1", "Term 2", "Term 3"]
}
```

---

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### First-Time Setup

1. **Configure Settings** - Click ⚙️ Settings in sidebar
2. **Add Subjects** - Enter subjects you want to track (Math, English, Science, etc.)
3. **Add Terms** - Configure academic terms (Term 1, Term 2, Term 3, etc.)
4. **Save Settings**

5. **Create First Class** - Click + button in sidebar
6. **Enter Graduation Year** - e.g., 2028 for current Grade 9
7. **Assign Form Teacher** (optional)

8. **Add Students** - Click "Add Student" button
9. **Fill Student Details** - Name and parent information
10. **Record Grades** - Click student → Edit Grades

---

## Project Structure

```
HeadTeacher-Assistant/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx          # Class navigation + form teacher management
│   │   │   ├── SearchBar.jsx        # Global student search
│   │   │   ├── StudentList.jsx      # List of students in a class
│   │   │   ├── StudentForm.jsx      # Add/edit student form
│   │   │   ├── StudentProfile.jsx   # Student details + grades view
│   │   │   ├── GradeTable.jsx       # Grade entry (percentage + letter)
│   │   │   └── Settings.jsx         # Configure subjects/terms
│   │   ├── hooks/
│   │   │   └── useLocalStorage.js   # localStorage persistence hook
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles + Tailwind
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## Grade Calculation Logic

Classes are organized by graduation year:
- **Class of 2026** (graduates 2026) = Grade 9
- **Class of 2027** = Grade 8
- **Class of 2028** = Grade 7
- **Class of 2035** = Grade 1

Formula: `Grade = 10 - (graduation_year - current_year)`

---

## Roadmap

### Phase 2: Backend + Authentication (Planned)
- [ ] Supabase integration
- [ ] Google Sign-In authentication
- [ ] PostgreSQL database
- [ ] Multi-device sync
- [ ] Automatic backups
- [ ] Row-level security

### Phase 3: Advanced Features (Future)
- [ ] Export report cards to PDF
- [ ] Analytics dashboard (class averages, trends)
- [ ] Parent portal (read-only access)
- [ ] Email notifications
- [ ] Multi-school support (SaaS)
- [ ] Teacher role management
- [ ] Mobile app (React Native)

---

## Current Limitations

⚠️ **Important Notes for Production Use:**

1. **Data Storage**: All data is stored in browser localStorage
   - Data is device-specific (can't access from other computers)
   - Clearing browser data will delete all records
   - **Recommendation**: Regularly export data (feature coming soon)

2. **No Authentication**: Anyone with access to the browser can view data
   - **Recommendation**: Lock computer when away
   - Phase 2 will add proper authentication

3. **No Backup**: Data is not automatically backed up
   - **Recommendation**: Take screenshots or manual notes of critical data until Phase 2

---

## Contributing

This is a personal project built for a specific use case. However, suggestions and bug reports are welcome!

---

## License

MIT License - Free to use and modify

---

## Author

Built with ❤️ for head teachers who deserve better than paper files.

**Version**: 1.0.0  
**Last Updated**: February 2026
