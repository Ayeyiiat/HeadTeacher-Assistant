import { useState } from 'react';

function Sidebar({ classes, selectedClass, onSelectClass, onAddClass, onOpenSettings, onGoHome, onViewAllClasses, view }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newYear, setNewYear] = useState('');
  const [newFormTeacher, setNewFormTeacher] = useState('');

  const currentYear = new Date().getFullYear();
  const currentGradYear = currentYear + 3;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newYear && !isNaN(newYear)) {
      onAddClass({
        year: parseInt(newYear),
        formTeacher: newFormTeacher.trim() || null
      });
      setNewYear('');
      setNewFormTeacher('');
      setShowAddForm(false);
    }
  };

  const getGradeLevel = (gradYear) => {
    const diff = gradYear - currentYear;
    const grade = 10 - diff;
    
    if (grade < 1) return 'Future';
    if (grade > 9) return 'Graduated';
    return `Grade ${grade}`;
  };

  const activeClasses = classes.filter(c => c.year >= currentYear);
  const archivedClasses = classes.filter(c => c.year < currentYear);
  
  const ACTIVE_LIMIT = 6;
  const GRADUATED_LIMIT = 3;
  
  const visibleActiveClasses = activeClasses.slice(0, ACTIVE_LIMIT);
  const visibleGraduatedClasses = archivedClasses.slice(0, GRADUATED_LIMIT);

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <button 
        onClick={onGoHome}
        className="mb-6 text-left w-full hover:opacity-70 transition-opacity"
      >
        <h1 className="text-xl font-bold text-gray-800">Head Teacher</h1>
        <p className="text-sm text-gray-500">Student Records</p>
      </button>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-700 uppercase">Classes</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="text-blue-600 hover:text-blue-700 text-xl"
            title="Add new class"
          >
            +
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleSubmit} className="mb-3 p-3 bg-gray-50 rounded border border-gray-200">
            <input
              type="number"
              value={newYear}
              onChange={(e) => setNewYear(e.target.value)}
              placeholder={`Year (e.g., ${currentGradYear})`}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded mb-2"
              autoFocus
              required
            />
            <input
              type="text"
              value={newFormTeacher}
              onChange={(e) => setNewFormTeacher(e.target.value)}
              placeholder="Form Teacher (optional)"
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded mb-2"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setNewYear('');
                  setNewFormTeacher('');
                }}
                className="flex-1 px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="space-y-1">
          {visibleActiveClasses.map((classData) => (
            <div
              key={classData.year}
              onClick={() => onSelectClass(classData.year)}
              className={`px-3 py-2 rounded transition-colors cursor-pointer ${
                selectedClass === classData.year
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="text-sm font-medium">Class of {classData.year}</div>
              <div className="text-xs text-gray-500">{getGradeLevel(classData.year)}</div>
              {classData.formTeacher && (
                <div className="text-xs text-gray-600 mt-1 italic">
                  {classData.formTeacher}
                </div>
              )}
            </div>
          ))}
          
          {activeClasses.length > ACTIVE_LIMIT && (
            <button
              onClick={onViewAllClasses}
              className="w-full px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors text-left"
            >
              See All ({activeClasses.length})
            </button>
          )}
        </div>

        {archivedClasses.length > 0 && (
          <>
            <div className="my-3 border-t border-gray-200"></div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Graduated Classes</h3>
            <div className="space-y-1">
              {visibleGraduatedClasses.reverse().map((classData) => (
                <button
                  key={classData.year}
                  onClick={() => onSelectClass(classData.year)}
                  className={`w-full text-left px-3 py-2 rounded transition-colors ${
                    selectedClass === classData.year
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-sm">Class of {classData.year}</div>
                  {classData.formTeacher && (
                    <div className="text-xs text-gray-500 mt-1 italic">
                      {classData.formTeacher}
                    </div>
                  )}
                </button>
              ))}
              
              {archivedClasses.length > GRADUATED_LIMIT && (
                <button
                  onClick={onViewAllClasses}
                  className="w-full px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors text-left"
                >
                  See All ({archivedClasses.length})
                </button>
              )}
            </div>
          </>
        )}
      </div>

      <div className="border-t border-gray-200 pt-4 mt-auto">
        <button
          onClick={onOpenSettings}
          className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
            view === 'settings'
              ? 'bg-blue-50 text-blue-700 font-medium'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          ⚙️ Preferences
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
