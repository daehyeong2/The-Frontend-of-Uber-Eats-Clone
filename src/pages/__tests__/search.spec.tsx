import { MockedProvider } from "@apollo/client/testing";
import { render, RenderResult, waitFor } from "../../test-utils";
import Search, { SEARCH_RESTAURANT } from "../client/search";

jest.mock("react-router-dom", () => {
  const realModule = jest.requireActual("react-router-dom");
  return {
    ...realModule,
    useLocation: () => ({ search: "?term=testQuery" }),
  };
});

describe("<Search />", () => {
  let renderResult: RenderResult;

  beforeEach(async () => {
    await waitFor(() => {
      renderResult = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: SEARCH_RESTAURANT,
                variables: {
                  input: {
                    page: 1,
                    query: "testQuery",
                  },
                },
              },
              result: {
                data: {
                  searchRestaurant: {
                    ok: true,
                    error: null,
                    totalPages: 1,
                    totalResults: 1,
                    restaurants: [
                      {
                        __typename: "Restaurant",
                        id: 1,
                        name: "testRestaurant",
                        coverImg: "test.png",
                        category: {
                          name: "testCategory",
                        },
                        address: "testAddress",
                        isPromoted: false,
                      },
                    ],
                  },
                },
              },
            },
          ]}
        >
          <Search />
        </MockedProvider>
      );
    });
  });

  it("renders OK", async () => {
    const { getByText, debug } = renderResult;
    await waitFor(() => {
      expect(document.title).toBe("Search | Nuber Eats");
    });
    getByText('"testQuery" 검색 결과:');
  });
});
