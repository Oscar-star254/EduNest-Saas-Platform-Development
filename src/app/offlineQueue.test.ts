import { beforeEach, describe, expect, it, vi } from "vitest"
import { flushQueue, queueOperation, readQueue } from "./offlineQueue"

describe("offline operation queue", () => {
  beforeEach(() => localStorage.clear())

  it("persists attendance operations and flushes successfully", async () => {
    queueOperation({
      type: "attendance",
      payload: { studentId: "student-1", status: "present" },
    })
    expect(readQueue()).toHaveLength(1)

    const sender = vi.fn().mockResolvedValue(undefined)
    const result = await flushQueue(sender)

    expect(sender).toHaveBeenCalledOnce()
    expect(result).toEqual({ sent: 1, failed: 0 })
    expect(readQueue()).toHaveLength(0)
  })
})
