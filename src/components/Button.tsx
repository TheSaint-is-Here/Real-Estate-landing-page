import type { ReactNode } from 'react'

function Button({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div>
      <button className={className}>
        {children}
      </button>
    </div>
  )
}

export default Button