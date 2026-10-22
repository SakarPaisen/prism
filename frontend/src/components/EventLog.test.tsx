// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EventLog from "./EventLog";
import type { ContractEvent } from "@/types";
import "@testing-library/jest-dom/vitest";

const events: ContractEvent[] = [];

describe("EventLog empty state", () => {
  it("mentions the RPC retention window when no indexer is configured", () => {
    render(<EventLog events={events} indexed={false} />);
    expect(
      screen.getByText(
        "No events emitted by this contract in the last ~24h (the RPC node's retention window)."
      )
    ).toBeInTheDocument();
  });

  it("does not claim a 24h window when an indexer is configured", () => {
    render(<EventLog events={events} indexed={true} />);
    const message = screen.getByText("No events emitted by this contract yet.");
    expect(message).toBeInTheDocument();
    expect(message.textContent).not.toContain("24h");
  });
});
