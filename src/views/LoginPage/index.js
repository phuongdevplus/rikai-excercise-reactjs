import React from 'react';
import Login from '../../components/Login';
import DefaultLayout from '../../layout/DefaultLayout';

function LoginPage(props) {
  return (
    <DefaultLayout title='Login'>
      <Login/>
    </DefaultLayout>
  );
}

export default LoginPage;