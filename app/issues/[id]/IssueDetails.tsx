import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import IssueStatusSelect from "./IssueStatusSelect";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="2" align="center" justify="between">
        <Box>
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Box>
        <Box>
          <IssueStatusSelect issue={issue} />
        </Box>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
