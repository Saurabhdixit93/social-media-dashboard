import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import makeRequest from "../../axiosHandle/SendRequest";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AuthForm = ({ type, onSubmit, loadingPas }) => {
  const navigate = useNavigate();
  const isSignup = type === "signup";
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prevData) => ({
          ...prevData,
          profileImage: event.target.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box width="100%" borderRadius={"20px"}>
      <Tabs isFitted variant="enclosed">
        <TabList>
          <Tab>{isSignup ? "Signup Form" : "Login via password"}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box
              maxW="600px"
              p={4}
              boxShadow="md"
              bg="gray.800"
              color={"white"}
              style={{ borderRadius: "20px" }}
            >
              <Box width={"100%"}>
                <form onSubmit={handleSubmit}>
                  {isSignup && (
                    <>
                      <FormControl isRequired>
                        <FormLabel>Legal Name</FormLabel>
                        <Input
                          type="text"
                          name="name"
                          placeholder="Enter your legal name"
                          onChange={handleInputChange}
                          value={formData.name}
                        />
                      </FormControl>
                      <FormControl isRequired mt={4}>
                        <FormLabel>{isSignup && "Email"}</FormLabel>
                        <Input
                          type={isSignup && "email"}
                          name={isSignup && "email"}
                          placeholder="Enter your email"
                          onChange={handleInputChange}
                          value={formData.email}
                        />
                      </FormControl>
                    </>
                  )}
                  {!isSignup && (
                    <FormControl isRequired>
                      <FormLabel> Email</FormLabel>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        onChange={handleInputChange}
                        value={formData.email}
                      />
                    </FormControl>
                  )}
                  <FormControl isRequired mt={4}>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        onChange={handleInputChange}
                        value={formData.password}
                      />
                      <InputRightElement>
                        <Button
                          size="sm"
                          onClick={togglePasswordVisibility}
                          color={"black"}
                        >
                          {showPassword ? (
                            <Icon as={FaEyeSlash} />
                          ) : (
                            <Icon as={FaEye} />
                          )}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  {isSignup && (
                    <>
                      <FormControl isRequired mt={4}>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input
                          type="password"
                          name="confirmPassword"
                          placeholder="Confirm your password"
                          onChange={handleInputChange}
                          value={formData.confirmPassword}
                        />
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel>Profile Image</FormLabel>

                        <Box mb="2">
                          {formData.profileImage && (
                            <>
                              <Image
                                src={formData.profileImage}
                                objectFit="fill"
                                alt="Preview"
                                maxW="xs"
                                maxH="40"
                                width="100%"
                                mb="4"
                              />
                              <Button
                                size="sm"
                                colorScheme="red"
                                onClick={() => {
                                  setFormData({
                                    ...formData,
                                    profileImage: "",
                                  });
                                }}
                              >
                                X
                              </Button>
                            </>
                          )}
                          {!formData.profileImage && (
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={handleInputChange}
                            />
                          )}
                        </Box>
                      </FormControl>
                    </>
                  )}

                  <Button
                    type="submit"
                    colorScheme="teal"
                    variant="solid"
                    width="100%"
                    mt={4}
                    isLoading={loadingPas}
                  >
                    {isSignup ? "Sign Up" : "Log In"}
                  </Button>
                </form>
              </Box>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AuthForm;
