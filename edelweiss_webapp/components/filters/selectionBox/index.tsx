import { Ref, forwardRef, useEffect, useRef } from "react"

function Checkbox({ indeterminate, ...rest }: any, ref: any) {
  const defaultRef = useRef()
  const resolvedRef = ref || defaultRef

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate
  }, [resolvedRef, indeterminate])

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  )
}

export const IndeterminateCheckbox = forwardRef(Checkbox)
