import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface Course {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  status: string;
}

interface CoursesState {
  items: Course[];
  loading: boolean;
  error: string | null;
}

const initialState: CoursesState = {
  items: [],
  loading: false,
  error: null,
};

// Simulated campus/education course data
const simulatedCourses: Course[] = [
  {
    id: 1,
    title: 'Web Development Bootcamp',
    description: 'Master HTML, CSS, JavaScript and React for modern web development.',
    thumbnail: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&w=400&q=60',
    status: 'Popular',
  },
  {
    id: 2,
    title: 'Data Science & Analytics',
    description: 'Learn Python, data analysis, and machine learning fundamentals.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=60',
    status: 'Active',
  },
  {
    id: 3,
    title: 'Mobile App Development',
    description: 'Build iOS and Android apps using React Native and Flutter.',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=60',
    status: 'Popular',
  },
  {
    id: 4,
    title: 'UI/UX Design Masterclass',
    description: 'Create stunning user interfaces and exceptional user experiences.',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=60',
    status: 'Active',
  },
  {
    id: 5,
    title: 'Cloud Computing Essentials',
    description: 'Master AWS, Azure, and cloud architecture best practices.',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=60',
    status: 'Active',
  },
  {
    id: 6,
    title: 'Cybersecurity Fundamentals',
    description: 'Protect systems and data with essential security practices.',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=60',
    status: 'Popular',
  },
  {
    id: 7,
    title: 'Artificial Intelligence Basics',
    description: 'Introduction to AI, neural networks, and deep learning concepts.',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&q=60',
    status: 'Active',
  },
  {
    id: 8,
    title: 'Blockchain & Cryptocurrency',
    description: 'Understand blockchain technology and digital currency systems.',
    thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=400&q=60',
    status: 'Active',
  },
  {
    id: 9,
    title: 'Video Editing & Production',
    description: 'Create professional videos using Adobe Premiere and After Effects.',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=400&q=60',
    status: 'Popular',
  },
  {
    id: 10,
    title: 'Project Management Pro',
    description: 'Master Agile, Scrum, and project management methodologies.',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=60',
    status: 'Active',
  },
];

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return simulatedCourses;
});

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch courses';
      });
  },
});

export default coursesSlice.reducer;
