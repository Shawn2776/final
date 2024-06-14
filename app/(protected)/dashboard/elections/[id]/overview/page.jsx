import { getBallotByElectionId } from "@/actions/ballots";
import { getElectionById } from "@/actions/elections";
import { getVotersByElectionId } from "@/actions/voters";
import { ElectionHeader } from "@/components/election-header";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { redirect } from "next/navigation";
import React from "react";

const OverviewPage = async ({ params }) => {
  const electionId = params.id;

  const election = await getElectionById(electionId);
  const ballot = await getBallotByElectionId(electionId);
  const voters = await getVotersByElectionId(electionId);

  if (!election) {
    redirect("/dashboard/elections");
  }

  return (
    <div className="w-full">
      <ElectionHeader election={election} />
      <div className="w-full flex justify-between px-4 pt-4 pb-4 mb-4">
        <div className="w-full">
          <span className="mr-4">Description:</span>
          <span className="bg-highlight px-2 rounded">
            {election.description}
          </span>
        </div>
        <div className="text-center w-full">
          <span className="mr-4">Date Range:</span>
          <span className="bg-highlight px-2 rounded">
            {election.electionDate}
          </span>
        </div>
        <div className="w-full text-end capitalize">
          <span className="mr-4">Election Type:</span>
          <span className="bg-highlight px-2 rounded capitalize">
            {election.electionType}
          </span>
        </div>
      </div>

      {election.electionType === "election" ? (
        <div className="w-full grid grid-cols-2 gap-4">
          <div className="w-full col-span-1 text-center bg-bg py-4 border-highlight border min-h-[400px]">
            <div>Candidates</div>
            {ballot?.ballot?.Candidate.length === 0 ? (
              <div>No Candidates</div>
            ) : (
              <div className="p-2 bg-bgSoft m-4">
                <Table>
                  <TableCaption>A list of Candidates.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ballot.ballot.Candidate.map((candidate) => (
                      <TableRow key={candidate.id}>
                        <TableCell className="text-start">
                          {candidate.name}
                        </TableCell>
                        <TableCell className="text-start">
                          {candidate.position}
                        </TableCell>
                        <TableCell className="text-start">
                          {candidate.notes}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
          <div className="w-full col-span-1 text-center bg-bg py-4">
            <div>Voters</div>
            <hr className="border-t-2 border-gray-200 my-4" />
            {voters?.length === 0 ? (
              <div>No Voters</div>
            ) : (
              <div>
                {voters?.Voter?.map((voter) => (
                  <div
                    key={voter.id}
                    className="flex justify-between px-8 bg-bgSoft p-2 mx-2 hover:bg-highlight cursor-pointer my-2"
                  >
                    <div>{voter.name}</div>
                    <div>{voter.email}</div>
                    <div>{voter.voterId}</div>
                    <div>{voter.voterKey}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full grid-cols-2 gap-4">
          <div className="w-full col-span-1">Questions</div>
          <div className="w-full col-span-1">Results</div>
        </div>
      )}
    </div>
  );
};

export default OverviewPage;
