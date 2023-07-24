import { render, screen } from "@testing-library/react";
import AppBar from "../components/AppBar";

test("renders the component correctly", () => {
  render(<AppBar />);
  const element = screen.getByText("Admin UI");
  expect(element).toBeInTheDocument();
});
