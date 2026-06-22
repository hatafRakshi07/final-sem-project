import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { studentAPI, assignmentAPI, attendanceAPI, examAPI, leaveAPI } from '../../services/api'
import StatCard from '../../components/common/StatCard'
import { Link } from 'react-router-dom'
import {
  GraduationCap, ClipboardList, UserCheck, BarChart3,
  CheckCircle, Clock, FileText, ChevronRight, FlaskConical,
  BookOpen, Users, Bell, TrendingUp, Award
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts'

const QUICK_ACTIONS = [
  { label: 'Mark Attendance', to: '/teacher/attendance', icon: UserCheck, bg: 'bg-emerald-50 dark:bg-emerald-900/20', iconBg: 'bg-emerald-100 dark:bg-emerald-900/40', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-100 dark:border-emerald-900/40' },
  { label: 'Create Assignment', to: '/teacher/assignments', icon: ClipboardList, bg: 'bg-blue-50 dark:bg-blue-900/20', iconBg: 'bg-blue-100 dark:bg-blue-900/40', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-100 dark:border-blue-900/40' },
  { label: 'Add Marks', to: '/teacher/marks', icon: BookOpen, bg: 'bg-purple-50 dark:bg-purple-900/20', iconBg: 'bg-purple-100 dark:bg-purple-900/40', text: 'text-purple-700 dark:text-purple-300', border: 'border-purple-100 dark:border-purple-900/40' },
  { label: 'View Analytics', to: '/teacher/analytics', icon: BarChart3, bg: 'bg-amber-50 dark:bg-amber-900/20', iconBg: 'bg-amber-100 dark:bg-amber-900/40', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-100 dark:border-amber-900/40' },
  { label: 'Leave Requests', to: '/teacher/leaves', icon: FileText, bg: 'bg-rose-50 dark:bg-rose-900/20', iconBg: 'bg-rose-100 dark:bg-rose-900/40', text: 'text-rose-700 dark:text-rose-300', border: 'border-rose-100 dark:border-rose-900/40' },
  { label: 'Practicals', to: '/teacher/practicals', icon: FlaskConical, bg: 'bg-teal-50 dark:bg-teal-900/20', iconBg: 'bg-teal-100 dark:bg-teal-900/40', text: 'text-teal-700 dark:text-teal-300', border: 'border-teal-100 dark:border-teal-900/40' },
]

export default function TeacherDashboard() {
  const { user } = useAuth()
  const [students, setStudents] = useState([])
  const [assignments, setAssignments] = useState([])
  const [attOverview, setAttOverview] = useState(null)
  const [pendingLeaves, setPendingLeaves] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.allSettled([
      studentAPI.list({ limit: 200 }),
      assignmentAPI.list(),
      attendanceAPI.overview(),
      leaveAPI.allLeaves(),
    ]).then(([s, a, att, leaves]) => {
      setStudents(s.value?.data?.students || [])
      setAssignments(a.value?.data?.assignments || [])
      setAttOverview(att.value?.data || null)
      setPendingLeaves((leaves.value?.data?.leaves || []).filter(l => l.status === 'pending').length)
    }).finally(() => setLoading(false))
  }, [])

  const now = new Date()
  const greeting = now.getHours() < 12 ? 'Good Morning' : now.getHours() < 17 ? 'Good Afternoon' : 'Good Evening'
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })

  const pendingGrade = assignments.filter(a => a.submission_count > 0).length
  const myAssignments = assignments.filter(a => a.teacher_id === user?.id || !a.teacher_id)

  // Attendance chart — split students into Present / Absent / Late
  const attChartData = [
    { label: 'Present', count: attOverview?.present || 0, color: '#10b981' },
    { label: 'Absent', count: attOverview?.absent || 0, color: '#ef4444' },
    { label: 'Late', count: attOverview?.late || 0, color: '#f59e0b' },
  ]

  const Skeleton = () => (
    <div className="animate-pulse space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => <div key={i} className="h-24 skeleton rounded-2xl" />)}
      </div>
      <div className="h-40 skeleton rounded-2xl" />
    </div>
  )

  if (loading) return <div className="animate-page"><Skeleton /></div>

  return (
    <div className="space-y-6 animate-page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">👋</span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {greeting}, <span className="text-gradient">{user?.full_name?.split(' ')[0]}</span>
            </h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> {dateStr}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {pendingLeaves > 0 && (
            <Link to="/teacher/leaves" className="flex items-center gap-2 px-3 py-2 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 rounded-xl text-xs font-semibold border border-rose-100 dark:border-rose-900/40 hover:bg-rose-100 transition-colors">
              <Bell className="h-3.5 w-3.5" />
              {pendingLeaves} leave{pendingLeaves > 1 ? 's' : ''} pending
            </Link>
          )}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard title="Total Students" value={students.length} icon={GraduationCap} color="blue" subtitle="enrolled" />
        <StatCard title="My Assignments" value={myAssignments.length} icon={ClipboardList} color="purple" subtitle="created" />
        <StatCard title="Present Today" value={attOverview?.present || 0} icon={UserCheck} color="green" subtitle={`of ${students.length}`} />
        <StatCard title="To Grade" value={pendingGrade} icon={Award} color="orange" subtitle="submissions" />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Attendance overview chart */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Today's Attendance Overview</h3>
            <Link to="/teacher/attendance" className="text-xs text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
              Mark attendance <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          {attOverview ? (
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={attChartData} barSize={48}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {attChartData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-40 text-slate-400 text-sm">
              No attendance data yet — <Link to="/teacher/attendance" className="text-primary-600 hover:underline ml-1">mark now</Link>
            </div>
          )}
        </div>

        {/* Recent assignments */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Recent Assignments</h3>
            <Link to="/teacher/assignments" className="text-xs text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
              View all <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          {myAssignments.length === 0 ? (
            <div className="text-center py-8">
              <ClipboardList className="h-8 w-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
              <p className="text-slate-400 text-sm">No assignments yet</p>
              <Link to="/teacher/assignments" className="text-xs text-primary-600 hover:underline mt-1 inline-block">Create one →</Link>
            </div>
          ) : (
            <div className="space-y-2">
              {myAssignments.slice(0, 5).map(a => {
                const isOverdue = new Date(a.deadline) < new Date()
                return (
                  <div key={a.id} className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${isOverdue ? 'bg-red-400' : 'bg-emerald-400'}`} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{a.title}</p>
                      <p className={`text-xs mt-0.5 ${isOverdue ? 'text-red-500' : 'text-slate-400'}`}>
                        {isOverdue ? 'Overdue' : 'Due'}: {new Date(a.deadline).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                      </p>
                    </div>
                    {a.submission_count > 0 && (
                      <span className="text-[10px] bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 px-1.5 py-0.5 rounded-full font-medium flex-shrink-0">
                        {a.submission_count}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {QUICK_ACTIONS.map(({ label, to, icon: Icon, bg, iconBg, text, border }) => (
            <Link
              key={to}
              to={to}
              className={`p-4 ${bg} rounded-2xl text-center hover:scale-[1.04] active:scale-95 transition-all duration-200 border ${border} group`}
            >
              <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                <Icon className={`h-5 w-5 ${text}`} />
              </div>
              <p className={`font-semibold text-xs ${text} leading-tight`}>{label}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Students preview */}
      {students.length > 0 && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Users className="h-4 w-4 text-primary-500" /> Student Roll
            </h3>
            <Link to="/teacher/students" className="text-xs text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
              View all ({students.length}) <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {students.slice(0, 6).map(s => (
              <div key={s.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-xs font-bold text-primary-700 dark:text-primary-300 flex-shrink-0">
                  {s.full_name?.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{s.full_name}</p>
                  <p className="text-xs text-slate-400">{s.roll_number} · {s.class_name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
