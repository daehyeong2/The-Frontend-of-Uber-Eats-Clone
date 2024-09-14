import { RenderResult, waitFor } from "@testing-library/react";
import { render } from "../../test-utils";
import RestaurantDetail, { RESTAURANT_QUERY } from "../client/restaurantDetail";
import { MockedProvider } from "@apollo/client/testing";

jest.mock("react-router-dom", () => {
  const realModule = jest.requireActual("react-router-dom");
  return {
    ...realModule,
    useParams: () => ({ id: "1" }),
  };
});

describe("<RestaurantDetail />", () => {
  let renderResult: RenderResult;

  beforeEach(async () => {
    await waitFor(() => {
      renderResult = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: RESTAURANT_QUERY,
                variables: {
                  input: {
                    restaurantId: 1,
                  },
                },
              },
              result: {
                data: {
                  restaurant: {
                    ok: true,
                    error: null,
                    restaurant: {
                      __typename: "Restaurant",
                      id: 1,
                      name: "testRestaurant",
                      coverImg: "test.png",
                      category: {
                        __typename: "Category",
                        name: "testCategory",
                        slug: "testSlug",
                      },
                      address: "testAddress",
                      isPromoted: false,
                    },
                  },
                },
              },
            },
          ]}
        >
          <RestaurantDetail />
        </MockedProvider>
      );
    });
  });

  it("renders OK", async () => {
    const { getByText, getByRole, container } = renderResult;

    await waitFor(() => {
      expect(document.title).toBe("testRestaurant | Nuber Eats");
    });

    expect(container.firstChild?.firstChild).toHaveStyle({
      "background-image": "url(test.png)",
    });

    const link = getByRole("link");
    expect(link).toHaveAttribute("href", "/categories/testSlug");
    expect(link).toHaveTextContent("testCategory");

    getByText("testRestaurant");
    getByText("testAddress");
  });
});
