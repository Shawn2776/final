"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NewElectionSchema } from "@/schemas";
import * as z from "zod";

export const newElection = async (values) => {
  const { user } = await auth();
  const validatedFields = NewElectionSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { name, description, electionDate, electionType, candidates } =
    validatedFields.data;

  const exisitingElection = await db.election.findFirst({
    where: {
      name,
    },
  });

  if (exisitingElection) {
    return { error: "Election already exists!" };
  }

  const election = await db.election.create({
    data: {
      name,
      description,
      userId: user.id,
      electionDate,
      electionType,
    },
  });

  const ballot = await db.ballot.create({
    data: {
      electionId: election.id,
    },
  });

  await db.election.update({
    where: {
      id: election.id,
    },
    data: {
      ballotId: ballot.id,
    },
  });


  return { election, success: "Election created!" };
};