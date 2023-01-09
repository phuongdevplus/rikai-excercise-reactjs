import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Loading from "../components/Loading";
import logo from '../assets/images/icon.png'
import useTimeout from "../components/useTimeout";
const Layout = (props) => {
  const [hasTimeElapsed, setHasTimeElapsed] = useState(true);
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
        <div style={{marginTop: '20px'}} className="container">
          {props?.children}
        </div>
      )}
    </>
  );
};

export default Layout;
