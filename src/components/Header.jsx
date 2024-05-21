import { useBudgets } from "../contexts/BudgetsContext";

export default function Header({ onOpenBudgetModal, onOpenExpenseModal }) {
  const { budgets } = useBudgets();
  return (
    <div className="header">
      <h1>Budgets</h1>
      <div className="header-btns">
        <button onClick={onOpenBudgetModal}>Add Budget</button>
        {budgets.length > 0 && (
          <button onClick={onOpenExpenseModal}>Add Expense</button>
        )}
      </div>
    </div>
  );
}
