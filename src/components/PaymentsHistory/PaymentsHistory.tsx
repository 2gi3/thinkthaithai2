import { Payment } from '@/types'
import styles from './paymentsHistory.module.scss'
import { useState, useEffect } from 'react'
import { FaAngleRight, FaAngleDown } from "react-icons/fa";
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const PaymentsHistory = () => {
    const [history, setHistory] = useState<Payment[]>()
    const [expandedItems, setExpandedItems] = useState<boolean[]>([])
    const studentData = useSelector(
        (state: RootState) => state.student
    );

    useEffect(() => {
        const getHistory = async () => {
            try {
                const res = await fetch(`api/payment?searchBy=id&value=${studentData._id}`).then((res) => res.json());
                console.log(res.payments);
                setHistory(res.payments);
                // Initialize the expanded state array with the same length as history and set all items to false (not expanded).
                setExpandedItems(new Array(res.payments.length).fill(false));
            } catch (error) {
                console.error(error);
            }
        };

        getHistory();
    }, [studentData])

    const toggleExpanded = (index: number) => {
        const newExpandedItems = [...expandedItems];
        newExpandedItems[index] = !newExpandedItems[index];
        setExpandedItems(newExpandedItems);
    }

    if (history?.length === 0) {
        return (
            <div>
                <p>It seems like you have never made a purchase, if that is not correct please contact the teacher.</p>
            </div>)
    }

    return (
        <div className={styles.container}>
            {history && history.map((payment: Payment, i: number) => (
                <div key={`${i}-${payment.dateOfPurchase}`} className={styles.paymentContainer}>
                    <div className={styles.payment}>
                        <h3>{payment.amountPaid}</h3>
                        <p>{moment(payment.dateOfPurchase).fromNow()}</p>
                        <p className={styles.name}>{payment.payeeName}</p>
                        <button
                            className={expandedItems[i] ? styles.buttonClosed : styles.buttonOpened}
                            onClick={() => toggleExpanded(i)}
                        >
                            <FaAngleRight />
                        </button>
                    </div>
                    <div className={
                        expandedItems[i] ? styles.detailsOpened :
                            styles.detailsClosed} >
                        <p>Currency: <span>{payment.currency}</span></p>
                        <p>Date of Payment: <span>{moment(payment.dateOfPurchase).format('YYYY-MM-DD HH:mm:ss')}</span></p>
                        <p>Payee name: <span>{payment.payeeName}</span></p>
                        <p>Payee Email: <span>{payment.payeeEmail}</span></p>
                    </div>
                </div>

            ))}
        </div>
    )
}

export default PaymentsHistory;
