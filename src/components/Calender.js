import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(moment());
  const [selectedDate, setSelectedDate] = useState();
  const [holidayDates, setHolidayDates] = useState([]);
  const [showAddHolidayModal, setShowAddHolidayModal] = useState(false);
  const [newHolidayDate, setNewHolidayDate] = useState('');
  const [newHolidayName,setNewHolidayName]=useState('')
  const [holidays, setHolidays] = useState([]);

  // Add Saturdays and Sundays as default holidays when component mounts
  useEffect(() => {
    const defaultHolidays = [];
    const startDate = currentDate.clone().startOf('month');
    const endDate = currentDate.clone().endOf('month');
  
    let day = startDate;
  
    while (day.isSameOrBefore(endDate, 'day')) {
      const date = day.format('YYYY-MM-DD');
      if (isWeekend(date)) {
        defaultHolidays.push(date);
      }
      day.add(1, 'day');
    }
  
    setHolidayDates(defaultHolidays);
  }, [currentDate]);// Update when the currentDate changes

  const addHoliday = () => {
    setShowAddHolidayModal(true);
  };

  const handleCloseModal = () => {
    setShowAddHolidayModal(false);
    setNewHolidayDate('');
  };

  const handleAddHoliday = () => {
    if (newHolidayDate && newHolidayName) {
      const formattedDate = moment(newHolidayDate).format('YYYY-MM-DD');
      if (!holidayDates.includes(formattedDate) && !isWeekend(formattedDate)) {
        setHolidayDates([...holidayDates, formattedDate]);
       
        const newEntry = {
          date: formattedDate,
          name1: newHolidayName
        }
        setHolidays((prevHolidays)=>[...prevHolidays,newEntry]);
      }
      
      handleCloseModal();
    }
  };
  



 

  const handleDeleteHoliday = (date) => {
    setHolidayDates(holidayDates.filter((holiday) => holiday !== date));
  };

  const handleClick = (event, date) => {
    // Handle the click event, you can perform any action here
   
    setSelectedDate(date.format('YYYY-MM-DD'));
  };
  
  
  const isWeekend = (date) => {
    const day = moment(date).day();
    return day === 0 || day === 6;
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
      const isWeekendDay = isWeekend(date.format('YYYY-MM-DD'));
  
      let textColorClass = '';
      if (isToday) {
        textColorClass = 'text-blue-500';
      } else if (isHoliday) {
        textColorClass = 'text-black bg-red-500 rounded';
      } else if (isWeekendDay) {
        textColorClass = 'text-red-500';
      } else {
        textColorClass = 'text-gray-800';
      }
  
      days.push(
        <div
          key={day.format('YYYY-MM-DD')}
          onClick={(event) => handleClick(event, date)}
          className={`day text-center py-2 cursor-pointer ${textColorClass} ${
            isSelected ? 'bg-violet-600 rounded text-white' : 'hover:bg-violet-200'
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
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-grow justify-center ">
        <div className="w-fit" style={{ width: 'calc(32% - 10px)' }}>
          <div className="p-4 bg-white shadow-md shadow-violet-600">
            {renderHeader()}
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center font-bold text-violet-600">
                  {day}
                </div>
              ))}
              {renderDays()}
            </div>
            <div className="text-center mt-4">
              <button
                onClick={addHoliday}
                className="px-4 py-2 bg-violet-600 rounded-md text-white hover:bg-violet-700 focus:outline-none"
              >
                Add Holiday
              </button>
            </div>
          </div>
        </div>
        <div style={{ width: 'calc(50% - 10px)', marginLeft: '20px' }}>
  <div className="p-2 bg-gray-200 rounded-md overflow-y-auto " style={{ maxHeight:'calc(83%)' }}>
    <h2 className="text-lg font-bold mb-6 ml-6">Holidays</h2>

    <table className="w-full">
  <thead>
    <tr>
      <th className="px-4 py-2">Holiday Name</th>
      <th className="px-4 py-2">Date</th>
      <th className="px-4 py-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    {holidays.map((holiday, index) => (
      <tr key={index} className="bg-gray-300">
        <td className="px-4 py-2 text-center">{holiday.name1}</td>
        <td className="px-4 py-2 text-center">{holiday.date}</td>
        <td className="px-4 py-2 text-center">
          <button
            onClick={() => handleDeleteHoliday(holiday.date)}
            className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

  </div>
</div>

      </div>
      {showAddHolidayModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Add Holiday</h2>
            <input
              type="text"
              placeholder="Holiday Name"
              value={newHolidayName}
              onChange={(e) => setNewHolidayName(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 mb-2"
            />
            <input
              type="date"
              value={newHolidayDate}
              onChange={(e) => setNewHolidayDate(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-400 text-white rounded-md mr-2 hover:bg-gray-500 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleAddHoliday}
                className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 focus:outline-none"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
  
}

export default Calendar;

