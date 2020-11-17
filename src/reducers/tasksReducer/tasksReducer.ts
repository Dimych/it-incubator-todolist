import {TasksType, TaskType} from "../../App";
import {v1} from "uuid";

export enum ActionsTypes {
    ADD_TASK = 'ADD_TASK',
    REMOVE_TASK = 'REMOVE_TASK',
    CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE',
    CHANGE_CHECKED_STATUS = 'CHANGE_CHECKED_STATUS',
}

type ActionsType = ReturnType<ActionType<typeof actions>>
export const tasksReducer = (state: TasksType, action: ActionsType) => {
    switch (action.type) {
        case ActionsTypes.ADD_TASK:
            const newTask: TaskType = {id: action.id, isDone: false, title: action.title}
            return {
                ...state,
                [action.todolistId]: [newTask, ...state[action.todolistId]]
            }
        case ActionsTypes.REMOVE_TASK:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .filter(task => task.id !== action.taskId)
            }
        case ActionsTypes.CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId ? {...task, title: action.newTitle} : task)
                }
        case ActionsTypes.CHANGE_CHECKED_STATUS:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId ? {...task, isDone: action.value} : task)
            }
        default:
            return state
    }
}
type ActionType<T> = T extends { [key: string]: infer U } ? U : never
export const actions = {
    addNewTask: (todolistId: string, title: string) => ({type: ActionsTypes.ADD_TASK, todolistId, title, id: v1() } as const),
    removeTask: (todolistId: string, taskId: string) => ({type: ActionsTypes.REMOVE_TASK, todolistId, taskId} as const),
    changeTaskTitleText: (todolistId: string, taskId: string, newTitle: string) => ({ type: ActionsTypes.CHANGE_TASK_TITLE, todolistId, taskId, newTitle } as const),
    changeCheckedStatus: (todolistId: string, taskId: string, value: boolean) => ({ type: ActionsTypes.CHANGE_CHECKED_STATUS, todolistId, taskId, value } as const),
}