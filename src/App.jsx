import BudgetCard from "./components/BudgetCard";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <div className="budget-container">
        <BudgetCard />
      </div>
    </>
  );
}

export default App;
