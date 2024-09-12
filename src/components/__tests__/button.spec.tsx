import { render } from "@testing-library/react";
import Button from "../button";

describe("<Button />", () => {
  it("should render OK with props", () => {
    const { getByText } = render(
      <Button canClick={true} loading={false} text="test" />
    );
    getByText("test");
  });
  it("should display loading", () => {
    const { getByText } = render(
      <Button canClick={true} loading={true} text="test" />
    );
    getByText("Loading..");
  });
  it("shouldn't be able to click", () => {
    const { getByText, container } = render(
      <Button canClick={false} loading={false} text="test" />
    );
    getByText("test");
    expect(container.firstChild).toHaveClass("pointer-events-none");
  });
});
