// src/App.js
import React from 'react';
import RegistrationForm from './components/RegistrationForm';
import UserList from './components/UserList';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const [refresh, setRefresh] = React.useState(false);

  const refreshUsers = () => {
    setRefresh(!refresh);
  };

  return (
    <div>
      <h1>User Registration</h1>
      <RegistrationForm refreshUsers={refreshUsers} />
      <UserList key={refresh} />
      <ToastContainer />
    </div>
  );
};

export default App;
