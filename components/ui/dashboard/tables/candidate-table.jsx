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

const CandidateTable = ({ candidates }) => {
  return (
    // <div className="h-[400px] m-4 overflow-x-hidden overflow-y-auto bg-bgSoft">
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
          {candidates.map((candidate) => (
            <TableRow key={candidate.id}>
              <TableCell className="text-start">{candidate.name}</TableCell>
              <TableCell className="text-start">{candidate.position}</TableCell>
              <TableCell className="text-start">{candidate.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CandidateTable;
