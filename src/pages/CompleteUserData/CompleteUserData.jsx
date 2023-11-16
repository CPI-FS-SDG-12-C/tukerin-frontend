import React, { useEffect, useState } from "react";
import { Button, AlertIcon, Alert, Flex, Text, FormControl, InputGroup, Heading, Input, Stack, Image, Textarea, Icon, Select } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAPI } from "../../config/api";
import { useNavigate } from "react-router-dom";
import useTokenStore from "../../config/store";

function CompleteUserData() {
  const location = useLocation();
  const { email, role } = location.state.formData;
  // const { userId } = location.state.userId;
  const { userId } = location.state;
  const { post } = useAPI((state) => state);
  const { setToken } = useTokenStore((state) => state);
  let navigate = useNavigate();

  const [complete, setcomplete] = useState(false);

  console.log("id", userId, email, role);

  const [formData, setFormData] = useState({
    userId: userId,
    fullName: "",
    phoneNumber: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Data", formData);
    try {
      const res = await post("/users/complete-profile", formData);
      if (res.status === 200) {
        setToken(res.data.token);
        setcomplete(true);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (complete) {
      const timeoutId = setTimeout(() => {
        navigate("/dashboard");
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [complete]);

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
            <FormControl id="email" py={5}>
              <Input placeholder={email} isDisabled />
            </FormControl>

            <FormControl id="role">
              <Input placeholder={role} isDisabled />
            </FormControl>

            <form onSubmit={handleSubmit}>
              <FormControl id="fullName" py={5}>
                <Input type="fullName" name="fullName" placeholder="FullName" onChange={handleInputChange} />
              </FormControl>

              <FormControl id="phoneNumber" mb={5}>
                <Input type="text" name="phoneNumber" placeholder="Phone" onChange={handleInputChange} />
              </FormControl>

              <Textarea name="address" placeholder="Address" size="sm" onChange={handleInputChange} />

              <Stack spacing={6} mt={5}>
                <Button type="submit" colorScheme="orange" variant="solid">
                  Submit
                </Button>
              </Stack>
            </form>
            {complete && (
              <Stack spacing={3}>
                <Alert status="success">
                  <AlertIcon />
                  Data Complete, please Login
                </Alert>
              </Stack>
            )}
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
