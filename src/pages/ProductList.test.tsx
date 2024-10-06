import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import ProductList from "./ProductList";

describe("ProductList Component", () => {
  it("Renders all products initially", () => {
    render(<ProductList />);

    // Check that all products are displayed initially
    expect(screen.getByText("Item A")).toBeInTheDocument();
    expect(screen.getByText("Item B")).toBeInTheDocument();
    expect(screen.getByText("Item C")).toBeInTheDocument();
    expect(screen.getByText("Item D")).toBeInTheDocument();
    expect(screen.getByText("Item E")).toBeInTheDocument();
    expect(screen.getByText("Item F")).toBeInTheDocument();
    expect(screen.getByText("Item G")).toBeInTheDocument();
    expect(screen.getByText("Item H")).toBeInTheDocument();
  });

  it("Filters products based on search input", () => {
    render(<ProductList />);

    const searchInput = screen.getByTestId("search-input");

    // Simulate typing in the search input
    fireEvent.change(searchInput, { target: { value: "Item A" } });

    // Verify that the correct item is displayed, and others are not
    expect(screen.getByText("Item A")).toBeInTheDocument();
    expect(screen.queryByText("Item B")).not.toBeInTheDocument();
  });

  it('Shows the top 5 cheapest products when "Show Cheapest" is toggled', () => {
    render(<ProductList />);

    const toggleButton = screen.getByTestId("toggle-cheapest");
    fireEvent.click(toggleButton);

    // Verify that the top 5 cheapest items are displayed
    expect(screen.getByText("Item A")).toBeInTheDocument();
    expect(screen.getByText("Item B")).toBeInTheDocument();
    expect(screen.getByText("Item G")).toBeInTheDocument();
    expect(screen.getByText("Item D")).toBeInTheDocument();
    expect(screen.getByText("Item C")).toBeInTheDocument();
    expect(screen.queryByText("Item E")).not.toBeInTheDocument(); // Ensure an expensive item is hidden
  });

  it("Shows 'No products found' when search yields no results", () => {
    render(<ProductList />);

    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "Non-existing item" } });

    // Verify that the no products message is displayed
    expect(screen.getByTestId("error-message")).toBeInTheDocument();
  });

  it("Toggles between cheapest and all products", () => {
    render(<ProductList />);

    const toggleButton = screen.getByTestId("toggle-cheapest");

    // Initially should show all products
    expect(screen.getByText("Item A")).toBeInTheDocument();
    expect(screen.getByText("Item B")).toBeInTheDocument();

    // Toggle to show cheapest
    fireEvent.click(toggleButton);
    expect(screen.getByText("Item A")).toBeInTheDocument();
    expect(screen.queryByText("Item E")).not.toBeInTheDocument(); // Ensure an expensive item is hidden

    // Toggle back to show all products
    fireEvent.click(toggleButton);
    expect(screen.getByText("Item E")).toBeInTheDocument(); // Ensure the expensive item is visible again
  });

  it("Has initial state with empty search and correct toggle button text", () => {
    render(<ProductList />);

    const searchInput = screen.getByTestId("search-input");
    expect(searchInput.value).toBe(""); // Verify that the search input starts off empty

    const toggleButton = screen.getByTestId("toggle-cheapest");
    expect(toggleButton).toHaveTextContent("Show Cheapest"); // Verify the initial text of the toggle button
  });

  it("Handles special characters in search input", () => {
    render(<ProductList />);

    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "@" } }); // Simulate entering a special character

    // Verify that the no products message is displayed
    expect(screen.getByTestId("error-message")).toBeInTheDocument();
  });
});
