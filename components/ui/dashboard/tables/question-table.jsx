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

const QuestionTable = ({ questions }) => {
  return (
    <div className="h-[400px] m-4 overflow-x-hidden overflow-y-auto bg-bgSoft">
      <Table>
        <TableCaption>A list of Questions and Options.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Question</TableHead>
            <TableHead>Option One</TableHead>
            <TableHead>Option Two</TableHead>
            <TableHead>Option Three</TableHead>
            <TableHead>Option Four</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.map((question) => (
            <TableRow key={question.id}>
              <TableCell className="text-start">{question.question}</TableCell>
              <TableCell className="text-start">{question.option1}</TableCell>
              <TableCell className="text-start">{question.option2}</TableCell>
              <TableCell className="text-start">
                {question.option3 || "n/a"}
              </TableCell>
              <TableCell className="text-start">
                {question.option4 || "n/a"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default QuestionTable;
