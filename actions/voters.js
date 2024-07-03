"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NewVoterSchema } from "@/schemas";

export const addVoterToElection = async (values, electionId) => {
  const validatedFields = NewVoterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { user } = await auth();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const existingElection = await db.election.findUnique({
    where: {
      id: electionId,
    },
  });

  // Check if election exists
  if (!existingElection) {
    return { error: "Election does not exist!" };
  }

  // Check if user is authorized to add voter
  if (existingElection.userId !== user.id) {
    return { error: "Unauthorized" };
  }

  const { name, email, voterId, voterKey } = values;

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
    return { success: "Voter added successfully", electionId };
  } catch (error) {
    if (error.code === "P2002") {
      // Prisma's unique constraint violation error code
      return { error: "Voter with this detail already exists in the election" };
    }
    console.log("ERROR: ", error);
    return { error: "Error adding voter" };
  }
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
