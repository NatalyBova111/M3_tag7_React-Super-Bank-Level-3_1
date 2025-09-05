import "./AmountForm.css";

type Props = {
  amount: string;
  error: string;
  onChange: (v: string) => void;
  onEnter: () => void;
};

export default function AmountForm({ amount, error, onChange, onEnter }: Props) {
  return (
    <div className="sb-amount">
      <label htmlFor="amount">Betrag</label>
      <input
        id="amount"
        inputMode="decimal"
        placeholder="z. B. 25,50"
        value={amount}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onEnter()}
        aria-invalid={!!error}
        aria-describedby="amount-help"
      />
      <div id="amount-help" className={`sb-amount__help ${error ? "is-error" : ""}`}>
        {error || "Enter = Einzahlen"}
      </div>
    </div>
  );
}
