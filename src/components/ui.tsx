import { AnimatePresence, motion } from "framer-motion"
import { Check, ChevronDown, Search, X } from "lucide-react"
import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react"

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ")

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "dark" | "danger"
  size?: "sm" | "md" | "icon"
}) {
  return (
    <button
      className={cx("button", `button-${variant}`, `button-${size}`, className)}
      {...props}
    >
      {children}
    </button>
  )
}

export function Input({
  icon,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { icon?: ReactNode }) {
  return (
    <label className={cx("input-shell", className)}>
      {icon}
      <input className="input" {...props} />
    </label>
  )
}

export function Select({
  children,
  value,
  onChange,
  ariaLabel,
}: {
  children: ReactNode
  value?: string
  onChange?: (value: string) => void
  ariaLabel: string
}) {
  return (
    <label className="select-shell">
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      >
        {children}
      </select>
      <ChevronDown size={15} aria-hidden="true" />
    </label>
  )
}

export function Card({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <section className={cx("card", className)}>{children}</section>
}

export function Heading({
  children,
  level = 2,
  className,
}: {
  children: ReactNode
  level?: 1 | 2 | 3 | 4
  className?: string
}) {
  const Tag = `h${level}` as const
  return <Tag className={cx("heading", className)}>{children}</Tag>
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode
  tone?: "neutral" | "success" | "warning" | "info" | "violet" | "danger"
}) {
  return <span className={cx("badge", `badge-${tone}`)}>{children}</span>
}

export function Avatar({
  initials,
  color = "violet",
  size = "md",
}: {
  initials: string
  color?: string
  size?: "sm" | "md" | "lg"
}) {
  return (
    <span
      className={cx("avatar", `avatar-${color}`, `avatar-${size}`)}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}

export function Progress({
  value,
  tone = "violet",
}: {
  value: number
  tone?: "violet" | "gold" | "green" | "blue"
}) {
  return (
    <span className="progress" aria-label={`${value}%`}>
      <span
        className={cx("progress-fill", `progress-${tone}`)}
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </span>
  )
}

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="presentation"
        >
          <motion.section
            className="modal"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="modal-head">
              <Heading level={3} className="modal-title">
                {title}
              </Heading>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close dialog"
                onClick={onClose}
              >
                <X size={19} />
              </Button>
            </div>
            {children}
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="empty-state">
      <span className="empty-icon">
        <Search size={21} />
      </span>
      <Heading level={3}>{title}</Heading>
      <p>{description}</p>
      {action}
    </div>
  )
}

export function Stepper({
  steps,
  current,
}: {
  steps: string[]
  current: number
}) {
  return (
    <div className="stepper">
      {steps.map((step, index) => (
        <div
          className={cx("step", index <= current && "step-active")}
          key={step}
        >
          <span>{index < current ? <Check size={13} /> : index + 1}</span>
          <small>{step}</small>
        </div>
      ))}
    </div>
  )
}

export { cx }
