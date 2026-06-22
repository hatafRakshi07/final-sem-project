import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  LayoutDashboard, CalendarCheck, FileText, BookOpen, CreditCard,
  Calendar, CalendarDays, Bell, Sparkles, Users, GraduationCap,
  ClipboardList, BarChart3, UserCheck, FlaskConical, BookMarked,
  DollarSign, LogOut, X, ChevronRight, School
} from 'lucide-react'

const NAV = {
  student: [
    { group: 'Main',
      items: [
        { to: '/student', label: 'Dashboard', icon: LayoutDashboard, end: true },
        { to: '/student/attendance', label: 'Attendance', icon: CalendarCheck },
        { to: '/student/marks', label: 'Marks & Exams', icon: BookMarked },
        { to: '/student/assignments', label: 'Assignments', icon: BookOpen },
        { to: '/student/fees', label: 'Fees & Payments', icon: CreditCard },
      ],
    },
    { group: 'Academic',
      items: [
        { to: '/student/timetable', label: 'Timetable', icon: Calendar },
        { to: '/student/calendar', label: 'Calendar', icon: CalendarDays },
        { to: '/student/leaves', label: 'Leave Applications', icon: FileText },
      ],
    },
    { group: 'More',
      items: [
        { to: '/student/notices', label: 'Notices', icon: Bell },
        { to: '/student/ai-insights', label: 'AI Insights', icon: Sparkles },
      ],
    },
  ],
  teacher: [
    { group: 'Main',
      items: [
        { to: '/teacher', label: 'Dashboard', icon: LayoutDashboard, end: true },
        { to: '/teacher/attendance', label: 'Attendance', icon: UserCheck },
        { to: '/teacher/assignments', label: 'Assignments', icon: ClipboardList },
        { to: '/teacher/marks', label: 'Marks', icon: BookMarked },
        { to: '/teacher/practicals', label: 'Practicals', icon: FlaskConical },
      ],
    },
    { group: 'Management',
      items: [
        { to: '/teacher/leaves', label: 'Leave Requests', icon: FileText },
        { to: '/teacher/students', label: 'Students', icon: GraduationCap },
        { to: '/teacher/notices', label: 'Notices', icon: Bell },
        { to: '/teacher/analytics', label: 'Analytics', icon: BarChart3 },
      ],
    },
  ],
  admin: [
    { group: 'Main',
      items: [
        { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
        { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
      ],
    },
    { group: 'Management',
      items: [
        { to: '/admin/students', label: 'Students', icon: GraduationCap },
        { to: '/admin/teachers', label: 'Teachers', icon: Users },
        { to: '/admin/fees', label: 'Fee Management', icon: DollarSign },
        { to: '/admin/timetable', label: 'Timetable', icon: Calendar },
        { to: '/admin/notices', label: 'Notices', icon: Bell },
      ],
    },
  ],
  parent: [
    { group: 'Main',
      items: [
        { to: '/parent', label: 'Dashboard', icon: LayoutDashboard, end: true },
      ],
    },
  ],
}

const roleGradient = {
  student: 'from-primary-600 to-violet-600',
  teacher: 'from-emerald-600 to-teal-600',
  admin:   'from-rose-600 to-orange-600',
  parent:  'from-amber-500 to-orange-500',
}

const roleLabel = {
  student: 'Student Portal',
  teacher: 'Teacher Portal',
  admin:   'Admin Portal',
  parent:  'Parent Portal',
}

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const groups = NAV[user?.role] || []
  const grad = roleGradient[user?.role] || 'from-primary-600 to-violet-600'
  const initials = user?.full_name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?'

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <>
      {/* Mobile backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      <aside className={`
        fixed left-0 top-0 h-full w-60 z-50
        bg-slate-950 border-r border-slate-800/60
        flex flex-col transform transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Logo */}
        <div className="px-5 py-5 flex items-center justify-between flex-shrink-0 border-b border-slate-800/60">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center shadow-lg flex-shrink-0`}>
              <School className="h-4.5 w-4.5 text-white" style={{ height: '1.1rem', width: '1.1rem' }} />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-none">EduManage AI</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{roleLabel[user?.role] || 'Portal'}</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto no-scrollbar py-4 px-3 space-y-5">
          {groups.map(({ group, items }) => (
            <div key={group}>
              <p className="px-3 mb-1.5 text-[10px] font-semibold text-slate-600 uppercase tracking-widest">{group}</p>
              <div className="space-y-0.5">
                {items.map(({ to, label, icon: Icon, end }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    onClick={onClose}
                    className={({ isActive }) =>
                      isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-200'}`}>
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="flex-1 truncate">{label}</span>
                        {isActive && <ChevronRight className="h-3.5 w-3.5 opacity-70 flex-shrink-0" />}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="flex-shrink-0 border-t border-slate-800/60 p-3 space-y-1">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-900/60">
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${grad} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate leading-none">{user?.full_name}</p>
              <p className="text-[10px] text-slate-500 truncate mt-0.5">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-800 hover:text-red-400 transition-all duration-150 group"
          >
            <LogOut className="h-4 w-4 group-hover:text-red-400" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  )
}
