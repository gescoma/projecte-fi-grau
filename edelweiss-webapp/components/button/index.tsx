import styles from "./button.module.css"
export function Button ({children, isBoton}) {

  
  if (isBoton){
    return (     
      <button className={styles.button}>{children}</button>)
  }

  return(<a className={styles.button} href="menu.html">{children}</a>)
  
}