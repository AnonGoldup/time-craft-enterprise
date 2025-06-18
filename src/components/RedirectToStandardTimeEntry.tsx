
import { Navigate } from 'react-router-dom';

export const RedirectToStandardTimeEntry = () => {
  return <Navigate to="/time-entry/standard" replace />;
};
