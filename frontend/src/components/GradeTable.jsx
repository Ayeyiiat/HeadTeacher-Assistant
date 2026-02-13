import { useState } from 'react';

function GradeTable({ student, settings, onUpdate }) {
  const [selectedYear, setSelectedYear] = useState(() => {
    const currentYear = new Date().getFullYear();
    return `${currentYear}-${currentYear + 1}`;
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedGrades, setEditedGrades] = useState({});

  const academicRecords = student.academicRecords || {};
  const yearRecords = academicRecords[selectedYear] || { subjects: {} };

  const handleEdit = () => {
    setEditedGrades(yearRecords.subjects || {});
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedRecords = {
      ...academicRecords,
      [selectedYear]: {
        subjects: editedGrades,
      },
    };
    onUpdate(updatedRecords);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedGrades({});
    setIsEditing(false);
  };

  const handleGradeChange = (subject, term, field, value) => {
    const currentGrade = editedGrades[subject]?.[term] || { percentage: '', letter: '' };
    setEditedGrades({
      ...editedGrades,
      [subject]: {
        ...(editedGrades[subject] || {}),
        [term]: {
          ...currentGrade,
          [field]: value,
        },
      },
    });
  };

  const getGradeValue = (subject, term) => {
    if (isEditing) {
      return editedGrades[subject]?.[term] || { percentage: '', letter: '' };
    }
    const grade = yearRecords.subjects[subject]?.[term];
    if (typeof grade === 'object') {
      return grade;
    }
    // Handle legacy single-value grades
    return { percentage: grade || '', letter: '' };
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = -2; i <= 2; i++) {
      const year = currentYear + i;
      years.push(`${year}-${year + 1}`);
    }
    return years;
  };

  const displayGrade = (grade) => {
    if (!grade.percentage && !grade.letter) return '-';
    const parts = [];
    if (grade.percentage) parts.push(`${grade.percentage}%`);
    if (grade.letter) parts.push(grade.letter);
    return parts.join(' / ');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {generateYearOptions().map((year) => (
            <option key={year} value={year}>
              Academic Year {year}
            </option>
          ))}
        </select>

        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Edit Grades
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                Subject
              </th>
              {settings.terms.map((term) => (
                <th
                  key={term}
                  className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b border-gray-200"
                >
                  {term}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {settings.subjects.map((subject, idx) => (
              <tr key={subject} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3 text-sm font-medium text-gray-800 border-b border-gray-200">
                  {subject}
                </td>
                {settings.terms.map((term) => {
                  const gradeValue = getGradeValue(subject, term);
                  return (
                    <td key={term} className="px-4 py-3 text-center border-b border-gray-200">
                      {isEditing ? (
                        <div className="flex flex-col gap-1">
                          <input
                            type="number"
                            value={gradeValue.percentage}
                            onChange={(e) => handleGradeChange(subject, term, 'percentage', e.target.value)}
                            className="w-full px-2 py-1 text-xs text-center border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="%"
                            min="0"
                            max="100"
                          />
                          <input
                            type="text"
                            value={gradeValue.letter}
                            onChange={(e) => handleGradeChange(subject, term, 'letter', e.target.value.toUpperCase())}
                            className="w-full px-2 py-1 text-xs text-center border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="A"
                            maxLength="2"
                          />
                        </div>
                      ) : (
                        <span className="text-sm text-gray-700">{displayGrade(gradeValue)}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {isEditing && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
          <strong>Tip:</strong> Enter both percentage (0-100) and letter grade (A, B+, C, etc.) for each subject.
        </div>
      )}
    </div>
  );
}

export default GradeTable;
