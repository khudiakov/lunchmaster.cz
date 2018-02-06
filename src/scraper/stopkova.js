import fetch from "node-fetch";
import jsdom from "jsdom";

import { parseDate } from "./utils";

const { JSDOM } = jsdom;

// {date, food: {name, price}}

const URL = "http://www.kolkovna.cz/cs/stopkova-plzenska-pivnice-16/denni-menu";

const RESTAURANT_ID = "5a78b1feb3eae0c4273c346c";

const getWeekMenu = async () => {
  const res = await fetch(URL);
  const page = await res.text();
  const dom = new JSDOM(page);

  return Array.from(
    dom.window.document
      .getElementsByClassName("dailyMenuWeek")[0]
      .getElementsByTagName("section")
  ).map(el => ({
    date: parseDate(
      ...el
        .getElementsByTagName("h2")[0]
        .textContent.match(/(\d+)\.(\d+)\.\s?(\d+)/)
        .slice(1, 4)
        .map(v => parseInt(v))
        .reverse()
    ),
    food: Array.from(el.getElementsByTagName("tr")).map(foodEl => ({
      name: foodEl
        .getElementsByClassName("name")[0]
        .textContent.replace(/\|[^|]+\|/, ""),
      price: parseInt(foodEl.getElementsByClassName("price")[0].textContent)
    }))
  }));
};

export { RESTAURANT_ID, getWeekMenu };
