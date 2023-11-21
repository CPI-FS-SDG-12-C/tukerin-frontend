import React, { useState, useEffect } from "react";
import { FormControl, Card, CardFooter, CardBody, Select, CardHeader, Heading, Text, FormLabel, Input, FormErrorMessage, Button, SimpleGrid, FormHelperText, AlertIcon, Alert } from "@chakra-ui/react";
import { useAPI } from "../../config/api";
import useTokenStore from "../../config/store";
import { useNavigate } from "react-router-dom";

function AddItem() {
  const { post } = useAPI((state) => state);
  const token = useTokenStore((state) => state.token);
  let navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [complete, setcomplete] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    describtion: "",
    statusTrade: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isNameError = formData.name === "";
  const isDescriptionError = formData.describtion === "";
  const isStatusTradeError = formData.statusTrade == "";

  const handleAddButtonClick = async () => {
    try {
      const res = await post("/items", formData, token);
      console.log(res.status);
      if (res.status === 200) {
        setcomplete(true);
        setSuccessMessage("Data berhasil disimpan");
      }
    } catch (error) {
      // Tangani kesalahan jika ada
      console.error("Gagal menyimpan data", error);
      // Tambahkan pesan kesalahan di sini jika diperlukan
      setErrorMessage("Gagal menyimpan data");
    }
  };

  useEffect(() => {
    if (complete) {
      const timeoutId = setTimeout(() => {
        navigate("/dashboard/my-items");
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [complete]);

  return (
    <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr)">
      <Card>
        <CardBody>
          <FormControl isInvalid={isNameError}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formData.name} onChange={handleInputChange} />
            {!isNameError ? <FormHelperText>👍</FormHelperText> : <FormErrorMessage>Name is required.</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={isDescriptionError}>
            <FormLabel>Description</FormLabel>
            <Input type="text" name="describtion" value={formData.describtion} onChange={handleInputChange} />
            {!isDescriptionError ? <FormHelperText>👍</FormHelperText> : <FormErrorMessage>Description is required.</FormErrorMessage>}
          </FormControl>
          {/* <FormControl isInvalid={isStatusTradeError}>
            <FormLabel>Status</FormLabel>
            <Input type="text" name="statusTrade" value={formData.statusTrade} onChange={handleInputChange} />
            {!isStatusTradeError ? <FormHelperText>👍</FormHelperText> : <FormErrorMessage>StatusTrade is required.</FormErrorMessage>}
          </FormControl> */}
          <Select placeholder="Status Trade" name="statusTrade" onChange={handleInputChange}>
            <option value="open">open</option>
            <option value="keep">keep</option>
          </Select>
        </CardBody>
        <CardFooter>
          <Button mb={5} onClick={handleAddButtonClick} colorScheme="teal" variant="solid">
            Add
          </Button>
        </CardFooter>
        {successMessage && (
          <Alert status="success" variant="subtle">
            <AlertIcon />
            Data Added.
          </Alert>
        )}
        {errorMessage && (
          <Text color="red.500" mt={2}>
            {errorMessage}
          </Text>
        )}
      </Card>
    </SimpleGrid>
  );
}

export default AddItem;
