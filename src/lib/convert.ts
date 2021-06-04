import type { Track } from "~/graphql/types";

export const convertDate = (date: string) => new Date(date).toLocaleDateString("jp", {
  day: "numeric",
  month: "long",
  year: "numeric"
});

export const convertTime = (ms: number) => {

  const seconds = parseInt((ms / 1000).toFixed(0), 10);
  const minutes = parseInt((ms / (1000 * 60)).toFixed(0), 10);
  const hours = parseInt((ms / (1000 * 60 * 60)).toFixed(0), 10);
  const days = parseInt((ms / (1000 * 60 * 60 * 24)).toFixed(0), 10);

  if (seconds < 60) {

    return `${seconds}秒`;

  } else if (minutes < 60) {

    return `${minutes}分`;

  } else if (hours < 24) {

    return `${hours}時間`;

  }
  return `${days}日`;

};

export const toMs = (tracks: readonly Track[]) => {

  const reducer = (accumulator: number, currentValue: number) => accumulator + currentValue;
  return tracks.map((track) => track.durationMs).reduce(reducer);

};
