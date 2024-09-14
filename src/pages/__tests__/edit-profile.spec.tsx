import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { ME_QUERY } from "../../hooks/useMe";
import EditProfile, { EDIT_PROFILE_MUTATION } from "../user/edit-profile";
import { render, RenderResult, waitFor } from "../../test-utils";
import { ApolloProvider } from "@apollo/client";
import userEvent from "@testing-library/user-event";

describe("<EditProfile />", () => {
  let renderResult: RenderResult;
  let mockedClient: MockApolloClient;
  let mockedMutationResponse: jest.Mock<any, any>;
  let mockedQueryResponse: jest.Mock<any, any>;

  beforeEach(async () => {
    mockedQueryResponse = jest.fn().mockResolvedValue({
      data: {
        me: {
          id: 1,
          email: "",
          role: "",
          verified: true,
        },
      },
    });
    mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        editProfile: {
          ok: true,
          error: "mutation-error",
        },
      },
    });
    mockedClient = createMockClient();

    mockedClient.setRequestHandler(ME_QUERY, mockedQueryResponse);
    mockedClient.setRequestHandler(
      EDIT_PROFILE_MUTATION,
      mockedMutationResponse
    );

    await waitFor(() => {
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <EditProfile />
        </ApolloProvider>
      );
    });
  });

  it("renders OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Edit Profile | Nuber Eats");
    });
  });

  it("displays form validation errors", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/.*이메일.*/);
    await waitFor(() => {
      userEvent.type(email, "wrong@email");
    });
    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent("올바른 이메일을 입력해 주세요.");
    await waitFor(() => {
      userEvent.clear(email);
    });
    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent("이메일을 입력해 주세요.");
  });

  it("submits form and calls mutation", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const formData = {
      email: "test@test.com",
      password: "test1234",
    };
    const email = getByPlaceholderText(/.*이메일.*/);
    const password = getByPlaceholderText(/.*비밀번호.*/);
    const button = getByRole("button");
    await waitFor(async () => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      await new Promise((resolve) => setTimeout(resolve, 0));
      userEvent.click(button);
    });

    await new Promise((resolve) => setTimeout(resolve, 0));

    const errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent("mutation-error");

    expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedMutationResponse).toHaveBeenCalledWith({
      input: {
        email: formData.email,
        password: formData.password,
      },
    });
  });
});
