import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import toast from 'react-hot-toast'
import { Eye, EyeOff, School, Moon, Sun, GraduationCap, BookOpen, BarChart3, MessageSquare, Sparkles, ShieldCheck, Zap } from 'lucide-react'
import LoadingSpinner from '../../components/common/LoadingSpinner'

const STATS = [
  { value: '500+', label: 'Students Managed' },
  { value: '98%', label: 'Attendance Accuracy' },
  { value: '50+', label: 'Teachers Onboarded' },
  { value: '24/7', label: 'AI Support' },
]

const FEATURES = [
  { icon: BarChart3, label: 'AI-powered performance insights', desc: 'Predict outcomes before exams' },
  { icon: GraduationCap, label: 'Real-time attendance tracking', desc: 'Never miss a class again' },
  { icon: BookOpen, label: 'Complete fee management', desc: 'Payments, dues & receipts' },
  { icon: MessageSquare, label: 'Interactive AI chatbot', desc: 'Ask anything, anytime' },
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
      toast.error(err.response?.data?.detail || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Left hero panel — desktop only */}
      <div className="hidden lg:flex lg:w-[48%] relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-accent-600 items-center justify-center p-12 flex-col">
        {/* Background mesh */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/[0.07] rounded-full" />
          <div className="absolute top-1/2 -right-24 w-72 h-72 bg-accent-500/20 rounded-full" />
          <div className="absolute -bottom-24 left-1/3 w-64 h-64 bg-white/[0.05] rounded-full" />
          {/* Grid dots */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }} />
        </div>

        <div className="relative z-10 text-white w-full max-w-sm">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/20">
              <School className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-xl leading-none">EduManage AI</p>
              <p className="text-white/60 text-xs mt-0.5">Smart School Management</p>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">
            The smarter way<br />to manage schools
          </h1>
          <p className="text-white/70 text-base mb-8">
            AI-powered platform for students, teachers, and administrators — all in one place.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {STATS.map(({ value, label }) => (
              <div key={label} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-4 py-3">
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-xs text-white/60 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Feature list */}
          <div className="space-y-2.5">
            {FEATURES.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-center gap-3 bg-white/[0.08] backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10 hover:bg-white/[0.12] transition-colors">
                <div className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-white/95 font-medium leading-none">{label}</p>
                  <p className="text-xs text-white/50 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/15">
            <div className="flex items-center gap-1.5 text-white/60 text-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              Secure & Encrypted
            </div>
            <div className="flex items-center gap-1.5 text-white/60 text-xs">
              <Zap className="h-3.5 w-3.5 text-amber-400" />
              99.9% Uptime
            </div>
            <div className="flex items-center gap-1.5 text-white/60 text-xs">
              <Sparkles className="h-3.5 w-3.5 text-blue-300" />
              AI Powered
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex flex-col items-center justify-center p-5 sm:p-10 relative overflow-y-auto">
        {/* Mobile header bar */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between lg:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-sm">
              <School className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 dark:text-white text-sm">EduManage AI</span>
          </div>
          <button onClick={toggle} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 transition-colors">
            {dark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-gray-600" />}
          </button>
        </div>

        <div className="w-full max-w-[400px] mt-16 lg:mt-0">
          {/* Desktop theme toggle */}
          <div className="hidden lg:flex justify-end mb-6">
            <button onClick={toggle} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              {dark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-gray-600" />}
            </button>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Welcome back 👋</h2>
          <p className="text-gray-400 dark:text-gray-500 mt-1.5 text-sm">Sign in to continue to your dashboard</p>

          <form onSubmit={handle} className="mt-8 space-y-5">
            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                className="input"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                placeholder="you@school.com"
                autoFocus
                autoComplete="email"
              />
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  className="input pr-11"
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShow(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium">
                Forgot password?
              </Link>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 text-base py-3">
              {loading ? <LoadingSpinner size="sm" /> : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            New student?{' '}
            <Link to="/register" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-semibold">
              Register here
            </Link>
          </p>

          {/* Demo credentials */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-700/60">
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">Quick Demo Access</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { role: 'Admin', email: 'admin@school.com', pass: 'Admin@123', color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/40' },
                { role: 'Teacher', email: 'teacher1@school.com', pass: 'Teacher@123', color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40' },
                { role: 'Student', email: 'student1@school.com', pass: 'Student@123', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/40' },
              ].map(({ role, email, pass, color }) => (
                <button
                  key={role}
                  onClick={() => setForm({ email, password: pass })}
                  className={`text-xs font-medium py-2 px-3 rounded-xl border transition-all active:scale-95 hover:scale-105 ${color}`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
