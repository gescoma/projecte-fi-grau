import { SidebarLink } from "../sidebarLink/sidebar"
import styles from "./menu.module.css"

export function SidebarMenu({ elements }: { elements: any }) {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.list}>
        {elements.map((element: any, index: number) => (
          <SidebarLink
            key={index}
            link={element.link}
            icon={element.icon}
            isActive={element.isActive}
            hasSubmenu={element.hasSubmenu || false}
            submenu={element.hasSubmenu ? element.submenu : []}
          >
            {element.children}
          </SidebarLink>
        ))}
      </ul>
    </nav>
  )
}
