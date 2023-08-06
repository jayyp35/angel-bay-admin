import styles from './Logo.module.scss';

function ABLogo({ fontSize = '' }) {
  return (
    <div className={styles.Label} style={{
      fontSize: fontSize ?? ''
    }}>
      Angel Bay
    </div>
  )
}

export default ABLogo