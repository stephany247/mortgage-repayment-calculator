import { useState } from "react";
import "./App.css";
import calculator from "./assets/images/icon-calculator.svg";
import illustration from "./assets/images/illustration-empty.svg";

const inputFields = [
  {
    id: "amount",
    label: "Mortgage Amount",
    type: "text",
    unit: "£",
    position: "left",
  },
  {
    id: "term",
    label: "Mortgage Term",
    type: "number",
    unit: "years",
    position: "right",
  },
  {
    id: "rate",
    label: "Interest Rate",
    type: "number",
    unit: "%",
    position: "right",
  },
];

const mortgageTypes = ["Repayment", "Interest Only"];

function App() {
  const [values, setValues] = useState({ amount: "", term: "", rate: "" });
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [totalRepayment, setTotalRepayment] = useState(null);
  const [mortgageType, setMortgageType] = useState("Repayment"); // Default type

  // Handle input changes
  // const handleChange = (e) => {
  //   setValues({ ...values, [e.target.id]: e.target.value });
  // };

  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, ""); // Remove commas
    if (!isNaN(rawValue)) {
      setValues({ ...values, [e.target.id]: rawValue });
    }
  };

  // Handle mortgage type change
  const handleMortgageTypeChange = (e) => {
    setMortgageType(e.target.value);
  };

  // Mortgage Calculation
  const calculateMortgage = (e) => {
    e.preventDefault();

    const P = parseFloat(values.amount);
    const annualRate = parseFloat(values.rate) / 100;
    const r = annualRate / 12;
    const n = parseInt(values.term) * 12;

    if (P > 0 && annualRate > 0 && n > 0) {
      let M, totalRepayment;

      if (mortgageType === "Repayment") {
        M = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        totalRepayment = M * n;
      } else if (mortgageType === "Interest Only") {
        M = P * r;
        totalRepayment = M * n; // Interest paid over the term
      }

      setMonthlyPayment(M.toFixed(2));
      setTotalRepayment(totalRepayment.toFixed(2));
    } else {
      setMonthlyPayment("Invalid input");
      setTotalRepayment("Invalid input");
    }
  };

  return (
    <main className="max-w-5xl mx-auto w-full rounded-3xl text-left bg-neutral-white flex flex-col md:flex-row gap-6 shadow-lg">
      <form
        onSubmit={calculateMortgage}
        className="mt-6 flex flex-col gap-6 px-6 py-8 md:w-1/2"
      >
        <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
          <h1 className="font-bold text-neutral-slate-900 text-3xl">
            Mortgage Calculator
          </h1>
          <input
            type="reset"
            value="Clear All"
            className="underline font-bold text-left"
            onClick={() => {
              setValues({ amount: "", term: "", rate: "" });
              setMonthlyPayment(null);
            }}
            aria-label="Clear all fields"
          />
        </div>

        <div className="flex flex-col gap-4">
          {/* First input (full width) */}
          <div className="flex flex-col gap-2">
            <label htmlFor={inputFields[0].id}>{inputFields[0].label}</label>
            <div className="relative w-full border border-neutral-slate-500 rounded-md group focus-within:border-primary-lime">
              {/* Left-aligned unit (Currency sign) */}
              {inputFields[0].position === "left" && (
                <span className="absolute px-3 py-2 rounded-l-md bg-neutral-slate-100 left-0 top-1/2 -translate-y-1/2 text-neutral-slate-500 font-bold group-focus-within:bg-primary-lime">
                  {inputFields[0].unit}
                </span>
              )}
              <input
                type={inputFields[0].type}
                id={inputFields[0].id}
                name={inputFields[0].id}
                // value={Number(values[inputFields[0].id]).toLocaleString()}
                value={
                  values[inputFields[0].id]
                    ? Number(values[inputFields[0].id]).toLocaleString()
                    : ""
                }
                onChange={handleChange}
                className={`border border-transparent text-neutral-slate-900 font-bold rounded-md py-2 w-full text-left outline-none px-3 hover:border-neutral-slate-700 focus:border-primary-lime transition duration-200 ease-in-out
          ${inputFields[0].position === "left" ? "pl-10 pr-3" : "pl-3 pr-10"}`}
                required
              />
              {/* Right-aligned unit (Years, Percentage) */}
              {inputFields[0].position === "right" && (
                <span className="absolute px-3 py-2 rounded-r-md bg-neutral-slate-100 right-[1px] top-1/2 -translate-y-1/2 text-neutral-slate-500 font-bold group-focus-within:bg-primary-lime">
                  {inputFields[0].unit}
                </span>
              )}
            </div>
          </div>

          {/* Second & Third Inputs - Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inputFields.slice(1, 3).map((field) => (
              <div key={field.id} className="flex flex-col gap-2">
                <label htmlFor={field.id}>{field.label}</label>
                <div className="relative w-full border border-neutral-slate-500 rounded-md group focus-within:border-primary-lime">
                  {/* Left-aligned unit (Currency signs) */}
                  {field.position === "left" && (
                    <span className="absolute px-3 py-2 rounded-l-md bg-neutral-slate-100 left-0 top-1/2 -translate-y-1/2 text-neutral-slate-500 font-bold group-focus-within:bg-primary-lime">
                      {field.unit}
                    </span>
                  )}
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    value={values[field.id]}
                    onChange={handleChange}
                    className={`border border-transparent text-neutral-slate-900 font-bold rounded-md py-2 w-full text-left outline-none px-3 hover:border-neutral-slate-700 focus:border-primary-lime transition duration-200 ease-in-out
              ${field.position === "left" ? "pl-10 pr-3" : "pl-3 pr-10"}`}
                    required
                  />
                  {/* Right-aligned unit (Years, Percentage) */}
                  {field.position === "right" && (
                    <span className="absolute px-3 py-2 rounded-r-md bg-neutral-slate-100 right-0 top-1/2 -translate-y-1/2 text-neutral-slate-500 font-bold group-focus-within:bg-primary-lime">
                      {field.unit}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <fieldset>
          <legend>Mortgage Type</legend>
          <div className="flex flex-col gap-3 mt-2">
            {mortgageTypes.map((type, index) => (
              <div
                key={index}
                className="border border-neutral-slate-500 hover:border-primary-lime active:bg-primary-red/5 rounded-md p-2 transition duration-200 ease-in-out"
              >
                <label className="flex items-center gap-2 text-neutral-slate-900 font-bold cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value={type}
                    checked={mortgageType === type}
                    onChange={handleMortgageTypeChange}
                    className="accent-primary-lime"
                    required
                  />
                  {type}
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-primary-lime hover:bg-primary-lime/60 text-neutral-slate-900 font-bold py-3 rounded-full hover:bg-opacity-80 transition duration-200 ease-in-out md:w-3/5"
          aria-label="Calculate mortgage repayments"
        >
          <img src={calculator} alt="Calculator icon" />
          <p>Calculate Repayments</p>
        </button>
      </form>

      
      <section className="bg-neutral-slate-900/95 text-center md:rounded-bl-[20%] md:rounded-r-3xl md:w-1/2 flex items-stretch">
        {monthlyPayment === null ? (
          // Show this when form hasn't been submitted
          <div className="p-8 space-y-4 text-neutral-slate-300 self-center">
            <img
              src={illustration}
              alt="Empty illustration"
              className="mx-auto"
            />
            <h1 className="text-neutral-white font-bold text-2xl">
              Results shown here
            </h1>
            <p>
              Complete the form and click "calculate repayments" to see what
              your monthly repayments would be.
            </p>
          </div>
        ) : (
          // Show this when form is submitted
          <div className="text-left p-6 space-y-4 md:space-y-6 text-neutral-slate-300">
            <h1 className="text-neutral-white font-bold text-2xl">
              Your results
            </h1>
            <p>
              Your results are shown below based on the information you
              provided. To adjust the results, edit the form and click
              "Calculate Repayments" again.
            </p>
            <div className="bg-neutral-slate-900 px-4 py-8 rounded-lg border-t-4 border-primary-lime space-y-4 md:space-y-6">
              <div className="space-y-2">
                <p>Your monthly payments</p>
                <h1 className="text-primary-lime text-4xl font-bold">
                  £{Number(monthlyPayment).toLocaleString()}
                </h1>
              </div>
              <hr className="text-neutral-slate-700"></hr>
              <div className="space-y-2">
                <p>Total you'll repay over the term</p>
                <h2 className="text-neutral-white font-bold text-2xl">
                  £{Number(totalRepayment).toLocaleString()}
                </h2>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
