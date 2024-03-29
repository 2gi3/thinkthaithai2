import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { ICourse } from '@/types';
import Alert from '../Alert/Alert';
import styles from './teacher.module.scss';

const CreateCourseForm = () => {
    const router = useRouter()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [level, setLevel] = useState('');
    const [prerequisites, setPrerequisites] = useState<string[]>([]);
    const [introduction, setIntroduction] = useState({
        videoURL: '',
        header: '',
        body: '',
        footer: '',
    })
    const [courseCreated, setCourseCreated] = useState(false)

    const [lessons, setLessons] = useState<
        Array<{
            title: string;
            videoURL: string;
            header: string;
            body: string;
            footer: string;
        }>
    >([]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const courseData: ICourse = {
            title,
            description,
            status,
            level,
            prerequisites,
            introduction,
            lessons,
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASIC_URL}/api/courses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(courseData),
            });

            if (response.ok) {

                console.log('Course created successfully!');
                setCourseCreated(true)

            } else {

                console.error('Error creating course');

            }
        } catch (error) {

            console.error(error);

        }
    };

    const handleLessonsChange = (index: number, field: string, value: string) => {
        setLessons(prevLessons => {
            const updatedLessons = [...prevLessons];
            updatedLessons[index] = {
                ...updatedLessons[index],
                [field]: value,
            };
            return updatedLessons;
        });
    };

    const handleAddLesson = () => {
        setLessons(prevLessons => [
            ...prevLessons,
            {
                title: '',
                videoURL: '',
                header: '',
                body: '',
                footer: '',
            },
        ]);
    };

    const handleRemoveLesson = (index: number) => {
        setLessons(prevLessons => {
            const updatedLessons = [...prevLessons];
            updatedLessons.splice(index, 1);
            return updatedLessons;
        });
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.section}>
                <h2>Course Informations:</h2>
                <label htmlFor="title">Title</label>
                <textarea
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <label htmlFor="status">Status</label>
                <input
                    type="text"
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                />

                <label htmlFor="level">Level</label>
                <input
                    type="text"
                    id="level"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    required
                />

                <label htmlFor="prerequisites">Prerequisites</label>
                <textarea
                    id="prerequisites"
                    value={prerequisites.join(',')}
                    onChange={(e) => setPrerequisites(e.target.value.split(','))}
                />

            </div>
            <div className={styles.section}>
                <h2>Introduction Page:</h2>
                {/* <label htmlFor="introduction">Introduction</label> */}
                <label htmlFor="videoURL">Video URL</label>
                <input
                    type="text"
                    id="videoURL"
                    value={introduction.videoURL}
                    onChange={(e) =>
                        setIntroduction((prevState) => ({
                            ...prevState,
                            videoURL: e.target.value,
                        }))
                    }
                />

                <label htmlFor="header">Header</label>
                <textarea
                    id="header"
                    value={introduction.header}
                    onChange={(e) =>
                        setIntroduction((prevState) => ({
                            ...prevState,
                            header: e.target.value,
                        }))
                    }
                />

                <label htmlFor="body">Body</label>
                <textarea
                    id="body"
                    value={introduction.body}
                    onChange={(e) =>
                        setIntroduction((prevState) => ({
                            ...prevState,
                            body: e.target.value,
                        }))
                    }
                />

                <label htmlFor="footer">Footer</label>
                <textarea
                    id="footer"
                    value={introduction.footer}
                    onChange={(e) =>
                        setIntroduction((prevState) => ({
                            ...prevState,
                            footer: e.target.value,
                        }))
                    }
                />
            </div>





            <label htmlFor="lesson">Lessons</label>
            {lessons.map((intro, index) => (
                <div className={styles.section} key={index}>
                    <label htmlFor={`title-${index}`}>Title</label>
                    <textarea
                        id={`title-${index}`}
                        value={intro.title}
                        onChange={(e) => handleLessonsChange(index, 'title', e.target.value)}
                    />

                    <label htmlFor={`videoURL-${index}`}>Video URL</label>
                    <input
                        type="text"
                        id={`videoURL-${index}`}
                        value={intro.videoURL}
                        onChange={(e) => handleLessonsChange(index, 'videoURL', e.target.value)}
                    />

                    <label htmlFor={`header-${index}`}>Header</label>
                    <textarea
                        id={`header-${index}`}
                        value={intro.header}
                        onChange={(e) => handleLessonsChange(index, 'header', e.target.value)}
                    />

                    <label htmlFor={`body-${index}`}>Body</label>
                    <textarea
                        id={`body-${index}`}
                        value={intro.body}
                        onChange={(e) => handleLessonsChange(index, 'body', e.target.value)}
                    />

                    <label htmlFor={`footer-${index}`}>Footer</label>
                    <textarea
                        id={`footer-${index}`}
                        value={intro.footer}
                        onChange={(e) => handleLessonsChange(index, 'footer', e.target.value)}
                    />

                    <button className={styles.removeLesson} type="button" onClick={() => handleRemoveLesson(index)}>
                        Remove Lesson
                    </button>
                </div>
            ))}

            <button type="button" onClick={handleAddLesson}>
                Add Lesson
            </button>

            <button className={styles.createCourseButton} type="submit">Create Course</button>
            {courseCreated && (
                <Alert
                    heading="Your new course was created successfully!"
                    message="Please wait 3 minutes and then refresh your browser to see the new course in the 'free courses page'"
                    onClose={() => {
                        setCourseCreated(false);
                        router.push('/courses');
                    }}
                />
            )}
        </form>
    );
};

export default CreateCourseForm;

