"use client";

import { TextField, Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        // Sending data to our 'API'.
        await axios.post("/api/issues", data);
        // Redirecting user to 'issues' page
        router.push("/issues");
      })}
    >
      <TextField.Root placeholder="Title" {...register("title")} />
      {/* We will use the 'Controller' component to spread 'register' like properties which are in the 'field' property. */}
      <Controller name="description" control={control} render={({ field }) => <SimpleMDE placeholder="Description" {...field} />} />

      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
