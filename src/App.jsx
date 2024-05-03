import AddBudgetModal from "./components/AddBudgetModal";
import BudgetCard from "./components/BudgetCard";
import Header from "./components/Header";
import { useState } from "react";

function App() {
  const [modalOpen, setModalOpen] = useState(false);

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
        <BudgetCard name="Entertainment" amount={300} max={1000} />
        <BudgetCard name="Rent" amount={900} max={1000} />
        <AddBudgetModal isOpen={modalOpen} onClose={handleCloseModal} />
      </div>
    </>
  );
}

export default App;
