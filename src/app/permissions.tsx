import type { ReactNode } from "react"

export type Role = "super_admin" | "school_admin" | "principal" | "accountant" | "teacher" | "parent" | "student"

const permissions: Record<Role, Set<string>> = {
  super_admin: new Set(["*"]),
  school_admin: new Set([
    "students.read",
    "students.write",
    "fees.read",
    "fees.write",
    "academics.write",
    "settings.write",
  ]),
  principal: new Set([
    "students.read",
    "fees.read",
    "academics.write",
    "settings.read",
  ]),
  accountant: new Set(["students.read", "fees.read", "fees.write"]),
  teacher: new Set(["students.read", "attendance.write", "academics.write"]),
  parent: new Set(["children.read", "fees.read", "fees.pay"]),
  student: new Set(["profile.read", "results.read"]),
}

export function can(role: Role, permission: string) {
  const granted = permissions[role]
  return granted.has("*") || granted.has(permission)
}

export function Can({
  role,
  permission,
  children,
  fallback = null,
}: {
  role: Role
  permission: string
  children: ReactNode
  fallback?: ReactNode
}) {
  return can(role, permission) ? children : fallback
}
