import fetch from "node-fetch";
import jsdom from "jsdom";

import { parseDate } from "./utils";

const { JSDOM } = jsdom;

// {date, food: {name, price}}

const RESTAURANT_ID = "5a78b292b3eae0c4273c346d";

const getWeekMenu = async () => {
  const res = await fetch("http://www.jedna-basen.cz/bar/denni-menu/");
  const page = await res.text();
  const dom = new JSDOM(page);
  return Array.from(
    dom.window.document.getElementsByClassName("denni-menu")
  ).map(menu => {
    return {
      date: parseDate(
        new Date().getFullYear(),
        ...menu
          .getElementsByTagName("header")[0]
          .textContent.match(/(\d+)\.(\d+)/)
          .slice(1, 3)
          .map(v => parseInt(v))
          .reverse()
      ),
      food: Array.from(menu.getElementsByClassName("denni-menu-polozka"))
        .filter(food => food.textContent.trim() != "Kč")
        .map(food => ({
          name: food
            .getElementsByClassName("nazev")[0]
            .textContent.match(/^([^(]+)/)[1]
            .trim(),
          price: parseInt(
            food.getElementsByClassName("price")[0].textContent.match(/\d+/)[0]
          )
        }))
    };
  });
};

export { RESTAURANT_ID, getWeekMenu };
