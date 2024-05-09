import AddBudgetModal from "./components/AddBudgetModal";
import BudgetCard from "./components/BudgetCard";
import Header from "./components/Header";
import { useState } from "react";
import { BudgetsProvider, useBudgets } from "./contexts/BudgetsContext";
import AddExpenseModal from "./components/AddExpenseModal";

function App() {
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();

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
            />
          );
        })}
        {isBudgetModalOpen && (
          <AddBudgetModal onClose={handleCloseBudgetModal} />
        )}
        {isExpenseModalOpen && (
          <AddExpenseModal onClose={handleCloseExpenseModal} />
        )}
      </div>
    </>
  );
}

export default App;
