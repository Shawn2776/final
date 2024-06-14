import { getElectionsByUserId } from "@/actions/elections";
import { auth } from "@/auth";
import DashboardSectionHeader from "@/components/ui/dashboard/dashboard-section-header";
import ElectionTable from "@/components/ui/election-table";
import React from "react";

const ElectionsPage = async () => {
  const session = await auth();

  const { user } = session;
  console.log("User", user.id);

  const elections = await getElectionsByUserId(user.id);

  return (
    <div>
      <DashboardSectionHeader
        section={"elections"}
        action={"addElection"}
        label={"Add Election"}
      />
      <ElectionTable elections={elections} />
    </div>
  );
};

export default ElectionsPage;
