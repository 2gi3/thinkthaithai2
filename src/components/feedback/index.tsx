import { useState, useEffect } from 'react';
import { DatabaseFeedback } from '@/types';
import styles from './feedback.module.scss';
import Image from 'next/image';

const Feedback = ({ feedback }: { feedback: DatabaseFeedback }) => {
  const [isOverflow, setIsOverflow] = useState(false);
  const [height, setHeight] = useState('100px')

  useEffect(() => {
    const paragraphElement = document.getElementById(`feedback-body-${feedback._id}`);
    if (paragraphElement) {

      setIsOverflow(paragraphElement.scrollHeight > paragraphElement.clientHeight);

    }

  }, [feedback._id]);

  return (
    <div key={feedback._id} style={{ display: 'flex', flexDirection: 'column', paddingRight: 24, paddingLeft: 24 }}>
      <div className={styles.feedback}>
        {feedback.imageURL && (
          <div>
            <Image src={feedback.imageURL} height={48} width={48} alt={feedback.name} />
          </div>
        )}
        <div>
          <div className={styles.credientials}>
            <p>
              {feedback.name}
              {/* , <span>{feedback.job}</span> */}
            </p>
            <p>{feedback.job}</p>
            <p>{feedback.location}</p>
          </div>
          <h4>{feedback.title}</h4>
          <p id={`feedback-body-${feedback._id}`}
          // style={{ height: height }}
          > jadhfakjd fkjsa fkja fhdsa fkja djasd fkjsad kjd kfhsa fdasd fsadh fkajs fkjsahd fkjshd fkjad kffkjahds flkj fkhdsa fkjhds fjsahd flk flkajs fkjdsa fkjsa vflkjsa f
            {feedback.body}
            123 jadhfakjd fkjsa fkja fhdsa fkja djasd fkjsad kjd kfhsa fdasd fsadh fkajs fkjsahd fkjshd fkjad kffkjahds flkj fkhdsa fkjhds fjsahd flk flkajs fkjdsa fkjsa vflkjsa f

          </p>
        </div>
      </div>
      {/* {isOverflow && <button className="secondaryButton" style={{
        width: 'maxContent',
        marginLeft: 'auto',
        marginTop: '-24px',
        padding: '6px 12px',
        border: 'none'
      }} onClick={() => {
        height === 'max-content' ? setHeight('88px') : setHeight('max-content')
      }}>{height === 'max-content' ? 'show less' : '...more'} </button>} */}
    </div>
  );
};

export default Feedback;
