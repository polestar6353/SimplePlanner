import {useFocusEffect} from '@react-navigation/native';
import {format} from 'date-fns';
import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CalendarView from '../components/CalendarView';
import FeedList from '../components/FeedList';
import moment from 'moment';
import {doLoadCalendar} from '../reducer/Plan';

function CalendarScreen() {
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      const load = () => {
        dispatch(doLoadCalendar());
      };
      load();
    }, [dispatch]),
  );

  const logs = useSelector(state => state.Plan.calendarList);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  );

  const markedDates = '';

  const filteredLogs = logs.filter(
    log => moment(log.date).toISOString().slice(0, 10) === selectedDate,
  );

  return (
    <FeedList
      plans={filteredLogs}
      ListHeaderComponent={
        <CalendarView
          markedDates={markedDates}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      }
    />
  );
}

export default CalendarScreen;
