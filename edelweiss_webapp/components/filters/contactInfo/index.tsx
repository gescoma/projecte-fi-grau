import { FiMail, FiPhone } from "react-icons/fi"

import styles from "./contactInfo.module.css"

export function ContactInfo({
  phone,
  email,
  size = "normal",
  ...props
}: {
  phone: string
  email: string
  size?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={styles.group} {...props}>
      {phone && (
        <a href={`tel:${phone.replaceAll(" ", "")}`}>
          <FiPhone />
          {phone}
        </a>
      )}
      {email && (
        <a href={`mailto:${email}`}>
          <FiMail />
          {email}
        </a>
      )}
    </div>
  )
}
