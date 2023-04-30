import { useRouter } from "next/router";

import { Icon } from "@/component/common/Icon";

export const BackButton = ({ className }: { className?: string }) => {
  const router = useRouter();
  return (
    <button className={className} onClick={() => router.back()}>
      <Icon height={36} name="back" width={36} />
    </button>
  );
};
