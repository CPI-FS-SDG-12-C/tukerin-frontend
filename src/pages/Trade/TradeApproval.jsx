import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Button, Modal, Text, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from "@chakra-ui/react";
import useTokenStore from "../../config/store";
import { useGet } from "../../config/config";

const TradeApproval = () => {
  const token = useTokenStore((state) => state.token);

  function parseJwt(token) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  }
  const decodedToken = parseJwt(token);
  const id = decodedToken?.id;

  const [items, status] = useGet(`trade/requests/655b27b283a135753b8b9c35/items`, token);

  if (status === 404) {
    return <div>Barter request not found.</div>;
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleString("en-US", options);
    return formattedDate;
  };

  return (
    <div>
      <h1>Barter Requests</h1>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Requester Item</Th>
            <Th>Desired Item</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Array.isArray(items) ? (
            items.map((item, index) => (
              <Tr key={index}>
                <Td>{item.name}</Td>
                <Td>{item.describtion}</Td>
                <Td>
                  <Button onClick={() => handleAction(item)}>Approve</Button>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={3}>
                <Text fontSize="20px">List Items is Empty</Text>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </div>
  );
};

export default TradeApproval;
