import { useEffect, useMemo, useState } from "react";
import Header from "./components/header/Header";
import CardFace from "./components/card/CardFace";
import BalanceBox from "./components/balance/BalanceBox";
import AmountForm from "./components/amount/AmountForm";
import Actions from "./components/actions/Actions";
import { parseAmountToCents } from "./utils/money";
import "./App.css";

export default function App() {
  // баланс храним в центах
  const [balance, setBalance] = useState<number>(() => {
    const raw = localStorage.getItem("sb_balance_cents");
    return raw ? Number(raw) || 0 : 0;
    });
  const [amount, setAmount] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("sb_balance_cents", String(balance));
  }, [balance]);

  const cents = useMemo(() => parseAmountToCents(amount), [amount]);
  const invalid = Number.isNaN(cents) || cents <= 0;

  const error = amount === ""
    ? ""
    : Number.isNaN(cents)
      ? "Bitte gib einen gültigen Betrag ein (z.B. 25,50)."
      : cents <= 0
        ? "Der Betrag muss größer als 0 sein."
        : "";

  const progressPct = useMemo(() => {
    // 0% при -1000€, 100% при 10000€
    const min = -100_000, max = 1_000_000;
    const clamped = Math.max(0, Math.min(100, ((balance - min) / (max - min)) * 100));
    return clamped;
  }, [balance]);

  function deposit() { if (!invalid) { setBalance(b => b + cents); setAmount(""); } }
  function withdraw() { if (!invalid) { setBalance(b => b - cents); setAmount(""); } }
  function reset() { setBalance(0); setAmount(""); }

  return (
    <div className="sb-page">
      <Header />
      <div className="sb-shell">
        <CardFace balance={balance} />
        <div className="sb-right">
          <BalanceBox
            balance={balance}
            isOverdrawn={balance < 0}
            progressPct={progressPct}
          />
          <AmountForm amount={amount} error={error} onChange={setAmount} onEnter={deposit} />
          <Actions disabled={invalid} onDeposit={deposit} onWithdraw={withdraw} onReset={reset} />
        </div>
        <footer className="sb-footer">
          <small>© 2025 Super Bank</small>
        </footer>
      </div>
    </div>
  );
}
