import React, { Fragment, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Main from "./components/Main";

function App() {
  useEffect(() => {
    fetchToken();

    const tokenRefreshInterval = setInterval(() => {
      fetchToken();
    }, 72000);

    return () => clearInterval(tokenRefreshInterval);
  }, []);

  const fetchToken = async () => {
    try {
      await axios.get(`/api/refresh-token`);
    } catch (error) {
      console.error("Error refreshing token ", error);
    }
  };

  return (
    <Fragment>
      <Main />
    </Fragment>
  );
}

export default App;
