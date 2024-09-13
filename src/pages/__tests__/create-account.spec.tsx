import CreateAccount, { CREATE_ACCOUNT_MUTATION } from "../create-account";
import { ApolloProvider } from "@apollo/client";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { render, RenderResult, waitFor } from "../../test-utils";
import userEvent from "@testing-library/user-event";
import { UserRole } from "../../__generated__/globalTypes";

const mockPush = jest.fn();

jest.mock("react-router-dom", () => {
  const realModule = jest.requireActual("react-router-dom");
  return {
    ...realModule,
    useHistory: () => {
      return {
        push: mockPush,
      };
    },
  };
});

describe("<CreateAccount />", () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;

  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <CreateAccount />
        </ApolloProvider>
      );
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("renders OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Create Account | Nuber Eats");
    });
  });
  it("renders validation errors", async () => {
    const { getByRole, getByPlaceholderText } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    await waitFor(() => {
      userEvent.type(email, "wrong@email");
    });
    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/올바른 이메일을 입력해 주세요./i);
    await waitFor(() => {
      userEvent.clear(email);
    });
    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/이메일은 필수입니다./i);
    await waitFor(() => {
      userEvent.type(email, "working@email.com");
      userEvent.type(password, "1");
      userEvent.clear(password);
    });
    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent("비밀번호는 필수입니다.");
  });
  it("submits mutation with form values", async () => {
    const { getByRole, getByPlaceholderText } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const button = getByRole("button");
    const formData = {
      email: "test@test.com",
      password: "test1234",
      role: UserRole.Client,
    };
    const mockedCreateAccountMutationResponse = jest.fn().mockResolvedValue({
      data: {
        createAccount: {
          ok: true,
          error: "mutation-error",
        },
      },
    });
    mockedClient.setRequestHandler(
      CREATE_ACCOUNT_MUTATION,
      mockedCreateAccountMutationResponse
    );
    jest.spyOn(window, "alert").mockImplementation(() => null);
    await waitFor(async () => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      await new Promise((resolve) => setTimeout(resolve, 5));
      userEvent.click(button);
    });
    await waitFor(() => {
      const errorMessage = getByRole("alert");
      expect(errorMessage).toHaveTextContent(/mutation-error/i);
    });
    expect(mockedCreateAccountMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedCreateAccountMutationResponse).toHaveBeenCalledWith({
      createAccountInput: {
        email: formData.email,
        password: formData.password,
        role: formData.role,
      },
    });
    expect(window.alert).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith(
      "회원가입에 성공했습니다! 로그인 페이지로 이동합니다."
    );
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith("/");
  });
});
