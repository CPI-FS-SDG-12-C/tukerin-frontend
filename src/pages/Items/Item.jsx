// Item.js
import React from "react";
import { SimpleGrid, CardHeader, Button, Heading, CardFooter, CardBody, Card, Text } from "@chakra-ui/react";
import useTokenStore from "../../config/store";
import { useGet } from "../../config/config";

function Item() {
  const token = useTokenStore((state) => state.token);

  // Ganti URL dan token sesuai kebutuhan
  const [items, status] = useGet("items", token);

  console.log(items);

  if (!status) {
    // Tampilkan loading atau pesan kesalahan jika diperlukan
    return <div>Loading...</div>;
  }

  return (
    <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr)">
      {items.length === 0 ? (
        <Text fontSize="20px">List Items is Empty</Text>
      ) : (
        <>
          <Text fontSize="20px">List Items</Text>
          {items.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <Heading size="md">{item.name}</Heading>
              </CardHeader>
              <CardBody>
                <Text>{item.describtion}</Text>
              </CardBody>
              <CardFooter>
                <Button>View</Button>
              </CardFooter>
            </Card>
          ))}
        </>
      )}
    </SimpleGrid>
  );
}

export default Item;
