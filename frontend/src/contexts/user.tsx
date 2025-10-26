import React, { createContext, useCallback, useState } from "react";
import { useToast } from "@/contexts/toast";
import { UserProfile } from "@/models/user";
import { getUserProfile } from "@/services/user";

interface UserContextType {
  updateAll: () => void;
  cleanUp: () => void;
  profile: UserProfile | undefined;
  updateProfile: () => void;
}

const UserContext = createContext<UserContextType>({
  updateAll: () => {},
  cleanUp: () => {},
  profile: {} as UserProfile | undefined,
  updateProfile: () => {},
});

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [profile, setProfile] = useState(undefined);
  const toast = useToast();
  const updateProfile = useCallback(() => {
    try {
      getUserProfile().then((res) => {
        setProfile(res);
      });
    } catch (error) {
      toast({
        title: "获取用户信息失败",
        status: "error",
      });
      setProfile(undefined);
      console.error("Failed to update user profile:", error);
    }
  }, [toast]);

  const updateAll = useCallback(() => {
    updateProfile();
  }, [updateProfile]);

  const cleanUp = useCallback(() => {
    setProfile(undefined);
  }, []);

  const contextValue = {
    updateAll,
    cleanUp,
    profile: profile,
    updateProfile,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContext;
