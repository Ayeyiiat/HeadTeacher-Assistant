import { useState } from 'react';

function Settings({ settings, onSave }) {
  const [formData, setFormData] = useState({
    subjects: settings.subjects || [],
    gradeFormat: settings.gradeFormat || 'percentage',
    terms: settings.terms || ['Term 1', 'Term 2', 'Term 3'],
  });
  const [newSubject, setNewSubject] = useState('');
  const [newTerm, setNewTerm] = useState('');

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (newSubject.trim() && !formData.subjects.includes(newSubject.trim())) {
      setFormData({
        ...formData,
        subjects: [...formData.subjects, newSubject.trim()],
      });
      setNewSubject('');
    }
  };

  const handleRemoveSubject = (subject) => {
    setFormData({
      ...formData,
      subjects: formData.subjects.filter((s) => s !== subject),
    });
  };

  const handleAddTerm = (e) => {
    e.preventDefault();
    if (newTerm.trim() && !formData.terms.includes(newTerm.trim())) {
      setFormData({
        ...formData,
        terms: [...formData.terms, newTerm.trim()],
      });
      setNewTerm('');
    }
  };

  const handleRemoveTerm = (term) => {
    setFormData({
      ...formData,
      terms: formData.terms.filter((t) => t !== term),
    });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Preferences</h2>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Subjects</h3>
        <p className="text-sm text-gray-600 mb-4">
          Configure the subjects you want to track for students.
        </p>

        <form onSubmit={handleAddSubject} className="flex gap-2 mb-4">
          <input
            type="text"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            placeholder="Add a subject (e.g., Mathematics)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </form>

        <div className="space-y-2">
          {formData.subjects.length === 0 ? (
            <p className="text-sm text-gray-500 italic">No subjects added yet.</p>
          ) : (
            formData.subjects.map((subject) => (
              <div
                key={subject}
                className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded"
              >
                <span className="text-gray-700">{subject}</span>
                <button
                  onClick={() => handleRemoveSubject(subject)}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Terms/Semesters</h3>
        <p className="text-sm text-gray-600 mb-4">
          Configure the academic terms or semesters.
        </p>

        <form onSubmit={handleAddTerm} className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTerm}
            onChange={(e) => setNewTerm(e.target.value)}
            placeholder="Add a term (e.g., Term 1)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </form>

        <div className="space-y-2">
          {formData.terms.map((term) => (
            <div
              key={term}
              className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded"
            >
              <span className="text-gray-700">{term}</span>
              <button
                onClick={() => handleRemoveTerm(term)}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Grade Format</h3>
        <p className="text-sm text-gray-600 mb-4">
          Choose how grades should be recorded.
        </p>

        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              value="percentage"
              checked={formData.gradeFormat === 'percentage'}
              onChange={(e) => setFormData({ ...formData, gradeFormat: e.target.value })}
              className="w-4 h-4 text-blue-600"
            />
            <div>
              <div className="font-medium text-gray-800">Percentage</div>
              <div className="text-sm text-gray-600">Grades from 0-100</div>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              value="letter"
              checked={formData.gradeFormat === 'letter'}
              onChange={(e) => setFormData({ ...formData, gradeFormat: e.target.value })}
              className="w-4 h-4 text-blue-600"
            />
            <div>
              <div className="font-medium text-gray-800">Letter Grades</div>
              <div className="text-sm text-gray-600">A, B, C, D, F format</div>
            </div>
          </label>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
      >
        Save Preferences
      </button>
    </div>
  );
}

export default Settings;
