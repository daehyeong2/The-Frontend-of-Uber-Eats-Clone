import { MockedProvider } from "@apollo/client/testing";
import { render, waitFor } from "../../test-utils";
import Category, { CATEGORY_QUERY } from "../client/category";
import { RESTAURANTS_QUERY } from "../client/restaurants";

jest.mock("react-router-dom", () => {
  const realModule = jest.requireActual("react-router-dom");
  return {
    ...realModule,
    useParams: () => ({ slug: "testSlug" }),
  };
});

describe("<Category />", () => {
  beforeEach(async () => {
    await waitFor(() => {
      render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: CATEGORY_QUERY,
                variables: {
                  input: {
                    page: 1,
                    slug: "testSlug",
                  },
                },
              },
              result: {
                data: {
                  category: {
                    ok: true,
                    error: null,
                    totalPages: 1,
                    totalResults: 1,
                    category: {
                      __typename: "Category",
                      id: 1,
                      name: "testCategory",
                      slug: "testSlug",
                      icon: "test.png",
                      restaurantCount: 1,
                    },
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
          <Category />
        </MockedProvider>
      );
    });
  });

  it("renders OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("testCategory | Nuber Eats");
    });
  });
});
