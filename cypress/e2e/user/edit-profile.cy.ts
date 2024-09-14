describe("Edit Profile", () => {
  beforeEach(() => {
    cy.login("baconbacon1231@gmail.com", "test1234");
  });
  it("can go to /edit-profile using the header", () => {
    cy.get('a[href="/edit-profile"]').click();
    cy.assertTitle("Edit Profile");
  });
  it("can change email", () => {
    cy.intercept("POST", "http://localhost:4000/graphql", (req) => {
      if (req.body?.operationName === "editProfile") {
        if (req.body?.variables?.input?.email) {
          req.body.variables.input.email = "baconbacon1231@gmail.com";
        }
      }
    });
    cy.visit("/edit-profile");
    cy.findByPlaceholderText(/.*이메일.*/)
      .clear()
      .type("new@test.com");
    cy.findByRole("button").should("not.be.disabled").click();
  });
});
