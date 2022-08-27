import './CountdownTimer.css';
import { memo, useEffect, useState } from "react";

type Props = { advertisedStart: Date };

const _CountdownTimer = ({ advertisedStart }: Props): JSX.Element => {
  const [countdownString, setCountdownString] = useState<string>();

  const getCountdownString = (): string => {
    let secondsFromNow = Math.floor((advertisedStart.getTime() - (new Date()).getTime()) / 1000);

    const prefix = secondsFromNow < 0 ? '-' : '';

    secondsFromNow = Math.abs(secondsFromNow);

    if (Math.abs(secondsFromNow) < 60) {
      return `${prefix}${secondsFromNow}s`;
    }

    const minutes = Math.floor(secondsFromNow / 60);

    if (minutes >= 60) {
      return `${Math.floor(minutes / 60)}h`;
    }

    const secondsRemainder = secondsFromNow - minutes * 60;
    
    if (minutes >= 5 || secondsRemainder === 0) {
      return `${prefix}${minutes}m`;
    }

    return `${prefix}${minutes}m ${secondsRemainder}s`;
  }

  useEffect(() => {
    setCountdownString(getCountdownString());
    setInterval(() => {
      setCountdownString(getCountdownString());
    }, 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advertisedStart]);

  return (
    <p>{countdownString}</p>
  )
}

export const CountdownTimer = memo(_CountdownTimer);
