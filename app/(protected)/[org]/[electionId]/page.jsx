"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const VotingPage = () => {
  const pathname = usePathname();

  const org = pathname.split("/")[1];
  const electionId = pathname.split("/")[2];

  return (
    <div className="">
      <Link href="/dashboard">
        <Image src="/5.png" width={200} height={200} alt="logo" />
      </Link>
      {org} {electionId}
    </div>
  );
};

export default VotingPage;
