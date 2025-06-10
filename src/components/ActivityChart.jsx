const ActivityChart = ({ grid, handleCheckboxChange, clearGrid }) => {
  const getColorIntensity = (isChecked) => {
    return isChecked ? "bg-green-500" : "bg-gray-200";
  };

  return (
    <div className="flex flex-col items-center p-4 w-[80%] mx-auto mt-10">
      <h2 className="text-3xl font-semibold mb-4 w-[100%]">
        Draw Your Art here:
      </h2>

      <div className="flex gap-1">
        <div className="flex flex-col gap-1 mr-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="h-4 w-8 text-xs text-right pr-1">
              {day}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-1">
          {grid.map((row, rowIndex) => (
            <div key={`row-${rowIndex}`} className="flex gap-1">
              {row.map((isChecked, colIndex) => (
                <input
                  key={`cell-${rowIndex}-${colIndex}`}
                  type="checkbox"
                  className={`h-4 w-4 rounded-sm border border-gray-300 appearance-none cursor-pointer hover:opacity-80 transition-opacity ${getColorIntensity(
                    isChecked
                  )}`}
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(rowIndex, colIndex)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={clearGrid}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Clear Grid
        </button>
        <button
          onClick={() => console.log('Saved:', grid)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ActivityChart;
