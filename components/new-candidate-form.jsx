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
} from "./ui/select";
import { useRouter } from "next/navigation";
import FormError from "./form-error";
import FormSuccess from "./form-success";
import { NewCandidateSchema } from "@/schemas";
import { addCandidate } from "@/actions/candidate";

const NewCandidateForm = ({ ballot, electionId }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [ballotId, setBallotId] = useState(ballot.id);

  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(NewCandidateSchema),
    defaultValues: {
      name: "",
      position: "",
      notes: "",
      ballotId: ballotId,
    },
  });

  const onSubmit = (values) => {
    startTransition(() => {
      setError("");
      setSuccess("");

      addCandidate(values, ballotId).then((data) => {
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
      headerLabel={"New Candidate"}
      backButtonLabel={"Back to Elections"}
      backButtonHref={`/dashboard/elections/`}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              disabled={isPending}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Candidate Name</FormLabel>
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
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
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
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="" />
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
                <FormItem>
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
            Create New Candidate
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default NewCandidateForm;
