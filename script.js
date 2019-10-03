const requestPromise = require("request-promise");
const $ = require("cheerio");

const parseIt = function(url) {
  return requestPromise(url)
    .then((html) => {
      const name = $(".firstHeading", html).text();
      const birthday = $(".bday", html).text();
      return {
        name: name,
        birthday: birthday
      };
    })
    .catch((err) => {
      throw err;
    });
};
module.exports = parseIt;
