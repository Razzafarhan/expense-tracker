import React, { useState } from 'react';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [editingExpense, setEditingExpense] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [sortType, setSortType] = useState('date');

  const addExpense = () => {
    if (name && amount && category) {
      if (editingExpense) {
        // Update existing expense
        const updatedExpenses = expenses.map((expense) =>
          expense.id === editingExpense.id
            ? { ...expense, name, amount: parseFloat(amount), category }
            : expense
        );
        setExpenses(updatedExpenses);
        setEditingExpense(null);
      } else {
        // Add new expense
        const newExpense = {
          id: expenses.length + 1,
          name,
          amount: parseFloat(amount),
          category,
          date: new Date().toLocaleDateString(),
        };
        setExpenses([...expenses, newExpense]);
      }
      setName('');
      setAmount('');
      setCategory('');
    }
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  const filteredExpenses = expenses
    .filter((expense) => (filterCategory ? expense.category === filterCategory : true))
    .sort((a, b) => {
      if (sortType === 'date') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortType === 'amount') {
        return b.amount - a.amount;
      }
      return 0;
    });

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      {/* Filter and Sort Controls */}
      <div>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">All Categories</option>
          {/* Add options for categories */}
        </select>
        <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>
      </div>
      {/* Expense Form */}
      <div className="expense-form">
        <input type="text" placeholder="Expense Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <button onClick={addExpense}>{editingExpense ? 'Save' : 'Add Expense'}</button>
      </div>
      {/* Expense List */}
      <div className="expense-list">
        <h2>Expense List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.name}</td>
                <td>{expense.amount.toFixed(2)}rs</td>
                <td>{expense.category}</td>
                <td>{expense.date}</td>
                <td>
                  <button onClick={() => setEditingExpense(expense)}>Edit</button>
                  <button onClick={() => deleteExpense(expense.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

