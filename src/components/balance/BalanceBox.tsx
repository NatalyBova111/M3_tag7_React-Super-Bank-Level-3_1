import "./BalanceBox.css";
import { centsToEuro } from "../../utils/money";

type Props = { balance: number; isOverdrawn: boolean; progressPct: number };

export default function BalanceBox({ balance, isOverdrawn, progressPct }: Props) {
  return (
    <section className="sb-balance">
      <div className="sb-balance__label">Dein Girokonto</div>
      <div className="sb-balance__value">{centsToEuro(balance)}</div>
      <div className="sb-progress" aria-label="Vermögensfortschritt">
        <div className="sb-progress__fill" style={{ width: `${progressPct}%` }} />
      </div>
      {isOverdrawn && (
        <div className="sb-balance__warn">⚠️ Konto überzogen. Vermeide Auszahlungen.</div>
      )}
    </section>
  );
}
