import { createRequire } from "module";
import axios from "axios";
const require = createRequire(import.meta.url);
const bodyParser = require("body-parser");
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

app.use(bodyParser.json());
const PORT = process.env.PORT || 8080;
const puppeteer = require('puppeteer');
    const extractItems = async(page)  => {
        let maps_data = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".Nv2PK")).map((el) => {
            const link = el.querySelector("a.hfpxzc").getAttribute("href");
            return {
            title: el.querySelector(".qBF1Pd")?.textContent.trim(),
            avg_rating: el.querySelector(".MW4etd")?.textContent.trim(),
            image: el.querySelector(".FQ2IWe img")?.getAttribute("src"),
            address: el.querySelector(".W4Efsd:last-child > .W4Efsd:nth-of-type(1) > span:last-child")?.textContent.replaceAll("·", "").trim(),
            description: el.querySelector(".W4Efsd:last-child > .W4Efsd:nth-of-type(2)")?.textContent.replace("·", "").trim(),
            website: el.querySelector("a.hfpxzc")?.getAttribute("href"),
            category: el.querySelector(".W4Efsd:last-child > .W4Efsd:nth-of-type(1) > span:first-child")?.textContent.replaceAll("·", "").trim(),
            timings: el.querySelector(".W4Efsd:last-child > .W4Efsd:nth-of-type(3) > span:first-child")?.textContent.replaceAll("·", "").trim(),
            phone_num: el.querySelector(".W4Efsd:last-child > .W4Efsd:nth-of-type(3) > span:last-child")?.textContent.replaceAll("·", "").trim(),
            extra_services: el.querySelector(".qty3Ue")?.textContent.replaceAll("·", "").replaceAll("  ", " ").trim(),
            latitude: link.split("!8m2!3d")[1].split("!4d")[0],
            longitude: link.split("!4d")[1].split("!16s")[0],
            link,
            id: Math.floor(Math.random()*20),  
            };   
        });
        });
        return maps_data;
}
const sleep = ms => new Promise(res => setTimeout(res, ms));
const scrollPage = async(page, scrollContainer, itemTargetCount) => {
        let items = [];
        let previousHeight = await page.evaluate(`document.querySelector("${scrollContainer}").scrollHeight`);
        while (itemTargetCount > items.length) {
            items = await extractItems(page);
            await page.evaluate(`document.querySelector("${scrollContainer}").scrollTo(0, document.querySelector("${scrollContainer}").scrollHeight)`);
            await page.evaluate(`document.querySelector("${scrollContainer}").scrollHeight > ${previousHeight}`);
            await sleep(2000);
        }
        return items;
    }
app.listen(PORT,() => {
    console.log("The server is running at port:",PORT)
})
app.get("/test", (req, res) => {
    res.send('Server is running fine');  
});
app.post('/status', async(req, res) => {
   const coordinates = req.body.coordinate;
    const type = req.body.type;
    const radius = req.body.radius;
    const url=`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates}
    &type=${type}&radius=${radius}&key=AIzaSyBBT8FIs0ibzkgCNaiDveelg7iK6iwtGo0`
    if (radius) {
        axios.get(url).then((resp) => {
            console.log('resp', resp)
            res.send("data is sent")
        }).catch((e)=>{
            console.log(e)
        })
    }
    else {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const [page] = await browser.pages();
        
        await page.goto(`https://www.google.com/maps/search/${type}/@${coordinates},13z`,{
            waitUntil: 'domcontentloaded',
            timeout: 60000,
        });
      await sleep(6000);
   let data = await scrollPage(page,'.m6QErb[aria-label]',10);
      data = JSON.stringify(data)
        await browser.close();
    res.send(data);      
    } catch (e) {
        console.error(e);
    }    
    }
    
    
});