function AllClasses({ classes, onSelectClass }) {
  const currentYear = new Date().getFullYear();
  const activeClasses = classes.filter(c => c.year >= currentYear).sort((a, b) => a.year - b.year);
  const graduatedClasses = classes.filter(c => c.year < currentYear).sort((a, b) => b.year - a.year);

  const getGradeLevel = (gradYear) => {
    const diff = gradYear - currentYear;
    const grade = 10 - diff;
    
    if (grade < 1) return 'Future';
    if (grade > 9) return 'Graduated';
    return `Grade ${grade}`;
  };

  const ClassCard = ({ classData }) => (
    <button
      onClick={() => onSelectClass(classData.year)}
      className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-blue-300 transition-all text-left"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">Class of {classData.year}</h3>
        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
          {getGradeLevel(classData.year)}
        </span>
      </div>
      {classData.formTeacher && (
        <p className="text-sm text-gray-600 italic">
          Form Teacher: {classData.formTeacher}
        </p>
      )}
    </button>
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Active Classes */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Active Classes ({activeClasses.length})
        </h2>
        {activeClasses.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">No active classes yet.</p>
            <p className="text-sm text-gray-400 mt-2">Click the + button in the sidebar to add your first class.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeClasses.map((classData) => (
              <ClassCard key={classData.year} classData={classData} />
            ))}
          </div>
        )}
      </div>

      {/* Graduated Classes */}
      {graduatedClasses.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Graduated Classes ({graduatedClasses.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {graduatedClasses.map((classData) => (
              <ClassCard key={classData.year} classData={classData} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AllClasses;
