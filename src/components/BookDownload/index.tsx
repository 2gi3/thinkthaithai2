import { FaTimes } from 'react-icons/fa'
import styles from './BookDownload.module.scss'
import { FC } from 'react'
import { BookDownloadProps } from '@/types'

const BookDownload: FC<BookDownloadProps> = ({
    onClose,
}) => {
    return (
        <div className={styles.BookDownloadContainer}>
            <button className={styles.closeButton}
                onClick={onClose}
            >
                <FaTimes />
            </button>
            <p>Download what you need</p>
            <div className={styles.downloadButtons}>
                <a className={'secondaryButton'} href="/pdf/Essential_Thai_Phrases_for_Travelers.pdf" download>
                    {/* <button className={'primaryButton'} type="button"> */}
                    {'Download book'}
                    {/* </button> */}
                </a>
                {/* <button className='secondaryButton'>Book</button> */}
                <button className='secondaryButton'
                    onClick={() => { console.log("audioFiles") }}>Audio files</button>
            </div>
        </div>
    )
}

export default BookDownload