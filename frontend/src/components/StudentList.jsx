import { useState } from 'react';
import StudentForm from './StudentForm';

function StudentList({ students, onSelectStudent, onAddStudent, graduationYear }) {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAdd = (studentData) => {
    onAddStudent({ ...studentData, graduationYear });
    setShowAddForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {graduationYear ? `Class of ${graduationYear}` : 'Students'}
        </h2>
        {graduationYear && (
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add Student
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="mb-6 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Add New Student</h3>
          <StudentForm
            onSubmit={handleAdd}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      {students.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No students in this class yet.</p>
          {graduationYear && !showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-4 text-blue-600 hover:text-blue-700"
            >
              Add the first student
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {students.map((student) => (
            <div
              key={student.id}
              onClick={() => onSelectStudent(student)}
              className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{student.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Parent: {student.parentInfo.name || 'Not specified'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {student.parentInfo.phone || 'No phone'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                    Class of {student.graduationYear}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentList;
