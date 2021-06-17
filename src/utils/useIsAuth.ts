import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

export const useIsAuth = () => {
  const [{ data: meData, fetching }] = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (!meData?.me && !fetching) {
      router.replace("/signIn?next=" + router.pathname);
    }
  }, [fetching, meData, router]);
};
