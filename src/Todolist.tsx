import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	id: string
	title: string
	tasks: Array<TaskType>
	removeTask: (id: string, tlId: string) => void,
	changeFilter: (type: FilterValuesType, tlId: string) => void
	addTask: (title: string, tlId: string) => void
	changeStatus: (taskId: string, isDone: boolean, tlId: string) => void
	filter: FilterValuesType
	removeTodolist: (tlId: string) => void
}

export function Todolist(props: PropsType) {
	const onAllFilterChangeHandler = () => {
		props.changeFilter('all', props.id)
	}

	const onActiveFilterChangeHandler = () => {
		props.changeFilter('active', props.id)
	}

	const onCompletedFilterChangeHandler = () => {
		props.changeFilter('completed', props.id)
	}

	const onRemoveTodolistHandler = () => {
		props.removeTodolist(props.id)
	}

	const addTask = (title: string) => {
		props.addTask(title, props.id);
	}

	return (
		<div>
			<h3>
				{props.title}
				<button onClick={onRemoveTodolistHandler}>x</button>
			</h3>

			<AddItemForm addItem={addTask}/>

			<ul>
				{
					props.tasks.map(item => {
						const onRemoveHandler = () => {
							props.removeTask(item.id, props.id)
						}

						const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
							props.changeStatus(item.id, e.currentTarget.checked, props.id);
						}

						return <li key={item.id} className={item.isDone ? 'is-done' : ''}>
							<input type='checkbox'
										 checked={item.isDone}
										 onChange={onChangeStatusHandler}
							/>
							<span>{item.title}</span>
							<button onClick={onRemoveHandler}>x</button>
						</li>
					})
				}
			</ul>
			<div>
				<button className={props.filter === 'all' ? 'active-filter' : ''}
								onClick={onAllFilterChangeHandler}
				>All</button>
				<button className={props.filter === 'active' ? 'active-filter' : ''}
								onClick={onActiveFilterChangeHandler}
				>Active</button>
				<button className={props.filter === 'completed' ? 'active-filter' : ''}
								onClick={onCompletedFilterChangeHandler}
				>Completed</button>
			</div>
		</div>
	)
}