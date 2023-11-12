import { Button, Flex, Text, FormControl, InputGroup, Heading, Input, Stack, Image, InputRightElement, Icon, Select } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import SmallWithNavigation from "../../components/Footer";
import { useState } from "react";

export default function Register() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "email") {
      const emailRegex = /^\S+@\S+\.\S+$/;
      setError((prevError) => ({
        ...prevError,
        email: emailRegex.test(value) ? "" : "Please enter a valid email address",
      }));
    } else if (name === "password") {
      setError((prevError) => ({
        ...prevError,
        password: value.length >= 6 ? "" : "Password must be at least 6 characters",
      }));
    } else {
      setError((prevError) => ({ ...prevError, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = "/completeDataUser";
  };

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
            <Heading fontSize={"2xl"}>Sign in to your account</Heading>
            <form onSubmit={handleSubmit}>
              <FormControl id="email">
                <Input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
                {error.email && <Text color="red.500">{error.email}</Text>}
              </FormControl>

              <FormControl id="password" py={5}>
                <InputGroup size="md">
                  <Input type={show ? "text" : "password"} name="password" placeholder="Password" onChange={handleInputChange} />
                  <InputRightElement width="4.5rem">
                    <Button size="lg" onClick={handleClick} variant="">
                      <Icon ml={7} as={show ? HiEyeOff : HiEye} />
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {error.password && <Text color="red.500">{error.password}</Text>}
              </FormControl>

              <Select placeholder="Role">
                <option>User</option>
                <option>Foudation</option>
              </Select>

              <Stack spacing={6} mt={5}>
                <Button type="submit" colorScheme="orange" variant="solid">
                  Sign Up
                </Button>
              </Stack>
            </form>
            <Stack pt={6}>
              <Text align="center">
                New to our service?{" "}
                <Link to="/login">
                  <Text as="span" color="orange.400">
                    Sign In
                  </Text>
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt="Login Image"
            objectFit="cover"
            src="https://images.unsplash.com/photo-1509822929063-6b6cfc9b42f2?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1352&q=80"
          />
        </Flex>
      </Stack>
      <SmallWithNavigation />
    </>
  );
}
