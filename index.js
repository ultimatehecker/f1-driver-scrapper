const pup = require("puppeteer");
const fs = require("fs");

require("dotenv").config();

(async () => {
    const broswer = await pup.launch();
    const page = await broswer.newPage();

    await page.goto(process.env.WEB_URL, {
        waitUntil: "networkidle2"
    });

    await page.screenshot({ path: "driverWiki.png" });

    /* Web Scrapping */

    /* Storing Data in CSV file */

    await broswer.close();
})();