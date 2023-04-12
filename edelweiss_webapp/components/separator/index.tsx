export function Separator({
  padding = 0.8,
  weight = 1,
  width = 100,
}: {
  padding?: number
  weight?: number
  width?: number
}) {
  return (
    <hr
      style={{
        margin: `${padding - 0.3}rem auto`,
        border: `${weight / 2}px solid var(--color-black-10)`,
        width: `${width}%`,
        borderRadius: `${width < 100 ? weight / 2 : 0}px`,
      }}
    />
  )
}
