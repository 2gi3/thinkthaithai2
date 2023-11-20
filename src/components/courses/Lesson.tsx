import { useState, useEffect, useRef } from 'react';
import { LessonProps } from "@/types";
import styles from '@/pages/courses/courses.module.scss';
import { formatParagraph } from '@/functions';

const Lesson = ({ lesson }: LessonProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [video, setVideo] = useState(lesson.videoURL)

    useEffect(() => {
        setVideo(lesson.videoURL)
    }, [lesson])

    useEffect(() => {
        const video = videoRef.current;

        if (video) {

            video.pause();
            video.src = lesson.videoURL;
            video.load();
            video.play();

        }

    }, [lesson]);


    return (
        <div className={styles.lesson}>
            <video ref={videoRef} controls>
                <source src={video} type="video/mp4" />
            </video>
            <h3>{lesson.title}</h3>
            {formatParagraph(lesson.header).map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
            ))}
            {formatParagraph(lesson.body).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
            {formatParagraph(lesson.footer).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}

        </div>

    )
}

export default Lesson