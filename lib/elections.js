import { db } from "./db";

export const generateElection = async ({
  name,
  description,
  electionDate,
  electionType,
  candidates,
  userId,
}) => {
  const election = await db.election.create({
    data: {
      name,
      description,
      electionDate,
      electionType,
      candidates,
      userId: user.id,
    },
  });

  return election;
};
