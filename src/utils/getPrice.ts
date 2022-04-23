import puppeteer from 'puppeteer'
import sendEmail from './sendEmail';

const getPrice = async () => {

    console.info(`GETTING SOLANA PRICE!`);
    const browser = await puppeteer.launch({
        args: ["--no-sandbox"],
        headless: true,
    });

    const page = (await browser.pages())[0];

    try {
        await page.setRequestInterception(true);
        page.on("request", (ev) => {
            if (
                ev.resourceType() === "image"
            ) {
                ev.abort();
            } else {
                ev.continue();
            }
        });

        const PRICE_URL = "https://www.binance.com/en/trade/SOL_USDT";
        await page.goto(PRICE_URL, { waitUntil: "networkidle2" });

        const { price, percent } = await page.evaluate(() => {
            const price = document.querySelector(".showPrice")?.textContent;
            const percent = document.querySelector(
                ".tickerPriceText > span > div"
            )?.textContent;

            return {
                price: Number(price),
                percent: `${percent}%`,
            };
        });

        await browser.close();

        const USER_TO = "novqigarrixdev@gmail.com";

        if (price <= 95) {
            console.info(`PRICE IS GOING DOWN!!!`);

            const message = `
                  Hy, there. SOLANA's price is going down now. Can you please, check it out? Here's the details of the price: <br>
  
                  PRICE: ${price}
                  PERCENT: ${percent}
              `;
            // Send email

            console.log(`SENDING EMAIL!`);
            const mailInfo = await sendEmail("SOL GOING DOWN!", message, USER_TO);
            console.info(`MAIL SENDED, WITH REPONSE: ${mailInfo}`);
        } else if (price >= 105) {
            console.info(`PRICE IS GOING UP!!!`);

            const message = `
                  Hy, there. SOLANA's price is going up now. Can you please, check it out? Here's the details of the price: <br>
  
                  PRICE: ${price}
                  PERCENT: ${percent}
              `;
            // Send email

            console.log(`SENDING EMAIL!`);
            const mailInfo = await sendEmail("SOL GOING UP!", message, USER_TO);
            console.info(`MAIL SENDED, WITH REPONSE: ${mailInfo}`);
        }

        await browser.close();

        return {
            price, percent
        };
    } catch (error: any) {
        console.error(error.message);
        return null;
    }
};

export default getPrice