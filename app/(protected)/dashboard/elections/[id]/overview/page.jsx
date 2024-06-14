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
      <div className="flex justify-between w-full px-4 pt-4 pb-4 mb-4">
        <div className="w-full">
          <span className="mr-4">Description:</span>
          <span className="px-2 rounded bg-highlight">
            {election.description}
          </span>
        </div>
        <div className="w-full text-center">
          <span className="mr-4">Date Range:</span>
          <span className="px-2 rounded bg-highlight">
            {election.electionDate}
          </span>
        </div>
        <div className="w-full capitalize text-end">
          <span className="mr-4">Election Type:</span>
          <span className="px-2 capitalize rounded bg-highlight">
            {election.electionType}
          </span>
        </div>
      </div>

      {election.electionType === "election" ? (
        <div className="grid w-full grid-cols-2 gap-4">
          <div className="w-full col-span-1 text-center bg-bg py-4 border-highlight border min-h-[400px]">
            <div>Candidates</div>
            {ballot?.ballot?.Candidate.length === 0 ? (
              <div>No Candidates</div>
            ) : (
              <div className="p-2 m-4 bg-bgSoft">
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
          <div className="w-full col-span-1 text-center bg-bg py-4 border-highlight border min-h-[400px]">
            <div>Voters</div>
            {voters?.length === 0 ? (
              <div>No Voters</div>
            ) : (
              <div className="p-2 m-4 bg-bgSoft">
                <Table>
                  <TableCaption>A list of Voters.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Voter ID</TableHead>
                      <TableHead>Voter Key</TableHead>
                      <TableHead>Has Voted</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {voters?.Voter?.map((voter) => (
                      <TableRow key={voter.id}>
                        <TableCell className="text-start">
                          {voter.name}
                        </TableCell>
                        <TableCell className="text-start">
                          {voter.email}
                        </TableCell>
                        <TableCell className="text-start">
                          {voter.voterId}
                        </TableCell>
                        <TableCell className="text-start">
                          {voter.voterKey}
                        </TableCell>
                        <TableCell className="text-center">
                          {voter.hasVoted ? "Yes" : "No"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
