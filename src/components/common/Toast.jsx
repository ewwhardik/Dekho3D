import './Toast.css';

export function Toast({ toasts }) {
  if (toasts.length === 0) return null;
  return (
    <div className="toast-stack">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast--${t.type} pop-in`}>
          {t.message}
        </div>
      ))}
    </div>
  );
}
