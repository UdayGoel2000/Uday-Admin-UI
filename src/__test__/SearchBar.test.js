import SearchBar from "../components/SearchBar";

import { render, screen } from "@testing-library/react";

describe("Search Bar", () => {
  test("displays the correct label", () => {
    const label = "Seacrh by name, email or role";
    render(<SearchBar value={"abc"} />);
    const labelElement = screen.getByLabelText(label);
    expect(labelElement).toBeInTheDocument();
  });
});
