import { Button, Select, Flex, Text, FormControl, FormLabel, Heading, InputGroup, Input, Stack, Icon, Image, InputRightElement } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import SmallWithNavigation from "../../components/Footer";
import { useState } from "react";
import SignUpField from "../../components/Input/Input";

export default function Register() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

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
            <Heading fontSize={"2xl"}>Sign Up to your account</Heading>

            <SignUpField type="text" placeholder="Full Name" />
            <SignUpField type="email" placeholder="Email" />
            <SignUpField type="text" placeholder="No Hp" />

            <Flex>
              <InputGroup size="md">
                <Input type={show ? "text" : "password"} name="password" placeholder="Password" />
                <InputRightElement width="4.5rem">
                  <Button size="lg" onClick={handleClick} variant="">
                    <Icon ml={7} as={show ? HiEyeOff : HiEye} />
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Text as="span" color="red" ml={1}>
                *
              </Text>
            </Flex>

            <SignUpField type="number" placeholder="Kode Pos" />

            <Flex>
              <Select placeholder="Kecamatan">
                <option>United Arab Emirates</option>
                <option>Nigeria</option>
              </Select>
              <Text as="span" color="red" ml={1}>
                *
              </Text>
            </Flex>

            <Flex>
              <Select placeholder="Kelurahan">
                <option>United Arab Emirates</option>
                <option>Nigeria</option>
              </Select>
              <Text as="span" color="red" ml={1}>
                *
              </Text>
            </Flex>

            <Stack spacing={6}>
              <Button colorScheme={"orange"} variant={"solid"}>
                Sign Up
              </Button>
            </Stack>

            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link to="/login">
                  <Text as={"span"} color={"orange.400"}>
                    Sign In
                  </Text>
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Flex>

        <Flex flex={1}>
          <Image alt={"Login Image"} objectFit={"cover"} src={"https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"} />
        </Flex>
      </Stack>

      <SmallWithNavigation />
    </>
  );
}
