import { Box, Container, Stack, Text, useColorModeValue } from "@chakra-ui/react";

export default function SmallWithNavigation() {
  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")} color={useColorModeValue("gray.700", "gray.200")}>
      <Container as={Stack} maxW={"6xl"} py={4} direction={{ base: "column", md: "row" }} spacing={4} justify={{ base: "center" }} align={{ base: "center", md: "center" }}>
        <Text>© {new Date().getFullYear()} Tukerin. All rights reserved</Text>
      </Container>
    </Box>
  );
}
