import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/app/page";

describe("Home", () => {
  test("Renders homepage", () => {
    render(<Home />);
    const welcome = screen.getByText("Be first to the market.");
    expect(welcome).toBeInTheDocument();
  });
});
