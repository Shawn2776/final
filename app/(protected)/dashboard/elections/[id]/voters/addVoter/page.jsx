import NewVoterForm from "@/components/electionForms/new-voter-form";
import db from "@/lib/db";

const AddVoterPage = async ({ params }) => {
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
      <NewVoterForm ballot={ballot} electionId={electionID} />
    </div>
  );
};

export default AddVoterPage;
