import React from "react";
import { FiChevronUp } from "react-icons/fi";

import { Button, Container, Flex, Text, Box } from "@chakra-ui/react";

const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      bgColor="gray.800"
      color="white"
      py={8}
      boxShadow="0px -4px 6px rgba(0, 0, 0, 0.1)"
    >
      <Container maxW="container.xl">
        <Flex
          flexDir={{ base: "column", md: "row" }}
          alignItems="start"
          justifyContent="start"
        >
          <Button
            title="back to top"
            onClick={handleScrollToTop}
            bgColor="indigo.500"
            _hover={{ bgColor: "indigo.600" }}
            color="black"
            rounded="lg"
            display={{ base: "block", md: "flex" }}
            alignItems={{ base: "flex-end", md: "center" }}
            mt={{ base: 4, md: 0 }}
            boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
          >
            <FiChevronUp />
          </Button>
        </Flex>
        <Text textAlign="center" mt={8} fontSize="sm">
          &copy; {new Date().getFullYear()} Saurabh Dixit. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
