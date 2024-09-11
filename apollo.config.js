module.exports = {
  client: {
    includes: ["./src/**/*.{ts,tsx}"],
    tagName: "gql",
    service: {
      name: "nuber-eats-backend",
      url: "http://localhost:4000/graphql",
    },
  },
};
