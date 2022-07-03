import React from "react";
import {FilterValuesType} from './App';

export type TaskType = {
	id: number
	title: string
	isDone: boolean
}

type PropsType = {
	title: string
	tasks: Array<TaskType>
	removeTask: (id: number) => void,
	changeFilter: (type: FilterValuesType) => void
}

export function Todolist(props: PropsType) {
	return (
		<div>
			<h3>{props.title}</h3>
			<div>
				<input/>
				<button>+</button>
			</div>
			<ul>
				{
					props.tasks.map(item =>
						<li key={item.id}>
							<input type="checkbox" checked={item.isDone}/>
							<span>{item.title}</span>
							<button onClick={() => { props.removeTask(item.id) }}>x</button>
						</li>
					)
				}
			</ul>
			<div>
				<button onClick={() => { props.changeFilter('all') }}>All</button>
				<button onClick={() => { props.changeFilter('active') }}>Active</button>
				<button onClick={() => { props.changeFilter('completed') }}>Completed</button>
			</div>
		</div>
	)
}