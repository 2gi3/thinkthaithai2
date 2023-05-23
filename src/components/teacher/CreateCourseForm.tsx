import styles from './teacher.module.scss'
import { ICourse } from '@/types';
import { FormEvent, useState } from 'react';

const CreateCourseForm = () => {
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
            const response = await fetch('http://localhost:3000/api/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(courseData),
            });

            if (response.ok) {
                console.log('Course created successfully!');
                // Perform any desired actions after successful course creation
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
            <label htmlFor="title">Title</label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <label htmlFor="description">Description</label>
            <input
                type="text"
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
            <input
                type="text"
                id="prerequisites"
                value={prerequisites.join(',')}
                onChange={(e) => setPrerequisites(e.target.value.split(','))}
            />



            <label htmlFor="introduction">Introduction</label>
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
            <input
                type="text"
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
            <input
                type="text"
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
            <input
                type="text"
                id="footer"
                value={introduction.footer}
                onChange={(e) =>
                    setIntroduction((prevState) => ({
                        ...prevState,
                        footer: e.target.value,
                    }))
                }
            />





            <label htmlFor="lesson">Lessons</label>
            {lessons.map((intro, index) => (
                <div key={index}>
                    <label htmlFor={`title-${index}`}>Title</label>
                    <input
                        type="text"
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
                    <input
                        type="text"
                        id={`header-${index}`}
                        value={intro.header}
                        onChange={(e) => handleLessonsChange(index, 'header', e.target.value)}
                    />

                    <label htmlFor={`body-${index}`}>Body</label>
                    <input
                        type="text"
                        id={`body-${index}`}
                        value={intro.body}
                        onChange={(e) => handleLessonsChange(index, 'body', e.target.value)}
                    />

                    <label htmlFor={`footer-${index}`}>Footer</label>
                    <input
                        type="text"
                        id={`footer-${index}`}
                        value={intro.footer}
                        onChange={(e) => handleLessonsChange(index, 'footer', e.target.value)}
                    />

                    <button type="button" onClick={() => handleRemoveLesson(index)}>
                        Remove Lesson
                    </button>
                </div>
            ))}

            <button type="button" onClick={handleAddLesson}>
                Add Lesson
            </button>

            <button type="submit">Create Course</button>
        </form>
    );
};

export default CreateCourseForm;

