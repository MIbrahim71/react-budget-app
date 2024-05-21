import { useRef } from "react";
import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../contexts/BudgetsContext";

export default function AddExpenseModal({ onClose, defaultBudgetId }) {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();
  const { addExpense, budgets } = useBudgets();

  function handleSubmit(e) {
    e.preventDefault();
    addExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    });
    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <header className="modal-header">
          <h1>New Expense</h1>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="modal-input name">
            <h2>Description</h2>
            <input type="text" ref={descriptionRef} required />
          </div>

          <div className="modal-input spend">
            <h2>Amount</h2>
            <input type="number" ref={amountRef} min={0} required />
          </div>

          <div className="modal-input budget">
            <h2>Budget</h2>
            <select defaultValue={defaultBudgetId} ref={budgetIdRef}>
              <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorised</option>
              {budgets.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-footer">
            <button className="modal-addbtn" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
