import { ArrowRight, CheckCircle2, Eye, LockKeyhole, Mail } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"
import toast from "react-hot-toast"
import Logo from "../components/Logo"
import { Button, Heading, Input } from "../components/ui"

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setTimeout(() => {
      toast.success("Welcome back to Brookfield Academy")
      navigate("/app")
    }, 650)
  }
  return (
    <div className="login-page">
      <section className="login-showcase">
        <Logo inverse />
        <div className="login-message">
          <span className="login-pill">
            <CheckCircle2 size={14} /> Trusted by growing schools
          </span>
          <Heading level={1}>A calmer way to run your school.</Heading>
          <p>
            Bring people, learning and operations together in one beautiful,
            connected workspace.
          </p>
        </div>
        <div className="login-quote">
          <p>
            “EduNest gives us a clear picture of our school every morning. Our
            teachers save hours, and parents feel more connected.”
          </p>
          <span>
            <strong>Jane Muthoni</strong>
            <small>Principal, Brookfield Academy</small>
          </span>
        </div>
      </section>
      <section className="login-form-wrap">
        <div className="login-mobile-logo">
          <Logo />
        </div>
        <form className="login-form" onSubmit={submit}>
          <div>
            <span className="eyebrow">
              <span /> Welcome back
            </span>
            <Heading level={1}>Sign in to EduNest</Heading>
            <p>Use your school account to continue.</p>
          </div>
          <label className="field">
            <span>Email address</span>
            <Input
              icon={<Mail size={17} />}
              type="email"
              defaultValue="admin@brookfield.ac.ke"
              required
            />
          </label>
          <label className="field">
            <span>Password</span>
            <Input
              icon={<LockKeyhole size={17} />}
              type="password"
              defaultValue="Demo@2025"
              required
            />
            <Eye size={16} className="field-trailing" />
          </label>
          <div className="login-options">
            <label>
              <input type="checkbox" defaultChecked /> Keep me signed in
            </label>
            <Button type="button" variant="ghost" size="sm">
              Forgot password?
            </Button>
          </div>
          <Button className="login-submit" disabled={loading}>
            {loading ? "Signing you in..." : "Sign in"}{" "}
            {!loading && <ArrowRight size={17} />}
          </Button>
          <p className="login-support">
            Having trouble? <strong>Contact your school administrator</strong>
          </p>
        </form>
        <small className="login-legal">
          By continuing, you agree to EduNest’s Terms and Privacy Policy.
        </small>
      </section>
    </div>
  )
}
