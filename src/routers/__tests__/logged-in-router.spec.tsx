import { render, RenderResult, waitFor } from "@testing-library/react";
import { LoggedInRouter } from "../logged-in-router";
import { MockedProvider } from "@apollo/client/testing";
import { ME_QUERY } from "../../hooks/useMe";

jest.mock("../../pages/client/restaurants", () => {
  const ComponentToMock = () => <span>restaurants</span>;
  return ComponentToMock;
});

describe("<LoggedInRouter />", () => {
  let renderResult: RenderResult;

  beforeEach(async () => {
    waitFor(() => {
      renderResult = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: ME_QUERY,
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    email: "",
                    role: "Client",
                    verified: true,
                  },
                },
              },
            },
          ]}
        >
          <LoggedInRouter />
        </MockedProvider>
      );
    });
  });
  it("renders OK", async () => {
    const { getByText, debug } = renderResult;
    await new Promise((resolve) => setTimeout(resolve, 0));
    getByText("restaurants");
  });
});
