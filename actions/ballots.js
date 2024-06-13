"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NewCandidateSchema, NewQuestionSchema } from "@/schemas";

export const addBallotToElection = async (electionId, ballot) => {
  const { user } = await auth();

  const election = await db.election.findUnique({
    where: {
      id: electionId,
    },
  });

  if (!election) {
    return { error: "Election does not exist!" };
  }

  if (election.userId !== user.id) {
    return { error: "Unauthorized why?" };
  }

  const newBallot = await db.ballot.create({
    data: {
      electionId,
      ...ballot,
    },
  });

  return newBallot;
};

export const getBallotByElectionId = async (electionId) => {
  const { user } = await auth();

  const election = await db.election.findUnique({
    where: {
      id: electionId,
    },
    include: {
      ballot: true,
    },
  });

  if (!election) {
    return { error: "Election does not exist!" };
  }

  if (election.userId !== user.id) {
    return { error: "Unauthorized why?" };
  }

  const ballot = await db.ballot.findUnique({
    where: {
      id: election.ballotId,
    },
    include: {
      candidates: true,
      questions: true,
    },
  });

  return { ballot, election };
};

// export const newQuestion = async (ballotId, values) => {
//   const validatedFields = NewQuestionSchema.safeParse(values);
//   const { user } = await auth();

//   if (!validatedFields.success) {
//     return { error: "Invalid fields!" };
//   }

//   const existingBallot = await db.ballot.findUnique({
//     where: {
//       id: ballotId,
//     },
//   });

//   if (!existingBallot) {
//     return { error: "Ballot does not exist!" };
//   }

//   const existingElection = await db.election.findUnique({
//     where: {
//       id: ballotId,
//     },
//   });

//   if (!existingElection) {
//     return { error: "Election does not exist!" };
//   }

//   if (existingElection.userId !== user.id) {
//     return { error: "Unauthorized" };
//   }

//   if (existingBallot.electionId !== existingElection.id) {
//     return { error: "Ballot does not belong to this election!" };
//   }

//   if (existingElection.electionType !== "poll") {
//     return { error: "!" };
//   }

//   const { question, options } = validatedFields.data;

//   const newQuestion = await db.question.create({
//     data: {
//       ballotId,
//       question,
//       options: {
//         create: options.map((option) => ({ option })),
//       },
//     },
//   });

//   return { success: "Question added!", question: newQuestion };
// };

export const newQuestion = async (ballotId, values) => {
  const validatedFields = NewQuestionSchema.safeParse(values);

  if (!validatedFields.success) {
    console.error("Validation errors:", validatedFields.error.errors);
    return { error: "Invalid fields!" };
  }

  const { user } = await auth();

  try {
    const existingBallot = await db.ballot.findUnique({
      where: {
        id: ballotId,
      },
    });

    if (!existingBallot) {
      return { error: "Ballot does not exist!" };
    }

    const existingElection = await db.election.findUnique({
      where: {
        id: existingBallot.electionId,
      },
    });

    if (!existingElection) {
      return { error: "Election does not exist!" };
    }

    if (existingElection.userId !== user.id) {
      return { error: "Unauthorized" };
    }

    if (existingBallot.electionId !== existingElection.id) {
      return { error: "Ballot does not belong to this election!" };
    }

    if (existingElection.electionType !== "poll") {
      return { error: "Invalid election type!" };
    }

    const { question, option1, option2, option3, option4 } =
      validatedFields.data;

    const newQuestion = await db.question.create({
      data: {
        ballotId,
        question,
        option1,
        option2,
        option3,
        option4,
      },
    });

    return {
      success: "Question added!",
      question: newQuestion,
      election: existingElection,
    };
  } catch (error) {
    console.error("Error in newQuestion:", error);
    return { error: "An error occurred while creating the question." };
  }
};

export const newCandidate = async (ballotId, values) => {
  const validatedFields = NewCandidateSchema.safeParse(values);

  if (!validatedFields.success) {
    console.error("Validation errors:", validatedFields.error.errors);
    return { error: "Invalid fields!" };
  }

  const { user } = await auth();

  try {
    const existingBallot = await db.ballot.findUnique({
      where: {
        id: ballotId,
      },
    });

    if (!existingBallot) {
      return { error: "Ballot does not exist!" };
    }

    const existingElection = await db.election.findUnique({
      where: {
        id: existingBallot.electionId,
      },
    });

    if (!existingElection) {
      return { error: "Election does not exist!" };
    }

    if (existingElection.userId !== user.id) {
      return { error: "Unauthorized" };
    }

    if (existingBallot.electionId !== existingElection.id) {
      return { error: "Ballot does not belong to this election!" };
    }

    if (existingElection.electionType !== "election") {
      return { error: "Invalid election type!" };
    }

    const { name, notes, position } = validatedFields.data;

    const newCandidate = await db.candidate.create({
      data: {
        ballotId,
        name,
        notes,
        position,
      },
    });

    return {
      success: "Candidate added!",
      candidate: newCandidate,
      election: existingElection,
    };
  } catch (error) {
    console.error("Error in newCandidate:", error);
    return { error: "An error occurred while creating the candidate." };
  }
};


