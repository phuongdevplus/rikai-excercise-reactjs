import React from 'react';
import Register from '../../components/Register';
import DefaultLayout from '../../layout/DefaultLayout';

function RegisterPage(props) {
  return (
    <DefaultLayout title='Login'>
      <Register/>
    </DefaultLayout>
  );
}

export default RegisterPage;