import { LessonProps } from "@/types"
import styles from '@/pages/courses/courses.module.scss'
import { useState, useEffect, useRef } from 'react'


const Lesson = ({ lesson }: LessonProps) => {
    // try useEffect to fix video change bug
    console.log(lesson.videoURL)
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
            <p>{lesson.header}</p>
            <p>{lesson.body}</p>
            <p>{lesson.footer}</p>
        </div>

    )
}

export default Lesson