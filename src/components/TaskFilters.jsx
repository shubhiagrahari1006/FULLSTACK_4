const STATUS_TABS = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Pending' },
  { id: 'completed', label: 'Completed' },
];

export function TaskFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  sortBy,
  onSortChange,
  completedCount,
  onClearCompleted,
}) {
  return (
    <div className="toolbar">
      <div className="tab-group" role="tablist" aria-label="Task status filter">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={statusFilter === tab.id}
            className={`tab-btn${statusFilter === tab.id ? ' tab-btn--active' : ''}`}
            onClick={() => onStatusChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="toolbar-controls">
        <input
          type="search"
          aria-label="Search tasks"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <select
          aria-label="Filter by priority"
          value={priorityFilter}
          onChange={(e) => onPriorityChange(e.target.value)}
        >
          <option value="All">All Priorities</option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>

        <select
          aria-label="Sort tasks"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="newest">Sort: Newest</option>
          <option value="priority">Sort: Highest Priority</option>
          <option value="dueDate">Sort: Earliest Due Date</option>
        </select>

        {completedCount > 0 && (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onClearCompleted}
          >
            Clear Completed ({completedCount})
          </button>
        )}
      </div>
    </div>
  );
}
