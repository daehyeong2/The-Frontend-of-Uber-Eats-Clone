import { render } from "@testing-library/react";
import { LoggedOutRouter } from "../logged-out-router";

jest.mock("../../pages/login", () => {
  const ComponentToMock = () => <span>login</span>;
  return ComponentToMock;
});

describe("<LoggedOutRouter />", () => {
  it("renders OK", async () => {
    const { getByText } = render(<LoggedOutRouter />);
    getByText("login");
  });
});
