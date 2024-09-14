import { MockedProvider } from "@apollo/client/testing";
import { render, RenderResult, waitFor } from "../../test-utils";
import Restaurants, { RESTAURANTS_QUERY } from "../client/restaurants";

describe("<Restaurants />", () => {
  let renderResult: RenderResult;

  beforeEach(async () => {
    await waitFor(() => {
      renderResult = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: RESTAURANTS_QUERY,
                variables: {
                  input: {
                    page: 1,
                  },
                },
              },
              result: {
                data: {
                  allCategories: {
                    ok: true,
                    error: null,
                    categories: [
                      {
                        __typename: "Category",
                        id: 1,
                        name: "testCategory",
                        slug: "testSlug",
                        icon: "test.png",
                        restaurantCount: 1,
                      },
                    ],
                  },
                  allRestaurants: {
                    ok: true,
                    error: null,
                    totalPages: 1,
                    totalResults: 1,
                    results: [
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
          <Restaurants />
        </MockedProvider>
      );
    });
  });

  it("renders OK", async () => {
    const { getByText } = renderResult;
    await waitFor(() => {
      expect(document.title).toBe("Home | Nuber Eats");
    });
    getByText("Page 1 of 1");
  });
});
