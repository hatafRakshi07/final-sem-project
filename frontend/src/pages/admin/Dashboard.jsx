import React, { useEffect, useState } from 'react'
import { analyticsAPI } from '../../services/api'
import StatCard from '../../components/common/StatCard'
import { GraduationCap, Users, DollarSign, UserCheck, TrendingUp, Award, AlertCircle, ChevronRight } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
         BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, Area, AreaChart } from 'recharts'
import { Link } from 'react-router-dom'

const GRADE_COLORS = ['#6366f1','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4']

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 shadow-card-md text-xs">
      <p className="font-semibold text-slate-700 dark:text-slate-200 mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: <span className="font-bold">{p.value}</span></p>
      ))}
    </div>
  )
}

export default function AdminDashboard() {
  const [data, setData] = useState(null)
  const [trend, setTrend] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([analyticsAPI.dashboard(), analyticsAPI.attendanceTrend()])
      .then(([d, t]) => { setData(d.data); setTrend((t.data.trend || []).slice().reverse().slice(-14)) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="space-y-6 animate-page">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => <div key={i} className="h-28 skeleton rounded-2xl" />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="h-64 skeleton rounded-2xl" />
        <div className="h-64 skeleton rounded-2xl" />
      </div>
    </div>
  )

  const gradeData = Object.entries(data?.grade_distribution || {}).map(([grade, count]) => ({ grade, count }))
  const feeData = [
    { name: 'Collected', value: data?.paid_fee_amount || 0 },
    { name: 'Pending', value: data?.pending_fee_amount || 0 },
  ]
  const collectionRate = data?.total_fee_amount > 0
    ? Math.round((data.paid_fee_amount / data.total_fee_amount) * 100)
    : 0

  return (
    <div className="space-y-6 animate-page">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">Admin Dashboard</h1>
          <p className="page-subtitle">Complete school overview</p>
        </div>
        <span className="badge badge-indigo text-xs">Live</span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Students" value={data?.total_students ?? '—'} icon={GraduationCap} color="blue" subtitle="enrolled" />
        <StatCard title="Total Teachers" value={data?.total_teachers ?? '—'} icon={Users} color="purple" subtitle="active" />
        <StatCard title="Attendance Rate" value={`${data?.attendance_percentage ?? 0}%`} icon={UserCheck} color="green" subtitle="today's rate" trend={data?.attendance_percentage > 80 ? 5 : -3} />
        <StatCard title="Fee Collection" value={`₹${((data?.paid_fee_amount || 0)/1000).toFixed(0)}K`} icon={DollarSign} color="orange" subtitle={`${collectionRate}% collected`} trend={collectionRate > 70 ? 8 : -5} />
      </div>

      {/* Fee alert */}
      {collectionRate < 60 && (
        <div className="alert-warning">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Low fee collection ({collectionRate}%)</p>
            <p className="text-xs mt-0.5 opacity-80">₹{((data?.pending_fee_amount||0)/1000).toFixed(1)}K pending. <Link to="/admin/fees" className="underline font-medium">Manage fees →</Link></p>
          </div>
        </div>
      )}

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Attendance trend */}
        {trend.length > 0 && (
          <div className="card lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="section-title">Attendance Trend</h3>
                <p className="text-xs text-slate-400 mt-0.5">Last 14 days</p>
              </div>
              <Link to="/admin/analytics" className="text-xs text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1">
                Full report <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={trend}>
                <defs>
                  <linearGradient id="attGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.1)" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} tickFormatter={d => d?.slice(5)} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="total" stroke="#6366f1" strokeWidth={2.5} fill="url(#attGrad)" dot={false} name="Students" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Fee donut */}
        <div className="card">
          <div className="mb-4">
            <h3 className="section-title">Fee Collection</h3>
            <p className="text-xs text-slate-400 mt-0.5">{collectionRate}% of total</p>
          </div>
          <ResponsiveContainer width="100%" height={170}>
            <PieChart>
              <Pie data={feeData} cx="50%" cy="50%" innerRadius={52} outerRadius={75} dataKey="value" strokeWidth={2} stroke="transparent">
                <Cell fill="#6366f1" />
                <Cell fill="#e2e8f0" />
              </Pie>
              <Tooltip formatter={v => [`₹${v.toLocaleString()}`, '']} contentStyle={{ borderRadius:'12px', border:'none', boxShadow:'0 4px 20px rgba(0,0,0,0.1)', fontSize:'12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary-500" />Collected</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700" />Pending</span>
          </div>
        </div>
      </div>

      {/* Grade distribution */}
      {gradeData.length > 0 && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="section-title">Grade Distribution</h3>
              <p className="text-xs text-slate-400 mt-0.5">Student performance overview</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={gradeData} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.1)" vertical={false} />
              <XAxis dataKey="grade" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[8, 8, 0, 0]} name="Students">
                {gradeData.map((_, i) => <Cell key={i} fill={GRADE_COLORS[i % GRADE_COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Quick links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Manage Students', to: '/admin/students', color: 'text-primary-600', bg: 'bg-primary-50 dark:bg-primary-500/10', border: 'border-primary-200 dark:border-primary-500/20' },
          { label: 'Manage Teachers', to: '/admin/teachers', color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-500/10', border: 'border-violet-200 dark:border-violet-500/20' },
          { label: 'Fee Reports', to: '/admin/fees', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-500/10', border: 'border-emerald-200 dark:border-emerald-500/20' },
          { label: 'Full Analytics', to: '/admin/analytics', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-500/10', border: 'border-amber-200 dark:border-amber-500/20' },
        ].map(({ label, to, color, bg, border }) => (
          <Link key={to} to={to} className={`${bg} ${border} border rounded-2xl p-4 flex items-center justify-between hover:shadow-card-md transition-all hover:-translate-y-0.5`}>
            <span className={`text-sm font-semibold ${color}`}>{label}</span>
            <ChevronRight className={`h-4 w-4 ${color}`} />
          </Link>
        ))}
      </div>
    </div>
  )
}
