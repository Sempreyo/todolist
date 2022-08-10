import {
	AddTodolistAC, ChangeTodolistFilterAC,
	ChangeTodolistFilterActionType, ChangeTodolistTitleAC,
	ChangeTodolistTitleActionType,
	RemoveTodolistAC,
	todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {TodolistType} from '../App';

test('Correct remove todolist', () => {
	let todolistId1 = v1();
	let todolistId2 = v1();

	const startState: TodolistType[] = [
		{
			id: todolistId1,
			title: 'Подготовить к зиме:',
			filter: 'all'
		},
		{
			id: todolistId2,
			title: 'Подготовить к лету:',
			filter: 'all'
		}
	];

	const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))

	expect(endState.length).toBe(1);
	expect(endState[0].id).toBe(todolistId2);
});

test('Correct add todolist', () => {
	let todolistId1 = v1();
	let todolistId2 = v1();

	let newTodolistTitle = 'New Todolist';

	const startState: TodolistType[] = [
		{
			id: todolistId1,
			title: 'Подготовить к зиме:',
			filter: 'all'
		},
		{
			id: todolistId2,
			title: 'Подготовить к лету:',
			filter: 'all'
		}
	];

	const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle))

	expect(endState.length).toBe(3);
	expect(endState[0].id).toBe(todolistId1);
});

test('Correct change todolist title', () => {
	let todolistId1 = v1();
	let todolistId2 = v1();

	let newTodolistTitle = 'New Todolist';

	const startState: TodolistType[] = [
		{
			id: todolistId1,
			title: 'Подготовить к зиме:',
			filter: 'all'
		},
		{
			id: todolistId2,
			title: 'Подготовить к лету:',
			filter: 'all'
		}
	];

	const endState = todolistsReducer(startState, ChangeTodolistTitleAC(todolistId2, newTodolistTitle))

	expect(endState[0].title).toBe('Подготовить к зиме:');
	expect(endState[1].title).toBe(newTodolistTitle);
});

test('Correct filter todolist', () => {
	let todolistId1 = v1();
	let todolistId2 = v1();

	let newFilter = 'completed';

	const startState: TodolistType[] = [
		{
			id: todolistId1,
			title: 'Подготовить к зиме:',
			filter: 'all'
		},
		{
			id: todolistId2,
			title: 'Подготовить к лету:',
			filter: 'all'
		}
	];

	const endState = todolistsReducer(startState, ChangeTodolistFilterAC(todolistId2, 'completed'))

	expect(endState[0].filter).toBe('all');
	expect(endState[1].filter).toBe(newFilter);
});