import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import taskItemReducer from './action-reducer/actionSlice'
import loginReducer from './login-reducer/loginSlice'
export const store = configureStore({
    reducer: {
        taskSate: taskItemReducer,
        authenticationState: loginReducer

    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;