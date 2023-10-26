import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

const serverUrl = "http://localhost:8080";

export interface TaskItemState {
    tasItemList: any[];
    listStatus: any[];
    task: any
    status: 'idle' | 'loading' | 'failed';
}

const initialState: TaskItemState = {
    tasItemList: [],
    listStatus: [],
    task: null,
    status: 'idle',
};

export const getTaskItemListAsync = createAsyncThunk(
    'task/get-list',
    async () => {
        try {
            const response = await axios.get(serverUrl + '/api/task/list', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.log("error ", error);
        }

    }
);
export const getTaskDetailsAsync = createAsyncThunk(
    'task/get-details',
    async (id: any) => {
        try {
            const response = await axios.get(serverUrl + '/api/task/details', {
                headers: {
                    'Content-Type': 'application/json',
                },
                params: { id }
            });
            return response.data;
        } catch (error) {
            console.log("error ", error);
        }

    }
);
export const getTaskStatussAsync = createAsyncThunk(
    'task/get-status',
    async () => {
        try {
            const response = await axios.get(serverUrl + '/api/task/listStatus', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.log("error ", error);
        }

    }
);
export const createTaskAsync = createAsyncThunk(
    'task/create',
    async (data: any) => {
        const { title, detail, userID, status, createAt, id } = data;
        console.log("data redux ", data);

        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(serverUrl + '/api/task/create', { title, detail, status, userID, createAt, id }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },

            });
            return response.data;
        } catch (error) {
            console.log("error ", error);
        }

    }
);

export const deleteTaskItemAsync = createAsyncThunk(
    'task/delete',
    async (id: any) => {
        console.log("id", id);

        const token = localStorage.getItem('token');
        const response = await axios.post(serverUrl + '/api/task/delete', { id }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        });
        return response.data;
    }
);
const taskItemSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {


    },

    extraReducers: (builder) => {
        builder

            .addCase(getTaskItemListAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getTaskItemListAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.tasItemList = action.payload;
            }).addCase(getTaskItemListAsync.rejected, (state) => {
                state.status = 'failed';
            }).addCase(getTaskDetailsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getTaskDetailsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.task = action.payload;
            }).addCase(getTaskDetailsAsync.rejected, (state) => {
                state.status = 'failed';
            }).addCase(deleteTaskItemAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteTaskItemAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.tasItemList = action.payload;
            })
            .addCase(deleteTaskItemAsync.rejected, (state) => {
                state.status = 'failed';
            }).addCase(createTaskAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createTaskAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.tasItemList = action.payload;
            })
            .addCase(createTaskAsync.rejected, (state) => {
                state.status = 'failed';
            }).addCase(getTaskStatussAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getTaskStatussAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.listStatus = action.payload;
            })
            .addCase(getTaskStatussAsync.rejected, (state) => {
                state.status = 'failed';
            })
    },
});
export const getTaskItemtList = (state: RootState) => state.taskSate.tasItemList;
export const getTaskDetailstList = (state: RootState) => state.taskSate.task;
export const getStatus = (state: RootState) => state.taskSate.status;
export const getStatusTask = (state: RootState) => state.taskSate.listStatus;

export default taskItemSlice.reducer;