import { useState } from 'react';

const CATEGORIES = ['Engineering', 'Academic', 'Administrative', 'Personal'];
const PRIORITIES = ['High', 'Medium', 'Low'];

export function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Academic');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = title.trim();

    if (trimmed.length < 2) {
      setError('Please enter a task description of at least 2 characters.');
      return;
    }

    onAddTask({
      title: trimmed,
      category,
      priority,
      dueDate,
    });

    setTitle('');
    setDueDate('');
    setError('');
  }

  return (
    <form className="task-form-card" onSubmit={handleSubmit} noValidate>
      <div className="form-header">
        <h2>Add New Deliverable</h2>
        <p>Specify task details, priority level, and target date.</p>
      </div>

      <div className="form-row">
        <div className="field field--grow">
          <label htmlFor="taskTitle">Task Title</label>
          <input
            id="taskTitle"
            type="text"
            placeholder="e.g. Finalize database schema documentation"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError('');
            }}
          />
        </div>

        <div className="field">
          <label htmlFor="taskCategory">Category</label>
          <select
            id="taskCategory"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="taskPriority">Priority</label>
          <select
            id="taskPriority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            {PRIORITIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="taskDueDate">Due Date</label>
          <input
            id="taskDueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="field field--submit">
          <button type="submit" className="btn btn-primary">
            + Add Task
          </button>
        </div>
      </div>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
