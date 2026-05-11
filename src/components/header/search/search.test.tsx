import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { renderWithProviders } from "../../../__tests__/test-utils";
import Search from "./search";

describe("Search component", () => {
  test("renders search input and search button", () => {
    renderWithProviders(
      <Search value="" onChange={vi.fn()} onSearch={vi.fn()} />,
    );

    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  test("updates input value when user types", async () => {
    const onChange = vi.fn();

    renderWithProviders(
      <Search value="" onChange={onChange} onSearch={vi.fn()} />,
    );

    const input = screen.getByPlaceholderText(/search/i);

    await userEvent.type(input, "pikachu");

    expect(onChange).toHaveBeenCalled();
  });

  test("triggers search callback with correct parameters", async () => {
    const onSearch = vi.fn();

    renderWithProviders(
      <Search value="" onChange={vi.fn()} onSearch={onSearch} />,
    );

    const button = screen.getByRole("button", { name: /search/i });

    await userEvent.click(button);

    expect(onSearch).toHaveBeenCalled();
  });
});
