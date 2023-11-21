import React from "react";
import { SimpleGrid, CardHeader, Button, Heading, CardFooter, CardBody, Card, Text, TableContainer, Table, TableCaption, Tr, Th, Thead, Tbody, Td, Tfoot } from "@chakra-ui/react";
import useTokenStore from "../../config/store";
import { useGet } from "../../config/config";
import { useAPI } from "../../config/api";

function Item() {
  const token = useTokenStore((state) => state.token);
  const { del } = useAPI((state) => state);

  const [items, status] = useGet("items", token);

  if (!status) {
    return <div>Loading...</div>;
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleString("en-US", options);
    return formattedDate;
  };

  const handleDeleteItem = async (itemId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await del(`items/${itemId}`, token);
      if (response.status === 204) {
        console.log("Item deleted successfully");
        window.alert("Item deleted successfully");
        window.location.reload();
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <Card>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Item List</TableCaption>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Name</Th>
              <Th>Date</Th>
              <Th>Description</Th>
              <Th>Status</Th>
              <Th>Barter Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.length === 0 ? (
              <Tr>
                <Td colSpan={7}>
                  <Text fontSize="20px">List Items is Empty</Text>
                </Td>
              </Tr>
            ) : (
              items
                .filter((item) => !item.barter) // Filter item yang belum terlibat dalam barter
                .map((item, index) => (
                  <Tr key={item.id}>
                    <Td>{index + 1}</Td>
                    <Td>{item.name}</Td>
                    <Td>{formatDate(item.timestamp)}</Td>
                    <Td>{item.describtion}</Td>
                    <Td>{item.statusTrade}</Td>
                    <Td>{item.barter ? item.barter.status : "Not involved in barter"}</Td>
                    <Td>
                      <Button size="xs" colorScheme="teal" variant="solid" m={2}>
                        View
                      </Button>
                      <Button size="xs" colorScheme="red" variant="solid" onClick={() => handleDeleteItem(item.id)}>
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default Item;
