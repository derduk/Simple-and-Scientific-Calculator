import { useState, useEffect } from "react";
import { evaluate } from "mathjs";

function Calculator() {
  const [theme, setTheme] = useState("light");
  const [display, setDisplay] = useState("0");
  const [showScientific, setShowScientific] = useState(false);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleNumber = (num) => {
    setDisplay((prev) => (prev === "0" ? num : prev + num));
  };

  const handleOperator = (op) => {
    if (!["+", "-", "*", "/", "×", "÷"].includes(display.slice(-1))) {
      setDisplay((prev) => prev + op);
    }
  };

  const handleEquals = () => {
    try {
      const formatted = display
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/√/g, "sqrt")
        .replace(/π/g, "pi")
        .replace(/e/g, "e");

      const result = evaluate(formatted);
      setDisplay(String(result));
    } catch {
      setDisplay("Error");
    }
  };

  const handleClear = () => {
    setDisplay("0");
  };

  const handleDecimal = () => {
    setDisplay((prev) => prev + ".");
  };

  const handleDelete = () => {
    setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : ""));
  };

  const insertFunc = (func) => {
    setDisplay((prev) => prev + func + "(");
  };

  const scientificButtons = [
    { label: "sin", onClick: () => insertFunc("sin") },
    { label: "cos", onClick: () => insertFunc("cos") },
    { label: "tan", onClick: () => insertFunc("tan") },
    { label: "log", onClick: () => insertFunc("log10") },
    { label: "ln", onClick: () => insertFunc("log") },
    { label: "√", onClick: () => insertFunc("√") },
    { label: "x²", onClick: () => setDisplay((prev) => prev + "^2") },
    { label: "π", onClick: () => setDisplay((prev) => prev + "π") },
    { label: "e", onClick: () => setDisplay((prev) => prev + "e") },
  ];

  const basicButtons = [
    { label: "AC", onClick: handleClear, className: "clear-btn" },
    {
      label: "(",
      onClick: () => setDisplay((prev) => prev + "("),
      className: "operator-btn",
    },
    {
      label: ")",
      onClick: () => setDisplay((prev) => prev + ")"),
      className: "operator-btn",
    },
    {
      label: "÷",
      onClick: () => handleOperator("÷"),
      className: "operator-btn",
    },
    { label: "7", onClick: () => handleNumber("7"), className: "number-btn" },
    { label: "8", onClick: () => handleNumber("8"), className: "number-btn" },
    { label: "9", onClick: () => handleNumber("9"), className: "number-btn" },
    {
      label: "×",
      onClick: () => handleOperator("×"),
      className: "operator-btn",
    },
    { label: "4", onClick: () => handleNumber("4"), className: "number-btn" },
    { label: "5", onClick: () => handleNumber("5"), className: "number-btn" },
    { label: "6", onClick: () => handleNumber("6"), className: "number-btn" },
    {
      label: "-",
      onClick: () => handleOperator("-"),
      className: "operator-btn",
    },
    { label: "1", onClick: () => handleNumber("1"), className: "number-btn" },
    { label: "2", onClick: () => handleNumber("2"), className: "number-btn" },
    { label: "3", onClick: () => handleNumber("3"), className: "number-btn" },
    {
      label: "+",
      onClick: () => handleOperator("+"),
      className: "operator-btn",
    },
    {
      label: "0",
      onClick: () => handleNumber("0"),
      className: "number-btn zero-btn",
    },
    { label: ".", onClick: handleDecimal, className: "number-btn" },
    { label: "DEL", onClick: handleDelete, className: "delete-btn" },
    { label: "=", onClick: handleEquals, className: "equals-btn" },
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;

      if (!isNaN(key)) return handleNumber(key);

      const operators = ["+", "-", "*", "/", "×", "÷"];
      if (operators.includes(key)) {
        const operator = key === "*" ? "×" : key === "/" ? "÷" : key;
        return handleOperator(operator);
      }

      if (key === "Enter" || key === "=") return handleEquals();
      if (key === ".") return handleDecimal();
      if (key === "Backspace" || "Delete") return handleDelete();
      if (key.toLowerCase() === "c") return handleClear();
      if (key === "(" || key === ")") {
        return setDisplay((prev) => prev + key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [display]);

  return (
    <>
      <div className={`app ${theme}`}>
        <div className="header">
          <div className="logo">BEELINE INC</div>
          <div className="theme-header">
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === "light" ? "Dark" : "Light"} Mode
            </button>
          </div>
        </div>

        <div className="calculator">
          <div className="display">{display}</div>

          <button
            className="mode-toggle"
            onClick={() => setShowScientific((prev) => !prev)}
          >
            {showScientific ? "Back To Basic" : "Go Scientific"}
          </button>

          {showScientific && (
            <div className="scientific-grid">
              {scientificButtons.map((btn, idx) => (
                <button key={idx} onClick={btn.onClick}>
                  {btn.label}
                </button>
              ))}
            </div>
          )}

          <div
            className={`button-grid ${showScientific ? "scientific-mode" : ""}`}
          >
            {basicButtons.map((btn, idx) => (
              <button
                key={idx}
                onClick={btn.onClick}
                className={btn.className || ""}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Calculator;
