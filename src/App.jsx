import BudgetCard from "./components/BudgetCard";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <div className="budget-container">
        <BudgetCard name="Entertainment" amount={0} max={1000} />
        <BudgetCard name="Rent" amount={0} max={1000} />
      </div>
    </>
  );
}

export default App;
