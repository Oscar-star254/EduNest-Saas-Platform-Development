import { createBrowserRouter, Navigate } from "react-router"
import AppShell from "../components/AppShell"

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/app" replace /> },
  {
    path: "/login",
    lazy: async () => {
      const page = await import("../pages/Login")
      return { Component: page.default }
    },
  },
  {
    path: "/app",
    Component: AppShell,
    children: [
      {
        index: true,
        lazy: async () => {
          const page = await import("../pages/Dashboard")
          return { Component: page.default }
        },
      },
      {
        path: "students",
        lazy: async () => {
          const page = await import("../pages/Students")
          return { Component: page.default }
        },
      },
      {
        path: ":module",
        lazy: async () => {
          const page = await import("../pages/ModulePage")
          return { Component: page.default }
        },
      },
    ],
  },
  { path: "*", element: <Navigate to="/app" replace /> },
])
