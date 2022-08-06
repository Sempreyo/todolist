import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@mui/material';
import {Close} from '@mui/icons-material';

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
	changeTaskTitle: (taskId: string, title: string, tlId: string) => void
	filter: FilterValuesType
	removeTodolist: (tlId: string) => void
	changeTodolistTitle: (id: string, title: string) => void
}

export function Todolist(props: PropsType) {
	const getChangeFilterHandler = (filter: FilterValuesType) => {
		return () => props.changeFilter(filter, props.id)
	}

	const onRemoveTodolistHandler = () => props.removeTodolist(props.id)

	const onChangeTodolistTitle = (newTitle: string) => props.changeTodolistTitle(props.id, newTitle)

	const addTask = (title: string) => props.addTask(title, props.id)

	return (
		<div>
			<h3 style={{ marginBottom: '10px' }}>
				<EditableSpan title={props.title} onChange={onChangeTodolistTitle} />
				<IconButton color={'primary'} onClick={onRemoveTodolistHandler}>
					<Close/>
				</IconButton>
			</h3>

			<AddItemForm addItem={addTask}/>

			<ul style={{ marginTop: '30px' }}>
				{
					props.tasks.map(item => {
						const onRemoveHandler = () => props.removeTask(item.id, props.id);

						const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
							props.changeStatus(item.id, e.currentTarget.checked, props.id);
						}

						const onChangeTitleHandler = (newValue: string) => {
							props.changeTaskTitle(item.id, newValue, props.id);
						}

						return <li key={item.id} className={item.isDone ? 'is-done' : ''}>
							<Checkbox checked={item.isDone} onChange={onChangeStatusHandler}/>
							<EditableSpan title={item.title} onChange={onChangeTitleHandler} />
							<IconButton color={'primary'} onClick={onRemoveHandler}>
								<Close/>
							</IconButton>
						</li>
					})
				}
			</ul>
			<div>
				<Button color={'inherit'}
								variant={props.filter === 'all' ? 'contained' : 'text'}
								onClick={getChangeFilterHandler('all')}
				>All</Button>
				<Button color={'primary'}
								variant={props.filter === 'active' ? 'contained' : 'text'}
								onClick={getChangeFilterHandler('active')}
				>Active</Button>
				<Button color={'error'}
								variant={props.filter === 'completed' ? 'contained' : 'text'}
								onClick={getChangeFilterHandler('completed')}
				>Completed</Button>
			</div>
		</div>
	)
}