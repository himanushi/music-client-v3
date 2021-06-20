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

  let time = "";

  if (days !== 0) {

    time += `${days}日`;

  }
  if (hours % 24) {

    time += `${hours % 24}時間`;

  }
  if (minutes % 60) {

    time += `${minutes % 60}分`;

  }
  if (seconds % 60) {

    time += `${seconds % 60}秒`;

  }

  return time;

};

export const toMs = (tracks: readonly Track[]) => {

  const reducer = (accumulator: number, currentValue: number) => accumulator + currentValue;
  return tracks.map((track) => track.durationMs).reduce(reducer);

};
