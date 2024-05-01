import BudgetCard from "./components/BudgetCard";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <div className="budget-container">
        <BudgetCard name="Entertainment" />
        <BudgetCard name="Rent" />
      </div>
    </>
  );
}

export default App;
