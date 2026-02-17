import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import Sidebar from './components/Sidebar';
import StudentList from './components/StudentList';
import StudentProfile from './components/StudentProfile';
import Settings from './components/Settings';
import SearchBar from './components/SearchBar';
import ClassManagement from './components/ClassManagement';
import Home from './components/Home';
import AllClasses from './components/AllClasses';

function App() {
  const [classes, setClasses] = useLocalStorage('hta-classes', []);
  const [students, setStudents] = useLocalStorage('hta-students', []);
  const [settings, setSettings] = useLocalStorage('hta-settings', {
    subjects: [],
    gradeFormat: 'percentage',
    terms: ['Term 1', 'Term 2', 'Term 3']
  });
  
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [view, setView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = searchQuery
    ? students.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.parentInfo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.parentInfo.phone.includes(searchQuery)
      )
    : selectedClass
      ? students.filter(s => s.graduationYear === selectedClass)
      : [];

  const handleAddClass = (classData) => {
    const exists = classes.find(c => c.year === classData.year);
    if (!exists) {
      setClasses([...classes, classData].sort((a, b) => a.year - b.year));
    }
    setSelectedClass(classData.year);
    setSelectedStudent(null);
    setView('list');
  };

  const handleUpdateClass = (year, updates) => {
    setClasses(classes.map(c => c.year === year ? { ...c, ...updates } : c));
  };

  const handleDeleteClass = (year) => {
    setClasses(classes.filter(c => c.year !== year));
    if (selectedClass === year) {
      setSelectedClass(null);
      setSelectedStudent(null);
      setView('list');
    }
  };

  const handleDeleteClassWithStudents = (year) => {
    // Delete all students in the class
    setStudents(students.filter(s => s.graduationYear !== year));
    // Delete the class
    setClasses(classes.filter(c => c.year !== year));
    // Clear selection
    if (selectedClass === year) {
      setSelectedClass(null);
      setSelectedStudent(null);
      setView('list');
    }
  };

  const handleAddStudent = (student) => {
    const newStudent = {
      ...student,
      id: Date.now().toString(),
      academicRecords: {}
    };
    setStudents([...students, newStudent]);
  };

  const handleUpdateStudent = (updatedStudent) => {
    setStudents(students.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    if (selectedStudent?.id === updatedStudent.id) {
      setSelectedStudent(updatedStudent);
    }
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));
    if (selectedStudent?.id === id) {
      setSelectedStudent(null);
      setView('list');
    }
  };

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    setView('list');
  };

  const selectedClassData = classes.find(c => c.year === selectedClass);

  return (
    <div className="flex min-h-screen">
      <Sidebar 
        classes={classes}
        selectedClass={selectedClass}
        view={view}
        onSelectClass={(year) => {
          setSelectedClass(year);
          setSelectedStudent(null);
          setView('list');
          setSearchQuery('');
        }}
        onAddClass={handleAddClass}
        onOpenSettings={() => {
          setSelectedClass(null);
          setSelectedStudent(null);
          setView('settings');
          setSearchQuery('');
        }}
        onGoHome={() => {
          setSelectedClass(null);
          setSelectedStudent(null);
          setView('home');
          setSearchQuery('');
        }}
        onViewAllClasses={() => {
          setSelectedClass(null);
          setSelectedStudent(null);
          setView('allClasses');
          setSearchQuery('');
        }}
      />
      
      <main className="flex-1 p-6 bg-gray-50">
        {view === 'home' ? (
          <>
            <div className="mb-6">
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search students by name, guardian, or phone..."
              />
            </div>
            {searchQuery ? (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Search Results ({filteredStudents.length})
                </h2>
                <StudentList 
                  students={filteredStudents}
                  onSelectStudent={(s) => {
                    setSelectedStudent(s);
                    setSelectedClass(s.graduationYear);
                    setSearchQuery('');
                    setView('profile');
                  }}
                />
              </div>
            ) : (
              <Home classes={classes} students={students} />
            )}
          </>
        ) : view === 'allClasses' ? (
          <AllClasses 
            classes={classes}
            onSelectClass={(year) => {
              setSelectedClass(year);
              setSelectedStudent(null);
              setView('list');
            }}
          />
        ) : view === 'settings' ? (
          <Settings settings={settings} onSave={handleSaveSettings} />
        ) : (
          <>
            <div className="mb-6">
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder={searchQuery ? "Search students..." : selectedClass ? `Class of ${selectedClass}` : "Select a class to view students"}
              />
            </div>
            
            {searchQuery ? (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Search Results ({filteredStudents.length})
                </h2>
                <StudentList 
                  students={filteredStudents}
                  onSelectStudent={(s) => {
                    setSelectedStudent(s);
                    setSelectedClass(s.graduationYear);
                    setSearchQuery('');
                    setView('profile');
                  }}
                />
              </div>
            ) : selectedClass ? (
              view === 'list' ? (
                <>
                  <ClassManagement 
                    classData={selectedClassData}
                    onUpdate={handleUpdateClass}
                    onDelete={handleDeleteClass}
                    onDeleteWithStudents={handleDeleteClassWithStudents}
                    studentCount={filteredStudents.length}
                  />
                  <StudentList 
                    students={filteredStudents}
                    onSelectStudent={(s) => {
                      setSelectedStudent(s);
                      setView('profile');
                    }}
                    onAddStudent={handleAddStudent}
                    graduationYear={selectedClass}
                  />
                </>
              ) : (
                <StudentProfile 
                  student={selectedStudent}
                  settings={settings}
                  onBack={() => setView('list')}
                  onUpdate={handleUpdateStudent}
                  onDelete={handleDeleteStudent}
                />
              )
            ) : (
              <div className="text-center text-gray-500 mt-20">
                <p className="text-lg">Select a class from the sidebar or search for a student</p>
                <p className="text-sm mt-2">Get started by adding a new class using the + button</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
