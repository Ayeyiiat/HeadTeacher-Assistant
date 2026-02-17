import { useState } from 'react';
import StudentForm from './StudentForm';
import GradeTable from './GradeTable';

function StudentProfile({ student, settings, onBack, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleUpdate = (updatedData) => {
    onUpdate({ ...student, ...updatedData });
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(student.id);
  };

  const handleGradeUpdate = (academicRecords) => {
    onUpdate({ ...student, academicRecords });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
        >
          ← Back to list
        </button>
        <div className="flex gap-2">
          {!isEditing && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit Info
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 mb-3">
            Are you sure you want to delete {student.name}? This action cannot be undone.
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Yes, Delete
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

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{student.name}</h2>
        
        {isEditing ? (
          <StudentForm
            student={student}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Student Information</h3>
              <div className="space-y-1 text-gray-600">
                <p>
                  <span className="font-medium">Admissions Number:</span> {student.admissionNumber || 'Not specified'}
                </p>
                <p>
                  <span className="font-medium">Class:</span> {student.graduationYear}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Guardian Information</h3>
              <div className="space-y-1 text-gray-600">
                <p><span className="font-medium">Name:</span> {student.parentInfo.name || 'Not specified'}</p>
                <p><span className="font-medium">Phone:</span> {student.parentInfo.phone || 'Not specified'}</p>
                <p><span className="font-medium">Email:</span> {student.parentInfo.email || 'Not specified'}</p>
                <p><span className="font-medium">Address:</span> {student.parentInfo.address || 'Not specified'}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Academic Records</h3>
        {settings.subjects.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No subjects configured yet.</p>
            <p className="text-sm mt-2">Go to Preferences to add subjects.</p>
          </div>
        ) : (
          <GradeTable
            student={student}
            settings={settings}
            onUpdate={handleGradeUpdate}
          />
        )}
      </div>
    </div>
  );
}

export default StudentProfile;
