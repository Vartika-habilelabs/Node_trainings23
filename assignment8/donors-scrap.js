const puppeteer = require('puppeteer');
const xlsx = require('xlsx'); // Import the xlsx library

(async () => {
  const browser = await puppeteer.launch({
    headless: false // Launch the browser in non-headless mode
  });
  const page = await browser.newPage();

  // Navigate to the page
  await page.goto('https://hte.rajasthan.gov.in/bhamashah-contributors');

  // Wait for the page to load
  await page.waitForSelector('.col-sm-7');

  // Extract data from all .col-sm-7 elements
  const data = await page.evaluate(() => {
    const results = [];
    const elements = document.querySelectorAll('.col-sm-7');

    elements.forEach(element => {
      const name = element.querySelector('h5.hte-title').textContent.trim();
      const college = element.querySelector('p.mt-3.text-height-0').textContent.trim();
      const location = element.querySelectorAll('p.text-height-0')[0].textContent.trim();
      let mobile = element.querySelector('p.text-height-0 i.fas.fa-phone-square-alt');
      if (mobile) {
        mobile = mobile.nextSibling.textContent.trim();
      }

      results.push({
        name,
        college,
        location,
        mobile
      });
    });

    return results;
  });

  // Output the extracted data
  console.log(data);

  // Create a new Excel workbook and add a worksheet
  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.json_to_sheet(data);

  // Add the worksheet to the workbook
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Save the workbook to a file
  xlsx.writeFile(workbook, 'output.xlsx');

  // Close the browser
  await browser.close();
})();

