import { Button, Center } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import AuthContext from "@/contexts/auth";
import { useToast } from "@/contexts/toast";
import { jAccountLogin } from "@/services/auth";

const LoginPage = () => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const toast = useToast();

  useEffect(() => {
    const { next, expired } = router.query;

    if (authCtx.isLoggedIn) {
      router.push((next as string) || "/");
    }

    if (expired === "true") {
      toast({
        title: "登录已过期",
        status: "warning",
      });
      let url = new URL(window.location.href);
      url.searchParams.delete("expired");
      window.history.replaceState(null, null, url.toString());
    } else if (next && !authCtx.isLoggedIn) {
      toast({
        title: "需要登录",
        status: "warning",
      });
    }
  }, [authCtx.isLoggedIn, router, toast]);

  return (
    <>
      <Head>
        <title>登录</title>
      </Head>
      <Center height="100%">
        <Button onClick={() => jAccountLogin(router.query.next as string)}>
          jAccount 登录
        </Button>
      </Center>
    </>
  );
};

export default LoginPage;
