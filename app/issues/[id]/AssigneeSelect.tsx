"use client";

import { Skeleton } from "@/app/components";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Issue } from "@prisma/client";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;

  if (error) return null;

  const assignIssue = async (userId: string) => {
    try {
      await axios.patch("/api/issues/" + issue.id, { assignedToUserId: userId === "unassigned" ? null : userId });
      toast.success("Changes saved successfully.");
    } catch (error) {
      toast.error("Changes could not be saved.");
    }
  };

  return (
    <>
      <Select.Root defaultValue={issue.assignedToUserId || "unassigned"} onValueChange={assignIssue}>
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });

export default AssigneeSelect;

// Given the following prisma model, generate an SQL statement to insert 20 records in the issues table. Use real-world titles and descriptions for issues. Status can be OPEN, IN_PROGRESS, or CLOSED. Descriptions should be a paragraph long. Provide different values for the createdAt and updatedAt columns.

// model Issue {
//   id               Int      @id @default(autoincrement())
//   title            String   @db.VarChar(255)
//   description      String   @db.Text
//   status           Status   @default(OPEN)
//   createdAt        DateTime @default(now())
//   updatedAt        DateTime @updatedAt
// }
