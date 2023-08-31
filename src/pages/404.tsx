import Link from "next/link"
import styles from './cancelled-payment/cancelled-payment.module.scss'
const Page404 = () => {
    return (
        <div className={styles.container}>
            <h1>This page doesn&apos;t exist</h1>
            <div>
                <Link href="/">Go back to the homepage</Link>

            </div>

        </div>
    )
}
export default Page404