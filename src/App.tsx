import { useState } from 'react';
import './App.css';
import { sumStringNumbers, checkInput } from './utils/stringCalculator';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const handleCalculate = () => {
    // Reset error state
    setError(false);

    try {
      // Check if input is valid first
      if (!checkInput(input)) {
        setError(true);
        setResult(null);
        return;
      }

      // Calculate sum using the utility function
      const sum = sumStringNumbers(input);
      setResult(sum);

    } catch {
      // Any error in calculation will set the error state
      setError(true);
      setResult(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCalculate();
  }

  return (
    <div className="app-container">
      <img
        src='https://images.unsplash.com/photo-1594352161389-11756265d1b5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        width={600}
        height={400}
        role='img'
        alt='spool of thread'
      />

      <header><h2>String Calculator</h2></header>

      <form onSubmit={handleSubmit} className="calculator-form">
        <label data-testid='label' htmlFor="number-input" className="input-label">Enter numbers separated by comma</label>
        <textarea
          id="number-input"
          data-testid="number-input"
          className="input-textarea"
          aria-describedby='feedback-help'
          placeholder='Enter numbers separated by comma: Example 1,2,3'
          value={input}
          onChange={handleInputChange}
          rows={4}
        />
        <p id="feedback-help">
          Please enter numbers in the format:
          <span aria-label="1 comma 2 comma 3">1, 2, 3</span>
        </p>
        <button
          onClick={handleCalculate}
          data-testid='button'
          className="calculate-button">
          Calculate
        </button>
      </form>

      <div role="alert" aria-live="assertive" aria-atomic="true">
        {error && <p key={error ? "true" : "false"}>Make sure you enter numbers correctly!</p>}
      </div>

      <div role="status" aria-live="polite" aria-atomic="true">
        {result !== null && <p key={result}>Result: {result}</p>}
      </div>
    </div>
  );
};

export default App;
