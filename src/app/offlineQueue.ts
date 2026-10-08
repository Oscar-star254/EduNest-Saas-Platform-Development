export type QueuedOperation = {
  id: string
  type: "attendance" | "marks"
  payload: Record<string, unknown>
  createdAt: string
}

const STORAGE_KEY = "edunest-offline-queue"

export function readQueue(): QueuedOperation[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]")
  } catch {
    return []
  }
}

export function queueOperation(
  operation: Omit<QueuedOperation, "id" | "createdAt">,
) {
  const queued: QueuedOperation = {
    ...operation,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...readQueue(), queued]))
  window.dispatchEvent(new CustomEvent("edunest:queue-change"))
  return queued
}

export async function flushQueue(
  send: (operation: QueuedOperation) => Promise<void>,
) {
  const pending = readQueue()
  const failed: QueuedOperation[] = []
  for (const operation of pending) {
    try {
      await send(operation)
    } catch {
      failed.push(operation)
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(failed))
  return { sent: pending.length - failed.length, failed: failed.length }
}
