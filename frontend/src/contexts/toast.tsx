import { createStandaloneToast } from "@chakra-ui/react";
import React, { createContext, useContext } from "react";

const { ToastContainer, toast } = createStandaloneToast();

const customToast = (options) => {
  toast({
    position: "top",
    duration: 3000,
    variant: "top-accent",
    isClosable: true,
    ...options,
  });
};

const ToastContext = createContext(null);

export const ToastContextProvider = ({ children }) => {
  return (
    <ToastContext.Provider value={customToast}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
