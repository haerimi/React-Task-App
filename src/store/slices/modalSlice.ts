import { createSlice } from "@reduxjs/toolkit";
import { ITask } from "../../types";

type TModalState = {
    boardId: string;
    listId: string;
    task: ITask;
}

const initialState: TModalState = {
    boardId: 'board-0',
    listId: 'list-0',
    task: {
        taskId: 'test-0',
        taskName: 'task 0',
        taskDescription: 'task description',
        taskOwner: 'Haerim'
    }
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        // 액션을 생성하는 함수들
    }
})

export const modalReducer = modalSlice.reducer;