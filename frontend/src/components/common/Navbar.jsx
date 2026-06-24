import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { Bell, Moon, Sun, Menu, LogOut, ChevronDown, CheckCheck, CalendarCheck, BookOpen, GraduationCap, DollarSign, FileText, Megaphone, Info, X } from 'lucide-react'
import { useNotifications } from '../../context/NotificationContext'
import { useLocation } from 'react-router-dom'

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

const typeConfig = {
  attendance: { icon: CalendarCheck, bg: 'bg-emerald-100 dark:bg-emerald-900/40', color: 'text-emerald-600 dark:text-emerald-400' },
  assignment:  { icon: BookOpen,      bg: 'bg-blue-100 dark:bg-blue-900/40',    color: 'text-blue-600 dark:text-blue-400' },
  exam:        { icon: GraduationCap, bg: 'bg-red-100 dark:bg-red-900/40',      color: 'text-red-600 dark:text-red-400' },
  fee:         { icon: DollarSign,    bg: 'bg-amber-100 dark:bg-amber-900/40',  color: 'text-amber-600 dark:text-amber-400' },
  leave:       { icon: FileText,      bg: 'bg-purple-100 dark:bg-purple-900/40',color: 'text-purple-600 dark:text-purple-400' },
  notice:      { icon: Megaphone,     bg: 'bg-orange-100 dark:bg-orange-900/40',color: 'text-orange-600 dark:text-orange-400' },
  default:     { icon: Info,          bg: 'bg-slate-100 dark:bg-slate-700',     color: 'text-slate-500 dark:text-slate-400' },
}

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth()
  const { dark, toggle } = useTheme()
  const { notifications, unread, markRead, markAllRead } = useNotifications()
  const location = useLocation()
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)

  const grad = roleColors[user?.role] || 'from-primary-600 to-violet-600'
  const initials = user?.full_name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?'
  const pageLabel = routeLabels[location.pathname] || 'Page'

  const handleNotifClick = (n) => {
    if (!n.is_read) markRead(n.id)
  }

  return (
    <nav className="glass sticky top-0 z-40 h-14 px-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <button onClick={onMenuClick} className="btn-icon lg:hidden flex-shrink-0" aria-label="Menu">
          <Menu className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <h1 className="text-sm font-bold text-slate-900 dark:text-white truncate">{pageLabel}</h1>
          <p className="text-[11px] text-slate-400 hidden sm:block capitalize">{user?.role} • EduManage AI</p>
        </div>
      </div>

      <div className="flex items-center gap-1 flex-shrink-0">
        <button onClick={toggle} className="btn-icon" aria-label="Toggle theme">
          {dark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* Notifications dropdown */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(p => !p); setProfileOpen(false) }}
            className="btn-icon relative"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            {unread > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
                {unread > 9 ? '9+' : unread}
              </span>
            )}
          </button>

          {notifOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setNotifOpen(false)} />
              <div className="absolute right-0 mt-1 w-80 sm:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-card-lg border border-slate-200 dark:border-slate-700 z-20 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</h3>
                    {unread > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold">{unread}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {unread > 0 && (
                      <button
                        onClick={markAllRead}
                        className="flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400 font-medium px-2 py-1 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                      >
                        <CheckCheck className="h-3.5 w-3.5" />
                        Mark all read
                      </button>
                    )}
                    <button onClick={() => setNotifOpen(false)} className="btn-icon w-6 h-6">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="max-h-[420px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/50">
                  {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-3">
                        <Bell className="h-6 w-6 text-slate-400" />
                      </div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">All caught up!</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">No notifications yet.</p>
                    </div>
                  ) : (
                    notifications.map(n => {
                      const cfg = typeConfig[n.type] || typeConfig.default
                      const Icon = cfg.icon
                      return (
                        <button
                          key={n.id}
                          onClick={() => handleNotifClick(n)}
                          className={`w-full text-left flex items-start gap-3 px-4 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50 ${!n.is_read ? 'bg-primary-50/40 dark:bg-primary-900/10' : ''}`}
                        >
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${cfg.bg}`}>
                            <Icon className={`h-4 w-4 ${cfg.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p className={`text-sm font-medium leading-snug ${!n.is_read ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                                {n.title}
                              </p>
                              {!n.is_read && (
                                <span className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0 mt-1.5" />
                              )}
                            </div>
                            {n.message && (
                              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 line-clamp-2">{n.message}</p>
                            )}
                            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">{timeAgo(n.created_at)}</p>
                          </div>
                        </button>
                      )
                    })
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* User menu */}
        <div className="relative ml-1">
          <button
            onClick={() => { setProfileOpen(p => !p); setNotifOpen(false) }}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${grad} flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0`}>
              {initials}
            </div>
            <p className="hidden sm:block text-xs font-semibold text-slate-800 dark:text-slate-100 truncate max-w-[100px]">{user?.full_name}</p>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400 hidden sm:block" />
          </button>

          {profileOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
              <div className="absolute right-0 mt-1 w-52 bg-white dark:bg-slate-800 rounded-2xl shadow-card-lg border border-slate-200 dark:border-slate-700 z-20 overflow-hidden">
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
