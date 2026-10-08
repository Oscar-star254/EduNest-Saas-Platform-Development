import { motion } from "framer-motion"
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Download,
  Megaphone,
  MoreHorizontal,
  ReceiptText,
  Send,
  Sparkles,
  UserPlus,
  Users,
  WalletCards,
} from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { attendanceData, enrollmentData } from "../app/data"
import {
  Avatar,
  Badge,
  Button,
  Card,
  Heading,
  Progress,
  Select,
} from "../components/ui"

const stats = [
  {
    label: "Total students",
    value: "324",
    change: "8.6%",
    detail: "vs. last term",
    icon: Users,
    tone: "violet",
    positive: true,
  },
  {
    label: "Active staff",
    value: "42",
    change: "2 new",
    detail: "this term",
    icon: Sparkles,
    tone: "blue",
    positive: true,
  },
  {
    label: "Fees collected",
    value: "KSh 1.84M",
    change: "78%",
    detail: "of term target",
    icon: WalletCards,
    tone: "green",
    positive: true,
  },
  {
    label: "Attendance today",
    value: "94.8%",
    change: "1.2%",
    detail: "vs. yesterday",
    icon: CheckCircle2,
    tone: "gold",
    positive: false,
  },
]

const activities = [
  {
    initials: "PK",
    color: "violet",
    title: "Payment received",
    description: "Peter Kamau paid KSh 18,500 via M-Pesa",
    time: "8 min ago",
  },
  {
    initials: "JM",
    color: "green",
    title: "New student admitted",
    description: "Jabali Maina joined Grade 6A",
    time: "32 min ago",
  },
  {
    initials: "EW",
    color: "blue",
    title: "Attendance completed",
    description: "Eva Wambui marked Grade 7A attendance",
    time: "1 hr ago",
  },
  {
    initials: "BA",
    color: "gold",
    title: "Results published",
    description: "Grade 8 Term 2 mid-term results are live",
    time: "2 hrs ago",
  },
]

