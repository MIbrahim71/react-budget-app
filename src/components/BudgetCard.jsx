import { currencyFormatter } from "../utils";

export default function BudgetCard({
  name,
  amount,
  max,
  onAddExpenseClick,
  onViewExpenseClick,
  total,
}) {
  const percentageSpent = (amount / max) * 100;

  let color = "dodgerblue";
  if (percentageSpent >= 50 && percentageSpent <= 75) color = "orange";
  if (percentageSpent > 75) color = "red";

  return (
    <div
      className={`budget-card ${total ? "total" : ""}`}
      style={{
        backgroundColor: `${
          percentageSpent > 100 ? "rgb(255, 211, 211)" : null
        }`,
      }}
    >
      <div className="budget-header">
        <h1>{name}</h1>
        <h1>
          {currencyFormatter.format(amount)} {max && <span>/ {max}</span>}
        </h1>
      </div>

      {max && (
        <div className="progress-bar">
          <div
            className="budget-spent"
            style={{ width: `${percentageSpent}%`, backgroundColor: color }}
          ></div>
        </div>
      )}

      {!total && (
        <div className="budget-card--btns">
          <button onClick={onAddExpenseClick}>Add Expense</button>
          <button onClick={onViewExpenseClick}>View Expenses</button>
        </div>
      )}
    </div>
  );
}
