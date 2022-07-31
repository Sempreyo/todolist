import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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
		<div>
			<input value={title}
						 onChange={onTitleChangeHandler}
						 onKeyPress={onKeyPressHandler}
						 className={error ? 'error' : ''}
			/>
			<button onClick={onMessageChangeHandler}>+</button>
			{error ? <div className='error-message'>{error}</div> : ''}
		</div>
	)
}