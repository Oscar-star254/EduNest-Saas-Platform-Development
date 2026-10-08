import {
  Bell,
  ChevronDown,
  Command,
  HelpCircle,
  Menu,
  Moon,
  Plus,
  Search,
  Sun,
  X,
} from "lucide-react"
import { useEffect, useState } from "react"
import { NavLink, Outlet, useLocation } from "react-router"
import { navGroups } from "../app/data"
import CommandPalette from "./CommandPalette"
import Logo from "./Logo"
import { Avatar, Badge, Button, cx } from "./ui"

export default function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)
  const [dark, setDark] = useState(
    () => localStorage.getItem("edunest-theme") === "dark",
  )
  const location = useLocation()

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
    localStorage.setItem("edunest-theme", dark ? "dark" : "light")
  }, [dark])

  useEffect(() => setSidebarOpen(false), [location.pathname])

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setCommandOpen(true)
      }
    }
    window.addEventListener("keydown", listener)
    return () => window.removeEventListener("keydown", listener)
  }, [])

  const mobileItems = navGroups[0].items.slice(0, 4)

  return (
    <div className="app-shell">
      <aside className={cx("sidebar", sidebarOpen && "sidebar-open")}>
        <div className="sidebar-brand">
          <Logo inverse />
          <Button
            variant="ghost"
            size="icon"
            className="sidebar-close"
            aria-label="Close menu"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </Button>
        </div>
        <div className="school-switcher">
          <span className="school-avatar">BA</span>
          <span>
            <strong>Brookfield Academy</strong>
            <small>Nairobi · Term 2</small>
          </span>
          <ChevronDown size={15} />
        </div>
        <nav className="sidebar-nav" aria-label="Main navigation">
          {navGroups.map((group) => (
            <div className="nav-group" key={group.label}>
              <small className="nav-label">{group.label}</small>
              {group.items.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    cx("nav-item", isActive && "nav-item-active")
                  }
                  to={item.href}
                  key={item.href}
                  end={item.href === "/app"}
                >
                  <item.icon size={18} strokeWidth={1.8} />
                  <span>{item.label}</span>
                  {item.count && <Badge>{item.count}</Badge>}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-help">
          <span className="help-icon">
            <HelpCircle size={19} />
          </span>
          <span>
            <strong>Need a hand?</strong>
            <small>Visit the help centre</small>
          </span>
          <ChevronDown size={14} className="rotate-neg" />
        </div>
        <div className="powered">
          Powered by <strong>EduNest</strong>
        </div>
      </aside>
      {sidebarOpen && (
        <div
          className="sidebar-scrim"
          onClick={() => setSidebarOpen(false)}
          role="presentation"
        />
      )}
      <main className="main">
        <header className="topbar">
          <div className="topbar-left">
            <Button
              variant="ghost"
              size="icon"
              className="menu-button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={21} />
            </Button>
            <Button
              variant="secondary"
              className="global-search"
              onClick={() => setCommandOpen(true)}
            >
              <Search size={17} />
              <span>Search anything...</span>
              <kbd>
                <Command size={11} />K
              </kbd>
            </Button>
          </div>
          <div className="topbar-actions">
            <Button variant="primary" size="sm" className="top-add">
              <Plus size={16} /> <span>Quick add</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDark(!dark)}
              aria-label={dark ? "Use light theme" : "Use dark theme"}
            >
              {dark ? <Sun size={19} /> : <Moon size={19} />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="notification-button"
              aria-label="Notifications"
            >
              <Bell size={19} />
              <span />
            </Button>
            <div className="profile">
              <Avatar initials="MW" color="violet" />
              <span>
                <strong>Mary Wanjiru</strong>
                <small>School Administrator</small>
              </span>
              <ChevronDown size={14} />
            </div>
          </div>
        </header>
        <div className="page">
          <Outlet />
        </div>
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {mobileItems.map((item) => (
            <NavLink
              className={({ isActive }) => cx(isActive && "active")}
              to={item.href}
              key={item.href}
              end={item.href === "/app"}
            >
              <item.icon size={20} />
              <small>{item.label}</small>
            </NavLink>
          ))}
          <Button variant="ghost" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
            <small>More</small>
          </Button>
        </nav>
      </main>
      <CommandPalette
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
      />
    </div>
  )
}
