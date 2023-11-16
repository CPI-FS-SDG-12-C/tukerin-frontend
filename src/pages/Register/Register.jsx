import { Button, Flex, Text, FormControl, InputGroup, Heading, Input, Stack, Image, InputRightElement, Icon, Select } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import SmallWithNavigation from "../../components/Footer";
import { useState } from "react";
import { useAPI } from "../../config/api";
import { useNavigate } from "react-router-dom";
import useTokenStore from "../../config/store";

export default function Register() {
  const { post } = useAPI((state) => state);
  const { setToken } = useTokenStore((state) => state);
  let navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [userData, setUserData] = useState({
    email: "",
    role: "",
    userId: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Data", formData);
    try {
      const res = await post("/users/register", formData);
      if (res.status === 201) {
        setToken(res.data.token);
        const userId = res.data.id;
        console.log("User ID:", userId);

        setUserData({
          email: formData.email,
          role: formData.role,
          userId: userId,
        });

        console.log("Navigating to /completeDataUser");
        navigate("/completeDataUser", { state: { formData, userId } });
      }
    } catch (error) {}
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

              <Select placeholder="Role" name="role" onChange={handleInputChange}>
                <option value="user">User</option>
                <option value="foundation">Foudation</option>
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
