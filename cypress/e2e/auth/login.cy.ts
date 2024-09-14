describe("Log In", () => {
  it("should see login page", () => {
    cy.visit("/").title().should("eq", "Login | Nuber Eats");
  });
  it("can see email / password validation errors", () => {
    cy.visit("/");
    cy.findByPlaceholderText(/email/i).type("bad@email");
    cy.findByRole("alert").should(
      "have.text",
      "올바른 이메일을 입력해 주세요."
    );
    cy.findByPlaceholderText(/email/i).clear();
    cy.findByRole("alert").should("have.text", "이메일은 필수입니다.");
    cy.findByPlaceholderText(/email/i).type("test@test.com");
    cy.findByPlaceholderText(/password/i)
      .type("test")
      .clear();
    cy.findByRole("alert").should("have.text", "비밀번호는 필수입니다.");
  });
  it("can fill out the form and log in", () => {
    cy.login("baconbacon1231@gmail.com", "test1234");
  });
});
