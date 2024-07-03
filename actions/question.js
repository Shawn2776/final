"use server";

import db from "@/lib/db";
import { NewQuestionSchema } from "@/schemas";

export const addQuestion = async (values, ballotId) => {
  const ballotID = ballotId;
  const validatedFields = NewQuestionSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { question, option1, option2, option3, option4 } = validatedFields.data;

  const exisingBallot = await db.ballot.findUnique({
    where: {
      id: ballotID,
    },
    include: {
      Question: true,
    },
  });

  if (!exisingBallot) {
    return { error: "Ballot does not exist!" };
  }

  const exisitingQuestion = exisingBallot.Question.find(
    (question) => question.question === question
  );

  if (exisitingQuestion) {
    return { error: "Question already exists!" };
  }

  const newQuestion = await db.question.create({
    data: {
      question,
      option1,
      option2,
      option3,
      option4,
      ballotId: ballotID,
    },
  });

  return { success: `Created question ${question}` };
};
