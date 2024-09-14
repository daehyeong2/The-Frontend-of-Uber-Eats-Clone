describe("Create Account", () => {
  it("should see email / password validation errors", () => {
    cy.visit("/");
    cy.findByText(/create an account/i).click();
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
  it("should be able to create account and log in", () => {
    cy.visit("/create-account");

    cy.findByPlaceholderText(/email/i).type("test@test.com");
    cy.findByPlaceholderText(/password/i).type("test1234");
    cy.findByRole("button").click();

    cy.visit("/");

    cy.findByPlaceholderText(/email/i).type("test@test.com");
    cy.findByPlaceholderText(/password/i).type("test1234");
    cy.findByRole("button").click();
    cy.window().its("localStorage.nuber-token").should("be.a", "string");
  });
});
