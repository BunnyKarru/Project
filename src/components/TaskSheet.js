import React, { useState, useEffect } from 'react';
import moment from 'moment'; 

function AddHours() {
  const [projectName, setProjectName] = useState('');
  const [hours, setHours] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentDate, setCurrentDate] = useState(moment());
  const [selectedDate, setSelectedDate] = useState();
  const [holidayDates, setHolidayDates] = useState([]);

  // Sample project names
  const projects = ['Project A', 'Project B', 'Project C'];

  useEffect(() => {
    const defaultHolidays = [];
    const startDate = currentDate.clone().startOf('month');
    const endDate = currentDate.clone().endOf('month');

    let day = startDate;

    while (day.isSameOrBefore(endDate, 'day')) {
      if (day.day() === 0 || day.day() === 6) {
        defaultHolidays.push(day.format('YYYY-MM-DD'));
      }
      day.add(1, 'day');
    }

    setHolidayDates(defaultHolidays);
  }, [currentDate]);

  const addHoliday = () => {
    setHolidayDates([...holidayDates, selectedDate]);
    setSelectedDate(null);
  };

  const handleClick = (event, date) => {
    console.log('Clicked date:', date);
    setSelectedDate(date.format('YYYY-MM-DD'));
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="px-4 py-2 bg-violet-600 rounded-md text-white hover:bg-violet-700 focus:outline-none"
        >
          Previous
        </button>
        <h2 className="text-xl font-bold text-violet-600">{currentDate.format('MMMM YYYY')}</h2>
        <button
          onClick={nextMonth}
          className="px-4 py-2 bg-violet-600 rounded-md text-white hover:bg-violet-700 focus:outline-none"
        >
          Next
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const startDate = currentDate.clone().startOf('month').startOf('week');
    const endDate = currentDate.clone().endOf('month').endOf('week');
    const today = moment();

    let day = startDate;

    while (day.isSameOrBefore(endDate, 'day')) {
      const date = day.clone();
      const isSelected = selectedDate === date.format('YYYY-MM-DD');
      const isHoliday = holidayDates.includes(date.format('YYYY-MM-DD'));
      const isToday = date.isSame(today, 'day');

      let textColorClass = '';
      if (isToday) {
        textColorClass = 'text-blue-500';
      } else if (isHoliday) {
        textColorClass = 'text-black bg-red-500 rounded';
      } else {
        textColorClass = 'text-gray-800';
      }

      days.push(
        <div
          key={day.format('YYYY-MM-DD')}
          onClick={(event) => handleClick(event, date)}
          className={`day text-center py-2 cursor-pointer ${textColorClass} ${
            isSelected ? 'bg-violet-600 text-white' : 'hover:bg-violet-200'
          }`}
        >
          {day.format('D')}
        </div>
      );
      day.add(1, 'day');
    }

    return days;
  };

  const prevMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'month'));
  };

  const nextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, 'month'));
  };

  const handleAddHours = () => {
    if (!projectName || !hours) {
      setErrorMessage('Please select project name and add work hours.');
      return;
    }

    const totalHours = parseInt(hours);
    if (totalHours <= 0 || totalHours > 8) {
      setErrorMessage('Work hours should be between 1 and 8.');
      return;
    }

    console.log(`Added ${hours} hours to ${projectName}.`);
    
    setProjectName('');
    setHours('');
    setErrorMessage('');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex justify-between flex-grow">
        <div className="max-w-md mx-auto p-7 bg-white shadow-md shadow-violet-600 h-2/3 w-1/3 mr-15 ml-auto ">
          {renderHeader()}
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-bold text-violet-600">
                {day}
              </div>
            ))}
            {renderDays()}
          </div>
          <div className="text-center">
            <button
              onClick={addHoliday}
              className="px-4 py-2 bg-violet-600 rounded-md text-white hover:bg-violet-700 focus:outline-none"
            >
              Add Holiday
            </button>
          </div>
        </div>
        <div className="max-w-md mx-auto p-7 bg-white  min-h-72 flex-grow">
          <h2 className="text-xl font-bold text-violet-600 mb-4">Add Work Hours</h2>
          <div className="mb-4">
            <label htmlFor="project" className="block text-sm font-medium text-gray-700">
              Project Name
            </label>
            <select
              id="project"
              name="project"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
            >
              <option value="">Select Project</option>
              {projects.map((project, index) => (
                <option key={index} value={project}>{project}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="hours" className="block text-sm font-medium text-gray-700">
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
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
            />
          </div>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <button
            onClick={handleAddHours}
            className="px-4 py-2 bg-violet-600 rounded-md text-white hover:bg-violet-700 focus:outline-none"
          >
            Add Hours
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddHours;
