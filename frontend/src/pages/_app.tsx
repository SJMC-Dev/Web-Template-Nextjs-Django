import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "@/contexts/auth";
import { ToastContextProvider } from "@/contexts/toast";
import { UserContextProvider } from "@/contexts/user";
import MainLayout from "@/layouts/main-layouts";
import { useAxiosInterceptors } from "@/services/request";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  useAxiosInterceptors();

  return (
    <ChakraProvider>
      <ToastContextProvider>
        <UserContextProvider>
          <AuthContextProvider>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </AuthContextProvider>
        </UserContextProvider>
      </ToastContextProvider>
    </ChakraProvider>
  );
}
