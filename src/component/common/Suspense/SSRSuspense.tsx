import type { ComponentProps } from "react";
import { Suspense } from "react";

import { useIsMount } from "@/hooks/common/useIsMount";

type Props = ComponentProps<typeof Suspense>;

export const SSRSuspense = (props: Props) => {
  const isMounted = useIsMount();

  return isMounted ? <Suspense {...props} /> : <>{props.fallback}</>;
};
