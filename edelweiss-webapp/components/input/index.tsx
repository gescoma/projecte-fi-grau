import styles from './input.module.css'

export function Input ({children}) {
  
 
    return (
      
      <div className={styles.card}>
        <input className={styles.input} type="text" placeholder={children} ></input>
      </div>     
    )
  }