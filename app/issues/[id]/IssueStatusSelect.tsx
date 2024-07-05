"use client";

import { Select } from "@radix-ui/themes";
import React from "react";
import { Issue, Status } from "@prisma/client";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const IssueStatusSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter();

  const statuses: { label: string; value: Status }[] = [
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];

  const setIssueStatus = async (status: string) => {
    try {
      await axios.patch("/api/issues/" + issue.id, { status: status });
      toast.success("Status successfully changed to " + status);
      router.refresh();
    } catch (error) {
      toast.error("Changes could not be saved.");
    }
  };

  return (
    <>
      <Select.Root defaultValue={issue.status} onValueChange={setIssueStatus}>
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            <Select.Label>Set Status</Select.Label>
            {statuses?.map((status) => (
              <Select.Item key={status.value} value={status.value}>
                {status.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default IssueStatusSelect;
