import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SimpleGrid, CardHeader, Button, Heading, CardFooter, CardBody, Card, Text, Flex, Avatar, Box, Image, Select, AlertIcon, Alert } from "@chakra-ui/react";
import useTokenStore from "../../config/store";
import { useGet } from "../../config/config";

export default function TradeDetail() {
  const location = useLocation();
  const tradeData = location.state; // Menerima data trade dari lokasi navigasi
  const [tradeAlert, setTradeAlert] = useState(false);
  const token = useTokenStore((state) => state.token);
  const [items, status] = useGet("items", token);

  // State to track the selected item from your inventory
  const [selectedMyItem, setSelectedMyItem] = useState(null);

  const handleSelectMyItem = (event) => {
    const selectedItem = items.find((item) => item.id === event.target.value);
    setSelectedMyItem(selectedItem);
    console.log(selectedItem);
  };

  const handleTrade = () => {
    if (selectedMyItem) {
      // Lakukan tindakan perdagangan atau pembaruan database lainnya di sini
      // Misalnya, kirim permintaan perdagangan ke 'nameUser'
      setTradeAlert(true);
    } else {
      console.log("Tidak ada item yang dipilih untuk ditukar");
    }
  };

  const alertTrade = () => {
    return (
      <Alert status="info" onClose={() => setTradeAlert(false)}>
        <AlertIcon />
        Trade request sent to {tradeData.selectedItemUser}. Get ready!
      </Alert>
    );
  };

  return (
    <>
      <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(490px, 2fr))">
        <Card>
          <CardHeader>
            <Flex spacing="0">
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
                <Box>
                  <Heading size="sm">{tradeData.selectedItemUser}</Heading>
                </Box>
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody>
            <Text as="b">{tradeData.selectedItemName}</Text>
            <Text>{tradeData.selectedItemDescription}</Text>
          </CardBody>
          <Image
            objectFit="cover"
            src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=1770&q=80"
            alt="Chakra UI"
          />
        </Card>
        <Card>
          {Array.isArray(items) && items.length > 0 ? (
            <Select bg="orange" color="white" placeholder="Select your item" onChange={handleSelectMyItem}>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
          ) : (
            <Text>Loading...</Text>
          )}
          <CardBody>
            {/* Display details of the selected item */}
            {selectedMyItem && (
              <div>
                <Text as="b">{selectedMyItem.name}</Text>
                <Text my={2}>{selectedMyItem.describtion}</Text>
                <Image
                  objectFit="cover"
                  mb={4}
                  src="https://images.unsplash.com/photo-1602810316693-3667c854239a?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                  alt="Chakra UI"
                />
                <Button colorScheme="orange" size="md" onClick={handleTrade}>
                  Trade this item
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      </SimpleGrid>
      {tradeAlert && alertTrade()}
    </>
  );
}
