import { useMemo, useState } from 'react';
import { TaskFilters } from './components/TaskFilters';
import { TaskForm } from './components/TaskForm';
import { TaskItem } from './components/TaskItem';
import { TaskStats } from './components/TaskStats';
import { useLocalStorage } from './hooks/useLocalStorage';

const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Review MongoDB schema indexes for Student Management System',
    category: 'Engineering',
    priority: 'High',
    dueDate: '2026-11-28',
    completed: true,
    createdAt: 1700000001000,
  },
  {
    id: 'task-2',
    title: 'Submit End-Semester Examination Registration Form',
    category: 'Academic',
    priority: 'High',
    dueDate: '2026-11-30',
    completed: false,
    createdAt: 1700000002000,
  },
  {
    id: 'task-3',
    title: 'Deploy Bootstrap Portfolio build and verify mobile breakpoints',
    category: 'Engineering',
    priority: 'Medium',
    dueDate: '2026-12-02',
    completed: false,
    createdAt: 1700000003000,
  },
];

const PRIORITY_RANK = { High: 1, Medium: 2, Low: 3 };

export default function App() {
  const [tasks, setTasks] = useLocalStorage('executive_todo_tasks_v1', INITIAL_TASKS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  function handleAddTask({ title, category, priority, dueDate }) {
    const newTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title,
      category,
      priority,
      dueDate,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
  }

  function handleToggleTask(id) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  }

  function handleUpdateTask(id, updates) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  }

  function handleDeleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function handleClearCompleted() {
    setTasks((prev) => prev.filter((task) => !task.completed));
  }

  const visibleTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tasks
      .filter((task) => {
        if (statusFilter === 'active' && task.completed) return false;
        if (statusFilter === 'completed' && !task.completed) return false;
        if (priorityFilter !== 'All' && task.priority !== priorityFilter) return false;
        if (query && !task.title.toLowerCase().includes(query)) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'priority') {
          return PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
        }
        if (sortBy === 'dueDate') {
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate.localeCompare(b.dueDate);
        }
        return b.createdAt - a.createdAt;
      });
  }, [tasks, search, statusFilter, priorityFilter, sortBy]);

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <div className="brand">
            <div className="brand-mark" aria-hidden="true">
              TD
            </div>
            <div>
              <h1>Task &amp; Deliverable Workspace</h1>
              <p>Structured Task Management Application &middot; React.js</p>
            </div>
          </div>
          <span className="session-pill">Auto-Saved Locally</span>
        </div>
      </header>

      <main className="container main-content">
        <TaskStats tasks={tasks} />
        <TaskForm onAddTask={handleAddTask} />

        <section className="list-panel" aria-label="Task Directory">
          <TaskFilters
            search={search}
            onSearchChange={setSearch}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            priorityFilter={priorityFilter}
            onPriorityChange={setPriorityFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            completedCount={completedCount}
            onClearCompleted={handleClearCompleted}
          />

          {visibleTasks.length === 0 ? (
            <div className="empty-state">
              <p className="empty-title">No tasks match the current view</p>
              <p className="empty-subtitle">
                Add a new deliverable above or adjust your status and priority filters.
              </p>
            </div>
          ) : (
            <ul className="task-list">
              {visibleTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={handleToggleTask}
                  onUpdate={handleUpdateTask}
                  onDelete={handleDeleteTask}
                />
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
