import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from "@chakra-ui/react";
import { useAPI } from "../../config/api";

const TradeApproval = () => {
  const { get, post } = useAPI((state) => state);
  const [barterRequests, setBarterRequests] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedBarter, setSelectedBarter] = useState(null);

  useEffect(() => {
    // Mendapatkan daftar barter requests saat komponen dimount
    fetchBarterRequests();
  }, []);

  const fetchBarterRequests = async () => {
    try {
      const response = await get("trade/all");
      setBarterRequests(response.data);
    } catch (error) {
      console.error("Error fetching barter requests:", error);
    }
  };

  const handleApproveBarter = async (barterId) => {
    try {
      // Menyetujui barter request
      await post("barter/approve", { barterId });
      // Refresh daftar barter requests setelah menyetujui
      fetchBarterRequests();
    } catch (error) {
      console.error("Error approving barter:", error);
    }
  };

  const handleViewDetails = (barter) => {
    setSelectedBarter(barter);
    onOpen();
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
        <Tbody></Tbody>
      </Table>
    </div>
  );
};

export default TradeApproval;
