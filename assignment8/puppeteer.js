const puppeteer = require("puppeteer");
const xlsx = require('xlsx');
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  let data=[];
  for (let i = 1; i <= 50; i++) {
    await page.goto(
      `https://zipnet.delhipolice.gov.in/index.php?page=un_identified_dead_bodies_search&criteria=browse_all&Page_No=${i}`
    );
    await page.waitForSelector("#AutoNumber15");
    const body = await page.evaluate(() => {
      const results = [];
      const elements = document.querySelectorAll("#AutoNumber15");
      for (let element of elements) {
        const remarks =
          element.childNodes[1].children[22].children[1].textContent;
        const notification =
          element.childNodes[1].children[26].children[1].textContent;
        if (remarks &&  notification) {
          results.push({ remarks, notification });
        }
      }
      return results;
    });
    if(body.length)data.push({remarks:body[0].remarks,notification:body[0].notification});
  }
  console.log(data);

  const workbook=xlsx.utils.book_new();
  const worksheet = xlsx.utils.json_to_sheet(data);
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  xlsx.writeFile(workbook,'results.xlsx')
  await browser.close();
})();
