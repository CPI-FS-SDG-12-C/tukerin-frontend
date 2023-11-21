import { IconButton, Avatar, Box, CloseButton, Flex, HStack, VStack, Icon, useColorModeValue, Text, Drawer, DrawerContent, useDisclosure, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Card } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";

import { FiMenu, FiChevronDown } from "react-icons/fi";
import { FaHandHolding } from "react-icons/fa";
import { AiOutlineOrderedList } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";
import { GiTrade } from "react-icons/gi";
import useTokenStore from "../../config/store";
import Item from "../Items/Item";
import AddItem from "../Items/AddItem";
import BreadcrumbComponent from "../../components/Breadcrumb";
import Trade from "../Trade/Trade";
import TradeDetail from "../Trade/TradeDetail";
import TradeApproval from "../Trade/TradeApproval";

const items = [
  { name: "My Items", icon: AiOutlineOrderedList, to: "/my-items" },
  { name: "Add Items", icon: BiAddToQueue, to: "/add-items" },
];

const donations = [
  { name: "List Of Donation", icon: FaHandHolding, to: "/list-of-donations" },
  { name: "Donation", icon: FaHandHolding, to: "/donation" },
];

const trades = [
  { name: "List Trade Items", icon: AiOutlineOrderedList, to: "/list-trade-items" },
  { name: "Trade Request", icon: AiOutlineOrderedList, to: "/trade-request" },
  { name: "Trade Approvel", icon: GiTrade, to: "/trade-approval" },
];

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
}

const NavItem = ({ icon, to, children, ...rest }) => {
  return (
    <Link to={`/dashboard${to}`} style={{ textDecoration: "none" }}>
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
    </Link>
  );
};

const SidebarContent = ({ onClose, role, ...rest }) => {
  let menuItems;

  if (role === "user") {
    menuItems = (
      <>
        <Text ml={10} color={"gray.500"}>
          Items
        </Text>
        {items.map((link) => (
          <NavItem key={link.name} icon={link.icon} to={link.to}>
            {link.name}
          </NavItem>
        ))}
        <Text ml={10} color={"gray.500"} mt={5}>
          Donations
        </Text>
        {donations.map((link) => (
          <NavItem key={link.name} icon={link.icon} to={link.to}>
            {link.name}
          </NavItem>
        ))}
        <Text ml={10} color={"gray.500"} mt={5}>
          Trade
        </Text>
        {trades.map((link) => (
          <NavItem key={link.name} icon={link.icon} to={link.to}>
            {link.name}
          </NavItem>
        ))}
      </>
    );
  } else if (role === "foundation") {
    menuItems = (
      <>
        <Text ml={10} color={"gray.500"} mt={5}>
          Donations
        </Text>
        {donations.map((link) => (
          <NavItem key={link.name} icon={link.icon} to={link.to}>
            {link.name}
          </NavItem>
        ))}
      </>
    );
  } else {
    // Handle other roles or provide a default menu
    menuItems = null;
  }

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
      {menuItems}
    </Box>
  );
};

// const NavItem = ({ icon, children, ...rest }) => {
//   return (
//     <Link style={{ textDecoration: "none" }}>
//       <Flex
//         align="center"
//         p="4"
//         mx="4"
//         borderRadius="lg"
//         role="group"
//         cursor="pointer"
//         _hover={{
//           bg: "orange",
//           color: "white",
//         }}
//         {...rest}
//       >
//         {icon && (
//           <Icon
//             mr="4"
//             fontSize="16"
//             _groupHover={{
//               color: "white",
//             }}
//             as={icon}
//           />
//         )}
//         {children}
//       </Flex>
//     </Link>
//   );
// };

const MobileNav = ({ onOpen, ...rest }) => {
  const token = useTokenStore((state) => state.token);

  const decodedToken = parseJwt(token);
  const fullName = decodedToken?.fullName;
  const role = decodedToken?.role;
  const id = decodedToken?.id;

  console.log(decodedToken);
  console.log("FullName", fullName);
  console.log("Role", role);
  console.log("ID", id);

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

  const token = useTokenStore((state) => state.token);
  const decodedToken = parseJwt(token);
  const role = decodedToken?.role;

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent onClose={() => onClose} role={role} display={{ base: "none", md: "block" }} />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose} size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <BreadcrumbComponent />
        {/* Content */}
        <Routes>
          <Route path="/my-items" element={<Item />} />
          <Route path="/add-items" element={<AddItem />} />
          <Route path="/list-trade-items" element={<Trade />} />
          <Route path="/list-trade-items/detail" element={<TradeDetail />} />
          <Route path="/trade-approval" element={<TradeApproval />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Dashboard;
