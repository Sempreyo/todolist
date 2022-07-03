import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {
	let [tasks, setTasks] = useState([
		{
			id: 1,
			title: 'Плед',
			isDone: false
		},
		{
			id: 2,
			title: 'Чашка кофе',
			isDone: true
		},
		{
			id: 3,
			title: 'Годный сериальчик',
			isDone: false
		},
		{
			id: 4,
			title: 'Ведро оливье',
			isDone: true
		}
	]);
	let [filter, setFilter] = useState<FilterValuesType>('all');

	function removeTask(id: number) {
		setTasks(tasks.filter(item => item.id !== id));
	}

	function changeFilter(type: FilterValuesType) {
		setFilter(type);
	}

	let filteredTasks = tasks;
	if (filter === 'completed') {
		filteredTasks = tasks.filter(item => item.isDone);
	}
	if (filter === 'active') {
		filteredTasks = tasks.filter(item => !item.isDone);
	}

	return (
		<div className="App">
			<Todolist title="Подготовить к зиме:" tasks={filteredTasks} removeTask={removeTask} changeFilter={changeFilter} />
		</div>
	);
}

export default App;
