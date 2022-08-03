import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';


export type FilterValuesType = 'all' | 'completed' | 'active'

type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

type TasksStateType = {
	[key: string]: TaskType[]
}

function App() {
	let todolistId1 = v1();
	let todolistId2 = v1();

	let [todolists, setTodolists] = useState<TodolistType[]>([
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
	]);

	let [tasks, setTasks] = useState<TasksStateType>({
		[todolistId1]: [
			{
				id: v1(),
				title: 'Плед',
				isDone: false
			},
			{
				id: v1(),
				title: 'Чашка кофе',
				isDone: true
			},
			{
				id: v1(),
				title: 'Годный сериальчик',
				isDone: false
			},
			{
				id: v1(),
				title: 'Ведро оливье',
				isDone: true
			}
		],
		[todolistId2]: [
			{
				id: v1(),
				title: 'Спиннинг',
				isDone: true
			},
			{
				id: v1(),
				title: 'Кондиционер',
				isDone: true
			},
			{
				id: v1(),
				title: 'Катер',
				isDone: true
			},
			{
				id: v1(),
				title: 'Мороженое',
				isDone: false
			}
		],
	});

	function removeTodolist(tlId: string) {
		let filteredList = todolists.filter(item => item.id !== tlId);
		setTodolists(filteredList);
		delete tasks[tlId];
		setTasks({...tasks});
	}

	function changeTodolistTitle(tlId: string, newTitle: string) {
		const todolist = todolists.find(item => item.id === tlId);

		if (todolist) {
			todolist.title = newTitle;
			setTodolists([...todolists])
		}
	}

	function changeStatus(taskId: string, isDone: boolean, tlId: string) {
		setTasks({
			...tasks,
			[tlId]: tasks[tlId].map(item => item.id === taskId ? {...item, isDone} : item)
		})
	}

	function changeTaskTitle(taskId: string, newTitle: string, tlId: string) {
		// Достаём нужный массив по todolistId
		let currentTasks = tasks[tlId];
		// Найдём нужную таску
		let task = currentTasks.find(item => item.id !== tlId);

		// Изменим таску, если она нашлась
		if (task) {
			task.title = newTitle;
			setTasks({...tasks});
		}
	}

	function addTask(title: string, tlId: string) {
		const newTask: TaskType = {
			id: v1(),
			title: title,
			isDone: false
		}
		let currentTasks = tasks[tlId];
		tasks[tlId] = [newTask, ...currentTasks];

		setTasks({...tasks});
	}

	function removeTask(id: string, tlId: string) {
		let currentTasks = tasks[tlId];
		tasks[tlId] = currentTasks.filter(item => item.id !== id);
		setTasks({...tasks});
	}

	function changeFilter(type: FilterValuesType, tlId: string) {
		let todolist = todolists.find(item => item.id === tlId);
		if (todolist) {
			todolist.filter = type;
			setTodolists([...todolists]);
		}
	}
	
	function addTodolist(title: string) {
		let todolist: TodolistType = {
			id: v1(),
			filter: 'all',
			title: title
		}
		setTodolists([todolist, ...todolists]);
		setTasks({
			...tasks,
			[todolist.id]: []
		});
	}

	return (
		<div className="App">
			<AddItemForm addItem={addTodolist}/>
			{
				todolists.map(item => {
					let filteredTasks = tasks[item.id];
					switch (item.filter) {
						case 'completed':
							filteredTasks = filteredTasks.filter(item => item.isDone);
							break;
						case 'active':
							filteredTasks = filteredTasks.filter(item => !item.isDone);
							break;
					}

					return <Todolist
						key={item.id}
						id={item.id}
						title={item.title}
						tasks={filteredTasks}
						removeTask={removeTask}
						changeFilter={changeFilter}
						addTask={addTask}
						changeStatus={changeStatus}
						changeTaskTitle={changeTaskTitle}
						filter={item.filter}
						removeTodolist={removeTodolist}
						changeTodolistTitle={changeTodolistTitle}
					/>
				})
			}
		</div>
	);
}

export default App;
