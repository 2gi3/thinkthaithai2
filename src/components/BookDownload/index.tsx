import { FaTimes } from 'react-icons/fa'
import styles from './BookDownload.module.scss'
import { FC, useState } from 'react'
import { BookDownloadProps } from '@/types'

const BookDownload: FC<BookDownloadProps> = ({
    onClose,
}) => {
    const [showAudioFiles, setShowAudioFiles] = useState(false);

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
                    onClick={() => setShowAudioFiles(!showAudioFiles)}>
                    {showAudioFiles ? 'Hide Audio Files' : 'Audio files'}
                </button>
            </div>
            {showAudioFiles && (
                <div className={styles.audioFilesList}>
                    <ul>
                        {Array.from({ length: 100 }, (_, i) => (
                            <li key={i + 1}>
                                <a href={`/audio/file_${i + 1}.mp3`} download>{`Audio File ${i + 1}`}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default BookDownload