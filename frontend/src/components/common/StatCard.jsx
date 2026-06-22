import React from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

const colorMap = {
  blue: {
    bg: 'bg-white dark:bg-gray-800',
    iconBg: 'bg-blue-500',
    iconShadow: 'shadow-blue-200 dark:shadow-blue-900/50',
    text: 'text-gray-900 dark:text-white',
    accent: 'text-blue-600 dark:text-blue-400',
    bar: 'bg-blue-500',
  },
  green: {
    bg: 'bg-white dark:bg-gray-800',
    iconBg: 'bg-emerald-500',
    iconShadow: 'shadow-emerald-200 dark:shadow-emerald-900/50',
    text: 'text-gray-900 dark:text-white',
    accent: 'text-emerald-600 dark:text-emerald-400',
    bar: 'bg-emerald-500',
  },
  red: {
    bg: 'bg-white dark:bg-gray-800',
    iconBg: 'bg-red-500',
    iconShadow: 'shadow-red-200 dark:shadow-red-900/50',
    text: 'text-gray-900 dark:text-white',
    accent: 'text-red-600 dark:text-red-400',
    bar: 'bg-red-500',
  },
  purple: {
    bg: 'bg-white dark:bg-gray-800',
    iconBg: 'bg-purple-500',
    iconShadow: 'shadow-purple-200 dark:shadow-purple-900/50',
    text: 'text-gray-900 dark:text-white',
    accent: 'text-purple-600 dark:text-purple-400',
    bar: 'bg-purple-500',
  },
  yellow: {
    bg: 'bg-white dark:bg-gray-800',
    iconBg: 'bg-amber-400',
    iconShadow: 'shadow-amber-200 dark:shadow-amber-900/50',
    text: 'text-gray-900 dark:text-white',
    accent: 'text-amber-600 dark:text-amber-400',
    bar: 'bg-amber-400',
  },
  orange: {
    bg: 'bg-white dark:bg-gray-800',
    iconBg: 'bg-orange-500',
    iconShadow: 'shadow-orange-200 dark:shadow-orange-900/50',
    text: 'text-gray-900 dark:text-white',
    accent: 'text-orange-600 dark:text-orange-400',
    bar: 'bg-orange-500',
  },
  teal: {
    bg: 'bg-white dark:bg-gray-800',
    iconBg: 'bg-teal-500',
    iconShadow: 'shadow-teal-200 dark:shadow-teal-900/50',
    text: 'text-gray-900 dark:text-white',
    accent: 'text-teal-600 dark:text-teal-400',
    bar: 'bg-teal-500',
  },
}

export default function StatCard({ title, value, icon: Icon, color = 'blue', subtitle, trend, trendLabel, onClick }) {
  const c = colorMap[color] || colorMap.blue
  const trendPositive = trend > 0
  const trendNeutral = trend === 0 || trend === undefined

  return (
    <div
      onClick={onClick}
      className={`${c.bg} rounded-2xl border border-slate-100 dark:border-slate-700/60 p-4 sm:p-5 shadow-card hover:shadow-card-hover transition-all duration-200 ${onClick ? 'cursor-pointer active:scale-[0.98]' : ''}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        {Icon && (
          <div className={`p-2.5 rounded-xl ${c.iconBg} shadow-md ${c.iconShadow} flex-shrink-0`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
        )}
        {!trendNeutral && (
          <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
            trendPositive
              ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
              : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
          }`}>
            {trendPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <p className={`text-2xl sm:text-3xl font-bold ${c.text} leading-none mb-1`}>{value}</p>
      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{title}</p>
      {subtitle && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{subtitle}</p>}
      {trendLabel && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{trendLabel}</p>}
    </div>
  )
}
