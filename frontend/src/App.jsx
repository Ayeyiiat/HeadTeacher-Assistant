import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import Sidebar from './components/Sidebar';
import StudentList from './components/StudentList';
import StudentProfile from './components/StudentProfile';
import Settings from './components/Settings';
import SearchBar from './components/SearchBar';

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
  const [view, setView] = useState('list');
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
        onSelectClass={(year) => {
          setSelectedClass(year);
          setSelectedStudent(null);
          setView('list');
          setSearchQuery('');
        }}
        onAddClass={handleAddClass}
        onUpdateClass={handleUpdateClass}
        onOpenSettings={() => setView('settings')}
      />
      
      <main className="flex-1 p-6 bg-gray-50">
        {view === 'settings' ? (
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
                    setView('profile');
                  }}
                />
              </div>
            ) : selectedClass ? (
              view === 'list' ? (
                <>
                  {selectedClassData?.formTeacher && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <span className="font-medium">Form Teacher:</span> {selectedClassData.formTeacher}
                      </p>
                    </div>
                  )}
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
