"use client";

import Link from "next/link";
import { Button } from "./button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { FcViewDetails } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

const ElectionTable = ({ elections }) => {
  const handleAddElection = async () => {
    console.log("hello");
  };

  if (elections === null)
    return (
      <div className="flex flex-col items-center w-full gap-4 mt-10 lg:min-h-screen">
        <div className="mb-10">No Elections Found.</div>
        <hr className="w-full" />
        <div>
          <Button>
            <Link href="/dashboard/elections/addElection">Add Election</Link>
          </Button>
        </div>
      </div>
    );

  return (
    <Table>
      <TableCaption>A list of your elections.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Election Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Election Type</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {elections.map((election) => (
          <TableRow key={election.id}>
            <TableCell>{election.name}</TableCell>
            <TableCell>{election.description}</TableCell>
            <TableCell>{election.status}</TableCell>
            <TableCell>{election.electionDate}</TableCell>
            <TableCell className="capitalize">
              {election.electionType}
            </TableCell>
            <TableCell className="flex gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      key={election.id}
                      href={`/dashboard/elections/${election.id}/overview`}
                    >
                      <FcViewDetails />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View Details</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Link href="/delete">
                <MdDelete />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ElectionTable;
