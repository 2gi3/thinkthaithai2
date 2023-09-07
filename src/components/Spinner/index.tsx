import { SpinnerProps } from '@/types'
import styles from './Spinner.module.scss'

const Spinner: React.FC<SpinnerProps> = ({ diameter }) => {
  const spinnerDiameter = {
    width: `${diameter}px`,
    height: `${diameter}px`,
  }

  return (
    <span className={styles.container} style={spinnerDiameter}>

    </span>
  )

}
export default Spinner