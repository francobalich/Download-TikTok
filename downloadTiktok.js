const puppeteer = require("puppeteer");
const csv = require("csv-parser");
const fs = require("fs");

let links = [];

fs.createReadStream("links.csv")
  .pipe(csv())
  .on("data", (row) => {
    //console.log(row);
    links.push(row);
  })
  .on("end", () => {
    console.log("Archivo CSV leido correctamente.");
    descargarTodo(links);
  });

const descargarVideos = async (linkVideo) => {
  try {
    const link = "https://es.savefrom.net/27/download-from-tiktok";
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(link);
    console.log(`Accediendo a la página web.`);

    await page.type("#sf_url", `${linkVideo}`);
    console.log(`Link ingresado.`);

    await page.click("#sf_submit");
    await page.waitForSelector(".media-result");
    await page.waitForTimeout(1000);

    console.log(`La página web cargo el video.`);
    await page.waitForSelector(
      ".link.link-download.subname.ga_track_events.download-icon"
    );
    await page.click(
      ".link.link-download.subname.ga_track_events.download-icon"
    );

    console.log(`Esperando 10s para la descarga.`);
    await page.waitForTimeout(10000);

    await browser.close();
    console.log(`Descarga terminada.`);
    return true;
  } catch (error) {
    console.log(error);
  }
};
const descargarTodo = async (links) => {
  for (let link of links) {
      console.log(link["Link"])
      await descargarVideos(link["Link"]);
  }
};
