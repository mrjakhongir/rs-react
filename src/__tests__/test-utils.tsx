import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";

export const renderWithProviders = (
  ui: ReactElement,
  { initialEntries = ["/"] }: { initialEntries?: string[] } = {},
) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>,
  );
};
