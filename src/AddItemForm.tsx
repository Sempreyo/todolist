import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import {ControlPoint} from '@mui/icons-material';

type FormPropsType = {
	addItem: (title: string) => void
}

export function AddItemForm(props: FormPropsType) {
	const [title, setTitle] = useState('');
	const [error, setError] = useState<string | null>(null);

	const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value);
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError(null);

		if (e.key === 'Enter') {
			onMessageChangeHandler();
		}
	}

	const onMessageChangeHandler = () => {
		if (title.trim() !== '') {
			props.addItem(title.trim());
			setTitle('');
		} else {
			setError('Field is required!');
		}
	}

	return (
		<div style={{ display: 'flex' }}>
			<TextField
				variant={'outlined'}
				label={'Type here...'}
				value={title}
				onChange={onTitleChangeHandler}
				onKeyPress={onKeyPressHandler}
				error={!!error}
				helperText={error}
			/>
			<IconButton color={'primary'} onClick={onMessageChangeHandler}>
				<ControlPoint/>
			</IconButton>
		</div>
	)
}