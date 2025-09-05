import "./Actions.css";

type Props = {
  disabled: boolean;
  onDeposit: () => void;
  onWithdraw: () => void;
  onReset: () => void;
};

export default function Actions({ disabled, onDeposit, onWithdraw, onReset }: Props) {
  return (
    <div className="sb-actions">
      <button className="sb-btn green" onClick={onDeposit} disabled={disabled}>Einzahlen</button>
      <button className="sb-btn amber" onClick={onWithdraw} disabled={disabled}>Auszahlen</button>
      <button className="sb-btn gray" onClick={onReset}>Zurücksetzen</button>
    </div>
  );
}
