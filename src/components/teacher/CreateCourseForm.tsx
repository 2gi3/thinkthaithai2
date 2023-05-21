import styles from './teacher.module.scss'
import { ICourse } from '@/types';
import { FormEvent, useState } from 'react';

const CreateCourseForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [level, setLevel] = useState('');
    const [prerequisites, setPrerequisites] = useState<string[]>([]);
    const [introduction, setIntroduction] = useState<
        Array<{
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

    const handleIntroductionChange = (index: number, field: string, value: string) => {
        setIntroduction(prevIntroduction => {
            const updatedIntroduction = [...prevIntroduction];
            updatedIntroduction[index] = {
                ...updatedIntroduction[index],
                [field]: value,
            };
            return updatedIntroduction;
        });
    };

    const handleAddIntroduction = () => {
        setIntroduction(prevIntroduction => [
            ...prevIntroduction,
            {
                videoURL: '',
                header: '',
                body: '',
                footer: '',
            },
        ]);
    };

    const handleRemoveIntroduction = (index: number) => {
        setIntroduction(prevIntroduction => {
            const updatedIntroduction = [...prevIntroduction];
            updatedIntroduction.splice(index, 1);
            return updatedIntroduction;
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
            {introduction.map((intro, index) => (
                <div key={index}>
                    <label htmlFor={`videoURL-${index}`}>Video URL</label>
                    <input
                        type="text"
                        id={`videoURL-${index}`}
                        value={intro.videoURL}
                        onChange={(e) => handleIntroductionChange(index, 'videoURL', e.target.value)}
                    />

                    <label htmlFor={`header-${index}`}>Header</label>
                    <input
                        type="text"
                        id={`header-${index}`}
                        value={intro.header}
                        onChange={(e) => handleIntroductionChange(index, 'header', e.target.value)}
                    />

                    <label htmlFor={`body-${index}`}>Body</label>
                    <input
                        type="text"
                        id={`body-${index}`}
                        value={intro.body}
                        onChange={(e) => handleIntroductionChange(index, 'body', e.target.value)}
                    />

                    <label htmlFor={`footer-${index}`}>Footer</label>
                    <input
                        type="text"
                        id={`footer-${index}`}
                        value={intro.footer}
                        onChange={(e) => handleIntroductionChange(index, 'footer', e.target.value)}
                    />

                    <button type="button" onClick={() => handleRemoveIntroduction(index)}>
                        Remove Introduction
                    </button>
                </div>
            ))}

            <button type="button" onClick={handleAddIntroduction}>
                Add Introduction
            </button>

            <button type="submit">Create Course</button>
        </form>
    );
};

export default CreateCourseForm;

