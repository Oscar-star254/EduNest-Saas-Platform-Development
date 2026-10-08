import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Can, can } from "./permissions"

describe("role permissions", () => {
  it("never grants teacher financial write access", () => {
    expect(can("teacher", "fees.write")).toBe(false)
    expect(can("accountant", "fees.write")).toBe(true)
  })

  it("renders protected content only when allowed", () => {
    const { rerender } = render(
      <Can
        role="teacher"
        permission="fees.write"
        fallback={<span>Restricted</span>}
      >
        <span>Record payment</span>
      </Can>,
    )
    expect(screen.getByText("Restricted")).toBeInTheDocument()
    rerender(
      <Can role="school_admin" permission="fees.write">
        <span>Record payment</span>
      </Can>,
    )
    expect(screen.getByText("Record payment")).toBeInTheDocument()
  })
})
