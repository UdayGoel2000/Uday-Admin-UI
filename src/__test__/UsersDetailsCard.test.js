import { render, screen } from "@testing-library/react";
import UsersDetailsCard from "../components/UsersDetailsCard";
import axios from "axios";

test("renders the component correctly", () => {
  render(<UsersDetailsCard />);
  const table = screen.getByRole("table");
  expect(table).toBeInTheDocument();
});
