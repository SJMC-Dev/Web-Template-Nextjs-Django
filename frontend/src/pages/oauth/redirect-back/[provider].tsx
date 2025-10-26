import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import AuthContext from "@/contexts/auth";
import { useToast } from "@/contexts/toast";
import { jAccountAuth } from "@/services/auth";

const OAuthRedirectBack = () => {
  const router = useRouter();
  const toast = useToast();
  const authCtx = useContext(AuthContext);

  const doAuth = (code: string, state: string) => {
    let provider = router.query.provider as string;

    if (provider === "jaccount") {
      jAccountAuth(code, state).then(
        (data) => {
          authCtx.onLogin(data.token);
          router.push(data.next);
        },
        (err) => {
          toast({
            title: "登录失败",
            status: "error",
          });
          setTimeout(() => {
            router.push("/login");
          }, 1500);
        }
      );
    }
  };

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      router.push("/home");
    } else {
      if (router.query.code && router.query.state) {
        doAuth(router.query.code as string, router.query.state as string);
      }
    }
  }, [router.query.code, router, authCtx.isLoggedIn]);

  return (
    <>
      <Head>
        <title>OAuth 重定向</title>
      </Head>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <BeatLoader size={16} color="gray" />
      </div>
    </>
  );
};

export default OAuthRedirectBack;
