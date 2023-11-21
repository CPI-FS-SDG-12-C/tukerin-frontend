import React, { useState } from "react";
import { SimpleGrid, CardHeader, Button, Heading, CardFooter, CardBody, Card, Text, Flex, Avatar, Box, Image } from "@chakra-ui/react";
import useTokenStore from "../../config/store";
import { useGet } from "../../config/config";
import { useNavigate } from "react-router-dom";

function Trade() {
  const token = useTokenStore((state) => state.token);
  // Ganti URL dan token sesuai kebutuhan
  const [items, status] = useGet("items/trade", token);
  const navigate = useNavigate();
  console.log(items);

  const [selectedTrade, setSelectedTrade] = useState(null);

  const handleTradeClick = (selectedItem) => {
    setSelectedTrade(selectedItem);
    navigate("detail", {
      state: {
        selectedItemName: selectedItem.name,
        selectedItemDescription: selectedItem.describtion,
        selectedItemUser: selectedItem.user?.fullName,
        itemToGiveName: "Item yang akan diberikan",
      },
    });
  };

  if (!status) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
        {items.length === 0 ? (
          <Text fontSize="20px">List Items is Empty</Text>
        ) : (
          items.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <Flex spacing="0">
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
                    <Box>
                      <Heading size="sm">{item.user?.fullName || "Unknown User"}</Heading>
                    </Box>
                  </Flex>
                </Flex>
              </CardHeader>
              <CardBody>
                <Text as="b">{item.name}</Text>
                <Text>{item.describtion}</Text>
              </CardBody>
              <Image
                objectFit="cover"
                src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=1770&q=80"
                alt="Chakra UI"
              />
              <CardFooter>
                <Button colorScheme="orange" size="sm" onClick={() => handleTradeClick(item)}>
                  Trade
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </SimpleGrid>
    </>
  );
}

export default Trade;
