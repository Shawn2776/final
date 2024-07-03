"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import CardWrapper from "@/components/auth/card-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { newElection } from "@/actions/new-election";
import { useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { NewQuestionSchema } from "@/schemas";
import { addCandidate } from "@/actions/candidate";
import { Textarea } from "../ui/textarea";
import AddQuestionPage from "@/app/(protected)/dashboard/elections/[id]/questions/addQuestion/page";
import { addQuestion } from "@/actions/question";

const NewQuestionForm = ({ ballot, electionId }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [ballotId, setBallotId] = useState(ballot.id);

  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(NewQuestionSchema),
    defaultValues: {
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      ballotId: ballotId,
    },
  });

  const onSubmit = (values) => {
    startTransition(() => {
      setError("");
      setSuccess("");

      addQuestion(values, ballotId).then((data) => {
        setError(data.error);
        setSuccess(data.success);

        if (data.success) {
          router.push(`/dashboard/elections/${electionId}/overview`);
        }
      });
    });
  };

  const router = useRouter();

  return (
    <CardWrapper
      headerLabel={"New Question"}
      backButtonLabel={"Back to Elections"}
      backButtonHref={`/dashboard/elections/`}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              disabled={isPending}
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              disabled={isPending}
              control={form.control}
              name="option1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Option One</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              disabled={isPending}
              control={form.control}
              name="option2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Option Two</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              disabled={isPending}
              control={form.control}
              name="option3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Option Three</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              disabled={isPending}
              control={form.control}
              name="option4"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Option Four</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              disabled
              control={form.control}
              name="ballotId"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormLabel>Ballot ID</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full ">
            Create New Question
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default NewQuestionForm;
