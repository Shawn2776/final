"use server";

import db from "@/lib/db";
import { NewCandidateSchema } from "@/schemas";

export const addCandidate = async (values, ballotId) => {
  const ballotID = ballotId;
  const validatedFields = NewCandidateSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { name, position, notes } = validatedFields.data;
  console.log(ballotID);

  const exisingBallot = await db.ballot.findUnique({
    where: {
      id: ballotID,
    },
    include: {
      Candidate: true,
    },
  });

  if (!exisingBallot) {
    return { error: "Ballot does not exist!" };
  }

  const exisitingCandidate = exisingBallot.Candidate.find(
    (candidate) => candidate.name === name
  );

  if (exisitingCandidate) {
    return { error: "Candidate already exists!" };
  }

  const newCandidate = await db.candidate.create({
    data: {
      name,
      position,
      notes,
      ballotId: ballotID,
    },
  });

  return { success: `Created candidate ${name}` };
};
