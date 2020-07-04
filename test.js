const puppeteer = require('puppeteer');

async function openTest() {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        // args: ['--start-fullscreen', '--kiosk', '--noerrdialogs', '--content-shell-hide-toolbar'],
        ignoreDefaultArgs: ['--enable-automation'],

    });

    const page = await browser.newPage()
    await page.goto('http://localhost:5000/video.html')


    await page.waitForSelector('#target');
    // await page.evaluate(() => {
    //     document.getElementById("target").addEventListener("ended", () => {
    //         console.log('ended');
    //     });
    // })

    // let result = await page.evaluate('setTimeout(()=>{document.getElementById("target").play()}, 10e3)');
    let result = await page.evaluate('setTimeout(()=>{document.getElementById("target").play()}, 3e3)');
    // let result = await page.evaluate('console.log("fdsafsdfdsaf")');


    //     let result = await page.$eval('#target', a => {
    //     console.log(a);
    // });
    // console.log(result);

    // // let targetVideo = page.$('#target');
    // console.log(result);
    // result.addEventListener("ended", ()=>{
    //     console.log('enede');
    // });

}


openTest();
