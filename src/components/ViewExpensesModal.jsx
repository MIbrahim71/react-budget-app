import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../contexts/BudgetsContext";
import { currencyFormatter } from "../utils";

export default function ViewExpensesModal({ budgetId, handleClose }) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudgets();

  // If budgetId is uncategorised => apply properties and set it to budget
  // If not, set budget to the budget.id equal to budgetId
  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "Uncategorised", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((budget) => budget.id === budgetId);

  const expenses = getBudgetExpenses(budgetId);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <header className="modal-header">
          <h1>Expenses</h1>
          <button
            className="close-button"
            onClick={() => {
              handleClose();
            }}
          >
            X
          </button>
        </header>
        <div className="view-expense--container">
          <div className="view-expense--header">
            <h1>{budget?.name}</h1>
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <button
                className="view-expense--delete"
                onClick={() => {
                  deleteBudget(budget);
                  handleClose();
                }}
              >
                Delete Budget
              </button>
            )}
          </div>

          {expenses.map((expense) => {
            return (
              <div className="view-expense" key={expense.id}>
                <h1>{expense.description}</h1>

                <div className="view-expense--amount">
                  <h1>{currencyFormatter.format(expense.amount)}</h1>
                  <button
                    className="view-expense--close"
                    onClick={() => {
                      deleteExpense(expense);
                    }}
                  >
                    X
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
