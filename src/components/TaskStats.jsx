export function TaskStats({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const active = total - completed;
  const highPriorityPending = tasks.filter(
    (task) => !task.completed && task.priority === 'High'
  ).length;
  const completionPct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <section className="stats-section" aria-label="Task Overview">
      <div className="kpi-grid">
        <article className="kpi-card">
          <span className="kpi-label">Total Tasks</span>
          <strong className="kpi-value">{total}</strong>
        </article>
        <article className="kpi-card">
          <span className="kpi-label">Pending</span>
          <strong className="kpi-value">{active}</strong>
        </article>
        <article className="kpi-card">
          <span className="kpi-label">Completed</span>
          <strong className="kpi-value">{completed}</strong>
        </article>
        <article className="kpi-card">
          <span className="kpi-label">High Priority Open</span>
          <strong className="kpi-value kpi-value--warn">{highPriorityPending}</strong>
        </article>
      </div>

      <div className="progress-card">
        <div className="progress-header">
          <span>Overall Completion Rate</span>
          <strong>{completionPct}%</strong>
        </div>
        <div className="progress-track" role="progressbar" aria-valuenow={completionPct} aria-valuemin={0} aria-valuemax={100}>
          <div className="progress-fill" style={{ width: `${completionPct}%` }} />
        </div>
      </div>
    </section>
  );
}
