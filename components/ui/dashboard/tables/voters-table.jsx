import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../table";

const VotersTable = ({ voters }) => {
  return (
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
          {voters.map((voter) => (
            <TableRow key={voter.id}>
              <TableCell className="text-start">{voter.name}</TableCell>
              <TableCell className="text-start">{voter.email}</TableCell>
              <TableCell className="text-start">{voter.voterId}</TableCell>
              <TableCell className="text-start">{voter.voterKey}</TableCell>
              <TableCell className="text-center">
                {voter.hasVoted ? "Yes" : "No"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VotersTable;
