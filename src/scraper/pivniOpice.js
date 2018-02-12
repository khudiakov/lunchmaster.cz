import fetch from "node-fetch";
import jsdom from "jsdom";

import { parseDate } from "./utils";

const { JSDOM } = jsdom;

// {date, food: {name, price}}

function* generatePrice() {
  while (true) {
    yield 0;
    yield 92;
    yield 98;
  }
}
let priceGenerator = generatePrice();

const RESTAURANT_ID = "5a81e81f86b5ca677db21381";

const getWeekMenu = async () => {
  const res = await fetch("http://www.pivniopice.cz/denni-menu/");
  const page = await res.text();
  const dom = new JSDOM(page);

  const menu = [];
  let element = dom.window.document
    .getElementsByClassName("box")[0]
    .firstElementChild.firstElementChild.getElementsByTagName("b")[0];
  while (element != null) {
    if (element.tagName === "B") {
      menu.push({
        date: parseDate(
          new Date().getFullYear(),
          ...element.textContent
            .match(/(\d+)\.(\d+)/)
            .slice(1, 3)
            .map(v => parseInt(v))
            .reverse()
        ),
        food: []
      });
    } else if (element.tagName === "P") {
      menu[menu.length - 1]["food"].push({
        name: element.textContent.match(/[\–\:]\s(.*)/)[1],
        price: priceGenerator.next()["value"]
      });
    }
    element = element.nextElementSibling;
  }
  return menu;
};

export { RESTAURANT_ID, getWeekMenu };
