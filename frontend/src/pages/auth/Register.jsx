import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authAPI } from '../../services/api'
import toast from 'react-hot-toast'
import LoadingSpinner from '../../components/common/LoadingSpinner'

const DEPARTMENTS = ['BCA', 'MA(D&D)', 'MA(Home Science)', 'BCS(Bio)', 'BSc(Maths)', 'BA']

const BA_SUBJECTS = [
  'English', 'Hindi', 'History', 'Political Science', 'Sociology',
  'Economics', 'Psychology', 'Geography', 'Philosophy',
]

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '', full_name: '', password: '', phone: '',
    roll_number: '', department: '', subject: '', semester: '', year: ''
  })
  const [loading, setLoading] = useState(false)

  const handle = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password || !form.roll_number || !form.full_name)
      return toast.error('Please fill all required fields')
    setLoading(true)
    try {
      await authAPI.registerStudent({ ...form, semester: Number(form.semester), year: Number(form.year) })
      toast.success('Registered successfully! Please login.')
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const set = (name, val) => setForm(p => ({ ...p, [name]: val }))
  const f = (name) => ({ value: form[name], onChange: e => set(name, e.target.value) })

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 py-6 sm:py-10">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-5 sm:mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-500/20">
            <span className="text-white font-bold text-xl">E</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white">Student Registration</h2>
          <p className="text-slate-400 dark:text-slate-500 mt-1.5 text-sm">Create your student account to get started</p>
        </div>
        <div className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 p-4 sm:p-6 shadow-card">
          <form onSubmit={handle} className="[&_input]:text-base [&_select]:text-base">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">

              {/* Full Name */}
              <div>
                <label className="label">Full Name *</label>
                <input type="text" className="input" placeholder="Arjun Mehta" {...f('full_name')} />
              </div>

              {/* Email */}
              <div>
                <label className="label">Email *</label>
                <input type="email" className="input" placeholder="arjun@school.com" {...f('email')} />
              </div>

              {/* Password */}
              <div>
                <label className="label">Password *</label>
                <input type="password" className="input" placeholder="••••••••" {...f('password')} />
              </div>

              {/* Phone */}
              <div>
                <label className="label">Phone</label>
                <input type="tel" className="input" placeholder="+91 9876543210" {...f('phone')} />
              </div>

              {/* Roll Number */}
              <div>
                <label className="label">Roll Number *</label>
                <input type="text" className="input" placeholder="S001" {...f('roll_number')} />
              </div>

              {/* Department dropdown */}
              <div>
                <label className="label">Department</label>
                <select
                  className="input"
                  value={form.department}
                  onChange={e => {
                    set('department', e.target.value)
                    if (e.target.value !== 'BA') set('subject', '')
                  }}
                >
                  <option value="">Select department…</option>
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              {/* Subject — only for BA */}
              {form.department === 'BA' && (
                <div className="sm:col-span-2">
                  <label className="label">Subject <span className="text-red-500">*</span></label>
                  <select
                    className="input"
                    value={form.subject}
                    onChange={e => set('subject', e.target.value)}
                  >
                    <option value="">Select subject…</option>
                    {BA_SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              )}

              {/* Semester */}
              <div>
                <label className="label">Semester</label>
                <input type="number" className="input" placeholder="3" min="1" max="12" {...f('semester')} />
              </div>

              {/* Year */}
              <div>
                <label className="label">Year</label>
                <input type="number" className="input" placeholder="2" min="1" max="6" {...f('year')} />
              </div>

            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-3 text-base">
              {loading ? <LoadingSpinner size="sm" /> : 'Create Account'}
            </button>
          </form>
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-semibold">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