const events = [
  {
    date: "18",
    month: "JUN",
    title: "Grade 9 Parent Meeting",
    meta: "2:00 PM · Main Hall",
    tone: "violet",
  },
  {
    date: "21",
    month: "JUN",
    title: "Inter-house Athletics",
    meta: "8:00 AM · School Field",
    tone: "gold",
  },
  {
    date: "25",
    month: "JUN",
    title: "Mid-term Break",
    meta: "All day · 3 days",
    tone: "blue",
  },
]

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            <span /> Wednesday, 18 June 2025
          </div>
          <Heading level={1}>Good morning, Mary</Heading>
          <p>Here’s what’s happening at Brookfield Academy today.</p>
        </div>
        <div className="page-actions">
          <Button variant="secondary">
            <Download size={16} /> Export report
          </Button>
          <Button>
            <Sparkles size={16} /> Ask EduNest
          </Button>
        </div>
      </div>

      <section className="stats-grid" aria-label="School summary">
        {stats.map((stat, index) => (
          <motion.article
            className={`stat-card stat-${stat.tone}`}
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
          >
            <div className="stat-top">
              <span className="stat-icon">
                <stat.icon size={20} />
              </span>
              <Button
                variant="ghost"
                size="icon"
                aria-label={`More ${stat.label} options`}
              >
                <MoreHorizontal size={17} />
              </Button>
            </div>
            <p>{stat.label}</p>
            <strong>{stat.value}</strong>
            <small className={stat.positive ? "positive" : "negative"}>
              {stat.positive ? (
                <ArrowUpRight size={13} />
              ) : (
                <ArrowDownRight size={13} />
              )}
              {stat.change} <span>{stat.detail}</span>
            </small>
          </motion.article>
        ))}
      </section>

      <div className="dashboard-grid">
        <Card className="chart-card enrollment-card">
          <div className="card-head">
            <div>
              <Heading level={2}>Enrollment growth</Heading>
              <p>Student population across the current year</p>
            </div>
            <Select ariaLabel="Enrollment date range">
              <option>Jan – Sep 2025</option>
              <option>Last 12 months</option>
            </Select>
          </div>
          <div className="chart-summary">
            <strong>324</strong>
            <Badge tone="success">
              <ArrowUpRight size={12} /> 8.6%
            </Badge>
            <span>+26 students this year</span>
          </div>
          <div className="area-chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={enrollmentData}
                margin={{ top: 12, right: 8, left: -28, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="enrollmentFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="var(--primary)"
                      stopOpacity={0.24}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--primary)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="4 5"
                  vertical={false}
                  stroke="var(--line)"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--muted)", fontSize: 11 }}
                />
                <YAxis
                  domain={[240, 340]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--muted)", fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 14,
                    border: "1px solid var(--line)",
                    boxShadow: "var(--shadow-lg)",
                    background: "var(--surface)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="students"
                  stroke="var(--primary)"
                  strokeWidth={2.5}
                  fill="url(#enrollmentFill)"
                  dot={false}
                  activeDot={{
                    r: 5,
                    fill: "var(--primary)",
                    stroke: "var(--surface)",
                    strokeWidth: 3,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="fee-card">
          <div className="card-head">
            <div>
              <Heading level={2}>Fee collection</Heading>
              <p>Term 2 progress</p>
            </div>
            <Button variant="ghost" size="icon" aria-label="Fee options">
              <MoreHorizontal size={18} />
            </Button>
          </div>
          <div className="fee-visual">
            <div className="donut-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[{ value: 78 }, { value: 22 }]}
                    innerRadius={48}
                    outerRadius={62}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={8}
                  >
                    {[0, 1].map((_, index) => (
                      <Cell
                        key={index}
                        fill={
                          index === 0
                            ? "var(--primary)"
                            : "var(--surface-muted)"
                        }
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <span>
                <strong>78%</strong>
                <small>collected</small>
              </span>
            </div>
            <div className="fee-numbers">
              <span>
                <small>Collected</small>
                <strong>KSh 1,840,500</strong>
              </span>
              <span>
                <small>Outstanding</small>
                <strong>KSh 519,500</strong>
              </span>
              <span>
                <small>Term target</small>
                <strong>KSh 2,360,000</strong>
              </span>
            </div>
          </div>
          <Button variant="secondary" className="full-button">
            View fee dashboard <ArrowRight size={15} />
          </Button>
        </Card>

        <Card className="attendance-card">
          <div className="card-head">
            <div>
              <Heading level={2}>Attendance this week</Heading>
              <p>Whole-school daily rate</p>
            </div>
            <Badge tone="success">On track</Badge>
          </div>
          <div className="bar-chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={attendanceData}
                margin={{ top: 16, right: 0, left: -34, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="4 5"
                  vertical={false}
                  stroke="var(--line)"
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--muted)", fontSize: 11 }}
                />
                <YAxis
                  domain={[80, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--muted)", fontSize: 11 }}
                />
                <Tooltip
                  cursor={{ fill: "var(--surface-muted)" }}
                  contentStyle={{
                    borderRadius: 14,
                    border: "1px solid var(--line)",
                    background: "var(--surface)",
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="var(--primary)"
                  radius={[7, 7, 2, 2]}
                  barSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="attendance-foot">
            <span>
              <strong>307</strong>
              <small>Present</small>
            </span>
            <span>
              <strong>11</strong>
              <small>Absent</small>
            </span>
            <span>
              <strong>6</strong>
              <small>Late</small>
            </span>
          </div>
        </Card>

        <Card className="events-card">
          <div className="card-head">
            <div>
              <Heading level={2}>Upcoming events</Heading>
              <p>Next 14 days</p>
            </div>
            <Button variant="ghost" size="sm">
              View calendar <ChevronRight size={14} />
            </Button>
          </div>
          <div className="event-list">
            {events.map((event) => (
              <div className="event" key={event.title}>
                <span className={`event-date event-${event.tone}`}>
                  <strong>{event.date}</strong>
                  <small>{event.month}</small>
                </span>
                <span>
                  <strong>{event.title}</strong>
                  <small>{event.meta}</small>
                </span>
                <ChevronRight size={15} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="activity-card">
          <div className="card-head">
            <div>
              <Heading level={2}>Recent activity</Heading>
              <p>Latest across your school</p>
            </div>
            <Button variant="ghost" size="sm">
              View all <ChevronRight size={14} />
            </Button>
          </div>
          <div className="activity-list">
            {activities.map((activity) => (
              <div className="activity-row" key={activity.description}>
                <Avatar
                  initials={activity.initials}
                  color={activity.color}
                  size="sm"
                />
                <span>
                  <strong>{activity.title}</strong>
                  <small>{activity.description}</small>
                </span>
                <time>{activity.time}</time>
              </div>
            ))}
          </div>
        </Card>

        <Card className="quick-card">
          <div className="card-head">
            <div>
              <Heading level={2}>Quick actions</Heading>
              <p>Your everyday shortcuts</p>
            </div>
          </div>
          <div className="quick-grid">
            <Button variant="ghost">
              <span className="quick-icon quick-violet">
                <UserPlus size={19} />
              </span>
              <span>
                <strong>Add student</strong>
                <small>Create a learner profile</small>
              </span>
              <ChevronRight size={14} />
            </Button>
            <Button variant="ghost">
              <span className="quick-icon quick-green">
                <CircleDollarSign size={19} />
              </span>
              <span>
                <strong>Record payment</strong>
                <small>Cash, bank or M-Pesa</small>
              </span>
              <ChevronRight size={14} />
            </Button>
            <Button variant="ghost">
              <span className="quick-icon quick-blue">
                <CheckCircle2 size={19} />
              </span>
              <span>
                <strong>Mark attendance</strong>
                <small>Choose a class</small>
              </span>
              <ChevronRight size={14} />
            </Button>
            <Button variant="ghost">
              <span className="quick-icon quick-gold">
                <Send size={19} />
              </span>
              <span>
                <strong>Send announcement</strong>
                <small>SMS, email or in-app</small>
              </span>
              <ChevronRight size={14} />
            </Button>
          </div>
        </Card>

        <Card className="approval-card">
          <div className="approval-glow" />
          <div className="card-head">
            <div>
              <Heading level={2}>Needs your attention</Heading>
              <p>Pending approvals and tasks</p>
            </div>
            <span className="attention-count">4</span>
          </div>
          <div className="approval-list">
            <div>
              <span className="approval-icon">
                <Clock3 size={17} />
              </span>
              <span>
                <strong>2 leave requests</strong>
                <small>Awaiting your review</small>
              </span>
              <Button variant="ghost" size="sm">
                Review
              </Button>
            </div>
            <div>
              <span className="approval-icon">
                <ReceiptText size={17} />
              </span>
              <span>
                <strong>Payment cancellation</strong>
                <small>KSh 12,500 · Ref #PAY-0241</small>
              </span>
              <Button variant="ghost" size="sm">
                Review
              </Button>
            </div>
            <div>
              <span className="approval-icon">
                <Megaphone size={17} />
              </span>
              <span>
                <strong>Announcement draft</strong>
                <small>Parent meeting reminder</small>
              </span>
              <Button variant="ghost" size="sm">
                Review
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  )
}
