import { AnimatePresence, motion } from "framer-motion"
import { CornerDownLeft, Search, X } from "lucide-react"
import { useMemo, useState } from "react"
import { useNavigate } from "react-router"
import { navGroups, students } from "../app/data"
import { Avatar, Badge, Button, Heading, Input } from "./ui"

export default function CommandPalette({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()
  const results = useMemo(() => {
    const needle = query.toLowerCase()
    return {
      modules: navGroups
        .flatMap((group) => group.items)
        .filter((item) => item.label.toLowerCase().includes(needle))
        .slice(0, 5),
      people: students
        .filter((student) =>
          `${student.name} ${student.admission}`.toLowerCase().includes(needle),
        )
        .slice(0, 4),
    }
  }, [query])

  const go = (href: string) => {
    navigate(href)
    onClose()
    setQuery("")
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="command-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.section
            className="command"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="command-search">
              <Input
                autoFocus
                icon={<Search size={20} />}
                placeholder="Search students, staff, payments and more..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label="Close search"
              >
                <X size={18} />
              </Button>
            </div>
            <div className="command-results">
              <Heading level={4}>Pages & modules</Heading>
              {results.modules.map((item) => (
                <Button
                  variant="ghost"
                  className="command-item"
                  key={item.href}
                  onClick={() => go(item.href)}
                >
                  <span className="command-item-icon">
                    <item.icon size={18} />
                  </span>
                  <span>{item.label}</span>
                  <CornerDownLeft size={14} />
                </Button>
              ))}
              {results.people.length > 0 && (
                <Heading level={4}>Students</Heading>
              )}
              {results.people.map((student) => (
                <Button
                  variant="ghost"
                  className="command-item"
                  key={student.admission}
                  onClick={() => go("/app/students")}
                >
                  <Avatar
                    initials={student.initials}
                    color={student.color}
                    size="sm"
                  />
                  <span className="command-person">
                    <strong>{student.name}</strong>
                    <small>
                      {student.admission} · {student.class}
                    </small>
                  </span>
                  <Badge tone="success">{student.status}</Badge>
                </Button>
              ))}
            </div>
            <div className="command-foot">
              <span>
                <kbd>↑</kbd>
                <kbd>↓</kbd> to navigate
              </span>
              <span>
                <kbd>esc</kbd> to close
              </span>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
