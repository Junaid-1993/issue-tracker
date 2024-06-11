import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

// 'Record' is a build utility type in typescript which allows us to define 'key' 'value' pairs where keys and values have a particular
// 'type'.
const statusMap: Record<Status, { label: string; color: "red" | "violet" | "green" }> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

// Prisma automatically generates 'types' from its model thats why we have the 'Status' type available to use from '@prisma/client'
// module.
const IssueStatusBadge = ({ status }: { status: Status }) => {
  return <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>;
};

export default IssueStatusBadge;
