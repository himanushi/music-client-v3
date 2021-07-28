export type SearchParamsType = Record<string, string>;

export const SearchParams = {
  album: {
    direction: "bd",
    favorite: "bf",
    ids: "bi",
    keyword: "bq",
    order: "bo",
    status: "bs",
    username: "bu"
  },
  artist: {
    direction: "ad",
    favorite: "af",
    ids: "ai",
    keyword: "aq",
    order: "ao",
    status: "as",
    username: "au"
  },
  playlist: {
    direction: "pd",
    favorite: "pf",
    ids: "pi",
    keyword: "pq",
    mine: "pm",
    order: "po",
    status: "ps",
    username: "pu"
  },
  radio: {
    direction: "rd",
    favorite: "rf",
    ids: "ri",
    keyword: "rq",
    order: "ro"
  },
  track: {
    direction: "td",
    favorite: "tf",
    ids: "ti",
    keyword: "tq",
    order: "to",
    random: "tr",
    status: "ts",
    username: "tu"
  }
};
