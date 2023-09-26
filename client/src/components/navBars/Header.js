import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import {
  getTokenCookie,
  getUserFromToken,
} from "../../Authentication/Authentication";
import Cookies from "js-cookie";
import { message } from "antd";
import makeRequest from "../../axiosHandle/SendRequest";

import {
  Box,
  Button,
  Container,
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Link as ChakraLink,
  Stack,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  FaHome,
  FaSignInAlt,
  FaSignOutAlt,
  FaTrashAlt,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";
// header part
const Header = () => {
  const navigate = useNavigate();
  const token = getTokenCookie();
  if (token) {
    var user = getUserFromToken(token);
  }

  const cachedProfilePic = localStorage.getItem(`profile-pic:${user?.userId}`);
  const cachedName = localStorage.getItem(`name:${user?.userId}`);
  const cachedEmail = localStorage.getItem(`email:${user?.userId}`);

  const [currentProfile, setCurrentProfile] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [currentlegalName, setCurrentlegalName] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const clearUserData = (userId) => {
    localStorage.removeItem(`profile-pic:${userId}`);
    localStorage.removeItem(`email:${userId}`);
    localStorage.removeItem(`name:${userId}`);
  };

  const fetchCurrent = async () => {
    if (user) {
      const userId = user?.userId;
      await makeRequest(`/user/userdetails/${userId}`, "GET", token, null)
        .then((data) => {
          if (data.success) {
            localStorage.setItem(
              `profile-pic:${userId}`,
              data.user?.profileImage
            );
            localStorage.setItem(`email:${userId}`, data.user?.email);
            localStorage.setItem(`name:${userId}`, data.user?.name);

            setCurrentProfile(data.user?.profileImage);
            setCurrentUserEmail(data.user?.email);
            setCurrentlegalName(data.user?.name);
            return;
          }
          setCurrentProfile(null);
          setCurrentUserEmail(null);
          setCurrentlegalName(null);
        })
        .catch((error) => {
          console.error("Error fetching current user:", error);
        });
    }
  };

  useEffect(() => {
    if (cachedProfilePic || cachedName || cachedEmail) {
      setCurrentProfile(cachedProfilePic);
      setCurrentUserEmail(cachedEmail);
      setCurrentlegalName(cachedName);

      return;
    } else {
      fetchCurrent();
      return;
    }
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    if (user) {
      const confirmed = window.confirm("Are you sure you want to log out?");
      if (confirmed) {
        message.success("Logout Successful");
        setTimeout(() => {
          clearUserData(user?.userId);
          Cookies.remove("USER_SESSION_COOKIE");
          window.location.reload();
        }, 2000);
        return;
      } else {
        message.info("Logout Cancelled by user");
        return;
      }
    }
  };

  const handleProfile = (e) => {
    e.preventDefault();
    navigate("/profile");
    return;
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete your account?"
    );
    if (confirmed) {
      await makeRequest(`/user/delete/${user.userId}`, "DELETE", token, null)
        .then((data) => {
          if (data.success) {
            message.success("Your account has been successfully deleted.");
            clearUserData(user?.userId);
            Cookies.remove("USER_SESSION_COOKIE");
            window.location.reload();
            return;
          } else {
            message.error(
              "An error occurred while deleting your account. Please try again later."
            );
            return;
          }
        })
        .catch((error) => {
          message.error(error.message);
          return;
        });
    } else {
      message.info("Account deletion canceled by the user.");
      return;
    }
  };
  return (
    <>
      <Box
        bg="gray.800"
        color="white"
        py={4}
        pos="fixed"
        top={0}
        left={0}
        w="100%"
        zIndex={50}
        boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
        backdropFilter="blur(10px)"
      >
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <Box
              fontSize="xl"
              fontWeight="semibold"
              display="flex"
              alignItems="center"
            >
              <Image
                src="data:image/png;base64,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"
                alt="domain--v1"
                w={10}
                h={10}
                mr={2}
                objectFit="fill"
                borderRadius="50%"
              />
            </Box>

            <Tooltip label={"Home"} placement="bottom">
              <ChakraLink as={Link} to="/">
                <IconButton
                  aria-label="Login"
                  icon={<Icon as={FaHome} boxSize={4} />}
                  variant="solid"
                  colorScheme="indigo"
                  size="md"
                  _hover={{ bg: "indigo.800" }}
                />
              </ChakraLink>
            </Tooltip>

            <Box
              display={{ base: "none", md: "flex" }}
              spacing={4}
              alignItems="center"
            >
              {!user && (
                <Stack direction="row" spacing={4} align="center">
                  <Tooltip label={"Signup"} placement="bottom">
                    <ChakraLink as={Link} to="/signup">
                      <IconButton
                        aria-label="Sign Up"
                        icon={<Icon as={FaUserPlus} boxSize={4} />}
                        variant="solid"
                        colorScheme="indigo"
                        size="md"
                        _hover={{ bg: "indigo.800" }}
                      />
                    </ChakraLink>
                  </Tooltip>
                  <Tooltip label={"Login"} placement="bottom">
                    <ChakraLink as={Link} to="/login">
                      <IconButton
                        aria-label="Login"
                        icon={<Icon as={FaSignInAlt} boxSize={4} />}
                        variant="solid"
                        colorScheme="indigo"
                        size="md"
                        _hover={{ bg: "indigo.800" }}
                      />
                    </ChakraLink>
                  </Tooltip>
                </Stack>
              )}

              {user && (
                <>
                  <Menu>
                    <MenuButton
                      as={Button}
                      variant="link"
                      rightIcon={<ChevronDownIcon />}
                      color={"white"}
                      _hover={{ color: "gray.200" }}
                    >
                      {cachedEmail}
                    </MenuButton>
                    <MenuList color="black" bg={"gray.700"}>
                      <MenuItem onClick={handleLogout}>
                        <Icon as={FaSignOutAlt} mr="2" color={"ActiveBorder"} />
                        Logout
                      </MenuItem>
                      <MenuItem onClick={handleDeleteAccount}>
                        <Icon as={FaTrashAlt} mr="2" color={"red"} />
                        Delete Account
                      </MenuItem>
                      <MenuItem onClick={handleProfile}>
                        <Icon as={FaUser} mr="2" color={"black"} />
                        Profile
                      </MenuItem>
                    </MenuList>
                  </Menu>
                  <Image
                    ml={5}
                    bg={"white"}
                    border={"1px white solid"}
                    cursor="pointer"
                    title={cachedName}
                    w={10}
                    h={10}
                    mr={2}
                    onClick={handleProfile}
                    objectFit="fill"
                    name={cachedName}
                    src={cachedProfilePic}
                    borderRadius="50%"
                  />
                </>
              )}
            </Box>

            {/* Mobile Menu */}
            <Box display={{ base: "block", md: "none" }}>
              <Button
                onClick={isOpen ? onClose : onOpen}
                fontSize="xl"
                color="black"
              >
                {isOpen ? <Icon as={FiX} /> : <Icon as={FiMenu} />}
              </Button>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Mobile Menu */}
      {isOpen && (
        <Box
          pos="fixed"
          top={0}
          right={isOpen ? 0 : "-100%"}
          bottom={0}
          width={"100%"}
          zIndex={40}
          overflowY="auto"
          transition="0.3s ease-in-out"
          boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
          backdropFilter="blur(10px)"
          color="black"
        >
          <Box mt={16}>
            <Flex direction="column" style={{ marginTop: "80px" }} spacing={4}>
              {!user && (
                <>
                  <ChakraLink
                    as={Link}
                    to="/signup"
                    onClick={onClose}
                    color="white"
                    bg="gray.800"
                    borderRadius="md"
                    py={2}
                    px={4}
                    mb={2}
                    _hover={{
                      bg: "indigo.500",
                      color: "white",
                      textDecoration: "none",
                    }}
                    transition="background 0.3s, color 0.3s"
                    boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
                  >
                    Signup
                  </ChakraLink>
                  <ChakraLink
                    as={Link}
                    to="/login"
                    onClick={onClose}
                    color="white"
                    bg="gray.800"
                    borderRadius="md"
                    py={2}
                    px={4}
                    mb={2}
                    _hover={{
                      bg: "indigo.500",
                      color: "white",
                      textDecoration: "none",
                    }}
                    transition="background 0.3s, color 0.3s"
                    boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
                  >
                    Login
                  </ChakraLink>
                </>
              )}

              {user && (
                <Menu>
                  <MenuButton
                    as={Button}
                    variant="link"
                    rightIcon={<ChevronDownIcon />}
                    bg="gray.800"
                    borderRadius="md"
                    py={2}
                    mb={2}
                    px={1}
                    color={"gray.200"}
                    _hover={{
                      bg: "indigo.500",
                      color: "white",
                      textDecoration: "none",
                    }}
                    transition="background 0.3s, color 0.3s"
                    boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
                  >
                    {cachedEmail}
                  </MenuButton>
                  <MenuList>
                    <MenuItem color={"black"} onClick={handleLogout}>
                      <Icon as={FaSignOutAlt} mr="2" color={"ActiveBorder"} />
                      Logout
                    </MenuItem>

                    <MenuItem onClick={handleDeleteAccount}>
                      <Icon as={FaTrashAlt} mr="2" color={"red"} />
                      Delete Account
                    </MenuItem>
                    <MenuItem onClick={handleProfile}>
                      <Icon as={FaUser} mr="2" color={"black"} />
                      Profile
                    </MenuItem>
                  </MenuList>
                  <Image
                    ml={2}
                    cursor="pointer"
                    title={cachedName}
                    w={20}
                    h={20}
                    mr={2}
                    border={"1px black solid"}
                    bg={"white"}
                    onClick={handleProfile}
                    objectFit="fill"
                    name={cachedName}
                    src={cachedProfilePic}
                    borderRadius="50%"
                  />
                </Menu>
              )}
            </Flex>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Header;
