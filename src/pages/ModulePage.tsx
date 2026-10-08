import { motion } from "framer-motion"
import { ArrowRight, Download, Filter, Plus, Search } from "lucide-react"
import { useParams } from "react-router"
import { moduleDetails } from "../app/data"
import { Badge, Button, Card, Heading, Input, Progress } from "../components/ui"

const rows = [
  {
    title: "Grade 7A",
    owner: "Catherine Njeri",
    status: "Active",
    progress: 92,
    updated: "Today, 9:42 AM",
  },
  {
    title: "Grade 8B",
    owner: "David Ochieng",
    status: "Active",
    progress: 84,
    updated: "Yesterday, 4:18 PM",
  },
  {
    title: "Grade 6A",
    owner: "Esther Wambui",
    status: "Review",
    progress: 68,
    updated: "16 Jun 2025",
  },
  {
    title: "Grade 9A",
    owner: "James Kiptoo",
    status: "Active",
    progress: 96,
    updated: "15 Jun 2025",
  },
]

export default function ModulePage() {
  const { module = "analytics" } = useParams()
  const detail = moduleDetails[module] ?? moduleDetails.analytics
  const Icon = detail.icon
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <div className="page-heading list-heading">
        <div>
          <div className="breadcrumbs">
            School <span>/</span> {detail.title}
          </div>
          <Heading level={1}>{detail.title}</Heading>
          <p>{detail.description}</p>
        </div>
        <div className="page-actions">
          <Button variant="secondary">
            <Download size={16} /> Export
          </Button>
          <Button>
            <Plus size={16} /> {detail.actions[0]}
          </Button>
        </div>
      </div>
      <div className="module-hero">
        <span className="module-icon">
          <Icon size={28} />
        </span>
        <div>
          <small>{detail.metricLabel}</small>
          <strong>{detail.metric}</strong>
          <Badge tone="success">Live</Badge>
        </div>
        <div className="module-progress">
          <span>
            <small>Term progress</small>
            <strong>78%</strong>
          </span>
          <Progress value={78} />
        </div>
      </div>
      <div className="action-strip">
        {detail.actions.map((action, index) => (
          <Button variant={index === 0 ? "primary" : "secondary"} key={action}>
            {action}
            <ArrowRight size={15} />
          </Button>
        ))}
      </div>
      <Card className="table-card module-table">
        <div className="card-head module-head">
          <div>
            <Heading level={2}>Overview</Heading>
            <p>Current records and recent activity</p>
          </div>
          <div>
            <Input
              icon={<Search size={16} />}
              placeholder="Search records..."
            />
            <Button variant="secondary" size="icon" aria-label="Filter">
              <Filter size={16} />
            </Button>
          </div>
        </div>
        <div className="data-table">
          <div className="table-row module-row table-header">
            <span>Record</span>
            <span>Owner</span>
            <span>Status</span>
            <span>Completion</span>
            <span>Last updated</span>
          </div>
          {rows.map((row) => (
            <div className="table-row module-row" key={row.title}>
              <span>
                <strong>{row.title}</strong>
                <small>Term 2 · 2025</small>
              </span>
              <span data-label="Owner">{row.owner}</span>
              <span data-label="Status">
                <Badge tone={row.status === "Active" ? "success" : "warning"}>
                  {row.status}
                </Badge>
              </span>
              <span data-label="Completion" className="row-progress">
                <Progress value={row.progress} />
                <small>{row.progress}%</small>
              </span>
              <span data-label="Updated">{row.updated}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}
