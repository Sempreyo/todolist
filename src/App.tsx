import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';


export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {
	let [tasks, setTasks] = useState([
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
	]);
	let [filter, setFilter] = useState<FilterValuesType>('all');

	function changeStatus(taskId: string, isDone: boolean) {
		let task = tasks.find(item => item.id === taskId);

		if (task) {
			task.isDone = isDone;
		}

		setTasks([...tasks]);
	}

	function addTask(title: string) {
		const newTask: TaskType = {
			id: v1(),
			title: title,
			isDone: false
		}

		const updateTasks = [...tasks, newTask]
		setTasks(updateTasks)
	}

	function removeTask(id: string) {
		setTasks(tasks.filter(item => item.id !== id));
	}

	function changeFilter(type: FilterValuesType) {
		setFilter(type);
	}

	let filteredTasks = tasks;
	switch (filter) {
		case 'completed':
			filteredTasks = tasks.filter(item => item.isDone);
			break;
		case 'active':
			filteredTasks = tasks.filter(item => !item.isDone);
			break;
	}

	return (
		<div className="App">
			<Todolist title="Подготовить к зиме:"
								tasks={filteredTasks}
								removeTask={removeTask}
								changeFilter={changeFilter}
								addTask={addTask}
								changeStatus={changeStatus}
								filter={filter}
			/>
		</div>
	);
}

export default App;
