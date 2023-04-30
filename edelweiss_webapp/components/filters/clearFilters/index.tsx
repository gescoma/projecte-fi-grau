import { ReactNode } from "react"

export function Button({
  children,
  inactive,
  onClick,
}: {
  children: ReactNode
  inactive: boolean
  onClick: () => void
}) {
  return (
    <button disabled={inactive} onClick={onClick}>
      {children}
    </button>
  )
}
