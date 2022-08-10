import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

type RemoveTodolistActionType = {
	type: 'REMOVE-TODOLIST'
	id: string
}

type AddTodolistActionType = {
	type: 'ADD-TODOLIST'
	title: string
}

export type ChangeTodolistTitleActionType = {
	type: 'CHANGE-TODOLIST-TITLE'
	id: string
	title: string
}

export type ChangeTodolistFilterActionType = {
	type: 'CHANGE-TODOLIST-FILTER'
	id: string
	filter: FilterValuesType
}

type ActionTypes = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const todolistsReducer = (state: TodolistType[], action: ActionTypes): TodolistType[] => {
	switch (action.type) {
		case 'REMOVE-TODOLIST':
			return state.filter(item => item.id !== action.id)
		case 'ADD-TODOLIST':
			return [
				...state,
				{ id: v1(), title: action.title, filter: 'all' }
			]
		case 'CHANGE-TODOLIST-TITLE':
			return [
				...state.map(item => item.id === action.id ? {...item, title: action.title} : item)
			]
		case 'CHANGE-TODOLIST-FILTER':
			let todolist = state.find(item => item.id === action.id);
			if (todolist) {
				todolist.filter = action.filter;
			}
			return [...state]
		default:
			throw new Error('Uncorrect action type')
	}
}

// Action creator - функция, принимающая параметры, необходимые для формирования правильного обьекта
export const RemoveTodolistAC = (tlId: string): RemoveTodolistActionType => {
	return { type: 'REMOVE-TODOLIST', id: tlId }
}

export const AddTodolistAC = (title: string): AddTodolistActionType => {
	return { type: 'ADD-TODOLIST', title: title }
}

export const ChangeTodolistTitleAC = (tlId: string, title: string): ChangeTodolistTitleActionType => {
	return { type: 'CHANGE-TODOLIST-TITLE', id: tlId, title: title }
}

export const ChangeTodolistFilterAC = (tlId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
	return { type: 'CHANGE-TODOLIST-FILTER', id: tlId, filter: filter }
}