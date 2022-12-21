import React, { useState } from 'react';
import PropTypes from 'prop-types';

const kNewFormData = {
  title: '',
  isComplete: 'false',
};

const NewTaskForm = ({ onAddTaskCallback }) => {
  const [taskData, setTaskData] = useState(kNewFormData);

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    setTaskData(oldData => ({ ...oldData, [fieldName]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskData.title) { return; }

    setTaskData(kNewFormData);

    onAddTaskCallback({
      ...taskData, 
      isComplete: taskData.isComplete === 'true' 
    });
  };

	return (
		<form onSubmit={handleSubmit} className="new-task__form">
			<section>
				<h2>Add a Task</h2>
				<div className="new-task__fields">
					<label htmlFor="new-task__title">Title</label>
					<input
						name="title"
						id="new-task__title"
						value={taskData.title}
						onChange={handleChange}
					/>
        </div>
        <div>
					<button className="button new-task__submit" type="submit">
						Add Task
					</button>
				</div>
			</section>
		</form>
	);
};

NewTaskForm.propTypes = {
	onAddTaskCallback: PropTypes.func.isRequired,
};

export default NewTaskForm;