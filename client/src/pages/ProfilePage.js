import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  FormControl,
  FormLabel,
  Center,
  Image,
  Text,
  useClipboard,
  Tooltip,
} from "@chakra-ui/react";
import {
  getTokenCookie,
  getUserFromToken,
} from "../Authentication/Authentication";
import { message } from "antd";
import makeRequest from "../axiosHandle/SendRequest";
import clipboardCopy from "clipboard-copy";

const UserProfile = () => {
  useEffect(() => {
    document.title = "Profile Page ";
  }, []);
  const token = getTokenCookie();
  if (token) {
    var user = getUserFromToken(token);
  }

  const cachedProfilePic = localStorage.getItem(`profile-pic:${user?.userId}`);
  const cachedName = localStorage.getItem(`name:${user?.userId}`);
  const cachedEmail = localStorage.getItem(`email:${user?.userId}`);

  return (
    <Box style={{ marginTop: "3rem" }}>
      <Center minH="80vh" mb={5}>
        <Box
          p={4}
          maxW="400px"
          width="90%"
          mx="auto"
          borderRadius="lg"
          backdropBlur={"20px"}
          boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
          textAlign="center"
          bg={"blackAlpha.200"}
          mt={"10px"}
        >
          <Center>
            <Image
              width="200px"
              height="200px"
              name={cachedName}
              src={cachedProfilePic}
              mb={4}
              objectFit="fit"
              borderRadius="50%"
              border={"1px black solid"}
              bg={"white"}
              boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
              filter="brightness(1.1) contrast(1.2)"
              transition="transform 0.2s ease-in-out, filter 0.2s ease-in-out"
              _hover={{
                transform: "scale(1.05)",
                filter: "brightness(1.0) contrast(1.0)",
              }}
            />
          </Center>

          <Box
            p={4}
            boxShadow="md"
            borderRadius="md"
            transition="transform 0.2s, box-shadow 0.2s"
            _hover={{
              transform: "scale(1.02)",
              boxShadow: "lg",
            }}
          >
            <Text fontSize="3xl" fontWeight="bold">
              <span style={{ color: "black", fontWeight: "lighter" }}>
                Hello
              </span>
              , <span style={{ color: "black" }}>{cachedName}</span>
            </Text>

            <Text fontSize="lg" color="gray.600" mb={4}>
              Email: {cachedEmail}
            </Text>
          </Box>
        </Box>
      </Center>
    </Box>
  );
};

export default UserProfile;
