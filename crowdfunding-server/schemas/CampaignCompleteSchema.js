export const CampaignCompleteSchema = {
  name: "campaignComplete",
  title: "campaign conplete",
  type: "document",
  fields: [
    {
      name: "manager",
      title: "manager (user uid)",
      type: "reference",
      to: { type: "user" },
    },
    {
      name: "balance",
      title: "Balance",
      type: "string",
    },
    {
      name: "requestCount",
      title: "request Count ",
      type: "number",
    },
    {
      name: "contributorsCount",
      title: "contributors Count ",
      type: "number",
    },
    {
      name: "minimumContribution",
      title: "Minimum contribution",
      type: "string",
    },
    {
      name: "request",
      title: "Request",
      type: "array",
      of: [
        {
          name: "recipient",
          title: "Recipient",
          type: "string",
        },
        {
          name: "purpose",
          title: "Purpose",
          type: "string",
        },
        {
          name: "amount",
          title: "Amount",
          type: "number",
        },
        {
          name: "votes",
          title: "Votes",
          type: "string",
        },
        {
          name: "completed",
          title: "Completed",
          type: "boolean",
        },
      ],
    },
    {
      name: "campaigns",
      title: "Campaigns",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "campaigns" }],
        },
      ],
    },
  ],
};
