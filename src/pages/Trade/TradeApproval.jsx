import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Button, AlertIcon, Alert, Text, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Card } from "@chakra-ui/react";
import useTokenStore from "../../config/store";
import { useGet } from "../../config/config";
import { useAPI } from "../../config/api";
import { useNavigate } from "react-router-dom";

const TradeApproval = () => {
  const [tradeAlert, setTradeAlert] = useState(false);
  const token = useTokenStore((state) => state.token);
  const { post } = useAPI((state) => state);
  let navigate = useNavigate();
  const [items, status] = useGet(`trade/approval`, token);
  console.log("Data", items);

  if (status === 404) {
    return <div>Barter request not found.</div>;
  }

  const handleAction = async () => {
    console.log("Halo");
    try {
      const id_items = items.length > 0 ? items[0].id : null;
      console.log(id_items);

      if (!id_items) {
        console.error("No items to approve");
        return;
      }
      const res = await post(`/trade/approval/${id_items}`, {}, token);
      if (res) {
        setTradeAlert(true);
        setTimeout(() => {
          setTradeAlert(false);
          navigate("/dashboard/trade-history");
        }, 2000);
      }
    } catch (error) {}
  };

  const alertTrade = () => {
    return (
      <Alert mb={4} status="info" onClose={() => setTradeAlert(false)}>
        <AlertIcon />
        Trade Success
      </Alert>
    );
  };

  return (
    <div>
      {tradeAlert && alertTrade()}
      <h1>Barter Requests</h1>
      <Card mt={4}>
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item, index) => (
            <div key={index}>
              <h3>Item {index + 1}</h3>
              <p>Requester Item: {item.name}</p>
              <p>Desired Item: {item.describtion}</p>
              <hr />
            </div>
          ))
        ) : (
          <Text fontSize="20px">List Items is Empty</Text>
        )}
        {Array.isArray(items) &&
          items.length > 0 && ( // Check if there are items
            <Button colorScheme="teal" onClick={handleAction}>
              Approve
            </Button>
          )}
      </Card>
    </div>
  );
};

export default TradeApproval;
