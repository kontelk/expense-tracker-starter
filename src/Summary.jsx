import { useEffect, useRef, useState } from 'react'

function useCountUp(target) {
  const numericTarget = Number(target);
  const animatable = Number.isFinite(numericTarget);

  const [reduceMotion] = useState(() => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);
  const shouldAnimate = animatable && !reduceMotion;

  const [display, setDisplay] = useState(shouldAnimate ? 0 : numericTarget);
  const frame = useRef(null);

  useEffect(() => {
    if (!shouldAnimate) return;

    const duration = 600;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(numericTarget * eased);
      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
      } else {
        setDisplay(numericTarget);
      }
    };

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [shouldAnimate, numericTarget]);

  if (!animatable) return target;
  return shouldAnimate ? Math.round(display) : numericTarget;
}

function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const incomeDisplay = useCountUp(totalIncome);
  const expensesDisplay = useCountUp(totalExpenses);
  const balanceDisplay = useCountUp(balance);

  return (
    <div className="summary">
      <div className="glass summary-card summary-card--income">
        <h3>Income</h3>
        <p className="income-amount">${incomeDisplay}</p>
      </div>
      <div className="glass summary-card summary-card--expense">
        <h3>Expenses</h3>
        <p className="expense-amount">${expensesDisplay}</p>
      </div>
      <div className="glass summary-card summary-card--balance">
        <h3>Balance</h3>
        <p className="balance-amount">${balanceDisplay}</p>
      </div>
    </div>
  );
}

export default Summary
