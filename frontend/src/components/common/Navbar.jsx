import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { Bell, Moon, Sun, Menu, Search, LogOut, ChevronDown } from 'lucide-react'
import { useNotifications } from '../../context/NotificationContext'
import { Link, useLocation } from 'react-router-dom'

const routeLabels = {
  '/student': 'Dashboard', '/student/attendance': 'Attendance', '/student/marks': 'Marks & Exams',
  '/student/assignments': 'Assignments', '/student/fees': 'Fees & Payments',
  '/student/timetable': 'Timetable', '/student/calendar': 'Calendar',
  '/student/leaves': 'Leave Applications', '/student/notices': 'Notices', '/student/ai-insights': 'AI Insights',
  '/teacher': 'Dashboard', '/teacher/attendance': 'Attendance', '/teacher/assignments': 'Assignments',
  '/teacher/marks': 'Marks', '/teacher/practicals': 'Practicals', '/teacher/leaves': 'Leave Requests',
  '/teacher/students': 'Students', '/teacher/notices': 'Notices', '/teacher/analytics': 'Analytics',
  '/admin': 'Dashboard', '/admin/students': 'Students', '/admin/teachers': 'Teachers',
  '/admin/fees': 'Fee Management', '/admin/timetable': 'Timetable',
  '/admin/analytics': 'Analytics', '/admin/notices': 'Notices',
  '/parent': 'Dashboard',
}

const roleColors = {
  student: 'from-primary-600 to-violet-600',
  teacher: 'from-emerald-600 to-teal-600',
  admin: 'from-rose-600 to-orange-600',
  parent: 'from-amber-500 to-orange-500',
}

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth()
  const { dark, toggle } = useTheme()
  const { unread } = useNotifications()
  const location = useLocation()
  const [profileOpen, setProfileOpen] = useState(false)

  const grad = roleColors[user?.role] || 'from-primary-600 to-violet-600'
  const initials = user?.full_name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?'
  const pageLabel = routeLabels[location.pathname] || 'Page'

  return (
    <nav className="glass sticky top-0 z-40 h-14 px-4 flex items-center justify-between gap-4">
      {/* Left */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          className="btn-icon lg:hidden flex-shrink-0"
          aria-label="Menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <h1 className="text-sm font-bold text-slate-900 dark:text-white truncate">{pageLabel}</h1>
          <p className="text-[11px] text-slate-400 hidden sm:block capitalize">{user?.role} • EduManage AI</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {/* Theme */}
        <button onClick={toggle} className="btn-icon" aria-label="Toggle theme">
          {dark
            ? <Sun className="h-4 w-4 text-amber-400" />
            : <Moon className="h-4 w-4" />}
        </button>

        {/* Notifications */}
        <Link
          to={`/${user?.role}`}
          className="btn-icon relative"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          {unread > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
              {unread > 9 ? '9+' : unread}
            </span>
          )}
        </Link>

        {/* User menu */}
        <div className="relative ml-1">
          <button
            onClick={() => setProfileOpen(p => !p)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
          >
            <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${grad} flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0`}>
              {initials}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 leading-none truncate max-w-[100px]">{user?.full_name}</p>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400 hidden sm:block" />
          </button>

          {profileOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
              <div className="absolute right-0 mt-1 w-52 bg-white dark:bg-slate-800 rounded-2xl shadow-card-lg border border-slate-200 dark:border-slate-700 z-20 overflow-hidden animate-scale-in">
                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user?.full_name}</p>
                  <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                  <span className="inline-flex items-center mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary-50 dark:bg-primary-500/15 text-primary-700 dark:text-primary-400 capitalize">{user?.role}</span>
                </div>
                <div className="p-1.5">
                  <button
                    onClick={() => { logout(); setProfileOpen(false) }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
