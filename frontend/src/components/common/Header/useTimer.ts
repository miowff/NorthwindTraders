import moment from 'moment';
import { useEffect, useState } from 'react';

const getTime = () => moment(new Date()).format('HH:mm:ss');

const useTimer = () => {
  const [time, setTime] = useState(getTime());
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTime());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return time;
};

export default useTimer;
