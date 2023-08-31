import Link from "next/link"
import styles from './cancelled-payment.module.scss'
const CancelledPaymentPage = () => {
    return (
        <div className={styles.container}>
            <h1>Your payment was&nbsp;cancelled</h1>
            <p>You have not been charged</p>
            <div>
                <Link href="/">Go back to the homepage</Link>

            </div>

        </div>
    )
}
export default CancelledPaymentPage