import { CreditCard } from "react-kawaii";
import { moodForBalance } from "../../utils/money";
import type { Mood } from "../../types/bank";
import "./CardFace.css";

type Props = { balance: number };

export default function CardFace({ balance }: Props) {
  const { mood, color, label } = moodForBalance(balance);

  return (
    <div className="sb-cardface">
      <div className="sb-cardface__icon">
        <CreditCard size={180} mood={mood as Mood} color={color} />
      </div>
      <div className="sb-cardface__tag">{label}</div>
    </div>
  );
}

