import { getElectionsByUserId } from "@/actions/elections";
import { auth } from "@/auth";
import ElectionTable from "@/components/ui/election-table";
import React from "react";

const ElectionsPage = async () => {
  const session = await auth();

  const { user } = session;
  console.log("User", user.id);

  const elections = await getElectionsByUserId(user.id);

  return <ElectionTable elections={elections} />;
};

export default ElectionsPage;
