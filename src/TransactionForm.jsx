import { useState } from 'react'

function TransactionForm({ categories, onAddTransaction }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    onAddTransaction({
      id: Date.now(),
      description,
      amount,
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <div className="glass add-transaction">
      <h2 className="card-heading">Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Description"
          aria-label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          aria-label="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Type">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Category">
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button type="submit" className="primary-btn">Add</button>
      </form>
    </div>
  );
}

export default TransactionForm
