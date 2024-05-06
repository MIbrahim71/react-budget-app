import AddBudgetModal from "./components/AddBudgetModal";
import BudgetCard from "./components/BudgetCard";
import Header from "./components/Header";
import { useState } from "react";
import { BudgetsProvider, useBudgets } from "./contexts/BudgetsContext";
import AddExpenseModal from "./components/AddExpenseModal";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();

  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Header onOpenModal={handleOpenModal} onClick={openAddExpenseModal} />
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
              onAddExpenseClick={() => openAddExpenseModal(budget.id)}
            />
          );
        })}
        <AddBudgetModal isOpen={modalOpen} onClose={handleCloseModal} />
        <AddExpenseModal isOpen={modalOpen} onClose={handleCloseModal} />
      </div>
    </>
  );
}

export default App;
