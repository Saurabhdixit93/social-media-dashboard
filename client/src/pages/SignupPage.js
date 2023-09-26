import React, { useEffect, useState } from "react";
import AuthForm from "../components/authForm/Form";
import { Box, Center } from "@chakra-ui/react";
import makeRequest from "../axiosHandle/SendRequest";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  useEffect(() => {
    document.title = "Signup Page ";
  }, []);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (formData) => {
    setLoading(true);
    await makeRequest("/user/signup", "POST", null, formData)
      .then((data) => {
        if (data.success) {
          setLoading(false);
          message.success(data.message);
          setTimeout(() => {
            navigate("/login");
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
        <AuthForm type="signup" loadingPas={loading} onSubmit={handleSignup} />
      </Box>
    </Center>
  );
};

export default Signup;
