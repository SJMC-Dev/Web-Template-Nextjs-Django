import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode, useContext } from "react";
import { LuLogOut } from "react-icons/lu";
import AuthContext from "@/contexts/auth";
import { Logout } from "@/services/auth";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    authCtx.onLogout();
    Logout();
    router.push("/login");
  };

  return (
    <Flex direction="column" minH="100vh" bg="gray.50">
      {/* Header */}
      <Box
        bg="white"
        borderBottom="1px"
        borderColor="gray.200"
        py={3}
        px={[2, 4]}
      >
        <Flex
          maxW="1200px"
          mx="auto"
          w="100%"
          justify={["center", "flex-start"]}
        >
          <Flex flex="1" justify={["center", "flex-start"]}>
            <Text fontWeight="bold" fontSize="lg" color="gray.800">
              Project Template
            </Text>
          </Flex>

          <IconButton
            aria-label="Logout"
            icon={<LuLogOut size={20} />}
            onClick={handleLogout}
            variant="ghost"
            colorScheme="red"
          />
        </Flex>
      </Box>

      {/* Content */}
      <Flex flex="1" w="100%" justify="center">
        <Box maxW="1200px" w="100%" px={4} py={6}>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}
