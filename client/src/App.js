import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";
import Header from "./components/navBars/Header";
import Footer from "./components/navBars/Footer";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/SignupPage";
import {
  getTokenCookie,
  getUserFromToken,
} from "./Authentication/Authentication";
import UserProfile from "./pages/ProfilePage";

import { message } from "antd";

axios.defaults.baseURL = process.env.REACT_APP_BASEURL_BACKEND;

const App = () => {
  const theme = extendTheme({
    styles: {
      global: (props) => ({
        body: {
          bgGradient: "linear(to-r, gray.400, gray.300)",
        },
      }),
    },
  });
  const token = getTokenCookie();
  if (token) {
    var user = getUserFromToken(token);
  }

  const disableRightClick = (e) => {
    e.preventDefault();
    if (e.target.tagName === "IMG") {
      e.preventDefault();
    }
  };

  const disableImageDragging = () => {
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      img.draggable = false;
    });
  };
  const disableTextSelectionAndDragging = () => {
    const elements = document.querySelectorAll("body");

    elements.forEach((element) => {
      element.style.userSelect = "none";
      element.draggable = false;
      element.addEventListener("touchstart", (e) => {
        e.preventDefault();
      });
    });
  };
  useEffect(() => {
    const notifyNoInternet = () => {
      message.error("No internet connection.");
    };

    const notifyConnectInternet = () => {
      message.success("Connected to the internet.");
    };
    // right click disabled
    document.body.addEventListener("contextmenu", disableRightClick);
    disableTextSelectionAndDragging();
    disableImageDragging();

    // internet
    window.addEventListener("offline", notifyNoInternet);
    window.addEventListener("online", notifyConnectInternet);
    return () => {
      window.removeEventListener("offline", notifyNoInternet);
      window.removeEventListener("online", notifyConnectInternet);
      document.body.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <div>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route index path="/" element={<HomePage />} />
            <Route path="/login" element={user ? <HomePage /> : <Login />} />
            <Route path="/signup" element={user ? <HomePage /> : <Signup />} />
            <Route
              path="/profile"
              element={user ? <UserProfile /> : <Login />}
            />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
      <CSSReset />
    </ChakraProvider>
  );
};

export default App;
