import { databaseStudent } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// The state is updated using localStorage through a useEffect in the LayOut component

const initialState: databaseStudent = {
    email: '',
    emailVerified: null,
    image: '',
    name: '',
    paidLessons: 0,
    startedCourses: {},
    _id: '',
};

export const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        updateStudent: (state, action: PayloadAction<databaseStudent>) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { updateStudent } = studentSlice.actions;

export default studentSlice.reducer;
