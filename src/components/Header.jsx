export default function Header({ onOpenModal, onOpenExpenseModal }) {
  return (
    <div className="header">
      <h1>Budgets</h1>
      <div className="header-btns">
        <button onClick={onOpenModal}>Add Budget</button>
        <button onClick={onOpenExpenseModal}>Add Expense</button>
      </div>
    </div>
  );
}
