import { motion } from "framer-motion"
import {
  Download,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Upload,
  UserRound,
} from "lucide-react"
import { useMemo, useState } from "react"
import toast from "react-hot-toast"
import { students } from "../app/data"
import {
  Avatar,
  Badge,
  Button,
  Card,
  EmptyState,
  Heading,
  Input,
  Modal,
  Select,
  Stepper,
} from "../components/ui"

export default function Students() {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const visible = useMemo(
    () =>
      students.filter((student) =>
        `${student.name} ${student.admission} ${student.class}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  )

  const save = () => {
    setOpen(false)
    setStep(0)
    toast.success("Student profile created as ADM-2025-0325")
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <div className="page-heading list-heading">
        <div>
          <div className="breadcrumbs">
            School <span>/</span> Students
          </div>
          <Heading level={1}>Students</Heading>
          <p>Manage learner profiles, guardians and their school journey.</p>
        </div>
        <div className="page-actions">
          <Button variant="secondary">
            <Upload size={16} /> Import
          </Button>
          <Button onClick={() => setOpen(true)}>
            <Plus size={16} /> Add student
          </Button>
        </div>
      </div>
      <section className="mini-stats">
        <div>
          <span className="mini-icon violet">
            <UserRound size={18} />
          </span>
          <span>
            <small>Total students</small>
            <strong>324</strong>
          </span>
          <Badge tone="success">+8.6%</Badge>
        </div>
        <div>
          <span>
            <small>Girls</small>
            <strong>167</strong>
          </span>
          <span className="split-bar">
            <i />
            <i />
          </span>
          <small>51.5%</small>
        </div>
        <div>
          <span>
            <small>Boys</small>
            <strong>157</strong>
          </span>
          <span className="split-bar boys">
            <i />
            <i />
          </span>
          <small>48.5%</small>
        </div>
        <div>
          <span>
            <small>New this term</small>
            <strong>18</strong>
          </span>
          <Badge tone="info">12 admitted</Badge>
        </div>
      </section>
      <Card className="table-card">
        <div className="table-tools">
          <Input
            icon={<Search size={17} />}
            placeholder="Search name or admission no."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div>
            <Select ariaLabel="Filter by class">
              <option>All classes</option>
              <option>Grade 7A</option>
              <option>Grade 8B</option>
            </Select>
            <Button variant="secondary">
              <Filter size={15} /> More filters
            </Button>
            <Button
              variant="secondary"
              size="icon"
              aria-label="Export students"
            >
              <Download size={16} />
            </Button>
          </div>
        </div>
        {visible.length ? (
          <>
            <div className="data-table student-table">
              <div className="table-row table-header">
                <span>Student</span>
                <span>Admission no.</span>
                <span>Class</span>
                <span>Guardian</span>
                <span>Fee balance</span>
                <span>Status</span>
                <span />
              </div>
              {visible.map((student) => (
                <div className="table-row" key={student.admission}>
                  <span className="student-cell">
                    <Avatar initials={student.initials} color={student.color} />
                    <span>
                      <strong>{student.name}</strong>
                      <small>Joined Jan 2024</small>
                    </span>
                  </span>
                  <span data-label="Admission">{student.admission}</span>
                  <span data-label="Class">
                    <Badge>{student.class}</Badge>
                  </span>
                  <span data-label="Guardian">
                    <strong>{student.guardian}</strong>
                    <small>Primary guardian</small>
                  </span>
                  <span
                    data-label="Fee balance"
                    className={
                      student.balance ? "balance-due" : "balance-clear"
                    }
                  >
                    {student.balance
                      ? `KSh ${student.balance.toLocaleString()}`
                      : "Cleared"}
                  </span>
                  <span data-label="Status">
                    <Badge tone={student.status === "New" ? "info" : "success"}>
                      {student.status}
                    </Badge>
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`More options for ${student.name}`}
                  >
                    <MoreHorizontal size={17} />
                  </Button>
                </div>
              ))}
            </div>
            <div className="table-footer">
              <span>Showing 1–6 of 324 students</span>
              <div>
                <Button variant="secondary" size="sm" disabled>
                  Previous
                </Button>
                <Button size="sm">1</Button>
                <Button variant="ghost" size="sm">
                  2
                </Button>
                <Button variant="ghost" size="sm">
                  3
                </Button>
                <Button variant="secondary" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </>
        ) : (
          <EmptyState
            title="No students found"
            description={`No learner matches “${query}”. Try a name, class, or admission number.`}
            action={
              <Button variant="secondary" onClick={() => setQuery("")}>
                Clear search
              </Button>
            }
          />
        )}
      </Card>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Add a new student"
      >
        <Stepper steps={["Student", "Guardian", "Enrollment"]} current={step} />
        <div className="form-grid">
          {step === 0 && (
            <>
              <label className="field">
                <span>First name</span>
                <Input placeholder="e.g. Wanjiku" />
              </label>
              <label className="field">
                <span>Last name</span>
                <Input placeholder="e.g. Njeri" />
              </label>
              <label className="field">
                <span>Date of birth</span>
                <Input type="date" />
              </label>
              <label className="field">
                <span>Gender</span>
                <Select ariaLabel="Gender">
                  <option>Select gender</option>
                  <option>Female</option>
                  <option>Male</option>
                </Select>
              </label>
            </>
          )}
          {step === 1 && (
            <>
              <label className="field">
                <span>Guardian name</span>
                <Input placeholder="Full name" />
              </label>
              <label className="field">
                <span>Relationship</span>
                <Select ariaLabel="Relationship">
                  <option>Parent</option>
                  <option>Guardian</option>
                  <option>Sibling</option>
                </Select>
              </label>
              <label className="field field-wide">
                <span>Mobile number</span>
                <Input type="tel" placeholder="+254 7•• ••• •••" />
              </label>
            </>
          )}
          {step === 2 && (
            <>
              <label className="field">
                <span>Class</span>
                <Select ariaLabel="Class">
                  <option>Grade 7A</option>
                  <option>Grade 7B</option>
                  <option>Grade 8A</option>
                </Select>
              </label>
              <label className="field">
                <span>Admission date</span>
                <Input type="date" />
              </label>
              <div className="admission-preview field-wide">
                <small>Admission number</small>
                <strong>ADM-2025-0325</strong>
                <span>Generated automatically</span>
              </div>
            </>
          )}
        </div>
        <div className="modal-actions">
          <Button
            variant="secondary"
            onClick={() => (step === 0 ? setOpen(false) : setStep(step - 1))}
          >
            {step === 0 ? "Cancel" : "Back"}
          </Button>
          <Button onClick={() => (step === 2 ? save() : setStep(step + 1))}>
            {step === 2 ? "Create student" : "Continue"}
          </Button>
        </div>
      </Modal>
    </motion.div>
  )
}
