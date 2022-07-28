export const CampaignSchema = {
  name: "campaigns",
  title: "Campaigns",
  type: "document",
  fields: [
    {
      name: "txHash",
      title: "Campaign Hash",
      type: "string",
    },
    {
      name: "campaignName",
      title: "Campaign Name",
      type: "string",
    },
    {
      name: "miniumContribution",
      title: "Minimum Contribution",
      type: "number",
    },
    {
      name: "goalTarget",
      title: "Goal Target",
      type: "number",
    },
    {
      name: "cover",
      title: "Cover Image",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "string",
    },
    {
      name: "timestamp",
      title: "Timestamp",
      type: "datetime",
    },
  ],
};
