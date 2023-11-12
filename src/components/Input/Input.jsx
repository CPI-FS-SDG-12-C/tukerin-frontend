import React, { useState } from "react";
import { Flex, Input, Text } from "@chakra-ui/react";

const SignUpField = ({ type, placeholder }) => (
  <Flex>
    <Input type={type} placeholder={placeholder} />
    <Text as="span" color="red" ml={1}>
      *
    </Text>
  </Flex>
);
export default SignUpField;
