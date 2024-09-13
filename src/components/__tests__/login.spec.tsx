import { render, RenderResult, waitFor } from "@testing-library/react";
import Login, { LOGIN_MUTATION } from "../../pages/login";
import { ApolloProvider } from "@apollo/client";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { debug } from "console";

describe("<Login />", () => {
  let renderResult: RenderResult;
  let mockedClient: MockApolloClient;

  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
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

  it("displays email required errors", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    await waitFor(() => {
      userEvent.type(email, "wrong@email");
    });
    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent("올바른 이메일을 입력해 주세요.");
    await waitFor(() => {
      userEvent.clear(email);
    });
    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent("이메일은 필수입니다.");
  });

  it("displays password validation errors", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    await waitFor(() => {
      userEvent.type(email, "valid@email.com");
      userEvent.type(password, "1");
      userEvent.clear(password);
    });
    const errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent("비밀번호는 필수입니다.");
  });

  it("submits form and calls mutation", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const button = getByRole("button");
    const formData = {
      email: "real@test.com",
      password: "test1234",
    };
    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: true,
          error: null,
          token: "xxxx",
        },
      },
    });
    mockedClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);
    await waitFor(async () => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      await new Promise((resolve) => setTimeout(resolve, 5));
      userEvent.click(button);
    });
    expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedMutationResponse).toHaveBeenCalledWith({
      loginInput: {
        email: formData.email,
        password: formData.password,
      },
    });
  });
});
