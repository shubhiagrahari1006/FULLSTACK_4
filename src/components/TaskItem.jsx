import { useState } from 'react';

const PRIORITY_BADGE_CLASS = {
  High: 'badge--high',
  Medium: 'badge--medium',
  Low: 'badge--low',
};

export function TaskItem({ task, onToggle, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(task.title);
  const [draftPriority, setDraftPriority] = useState(task.priority);
  const [draftDueDate, setDraftDueDate] = useState(task.dueDate || '');

  function handleSave(event) {
    event.preventDefault();
    const trimmed = draftTitle.trim();
    if (trimmed.length < 2) return;

    onUpdate(task.id, {
      title: trimmed,
      priority: draftPriority,
      dueDate: draftDueDate,
    });
    setIsEditing(false);
  }

  function handleCancel() {
    setDraftTitle(task.title);
    setDraftPriority(task.priority);
    setDraftDueDate(task.dueDate || '');
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <li className="task-item task-item--editing">
        <form className="edit-form" onSubmit={handleSave}>
          <input
            type="text"
            aria-label="Edit task title"
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            autoFocus
          />
          <select
            aria-label="Edit task priority"
            value={draftPriority}
            onChange={(e) => setDraftPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <input
            type="date"
            aria-label="Edit due date"
            value={draftDueDate}
            onChange={(e) => setDraftDueDate(e.target.value)}
          />
          <div className="edit-actions">
            <button type="submit" className="btn btn-primary btn-sm">
              Save
            </button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className={`task-item${task.completed ? ' task-item--done' : ''}`}>
      <label className="task-check">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={`Mark "${task.title}" as ${task.completed ? 'pending' : 'completed'}`}
        />
        <span className="task-title">{task.title}</span>
      </label>

      <div className="task-meta">
        <span className="category-tag">{task.category}</span>
        <span className={`priority-badge ${PRIORITY_BADGE_CLASS[task.priority] || ''}`}>
          {task.priority}
        </span>
        {task.dueDate && <span className="due-date">Due: {task.dueDate}</span>}

        <div className="item-actions">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
