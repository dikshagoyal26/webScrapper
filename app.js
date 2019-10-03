const requestPromise = require("request-promise");
const $ = require("cheerio");
const script = require("./script");
const url =
  "https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States";

requestPromise(url)
  .then((html) => {
    // console.log("html", html);
    const wikiUrls = [];
    for (let i = 0; i < $("big > a", html).length; i++) {
      wikiUrls.push($("big>a", html)[i].attribs.href);
    }
    console.log("wiki urls", wikiUrls);
    return Promise.all(
      wikiUrls.map((url) => {
        return script("https://en.wikipedia.org" + url);
      })
    );

    //  console.log($("big > a", html).length);
    //  console.log($("big > a", html));
  })
  .then(function(presidents) {
    console.log(presidents);
  })
  .catch((err) => {
    console.log("err", err);
  });
