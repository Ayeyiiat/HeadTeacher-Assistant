function Home({ classes, students }) {
  const activeClasses = classes.filter(c => c.year >= new Date().getFullYear());
  const graduatedClasses = classes.filter(c => c.year < new Date().getFullYear());

  return (
    <div className="max-w-4xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Head Teacher Assistant</h1>
        <p className="text-gray-600">Your digital companion for managing student records efficiently.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="text-3xl font-bold text-blue-700 mb-1">{activeClasses.length}</div>
          <div className="text-sm text-blue-600">Active Classes</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="text-3xl font-bold text-green-700 mb-1">{students.length}</div>
          <div className="text-sm text-green-600">Total Students</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="text-3xl font-bold text-gray-700 mb-1">{graduatedClasses.length}</div>
          <div className="text-sm text-gray-600">Graduated Classes</div>
        </div>
      </div>

      {/* Getting Started Guide */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">🚀 Getting Started</h2>
        
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Set Up Your Preferences</h3>
              <p className="text-sm text-gray-600">
                Click on <span className="font-medium">⚙️ Preferences</span> in the sidebar to configure subjects and terms for your school.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Create Your First Class</h3>
              <p className="text-sm text-gray-600">
                Click the <span className="font-medium">+</span> button next to "Classes" in the sidebar. Enter the graduation year (e.g., 2028 for Grade 7) and optionally assign a form teacher.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Add Students</h3>
              <p className="text-sm text-gray-600">
                Select a class from the sidebar, then click <span className="font-medium">+ Add Student</span>. Fill in student details including name, admissions number, and guardian information.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">
              4
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Record Grades</h3>
              <p className="text-sm text-gray-600">
                Click on any student to view their profile. Scroll down to Academic Records to enter grades by subject and term for each academic year.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">💡 Quick Tips</h2>
        
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-blue-600">🔍</span>
            <p className="text-sm text-gray-700">
              <strong>Search Globally:</strong> Use the search bar at the top to find any student by name, guardian name, or phone number across all classes.
            </p>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-600">⚙️</span>
            <p className="text-sm text-gray-700">
              <strong>Class Management:</strong> When viewing a class, expand "Class Management" to edit the form teacher or delete the class.
            </p>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-600">📊</span>
            <p className="text-sm text-gray-700">
              <strong>Grade Tracking:</strong> Both percentage and letter grades are supported. You can enter one or both for each subject/term.
            </p>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-600">🏠</span>
            <p className="text-sm text-gray-700">
              <strong>Return Home:</strong> Click on "Head Teacher" at the top of the sidebar anytime to return to this dashboard.
            </p>
          </li>
        </ul>
      </div>

      {/* Features Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">✨ Key Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex gap-3">
            <div className="text-2xl">👥</div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">Student Records</h3>
              <p className="text-xs text-gray-600">Complete profiles with guardian info and admissions numbers</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="text-2xl">📚</div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">Grade Tracking</h3>
              <p className="text-xs text-gray-600">Multi-year academic records by subject and term</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="text-2xl">🎓</div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">Class Organization</h3>
              <p className="text-xs text-gray-600">Organize by graduation year with form teacher assignments</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="text-2xl">💾</div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">Auto-Save</h3>
              <p className="text-xs text-gray-600">All data automatically saved to your browser</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
