import { AvatarMenu } from "@/components/dashboard/sidebar/avatarMenu"
import { Logo } from "@/components/logo"
import { Separator } from "@/components/utils/separator"
import { SidebarMenu } from "@/components/dashboard/sidebar/sidebarMenu"
import styles from "./sidebar.module.css"

export function SidebarLoading() {
  return (
    <aside className={styles.sidebar}>
      <Logo width={180} height={48} className={styles.logo} />
      <SidebarMenu />
      <Separator width={70} weight={3} />
      <AvatarMenu className={styles.avatar} menuDirection="up" />
    </aside>
  )
}
