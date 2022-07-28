export const userSchema = {
  name: "users",
  title: "Users",
  type: "document",
  fields: [
    {
      name: "address",
      title: "Wallet Address",
      type: "string",
    },
    {
      name: "userName",
      title: "User Name",
      type: "string",
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
