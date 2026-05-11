import { render, screen } from "@testing-library/react";
import Loading from "./loading";

describe("Loading component", () => {
  test("renders loading indicator when loading is true", () => {
    render(<Loading loading={true} />);

    const loader = screen.getByRole("status");

    expect(loader).toBeInTheDocument();
    expect(loader).toHaveTextContent(/loading/i);
  });

  test("does not render when loading is false", () => {
    const { container } = render(<Loading loading={false} />);

    expect(container).toBeEmptyDOMElement();
  });

  test("has proper accessibility attributes", () => {
    render(<Loading loading={true} />);

    const loader = screen.getByRole("status");

    expect(loader).toHaveAttribute("aria-label", "loading");
  });
});
