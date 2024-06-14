"use client";

import { usePathname } from "next/navigation";

const ElectionOverview = ({ getElectionById }) => {
  const pathname = usePathname();
  const electionId = pathname.split("/")[3];

  const election = getElectionById(electionId);
  return <div>{election.name}</div>;
};

export default ElectionOverview;
