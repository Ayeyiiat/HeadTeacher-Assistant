import { useState } from 'react';

function ClassManagement({ classData, onUpdate, onDelete, onDeleteWithStudents, studentCount }) {
  const [isEditingTeacher, setIsEditingTeacher] = useState(false);
  const [formTeacher, setFormTeacher] = useState(classData.formTeacher || '');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSaveTeacher = () => {
    onUpdate(classData.year, { formTeacher: formTeacher.trim() || null });
    setIsEditingTeacher(false);
  };

  const handleCancelEdit = () => {
    setFormTeacher(classData.formTeacher || '');
    setIsEditingTeacher(false);
  };

  const handleDelete = () => {
    if (studentCount > 0) {
      return; // Don't delete if students exist
    }
    onDelete(classData.year);
  };

  const handleDeleteWithStudents = () => {
    onDeleteWithStudents(classData.year);
  };

  const canDelete = studentCount === 0;

  return (
    <div className="mb-6 bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Collapsible Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">⚙️ Class Management</span>
          {classData.formTeacher && !isExpanded && (
            <span className="text-xs text-gray-500 italic">
              ({classData.formTeacher})
            </span>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-700">Manage Class of {classData.year}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDeleteConfirm(true)}
                disabled={!canDelete}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  canDelete
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                title={canDelete ? 'Delete this class' : 'Cannot delete class with students'}
              >
                Delete Class
              </button>
              {!canDelete && (
                <button
                  onClick={() => setShowDeleteAllConfirm(true)}
                  className="px-3 py-1.5 text-sm bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors"
                >
                  Delete Class & Students
                </button>
              )}
            </div>
          </div>

          {!canDelete && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⚠️ This class has {studentCount} student{studentCount !== 1 ? 's' : ''}. 
                You can delete the class only, or delete the class and all its students.
              </p>
            </div>
          )}

          {showDeleteConfirm && canDelete && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 mb-3">
                Are you sure you want to delete Class of {classData.year}? This action cannot be undone.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Yes, Delete Class
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {showDeleteAllConfirm && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-bold mb-2">
                ⚠️ WARNING: This will permanently delete Class of {classData.year} and ALL {studentCount} student{studentCount !== 1 ? 's' : ''} in this class!
              </p>
              <p className="text-red-700 mb-3">
                This action cannot be undone. All student records, grades, and information will be lost.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleDeleteWithStudents}
                  className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800"
                >
                  Yes, Delete Everything
                </button>
                <button
                  onClick={() => setShowDeleteAllConfirm(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Form Teacher
            </label>
            {isEditingTeacher ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={formTeacher}
                  onChange={(e) => setFormTeacher(e.target.value)}
                  placeholder="Enter form teacher name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveTeacher}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex-1 px-3 py-2 bg-gray-50 rounded-lg text-gray-700">
                  {classData.formTeacher || 'Not assigned'}
                </div>
                <button
                  onClick={() => setIsEditingTeacher(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ClassManagement;
