import { AvatarMenu } from "../avatarMenu"
import { Logo } from "@/components/logo"
import { Separator } from "../separator"
import { SidebarMenu } from "@/components/sidebarMenu"
import styles from "./sidebar.module.css"

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <Logo width={180} height={48} className={styles.logo} />
      <SidebarMenu />
      <Separator width={70} weight={3} />
      <AvatarMenu className={styles.avatar} menuDirection="up" />
    </aside>
  )
}
