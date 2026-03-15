import type { ReactNode } from 'react'
import { Button } from './Button'

interface EmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  icon?: ReactNode
}

export const EmptyState = ({ title, description, actionLabel, onAction, icon }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center glass rounded-3xl">
      {icon && <div className="mb-4 text-primary opacity-50">{icon}</div>}
      <h3 className="text-xl font-heading font-bold text-text-main mb-2">{title}</h3>
      <p className="text-text-muted text-sm max-w-xs mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
