import fetch from "node-fetch";
import jsdom from "jsdom";

import { parseDate } from "./utils";

const { JSDOM } = jsdom;

// {date, food: {name, price}}

const RESTAURANT_ID = "5a7b3dc8b61866eafca33a3d";

const getWeekMenu = async () => {
  const res = await fetch("http://www.vivobene-gusto.cz/obedove-menu");
  const page = await res.text();
  const dom = new JSDOM(page);

  return Array.from(dom.window.document.getElementsByTagName("h2")).map(
    menu => ({
      date: parseDate(
        new Date().getFullYear(),
        ...menu.textContent
          .match(/(\d+)\.(\d+)\.\d+/)
          .slice(1, 3)
          .map(v => parseInt(v))
          .reverse()
      ),
      food: Array.from(
        menu.parentElement.nextElementSibling.getElementsByTagName("tr")
      ).map(el => ({
        name: el.children[0].textContent,
        price: parseInt(el.children[1].textContent) || null
      }))
    })
  );
};

export { RESTAURANT_ID, getWeekMenu };
