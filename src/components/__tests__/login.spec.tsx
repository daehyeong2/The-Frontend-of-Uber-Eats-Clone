import { render, RenderResult, waitFor } from "@testing-library/react";
import Login from "../../pages/login";
import { ApolloProvider } from "@apollo/client";
import { createMockClient } from "mock-apollo-client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("<Login />", () => {
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      const mockedClient = createMockClient();
      renderResult = render(
        <HelmetProvider>
          <ApolloProvider client={mockedClient}>
            <Router>
              <Login />
            </Router>
          </ApolloProvider>
        </HelmetProvider>
      );
    });
  });
  it("should render OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Login | Nuber Eats");
    });
  });
  it("displays email validation errors", async () => {
    const { getByPlaceholderText, getByRole, debug } = renderResult;
    const email = getByPlaceholderText(/email/i);
    await waitFor(() => {
      userEvent.type(email, "wrong@email");
    });
    const errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent("올바른 이메일을 입력해 주세요.");
    await waitFor(() => {
      userEvent.clear(email);
    });
    const errorMessageSE = getByRole("alert");
    expect(errorMessageSE).toHaveTextContent("이메일은 필수입니다.");
  });
});
