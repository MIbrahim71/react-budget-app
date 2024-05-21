import { useRef } from "react";
import { useBudgets } from "../contexts/BudgetsContext";

export default function AddBudgetModal({ onClose }) {
  const nameRef = useRef();
  const maxRef = useRef();
  const { addBudget } = useBudgets();

  function handleSubmit(e) {
    e.preventDefault();
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
    });
    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <header className="modal-header">
          <h1>New Budget</h1>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="modal-input name">
            <h2>Name</h2>
            <input type="text" ref={nameRef} required />
          </div>

          <div className="modal-input spend">
            <h2>Limit</h2>
            <input type="number" ref={maxRef} min={0} required />
          </div>

          <div className="modal-footer">
            <button className="modal-addbtn" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
