import { ApolloProvider } from "@apollo/client";
import { render, RenderResult, waitFor } from "../../test-utils";
import ConfirmEmail, { VERIFY_EMAIL_MUTATION } from "../user/confirm-email";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { ME_QUERY } from "../../hooks/useMe";

jest.mock("react-router-dom", () => {
  const realModule = jest.requireActual("react-router-dom");
  return {
    ...realModule,
    useLocation: () => ({ search: "?code=testCode" }),
  };
});

describe("<ConfirmEmail />", () => {
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
        verifyEmail: {
          ok: true,
          error: null,
        },
      },
    });
    mockedClient = createMockClient();

    mockedClient.setRequestHandler(ME_QUERY, mockedQueryResponse);
    mockedClient.setRequestHandler(
      VERIFY_EMAIL_MUTATION,
      mockedMutationResponse
    );

    await waitFor(() => {
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <ConfirmEmail />
        </ApolloProvider>
      );
    });
  });

  it("renders OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Verify Email | Nuber Eats");
    });
  });

  it("calls mutation", async () => {
    await waitFor(() => {
      expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
      expect(mockedMutationResponse).toHaveBeenCalledWith({
        code: "testCode",
      });
    });
  });
});
