import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import toast from 'react-hot-toast'
import { Eye, EyeOff, Moon, Sun, ArrowRight, GraduationCap, Users, BarChart3, Sparkles, ShieldCheck, Zap, CheckCircle } from 'lucide-react'
import LoadingSpinner from '../../components/common/LoadingSpinner'

const FEATURES = [
  { icon: GraduationCap, label: 'Smart Attendance Tracking', desc: 'AI-powered daily attendance with analytics' },
  { icon: BarChart3, label: 'Performance Analytics', desc: 'Real-time grades, trends and predictions' },
  { icon: Users, label: 'Complete Management', desc: 'Students, teachers, fees — all in one place' },
  { icon: Sparkles, label: 'AI Chatbot Assistant', desc: 'Ask anything, get instant answers' },
]

const DEMO_ROLES = [
  { role: 'Admin', email: 'admin@school.com', pass: 'Admin@123', color: 'hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400', dot: 'bg-violet-500' },
  { role: 'Teacher', email: 'teacher1@school.com', pass: 'Teacher@123', color: 'hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400', dot: 'bg-emerald-500' },
  { role: 'Student', email: 'student1@school.com', pass: 'Student@123', color: 'hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400', dot: 'bg-primary-500' },
  { role: 'Parent', email: 'parent1@school.com', pass: 'Parent@123', color: 'hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400', dot: 'bg-amber-500' },
]

export default function Login() {
  const { login } = useAuth()
  const { dark, toggle } = useTheme()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const handle = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) return toast.error('Please fill all fields')
    setLoading(true)
    try {
      const user = await login(form.email, form.password)
      const routes = { student: '/student', teacher: '/teacher', admin: '/admin', parent: '/parent' }
      navigate(routes[user.role] || '/')
      toast.success(`Welcome back, ${user.full_name}!`)
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-slate-950">
      {/* Left — brand panel */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden flex-col justify-between p-12">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-primary-950 to-slate-950" />
        <div className="absolute inset-0" style={{ backgroundImage:'radial-gradient(ellipse at 30% 20%, rgba(99,102,241,0.25) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(139,92,246,0.2) 0%, transparent 60%)' }} />
        <div className="absolute inset-0" style={{ backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize:'28px 28px' }} />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center shadow-glow">
              <span className="text-white font-bold text-base">E</span>
            </div>
            <div>
              <p className="font-bold text-white text-base leading-none">EduManage AI</p>
              <p className="text-slate-500 text-xs mt-0.5">Smart School Platform</p>
            </div>
          </div>

          <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-4">
            Manage smarter,<br />
            <span className="text-gradient">teach better.</span>
          </h1>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            The all-in-one platform for modern schools — powered by AI.
          </p>

          <div className="space-y-3">
            {FEATURES.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm hover:bg-white/[0.07] transition-colors">
                <div className="w-9 h-9 rounded-xl bg-primary-600/20 border border-primary-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="h-4 w-4 text-primary-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom badges */}
        <div className="relative z-10 flex items-center gap-5 pt-8 border-t border-white/[0.06]">
          {[['ShieldCheck', 'Secure & Encrypted'], ['Zap', '99.9% Uptime'], ['CheckCircle', 'GDPR Compliant']].map(([, label]) => (
            <div key={label} className="flex items-center gap-1.5">
              <CheckCircle className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
              <span className="text-xs text-slate-500">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right — form panel */}
      <div className="flex-1 bg-white dark:bg-slate-900 flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 sm:px-10 py-5">
          <div className="flex items-center gap-2 lg:hidden">
            <div className="w-7 h-7 rounded-lg bg-primary-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">E</span>
            </div>
            <span className="font-bold text-slate-900 dark:text-white text-sm">EduManage AI</span>
          </div>
          <div className="ml-auto">
            <button onClick={toggle} className="btn-icon bg-slate-100 dark:bg-slate-800">
              {dark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 flex items-center justify-center px-6 sm:px-10 py-8">
          <div className="w-full max-w-[400px]">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Sign in</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-1.5 text-sm">Enter your credentials to access your dashboard</p>
            </div>

            <form onSubmit={handle} className="space-y-4">
              <div>
                <label className="label">Email Address</label>
                <input
                  type="email" className="input" autoFocus autoComplete="email"
                  value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="you@school.com"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="label mb-0">Password</label>
                  <Link to="/forgot-password" className="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium">Forgot?</Link>
                </div>
                <div className="relative">
                  <input
                    type={show ? 'text' : 'password'} className="input pr-10" autoComplete="current-password"
                    value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShow(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="btn-primary w-full py-3 text-sm mt-2 justify-center">
                {loading ? <LoadingSpinner size="sm" /> : <> Sign in <ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
              New student? <Link to="/register" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">Create account</Link>
            </p>

            {/* Demo access */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
              <p className="text-xs text-center text-slate-400 uppercase tracking-wider font-semibold mb-3">Quick demo access</p>
              <div className="flex gap-2">
                {DEMO_ROLES.map(({ role, email, pass, color, dot }) => (
                  <button
                    key={role}
                    onClick={() => setForm({ email, password: pass })}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 transition-all hover:scale-[1.03] active:scale-95 ${color}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${dot} flex-shrink-0`} />
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
