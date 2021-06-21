import type { Track } from "~/graphql/types";

export const convertDate = (date: string) => new Date(date).toLocaleDateString("jp", {
  day: "numeric",
  month: "long",
  year: "numeric"
});

export const convertTime = (ms: number) => {

  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / (1000 * 60)) % 60;
  const hours = Math.floor(ms / (1000 * 60 * 60)) % 24;
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));

  let time = "";

  if (days !== 0) {

    time += `${days}日`;

  }
  if (hours) {

    time += `${hours}時間`;

  }
  if (minutes) {

    time += `${minutes}分`;

  }
  if (seconds) {

    time += `${seconds}秒`;

  }

  return time;

};

export const toMs = (tracks: readonly Track[]) => {

  if (tracks.length > 0) {

    const reducer = (accumulator: number, currentValue: number) => accumulator + currentValue;
    return tracks.map((track) => track.durationMs).reduce(reducer);

  }
  return 0;

};
