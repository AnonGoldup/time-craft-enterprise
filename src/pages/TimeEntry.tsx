import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TimeEntry = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the standard time entry form
    navigate('/time-entry/standard', { replace: true });
  }, [navigate]);

  return null;
};

export default TimeEntry;
