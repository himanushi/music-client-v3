import { cookie } from "./cookie";

const key = "jsFileVersion";

export const reset = () => {

  localStorage.removeItem("jukebox");
  window.location.reload();

};

export const currentVersion = () => cookie.get(key);
