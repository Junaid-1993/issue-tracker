"use client";

import { ErrorMessage, Spinner } from "@/app/components";
import { createIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import dynamic from "next/dynamic";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

// Infer types from our schema
type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      // Sending data to our 'API'.
      await axios.post("/api/issues", data);
      // Redirecting user to 'issues' page
      router.push("/issues");
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error has occurred.");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className=" space-y-3" onSubmit={onSubmit}>
        <TextField.Root placeholder="Title" {...register("title")} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        {/* We will use the 'Controller' component to spread 'register' like properties which are in the 'field' property. */}
        <Controller name="description" control={control} render={({ field }) => <SimpleMDE placeholder="Description" {...field} />} />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        {<Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner />}</Button>}
      </form>
    </div>
  );
};

export default NewIssuePage;
