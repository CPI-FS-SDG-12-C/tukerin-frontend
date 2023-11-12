import React from "react";
import { Button, Flex, Text, FormControl, InputGroup, Heading, Input, Stack, Image, Textarea, Icon, Select } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function CompleteUserData() {
  return (
    <>
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading>
              <Link to="/">
                Tukerin
                <Text as={"span"} color={"orange.400"}>
                  .
                </Text>
              </Link>
            </Heading>
            <Heading fontSize={"2xl"}>Complete Your Data</Heading>
            <form>
              <FormControl id="email" py={5}>
                <Input type="email" name="email" placeholder="Email" />
              </FormControl>

              <Select placeholder="Role">
                <option>User</option>
                <option>Foudation</option>
              </Select>

              <FormControl id="fullName" py={5}>
                <Input type="fullName" name="fullName" placeholder="FullName" />
              </FormControl>

              <FormControl id="phone" mb={5}>
                <Input type="text" name="phone" placeholder="Phone" />
              </FormControl>

              <Textarea placeholder="Alamat" size="sm" />

              <Stack spacing={6} mt={5}>
                <Button type="submit" colorScheme="orange" variant="solid">
                  Submit
                </Button>
              </Stack>
            </form>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image alt="Login Image" objectFit="cover" src="https://images.unsplash.com/photo-1487611459768-bd414656ea10?q=80&w=2880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&q=80" />
        </Flex>
      </Stack>
    </>
  );
}

export default CompleteUserData;
