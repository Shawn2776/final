import NewQuestionForm from "@/components/electionForms/new-question-form";
import db from "@/lib/db";
import React from "react";

const AddQuestionPage = async ({ params }) => {
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
      <NewQuestionForm ballot={ballot} electionId={electionID} />
    </div>
  );
};

export default AddQuestionPage;
