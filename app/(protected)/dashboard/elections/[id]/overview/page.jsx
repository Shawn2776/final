import { getBallotByElectionId } from "@/actions/ballots";
import { getElectionById } from "@/actions/elections";
import { getVotersByElectionId } from "@/actions/voters";
import { ElectionHeader } from "@/components/election-header";
import { Button } from "@/components/ui/button";
import CandidateTable from "@/components/ui/dashboard/tables/candidate-table";
import QuestionTable from "@/components/ui/dashboard/tables/question-table";
import VotersTable from "@/components/ui/dashboard/tables/voters-table";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
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
          <span className="mr-4">Description: </span>
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
            <div className="flex items-center">
              <div className="flex justify-end flex-1 text-2xl">Candidates</div>
              <div className="flex justify-end flex-1 pr-8 text-sm">
                <Link
                  href={`/dashboard/elections/${electionId}/candidates/addCandidate`}
                >
                  <Button>Add Candidate</Button>
                </Link>
              </div>
            </div>

            <CandidateTable candidates={ballot.ballot.Candidate} />
          </div>
          <div className="w-full col-span-1 text-center bg-bg py-4 border-highlight border min-h-[400px]">
            <div className="flex items-center">
              <div className="flex justify-end flex-1 text-2xl">Voters</div>
              <div className="flex justify-end flex-1 pr-8 text-sm">
                <Link
                  href={`/dashboard/elections/${electionId}/voters/addVoter`}
                >
                  <Button>Add Voter</Button>
                </Link>
              </div>
            </div>

            <VotersTable voters={voters.Voter} />
          </div>
        </div>
      ) : (
        <div className="grid w-full grid-cols-2 gap-4">
          <div className="w-full col-span-1 text-center bg-bg py-4 border-highlight border min-h-[400px]">
            <div className="flex items-center">
              <div className="flex justify-end flex-1 text-2xl">Questions</div>
              <div className="flex justify-end flex-1 pr-8 text-sm">
                <Link
                  href={`/dashboard/elections/${electionId}/questions/addQuestion`}
                >
                  <Button>Add Question</Button>
                </Link>
              </div>
            </div>
            {ballot?.ballot?.Question.length === 0 ? (
              <div>No Questions</div>
            ) : (
              <QuestionTable questions={ballot.ballot.Question} />
            )}
          </div>
          <div className="w-full col-span-1 text-center bg-bg py-4 border-highlight border min-h-[400px]">
            <div>Voters</div>
            {voters?.length === 0 ? (
              <div>No Voters</div>
            ) : (
              <VotersTable voters={voters.Voter} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewPage;
