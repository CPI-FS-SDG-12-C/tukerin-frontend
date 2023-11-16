"use client";

import { IconButton, Avatar, Box, CloseButton, Flex, HStack, VStack, Icon, useColorModeValue, Text, Drawer, DrawerContent, useDisclosure, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from "@chakra-ui/react";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { FaHandHolding } from "react-icons/fa";
import { AiOutlineOrderedList } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";
import { GiTrade } from "react-icons/gi";
import useTokenStore from "../../config/store";

const items = [
  { name: "List Items", icon: AiOutlineOrderedList },
  { name: "Add Items", icon: BiAddToQueue },
];

const donations = [{ name: "List Of Donation", icon: FaHandHolding }];

const trades = [
  { name: "List Trade Items", icon: AiOutlineOrderedList },
  { name: "Trade Approvel", icon: GiTrade },
];

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box transition="3s ease" bg={useColorModeValue("white", "gray.900")} borderRight="1px" borderRightColor={useColorModeValue("gray.200", "gray.700")} w={{ base: "full", md: 60 }} pos="fixed" h="full" {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" color={"orange"}>
          Tukerin
          <Text as={"span"} color={"black"}>
            .
          </Text>
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Text ml={10} color={"gray.500"}>
        Items
      </Text>
      {items.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
      <Text ml={10} color={"gray.500"} mt={5}>
        Donations
      </Text>
      {donations.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
      <Text ml={10} color={"gray.500"} mt={5}>
        Trade
      </Text>
      {trades.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Box as="a" href="#" style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "orange",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const token = useTokenStore((state) => state.token);

  function parseJwt(token) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  }
  const decodedToken = parseJwt(token);
  const fullName = decodedToken?.fullName;
  const role = decodedToken?.role;

  console.log(decodedToken);
  console.log("FullName", fullName);
  console.log("Role", role);

  const setToken = useTokenStore((state) => state.setToken);
  const logout = () => {
    console.log("Logout");
    setToken(null);
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton display={{ base: "flex", md: "none" }} onClick={onOpen} variant="outline" aria-label="open menu" icon={<FiMenu />} />

      <Text display={{ base: "flex", md: "none" }} fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Tukerin.
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        {/* <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} /> */}
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
              <HStack>
                <Avatar size={"sm"} src={"https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"} />
                <VStack display={{ base: "none", md: "flex" }} alignItems="flex-start" spacing="1px" ml="2">
                  <Text fontSize="sm">{fullName}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {role}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList bg={useColorModeValue("white", "gray.900")} borderColor={useColorModeValue("gray.200", "gray.700")}>
              <MenuItem>Acount Settings</MenuItem>
              <MenuDivider />
              <MenuItem onClick={logout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent onClose={() => onClose} display={{ base: "none", md: "block" }} />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose} size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Content */}
      </Box>
    </Box>
  );
};

export default Dashboard;
