import React, { useState } from 'react';
import './ProviderAvailability.css';

interface DayAvailability {
  id: string;
  day: string;
  fromTime: string;
  tillTime: string;
}

interface DateRange {
  startDate: string;
  endDate: string;
}

interface BlockedDay {
  id: string;
  date: string;
  fromTime: string;
  tillTime: string;
}

const ProviderAvailability: React.FC = () => {
  const [clinician, setClinician] = useState('John Doe');
  const [dateRanges, setDateRanges] = useState<DateRange[]>([
    { startDate: '2025-06-19', endDate: '2025-06-25' }
  ]);
  const [dayAvailabilities, setDayAvailabilities] = useState<DayAvailability[]>([
    { id: '1', day: 'Monday', fromTime: '09:00', tillTime: '18:00' },
    { id: '2', day: 'Tuesday', fromTime: '09:00', tillTime: '18:00' },
    { id: '3', day: 'Wednesday', fromTime: '09:00', tillTime: '18:00' },
    { id: '4', day: 'Thursday', fromTime: '09:00', tillTime: '18:00' },
    { id: '5', day: 'Friday', fromTime: '09:00', tillTime: '18:00' },
    { id: '6', day: 'Saturday', fromTime: '09:00', tillTime: '18:00' },
  ]);
  const [timezone, setTimezone] = useState('');
  const [blockedDays, setBlockedDays] = useState<BlockedDay[]>([
    { id: '1', date: '', fromTime: '', tillTime: '' },
    { id: '2', date: '', fromTime: '', tillTime: '' }
  ]);

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  const timezones = [
    'UTC-12:00', 'UTC-11:00', 'UTC-10:00', 'UTC-09:00', 'UTC-08:00', 'UTC-07:00',
    'UTC-06:00', 'UTC-05:00', 'UTC-04:00', 'UTC-03:00', 'UTC-02:00', 'UTC-01:00',
    'UTC+00:00', 'UTC+01:00', 'UTC+02:00', 'UTC+03:00', 'UTC+04:00', 'UTC+05:00',
    'UTC+05:30', 'UTC+06:00', 'UTC+07:00', 'UTC+08:00', 'UTC+09:00', 'UTC+10:00',
    'UTC+11:00', 'UTC+12:00'
  ];

  const addDateRange = () => {
    setDateRanges([...dateRanges, { startDate: '', endDate: '' }]);
  };

  const removeDateRange = (index: number) => {
    setDateRanges(dateRanges.filter((_, i) => i !== index));
  };

  const updateDateRange = (index: number, field: 'startDate' | 'endDate', value: string) => {
    const updated = [...dateRanges];
    updated[index][field] = value;
    setDateRanges(updated);
  };

  const addDayAvailability = () => {
    const newId = (dayAvailabilities.length + 1).toString();
    setDayAvailabilities([...dayAvailabilities, {
      id: newId,
      day: 'Monday',
      fromTime: '09:00',
      tillTime: '18:00'
    }]);
  };

  const removeDayAvailability = (id: string) => {
    setDayAvailabilities(dayAvailabilities.filter(day => day.id !== id));
  };

  const updateDayAvailability = (id: string, field: 'day' | 'fromTime' | 'tillTime', value: string) => {
    setDayAvailabilities(dayAvailabilities.map(day => 
      day.id === id ? { ...day, [field]: value } : day
    ));
  };

  const addBlockedDay = () => {
    const newId = (blockedDays.length + 1).toString();
    setBlockedDays([...blockedDays, { id: newId, date: '', fromTime: '', tillTime: '' }]);
  };

  const removeBlockedDay = (id: string) => {
    setBlockedDays(blockedDays.filter(blocked => blocked.id !== id));
  };

  const updateBlockedDay = (id: string, field: 'date' | 'fromTime' | 'tillTime', value: string) => {
    setBlockedDays(blockedDays.map(blocked => 
      blocked.id === id ? { ...blocked, [field]: value } : blocked
    ));
  };

  const handleSave = () => {
    console.log('Saving availability settings:', {
      clinician,
      dateRanges,
      dayAvailabilities,
      timezone,
      blockedDays
    });
    alert('Availability settings saved successfully!');
  };

  return (
    <div className="availability-container">
      <div className="availability-header">
        <h1>Manage Availability</h1>
        <p>Configure your working hours and blocked time slots</p>
      </div>

      <div className="availability-content">
        {/* Clinician Selection */}
        <div className="section">
          <label className="section-label">Clinician</label>
          <select 
            value={clinician} 
            onChange={(e) => setClinician(e.target.value)}
            className="clinician-select"
          >
            <option value="John Doe">John Doe</option>
            <option value="Jane Smith">Jane Smith</option>
            <option value="Dr. Johnson">Dr. Johnson</option>
          </select>
        </div>

        {/* Day Wise Availability */}
        <div className="section">
          <div className="section-header">
            <h2>Day Wise Availability</h2>
            <button className="add-button" onClick={addDateRange}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
              Add Availability
            </button>
          </div>

          {dateRanges.map((range, index) => (
            <div key={index} className="date-range-row">
              <label className="date-range-label">Select Date Range</label>
              <div className="date-range-inputs">
                <input
                  type="date"
                  value={range.startDate}
                  onChange={(e) => updateDateRange(index, 'startDate', e.target.value)}
                  className="date-input"
                />
                <span className="date-separator">to</span>
                <input
                  type="date"
                  value={range.endDate}
                  onChange={(e) => updateDateRange(index, 'endDate', e.target.value)}
                  className="date-input"
                />
                <button 
                  className="delete-button"
                  onClick={() => removeDateRange(index)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}

          <div className="availability-grid">
            <div className="grid-header">
              <div className="grid-cell">Day</div>
              <div className="grid-cell">From</div>
              <div className="grid-cell">Till</div>
              <div className="grid-cell"></div>
            </div>
            
            {dayAvailabilities.map((day) => (
              <div key={day.id} className="grid-row">
                <div className="grid-cell">
                  <select
                    value={day.day}
                    onChange={(e) => updateDayAvailability(day.id, 'day', e.target.value)}
                    className="day-select"
                  >
                    {daysOfWeek.map(dayName => (
                      <option key={dayName} value={dayName}>{dayName}</option>
                    ))}
                  </select>
                </div>
                <div className="grid-cell">
                  <input
                    type="time"
                    value={day.fromTime}
                    onChange={(e) => updateDayAvailability(day.id, 'fromTime', e.target.value)}
                    className="time-input"
                  />
                </div>
                <div className="grid-cell">
                  <input
                    type="time"
                    value={day.tillTime}
                    onChange={(e) => updateDayAvailability(day.id, 'tillTime', e.target.value)}
                    className="time-input"
                  />
                </div>
                <div className="grid-cell">
                  <button 
                    className="delete-button"
                    onClick={() => removeDayAvailability(day.id)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="add-more-button" onClick={addDayAvailability}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            Add More
          </button>
        </div>

        {/* Slot Creation Setting */}
        <div className="section">
          <h2>Slot Creation Setting</h2>
          
          <div className="setting-row">
            <label className="setting-label">Time Zone</label>
            <select 
              value={timezone} 
              onChange={(e) => setTimezone(e.target.value)}
              className="timezone-select"
            >
              <option value="">Select Time Zone</option>
              {timezones.map(tz => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>

          <div className="blocked-days-section">
            <h3>Block Days</h3>
            
            {blockedDays.map((blocked) => (
              <div key={blocked.id} className="blocked-day-row">
                <input
                  type="date"
                  value={blocked.date}
                  onChange={(e) => updateBlockedDay(blocked.id, 'date', e.target.value)}
                  className="date-input"
                  placeholder="Select Date"
                />
                <input
                  type="time"
                  value={blocked.fromTime}
                  onChange={(e) => updateBlockedDay(blocked.id, 'fromTime', e.target.value)}
                  className="time-input"
                  placeholder="Select Start Time"
                />
                <input
                  type="time"
                  value={blocked.tillTime}
                  onChange={(e) => updateBlockedDay(blocked.id, 'tillTime', e.target.value)}
                  className="time-input"
                  placeholder="Select End Time"
                />
                <button 
                  className="delete-button"
                  onClick={() => removeBlockedDay(blocked.id)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                  </svg>
                </button>
              </div>
            ))}

            <button className="add-block-days-button" onClick={addBlockedDay}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
              Add Block Days
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="cancel-button">Cancel</button>
        <button className="save-button" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default ProviderAvailability; 