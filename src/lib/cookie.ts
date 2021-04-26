import Cookie, { CookieAttributes } from "js-cookie";

export const cookie = {
  get: (name: string) => Cookie.get(name),
  remove: (name: string, options?: CookieAttributes) => Cookie.remove(name, options),
  set: (name: string, value: string, options?: CookieAttributes) => {

    const opts: CookieAttributes = options ?? {};

    // セキュアに保つ
    if (window.location.protocol === "https:") {

      opts.secure = true;

    }

    // 保存期間が指定されていない場合は1年とする
    if (opts.expires === undefined) {

      const date = new Date();
      date.setFullYear(date.getFullYear() + 1);
      opts.expires = date;

    }

    return Cookie.set(name, value, opts);

  }
};
