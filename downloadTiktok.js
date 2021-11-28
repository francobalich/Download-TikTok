const puppeteer = require('puppeteer');
const Axios =require('axios') ;
const fileDownload =require('js-file-download') ;
const link = "https://es.savefrom.net/27/download-from-tiktok"
const downloadFile="C:\Users\Franco\Downloads";
let linkTikTok="https://www.tiktok.com/@francobalich/video/7034308242469571845?lang=es&is_copy_url=0&is_from_webapp=v1&sender_device=pc&sender_web_id=6989666726543885829"
/*
function consulta(url, filename) {
    Axios.get(url, {
    }).then(res => {
      fileDownload(res.data, filename);
    });
  }*/
const descargarVideos = async () => {
    try {
        const browser = await puppeteer.launch({headless:false})
        const page = await browser.newPage()
        await page.goto(link)
        console.log(`Accediendo a la página web.`)
        //await page.screenshot({path:"img/DownloadspaginaLoad.png"})

        await page.type("#sf_url",`${linkTikTok}`)
        
        console.log(`Link ingresado.`)
        //await page.screenshot({path:"img/DownloadspaginaConLink.png"})

        await page.click("#sf_submit")
        await page.waitForSelector(".media-result");
        await page.waitForTimeout(1000)
        //await page.screenshot({path:"img/DownloadspaginaConVideo.png"})
        
        console.log(`La página web cargo el video.`)
        await page.waitForSelector(".link.link-download.subname.ga_track_events.download-icon");
        await page.click(".link.link-download.subname.ga_track_events.download-icon")
       
        console.log(`Esperando 10s para la descarga.`)
        await page.waitForTimeout(10000)

        //const text = await  page.evaluate(() => document.querySelector('submit').innerHTML);
        await browser.close()
        console.log(`Descarga terminada.`)
    } catch (error) {
        console.log(error)
    }
}
descargarVideos()