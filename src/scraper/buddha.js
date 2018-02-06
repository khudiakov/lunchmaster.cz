import fetch from "node-fetch";
import jsdom from "jsdom";

import { parseDate } from "./utils";

const { JSDOM } = jsdom;

// {date, food: {name, price}}

const RESTAURANT_ID = "5a777fe2172781aef7709c1a";

const getWeekMenu = async () => {
  const res = await fetch("http://www.indian-restaurant-buddha.cz/");
  const page = await res.text();
  const dom = new JSDOM(page);
  return Array.from(dom.window.document.getElementsByClassName("textmenu")).map(
    el => ({
      date: parseDate(
        new Date().getFullYear(),
        ...el
          .getElementsByClassName("vyrazne")[0]
          .textContent.match(/(\d+)\. (\d+)\./)
          .slice(1, 3)
          .map(v => parseInt(v))
          .reverse()
      ),
      food: el.textContent
        .split("\n")
        .map(line => line.match(/\*\s+(?:VEG\s)?[^ ]+ ([^(]+)[^)]+\) (\d+)/))
        .filter(match => match != null)
        .map(match => ({ name: match[1], price: parseInt(match[2]) }))
    })
  );
};

export { RESTAURANT_ID, getWeekMenu };
