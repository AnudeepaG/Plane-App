import React, { useState, useEffect } from 'react';
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';
import BpkText from '@skyscanner/backpack-web/bpk-component-text';
import Calendar from 'react-calendar';
import { format, isToday, differenceInDays } from 'date-fns';
import 'react-calendar/dist/Calendar.css';
import 'bpk-stylesheets/base';
import 'bpk-stylesheets/font';
import { cssModules } from '@skyscanner/backpack-web/bpk-react-utils';
import STYLES from './App1.scss';

const getClassName = cssModules(STYLES);

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const flightQuotes = [
    "The world is a book, and those who do not travel read only one page.",
    "Wings are not just for flying; they are for dreaming.",
    "To travel is to live.",
    "Sky above, earth below, peace within.",
    "The freedom of the skies is unmatched.",
    "Once you have flown, you will walk the earth with your eyes turned skyward, for there you have been, and there you will always long to return.",
    "Take only memories, leave only footprints, and let the sky be your guide."
  ];

  const randomQuote = flightQuotes[new Date().getDay()];

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log('Selected date:', format(date, 'yyyy-MM-dd'));
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month' && isToday(date)) {
      return getClassName('react-calendar__tile--today');
    }
    return null;
  };

  const countdown = differenceInDays(selectedDate, new Date());

  return (
    <div className={getClassName('App')}>
      <header className={getClassName('App__header')}>
        <div className={getClassName('App__header-inner')}>
          <i className={getClassName('App__header-icon')}>✈️</i>
          <BpkText tagName="h1" textStyle="xxl" className={getClassName('App__heading')}>
            Flight Schedule
          </BpkText>
        </div>
      </header>
      <main className={getClassName('App__main')}>
        <BpkText tagName="p" className={getClassName('App__quote')}>
          {randomQuote}
        </BpkText>
        <BpkText tagName="p" className={getClassName('App__text')}>
          ✨ Whether you're planning a vacation or a business trip, every journey is an opportunity to explore new horizons and create unforgettable memories. 🌍 Safe travels! ✈️
        </BpkText>
        <BpkText tagName="p" className={getClassName('App__selected-date')}>
          Selected Date: {format(selectedDate, 'yyyy-MM-dd')}
        </BpkText>
        <BpkText tagName="p" className={getClassName('App__countdown')}>
          {countdown >= 0
            ? `Days until your journey: ${countdown}`
            : "Your selected date is in the past!"}
        </BpkText>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          className={getClassName('react-calendar')}
          tileClassName={tileClassName}
        />
        <BpkButton onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </BpkButton>
      </main>
    </div>
  );
};

export default App;
