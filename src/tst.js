const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto('https://www.instagram.com/')

    const actions = [];
    const logAction = (action) => {
        actions.push(action)
    }
    const logClickAction = (x, y) => {
        logAction('Clicked at (${x}, ${y})')
        console.log(x, y)
    }

    try {
        const elementToClick = await page.waitForSelector('.#mount_0_0_pi > div > div > div:nth-child(2) > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div > div.x7r02ix.xf1ldfh.x131esax.xdajt7p.xxfnqb6.xb88tzc.xw2csxc.x1odjw0f.x5fp0pe.x5yr21d.x19onx9a > div > button._a9--._a9_0', {visible: true});
        console.log(elementToClick)
        const elementBoundingBox = await elementToClick.boundingBox();
        const clickX = elementBoundingBox.x + elementBoundingBox.width / 2;
        const clickY = elementBoundingBox.y + elementBoundingBox.height / 2;
        await page.mouse.click(clickX, clickY);
        logClickAction(clickX, clickY); 
    } catch (error) {
        console.log(error)
    }
     
})();