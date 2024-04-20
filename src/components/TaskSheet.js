import React, { useState, useEffect } from "react";
import moment from "moment";

function AddHours() {
  const [projectName, setProjectName] = useState("");
  const [hours, setHours] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentDate, setCurrentDate] = useState(moment());
  const [selectedDate, setSelectedDate] = useState("");
  const [holidayDates, setHolidayDates] = useState([]);
  const [timeSpent, setTimeSpent] = useState([]);

  // Sample project names
  const projects = ["Project A", "Project B", "Project C"];

  useEffect(() => {
    const defaultHolidays = [];
    const startDate = currentDate.clone().startOf("month");
    const endDate = currentDate.clone().endOf("month");
    let day = startDate;

    while (day.isSameOrBefore(endDate, "day")) {
      if (day.day() === 0 || day.day() === 6) {
        defaultHolidays.push(day.format("YYYY-MM-DD"));
      }
      day.add(1, "day");
    }

    setHolidayDates(defaultHolidays);
  }, [currentDate]);

  const handleClick = (event, date) => {
    console.log("Clicked date:", date);
    setSelectedDate(date.format("YYYY-MM-DD"));
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4 flex-grow">
        <button
          onClick={prevMonth}
          className="px-4 py-2 bg-violet-600 rounded-md text-white hover:bg-violet-700 focus:outline-none mx-1"
        >
          Previous
        </button>
        <h2 className="text-xl font-bold text-violet-600">
          {currentDate.format("MMMM YYYY")}
        </h2>
        <button
          onClick={nextMonth}
          className="px-4 py-2 bg-violet-600 rounded-md text-white hover:bg-violet-700 focus:outline-none mx-1"
        >
          Next
        </button>
      </div>
    );
  };
  const getTotalHoursForDate = (date) => {
    return timeSpent
      .filter((entry) => entry.date === date)
      .reduce((acc, entry) => acc + entry.hours, 0);
  };

  const renderDays = () => {
    const days = [];
    const startDate = currentDate.clone().startOf("month").startOf("week");
    const endDate = currentDate.clone().endOf("month").endOf("week");
    const today = moment();

    let day = startDate;

    while (day.isSameOrBefore(endDate, "day")) {
      const date = day.clone();
      const isSelected = selectedDate === date.format("YYYY-MM-DD");
      const isHoliday = holidayDates.includes(date.format("YYYY-MM-DD"));
      const isToday = date.isSame(today, "day");
      const totalHours = getTotalHoursForDate(date.format("YYYY-MM-DD"));

      let textColorClass = "";
      if (isToday) {
        textColorClass = "text-blue-500";
      } else if (isHoliday) {
        textColorClass = "text-black bg-red-500 rounded";
      } else {
        textColorClass = "text-gray-800";
      }

      days.push(
        <div
          key={day.format("YYYY-MM-DD")}
          onClick={(event) => handleClick(event, date)}
          className={`day relative text-center py-2 cursor-pointer ${textColorClass} ${
            isSelected ? "bg-violet-400 text-white rounded-sm" : "hover:bg-violet-200 rounded-sm"
          }`}
        >
          {day.format("D")}
          {totalHours > 0 && (
            <div className="absolute top-0 right-0 mt-1 mr-1 bg-gray-700 rounded-full w-3 h-3.5 flex items-center justify-center text-white text-xs opacity-95">
              {totalHours}
            </div>
          )}
        </div>
      );
      day.add(1, "day");
    }

    return days;
  };

  const prevMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, "month"));
  };

  const nextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, "month"));
  };

  const handleAddHours = () => {
    if (!projectName || !hours) {
      setErrorMessage("Please select project name and add work hours.");
      return;
    }

    const totalHours = parseInt(hours);
    if (totalHours <= 0 || totalHours > 8) {
      setErrorMessage("Work hours should be between 1 and 8.");
      return;
    }

    const existingEntry = timeSpent.find(
      (entry) => entry.date === selectedDate && entry.project === projectName
    );

    if (existingEntry) {
      setErrorMessage("This project has already been added for this date.");
      return;
    }

    const totalHoursForDate = timeSpent
      .filter((entry) => entry.date === selectedDate)
      .reduce((acc, entry) => acc + entry.hours, 0);

    if (totalHoursForDate + totalHours > 8) {
      setErrorMessage(
        "Total work hours for all projects on this date cannot exceed 8 hours."
      );
      return;
    }

    const newEntry = {
      date: selectedDate,
      project: projectName,
      hours: totalHours,
    };

    setTimeSpent((prevTimeSpent) => [...prevTimeSpent, newEntry]);
    setProjectName("");
    setHours("");
    setErrorMessage("");
  };

  return (
    <div class="flex justify-center items-center bg-gray-100 min-h-screen py-8">
      <div class="container mx-auto px-4 flex flex-col lg:flex-row ">
        <div class="w-full lg:w-1/2 flex justify-center ">
          <div class="w-3/5 h-5/4 border border-gray-300 rounded-md p-10 shadow-sm shadow-gray-500">
            {renderHeader()}
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center font-bold text-violet-600">
                  {day}
                </div>
              ))}
              {renderDays()}
            </div>
          </div>
        </div>
        <div class="w-full lg:w-1/2 px-4">
          {selectedDate && (
            <>
              <h2 class="text-2xl font-bold text-gray-800 mb-4">
                Add Work Hours for {selectedDate}
              </h2>
              <div class="mb-4">
                <label
                  for="project"
                  class="block text-sm font-medium text-gray-700"
                >
                  Project Name
                </label>
                <select
                  id="project"
                  name="project"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  class="form-select mt-1 block w-full rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 p-2"
                >
                  <option value="">Select Project</option>
                  {projects.map((project, index) => (
                    <option key={index} value={project}>
                      {project}
                    </option>
                  ))}
                </select>
              </div>
              <div class="mb-4">
                <label
                  for="hours"
                  class="block text-sm font-medium text-gray-700"
                >
                  Work Hours
                </label>
                <input
                  type="number"
                  id="hours"
                  name="hours"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  min={0}
                  max={8}
                  class="form-input mt-1 block w-full rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 p-2"
                />
              </div>
              {errorMessage && <p class="text-red-500 mb-4">{errorMessage}</p>}
              <button
                onClick={handleAddHours}
                class="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
              >
                Add Hours
              </button>
              <div>
                {timeSpent.length > 0 && selectedDate ? (
                  <ul>
                    {timeSpent
                      .filter((proj) => proj.date === selectedDate)
                      .map((proj, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between py-4 border-b border-gray-300 hover:bg-gray-100"
                        >
                          <div className="flex flex-col">
                            <span className="text-orange-500 font-bold text-lg">
                              {proj.project}
                            </span>
                            <p className="text-gray-700">{proj.hours} hours</p>
                          </div>
                        </li>
                      ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">
                    {selectedDate
                      ? "No entries for this date"
                      : "Select a date to view entries"}
                  </p>
                )}
              </div>
            </>
          )}
          {!selectedDate && <p class="text-gray-500">No date selected</p>}
        </div>
      </div>
    </div>
  );
}

export default AddHours;
