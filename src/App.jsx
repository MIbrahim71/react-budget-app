import AddBudgetModal from "./components/AddBudgetModal";
import BudgetCard from "./components/BudgetCard";
import Header from "./components/Header";
import { useState } from "react";
import { BudgetsProvider, useBudgets } from "./contexts/BudgetsContext";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const { budgets, getBudgetExpenses } = useBudgets();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Header onOpenModal={handleOpenModal} />
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
            />
          );
        })}
        <AddBudgetModal isOpen={modalOpen} onClose={handleCloseModal} />
      </div>
    </>
  );
}

export default App;
