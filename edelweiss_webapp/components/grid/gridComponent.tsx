import { SidebarLayout } from "../sidebar/sidebar"
import { useState } from "react"

export function GridElement({
  children,
  item,
  expandable,
  sidebar: Sidebar,
}: {
  children: any
  item: any
  expandable: boolean
  sidebar: any
}) {
  const [openSidebar, setOpenSidebar] = useState(false)
  const handleClick = () => {
    if (expandable) {
      setOpenSidebar(!openSidebar)
    }
  }

  return (
    <article key={item.property.id}>
      {children}
      {openSidebar && (
        <SidebarLayout closeAction={handleClick}>
          <Sidebar data={item} />
        </SidebarLayout>
      )}
    </article>
  )
}
