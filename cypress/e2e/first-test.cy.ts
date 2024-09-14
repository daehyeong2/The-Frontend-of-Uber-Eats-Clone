describe("Log In", () => {
  it("should see login page", () => {
    cy.visit("/").title().should("eq", "Login | Nuber Eats");
  });
  it("can fill out the form", () => {
    cy.visit("/")
      .findByPlaceholderText(/email/i)
      .type("test@test.com")
      .findByPlaceholderText(/password/i)
      .type("test1234")
      .findByRole("button")
      .should("not.be.disabled");
  });
  it("can see email / password validation errors", () => {
    cy.visit("/")
      .findByPlaceholderText(/email/i)
      .type("bad@email")
      .findByRole("alert")
      .should("have.text", "올바른 이메일을 입력해 주세요.");
  });
});
