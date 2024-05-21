import React from "react";
import { useContext } from "react";
import useLocalStorage from "./hooks/useLocalStorage";

const BudgetsContext = React.createContext();
export function useBudgets() {
  return useContext(BudgetsContext);
}

export const UNCATEGORIZED_BUDGET_ID = "Uncategorised";

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudget] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  function getBudgetExpenses(budgetId) {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }

  function addExpense({ description, amount, budgetId }) {
    setExpenses((prevExpenses) => {
      return [
        ...prevExpenses,
        {
          id: `${Math.floor(Math.random() * 1000) + 1}`,
          description,
          amount,
          budgetId,
        },
      ];
    }); // Taking current expenses and adding new one with description, amount and budgetId
  }

  function addBudget({ name, max }) {
    setBudget((prevBudgets) => {
      // If budget has the same name as a previous one, return
      if (prevBudgets.find((budget) => budget.name === name))
        return prevBudgets;

      return [
        ...prevBudgets,
        { id: `${Math.floor(Math.random() * 1000) + 1}`, name, max },
      ];
    }); // Taking current budgets and adding new one with name and max value
  }

  function deleteBudget({ id }) {
    // TODO: Deal with left over expenses
    setExpenses((prevExpenses) => {
      return prevExpenses.map((expense) => {
        if (expense.budgetId !== id) return expense;
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });
    setBudget((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  }

  function deleteExpense({ id }) {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  }

  return (
    <BudgetsContext.Provider
      // What needs to be passed down through all child components?
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
  // All children have access to the value
  // Since we wrapped entire App component in the BudgetsContext, the entire App has access to everything in BudgetsContext
};

export default BudgetsProvider;
