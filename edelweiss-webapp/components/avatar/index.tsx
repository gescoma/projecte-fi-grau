import styles from './avatar.module.css'

export function Avatar ({children}) {
  return (
    <div className={styles.Avatar}>
      <img className={styles.Avatar} src="https://randomuser.me/api/portraits/men/1.jpg"/>
    </div>
  )  
}


  
