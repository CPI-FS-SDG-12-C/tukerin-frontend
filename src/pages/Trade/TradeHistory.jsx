import React from "react";
import useTokenStore from "../../config/store";
import { useGet } from "../../config/config";
import { useAPI } from "../../config/api";
import { Table, Thead, Tbody, Tr, Th, Td, Spinner, Card } from "@chakra-ui/react";

function TradeHistory() {
  const token = useTokenStore((state) => state.token);
  const [items, status] = useGet("trade/history", token);
  console.log(items);

  if (!status) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>Trade History</h1>
      {Array.isArray(items) && items.length > 0 ? (
        <Card>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th>Status</Th>
                {/* Add more header columns as needed */}
              </Tr>
            </Thead>
            <Tbody>
              {items.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.name}</Td>
                  <Td>{item.describtion}</Td>
                  <Td>{item.trade ? "Done" : ""}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Card>
      ) : (
        <p>No trade history available</p>
      )}
    </div>
  );
}

export default TradeHistory;
