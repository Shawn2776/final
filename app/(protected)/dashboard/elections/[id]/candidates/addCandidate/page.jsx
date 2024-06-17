import NewCandidateForm from "@/components/new-candidate-form";
import db from "@/lib/db";
import React from "react";

const AddCandidatePage = async ({ params }) => {
  const electionID = params.id;
  const election = await db.election.findUnique({
    where: {
      id: electionID,
    },
  });
  const ballot = await db.ballot.findUnique({
    where: {
      id: election.ballotId,
    },
  });

  return (
    <div>
      <NewCandidateForm ballot={ballot} electionId={electionID} />
    </div>
  );
};

export default AddCandidatePage;
