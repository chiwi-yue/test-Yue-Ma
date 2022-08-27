import './NextToGoListItem.css';
import { memo } from "react";
import { ListRace } from "../../types/racing";
import { CountdownTimer } from "../CountdownTimer/CountdownTimer";

type Props = { race: ListRace };

const _NextToGoListItem = ({ race }: Props): JSX.Element => {
  return (
    <div className="item">
      <div className="race-name">
        <b className="race-number">R{race.raceNumber}</b>
        <p>{race.meetingName}</p>
      </div>
      <CountdownTimer advertisedStart={race.advertisedStart} />
    </div>
  );
}

export const NextToGoListItem = memo(_NextToGoListItem);
