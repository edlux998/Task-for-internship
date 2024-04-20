import React, { useState } from 'react';

const DateSelector = ({ handleCompareChange }) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [compareCondition, setCompareCondition] = useState('Equals'); // State for comparison condition

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const handleCompareConditionChange = (e) => {
    setCompareCondition(e.target.value);
    handleCompareChange(e.target.value);
  };

  return (
    <div className="date-selector">
      <select className="date-select"value={compareCondition} onChange={handleCompareConditionChange}>
        <option>Equals</option>
        <option>Before</option>
        <option>After</option>
      </select>
      <select className="day" value={day} onChange={(e) => setDay(e.target.value)}>
        <option value="">Day</option>
        {days.map((day) => (
          <option key={day} value={day}>{day}</option>
        ))}
      </select>
      <select className="month" value={month} onChange={(e) => setMonth(e.target.value)}>
        <option value="">Month</option>
        {months.map((month, index) => (
          <option key={index} value={index + 1}>{month}</option>
        ))}
      </select>
      <select  className="year" value={year} onChange={(e) => setYear(e.target.value)}>
        <option value="">Year</option>
        {years.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </div>
  );
};

export default DateSelector;