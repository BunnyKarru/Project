import React, { useState, useEffect } from 'react';
import moment from 'moment'; 

function Calendar() {
  const [currentDate, setCurrentDate] = useState(moment());
  const [selectedDate, setSelectedDate] = useState();
  const [holidayDates, setHolidayDates] = useState([]);
  

  // Add Saturdays and Sundays as default holidays when component mounts
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
  }, [currentDate]); // Update when the currentDate changes

  const addHoliday = () => {
    // Add clicked dates to holidayDates state
    setHolidayDates([...holidayDates, selectedDate]);
    setSelectedDate(null); // Clear the selected date
  };

  const handleClick = (event, date) => {
    // Handle the click event, you can perform any action here
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

  return (
    <div className="flex justify-center items-center h-screen flex-grow bg-white">
      <div className="max-w-md mx-auto p-7 bg-white shadow-md shadow-violet-600 h-fit">
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
    </div>
  );
}

export default Calendar;
