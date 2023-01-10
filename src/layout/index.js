import React, { useContext, useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Loading from "../components/Loading";
import logo from '../assets/images/icon.png'
import useTimeout from "../components/useTimeout";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Layout = (props) => {
  const [hasTimeElapsed, setHasTimeElapsed] = useState(true);
  const { user} = useContext(AppContext)
  const navigate = useNavigate();
  const path = useLocation()
  useEffect(() => {
    if (!user) { 
      navigate('/login')
      if(path?.pathname === '/register'){
        navigate('/register')
      }
    }
    if(user?.RoleId === '1'){
      if(path?.pathname === '/admin'){
        navigate('/')
      }
    }
  }, [user, navigate]);

  useTimeout(() => {
    setHasTimeElapsed(!hasTimeElapsed);
  }, 500);
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>
          {props.title}
          </title>
          <link rel="icon" href={logo} />
        </Helmet>
      </HelmetProvider>
      {hasTimeElapsed ? (
        <Loading />
      ) : (
        <div style={{marginTop: '20px', minHeight: '85.5vh', paddingBottom: '20px'}} className="container">
          {props?.children}
        </div>
      )}
    </>
  );
};

export default Layout;
