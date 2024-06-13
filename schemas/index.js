import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Minimum of 8 characters required!",
  }),
  name: z.string().min(3, {
    message: "Name is required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const electionTypes = ["election", "poll"];
export const NewElectionSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  electionDate: z.string(),
  electionType: z.enum(electionTypes),
  candidates: z.optional(z.array(z.string())),
});

export const NewVoterSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  voterId: z.string().min(1, { message: "Voter ID is required" }),
  voterKey: z.string().min(1, { message: "Voter Key is required" }),
});

export const NewBallotSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  ballotId: z.string().min(1, { message: "Ballot ID is required" }),
  ballotKey: z.string().min(1, { message: "Ballot Key is required" }),
});

// export const NewQuestionSchema = z.object({
//   question: z.string().min(1, { message: "Question is required" }),
//   options: z.array(z.string()),
// });

export const NewQuestionSchema = z.object({
  question: z.string().nonempty("Question is required"),
  option1: z.string().nonempty("Option 1 is required"),
  option2: z.string().nonempty("Option 2 is required"),
  option3: z.optional(z.string()),
  option4: z.optional(z.string()),
});

export const NewCandidateSchema = z.object({
  name: z.string().nonempty("Question is required"),
  position: z.string(),
  notes: z.string(),
});
