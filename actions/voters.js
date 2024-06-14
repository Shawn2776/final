"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NewVoterSchema } from "@/schemas";

export const addVoterToElection = async (electionId, values) => {
  const validatedFields = NewVoterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { user } = await auth();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const exisitingElection = await db.election.findUnique({
    where: {
      id: electionId,
    },
  });

  // Check if election exists
  if (!exisitingElection) {
    return { error: "Election does not exist!" };
  }

  // Check if user is authorized to add voter
  if (exisitingElection.userId !== user.id) {
    return { error: "Unauthorized" };
  }

  const { name, email, voterId, voterKey } = values;

  const exisitingName = await db.voter.findFirst({
    where: {
      name,
      electionId,
    },
  });

  if (exisitingName) {
    return { error: "Voter with this name already exists" };
  }

  const exisitingEmail = await db.voter.findFirst({
    where: {
      email,
      electionId,
    },
  });

  if (exisitingEmail) {
    return { error: "Voter with this email already exists" };
  }

  const exisitingVoterId = await db.voter.findFirst({
    where: {
      voterId,
      electionId,
    },
  });

  if (exisitingVoterId) {
    return { error: "Voter with this voter ID already exists" };
  }

  try {
    const voter = await db.voter.create({
      data: {
        name,
        email,
        voterId,
        voterKey,
        electionId,
      },
    });
  } catch (error) {
    console.log("ERROR: ", error);
    return { error: "Error adding voter" };
  }

  return { success: "Voter added successfully", electionId };
};

export const deleteVoter = async (electionId, voterId) => {
  const { user } = await auth();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const exisitingElection = await db.election.findUnique({
    where: {
      id: electionId,
    },
  });

  // Check if election exists
  if (!exisitingElection) {
    return { error: "Election does not exist!" };
  }

  // Check if user is authorized to delete voter
  if (exisitingElection.userId !== user.id) {
    return { error: "Unauthorized" };
  }

  const voter = await db.voter.findUnique({
    where: {
      id: voterId,
    },
  });

  if (!voter) {
    return { error: "Voter does not exist" };
  }

  try {
    await db.voter.delete({
      where: {
        id: voterId,
      },
    });
  } catch (error) {
    console.log("ERROR: ", error);
    return { error: "Error deleting voter" };
  }

  return { success: "Voter deleted successfully", electionId };
};

export const getVotersByElectionId = async (electionId) => {
  const { user } = await auth();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const election = await db.election.findUnique({
    where: {
      id: electionId,
    },
    include: {
      Voter: true,
    },
  });

  if (user.id !== election.userId) {
    return { error: "Unauthorized" };
  }

  return election;
};
