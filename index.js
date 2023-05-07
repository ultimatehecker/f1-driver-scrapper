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

    await page.waitForSelector(".wikitable.sortable.jquery-tablesorter");

    const content = await page.$$eval('tbody > tr', rows => {
        return Array.from(rows, row => {
            const col = row.querySelectorAll('td');
            return Array.from(col, c => c.textContent.trim().replace(/['"]+/g, ''))
        });
    });

    console.log(content);

    /* Storing Data in CSV file */

    await broswer.close();
})();