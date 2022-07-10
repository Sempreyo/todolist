import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	title: string
	tasks: Array<TaskType>
	removeTask: (id: string) => void,
	changeFilter: (type: FilterValuesType) => void
	addTask: (title: string) => void
}

export function Todolist(props: PropsType) {
	const [title, setTitle] = useState('');

	const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			onMessageChangeHandler()
		}
	}

	const onMessageChangeHandler = () => {
		props.addTask(title);
		setTitle('');
	}

	const onAllFilterChangeHandler = () => {
		props.changeFilter('all')
	}

	const onActiveFilterChangeHandler = () => {
		props.changeFilter('active')
	}

	const onCompletedFilterChangeHandler = () => {
		props.changeFilter('completed')
	}

	return (
		<div>
			<h3>{props.title}</h3>
			<div>
				<input value={title} onChange={onTitleChangeHandler}
					onKeyPress={onKeyPressHandler}/>
				<button onClick={onMessageChangeHandler}>+</button>
			</div>
			<ul>
				{
					props.tasks.map(item => {
						const onRemoveHandler = () => {
							props.removeTask(item.id)
						}

						return <li key={item.id}>
							<input type="checkbox" checked={item.isDone}/>
							<span>{item.title}</span>
							<button onClick={onRemoveHandler}>x</button>
						</li>
					})
				}
			</ul>
			<div>
				<button onClick={onAllFilterChangeHandler}>All</button>
				<button onClick={onActiveFilterChangeHandler}>Active</button>
				<button onClick={onCompletedFilterChangeHandler}>Completed</button>
			</div>
		</div>
	)
}