import fetch from "node-fetch";
import jsdom from "jsdom";

import { parseDate } from "./utils";

const { JSDOM } = jsdom;

// {date, food: {name, price}}

const RESTAURANT_ID = "5a7a0a6ebc410a19beb95fe1";

const getWeekMenu = async () => {
  const res = await fetch("http://www.noknokrestaurant.cz/");
  const page = await res.text();
  const dom = new JSDOM(page);
  return Array.from(
    dom.window.document
      .getElementsByClassName("restaurant-menu")[2]
      .getElementsByTagName("li")
  )
    .filter(el => el.className.match(/erm_section|erm_product/) != null)
    .reduce(
      (acc, el) =>
        el.className === "erm_section"
          ? acc.push({
              date: parseDate(
                new Date().getFullYear(),
                ...el.childNodes[0].textContent
                  .match(/(\d+)\. (\d+)/)
                  .slice(1, 3)
                  .map(v => parseInt(v))
                  .reverse()
              ),
              food: []
            }) && acc
          : acc[acc.length - 1]["food"].push({
              name: el.getElementsByClassName("erm_product_desc")[0]
                .textContent,
              price: parseInt(el.getElementsByClassName("price")[0].textContent)
            }) && acc,
      []
    );
};

export { RESTAURANT_ID, getWeekMenu };
