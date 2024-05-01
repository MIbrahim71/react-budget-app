export default function Header({ onOpenModal }) {
  return (
    <div className="header">
      <h1>Budgets</h1>
      <div className="header-btns">
        <button onClick={onOpenModal}>Add Budget</button>
        <button>Add Expense</button>
      </div>
    </div>
  );
}
