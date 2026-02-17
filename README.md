# Head Teacher Assistant

A student records management system for elementary schools.

## What It Does

Digitizes student records, grades, and guardian contact information organized by graduation year. Replaces paper files with a clean web interface.

## Features

- **Class Management** - Organize by graduation year with form teachers
- **Student Records** - Track students with admission numbers and guardian info
- **Grade Tracking** - Record grades by year, subject, and term (percentage + letter)
- **Search** - Find students by name, guardian, or phone number
- **Home Dashboard** - Stats overview and quick start guide
- **All Classes View** - Grid view of all active and graduated classes
- **Collapsible Management** - Clean UI with class management panels that stay hidden until needed

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4
- localStorage (Phase 1)

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`

### Quick Setup

1. Click **Preferences** in sidebar → Add subjects and terms → Save
2. Click **+** in sidebar → Create a class by graduation year
3. Select class → **Add Student** → Fill details
4. Click student → **Edit Grades** → Record grades

## Data Model

**Classes**: `{year, formTeacher}`  
**Students**: `{id, name, admissionNumber, graduationYear, guardianInfo, academicRecords}`  
**Settings**: `{subjects[], gradeFormat, terms[]}`

Grade formula: `Grade = 10 - (graduationYear - currentYear)`

## Important Notes

- Data stored in browser localStorage (device-specific)
- No authentication or backups yet
- Clearing browser data deletes all records
- Phase 2 will add Supabase backend + auth

## Roadmap

**Phase 2**: Supabase backend, authentication, multi-device sync  
**Phase 3**: PDF exports, analytics, parent portal

---

**Version**: 1.1.0  
**Last Updated**: February 2026
