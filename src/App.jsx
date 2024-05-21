import AddBudgetModal from "./components/AddBudgetModal";
import BudgetCard from "./components/BudgetCard";
import Header from "./components/Header";
import { useState } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";
import AddExpenseModal from "./components/AddExpenseModal";
import UncategorisedExpenses from "./components/UncategorisedExpenses";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";

function App() {
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();

  const { budgets, getBudgetExpenses } = useBudgets();

  const handleOpenExpenseModal = (budgetId) => {
    setIsExpenseModalOpen(true);
    setAddExpenseModalBudgetId(budgetId);
  };

  const handleCloseExpenseModal = () => {
    setIsExpenseModalOpen(false);
  };

  const handleOpenBudgetModal = () => {
    setIsBudgetModalOpen(true);
  };

  const handleCloseBudgetModal = () => {
    setIsBudgetModalOpen(false);
  };

  return (
    <>
      <Header
        onOpenExpenseModal={handleOpenExpenseModal}
        onOpenBudgetModal={handleOpenBudgetModal}
      />
      {budgets.length === 0 && <div className="nobudget-msg"> No Budgets</div>}
      <div className="budget-container">
        {budgets.map((budget) => {
          // Get all expenses, add them all together and assign to amount variable
          const amount = getBudgetExpenses(budget.id).reduce(
            (total, expense) => total + expense.amount,
            0
          );
          return (
            <BudgetCard
              key={budget.id}
              name={budget.name}
              amount={amount}
              max={budget.max}
              onAddExpenseClick={() => handleOpenExpenseModal(budget.id)}
              onViewExpenseClick={() => setViewExpensesModalBudgetId(budget.id)}
            />
          );
        })}
        <UncategorisedExpenses
          name="Uncategorised"
          onViewExpenseClick={() =>
            setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
          }
        />
        <TotalBudgetCard />
        {isBudgetModalOpen && (
          <AddBudgetModal onClose={handleCloseBudgetModal} />
        )}
        {isExpenseModalOpen && (
          <AddExpenseModal
            defaultBudgetId={addExpenseModalBudgetId}
            onClose={handleCloseExpenseModal}
          />
        )}
        {viewExpensesModalBudgetId && (
          <ViewExpensesModal
            budgetId={viewExpensesModalBudgetId}
            handleClose={() => setViewExpensesModalBudgetId()}
          />
        )}
      </div>
    </>
  );
}

export default App;
