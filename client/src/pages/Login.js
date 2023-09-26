import React, { useEffect, useState } from "react";
import AuthForm from "../components/authForm/Form";
import { Box, Center } from "@chakra-ui/react";
import makeRequest from "../axiosHandle/SendRequest";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  useEffect(() => {
    document.title = "Login Page ";
  }, []);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleLogin = async (formData) => {
    setLoading(true);
    await makeRequest("/user/login", "POST", null, formData)
      .then((data) => {
        if (data.success) {
          const token = data.token;
          setLoading(false);
          message.success(data.message);
          try {
            if (!token) {
              message.error("Token Not Available !");
              return;
            }
            const expires = new Date();
            expires.setDate(expires.getDate() + 7);
            Cookies.set("USER_SESSION_COOKIE", token, { expires });
          } catch (error) {
            message.error(error.message);
          }
          setTimeout(() => {
            navigate("/");
            window.location.reload();
          }, 4000);
          return;
        } else {
          setLoading(false);
          message.error(data.message);
          return;
        }
      })
      .catch((error) => {
        setLoading(false);
        message.error(error.message);
        return;
      });
  };
  return (
    <Center minH="80vh">
      <Box mt="6rem" mb="2rem">
        <AuthForm type="login" loadingPas={loading} onSubmit={handleLogin} />
      </Box>
    </Center>
  );
};

export default Login;
