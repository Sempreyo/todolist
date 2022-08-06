import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';


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

	const removeTodolist = (tlId: string) => {
		let filteredList = todolists.filter(item => item.id !== tlId);
		setTodolists(filteredList);
		delete tasks[tlId];
		setTasks({...tasks});
	}

	const changeTodolistTitle = (tlId: string, title: string) => {
		setTodolists(todolists.map(item => item.id === tlId ? {...item, title} : item));
	}

	const changeStatus = (taskId: string, isDone: boolean, tlId: string) => {
		setTasks({
			...tasks,
			[tlId]: tasks[tlId].map(item => item.id === taskId ? {...item, isDone} : item)
		});
	}

	const changeTaskTitle = (taskId: string, title: string, tlId: string) => {
		setTasks({
			...tasks,
			[tlId]: tasks[tlId].map(item => item.id === taskId ? {...item, title} : item)
		});
	}

	const addTask = (title: string, tlId: string) => {
		const newTask: TaskType = {
			id: v1(),
			title: title,
			isDone: false
		}
		let currentTasks = tasks[tlId];
		tasks[tlId] = [newTask, ...currentTasks];

		setTasks({...tasks});
	}

	const removeTask = (id: string, tlId: string) => {
		// const todoListsTasks = tasks[tlId]
		// const updatedTasks = todoListsTasks.filter((task: TaskType) => task.id !== tlId)
		// const copyTasks = {...tasks}
		// copyTasks[tlId] = updatedTasks
		// setTasks(copyTasks)
		//
		setTasks({...tasks, [tlId]: tasks[tlId].filter(item => item.id !== id)});
	}

	const changeFilter = (type: FilterValuesType, tlId: string) => {
		let todolist = todolists.find(item => item.id === tlId);
		if (todolist) {
			todolist.filter = type;
			setTodolists([...todolists]);
		}
	}
	
	const addTodolist = (title: string) => {
		let todolist: TodolistType = {
			id: v1(),
			filter: 'all',
			title: title
		}
		setTodolists([todolist, ...todolists]);
		setTasks({
			...tasks,
			[todolist.id]: []
		})
	}

	// @ts-ignore
	return (
		<div className="App">
			<AppBar position="static">
				<Toolbar variant="dense">
					<IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
						<Menu />
					</IconButton>
					<Typography variant="h6" color="inherit" component="div">
						Photos
					</Typography>
				</Toolbar>
			</AppBar>

			<Container fixed maxWidth={'lg'} style={{ padding: '40px 0 60px' }}>
				<Grid container spacing={2}>
					<Grid container item md={12} justifyContent={'center'}>
						<AddItemForm addItem={addTodolist}/>
					</Grid>
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

							return <Grid item md={4}>
								<Paper elevation={3} style={{ padding: "30px 25px 50px" }}>
									<Todolist
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
								</Paper>
							</Grid>
						})
					}
				</Grid>
			</Container>
		</div>
	);
}

export default App;
