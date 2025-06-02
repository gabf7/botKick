const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');

puppeteer.use(StealthPlugin());

(async () => {
    const browser = await puppeteer.launch({
        headless: true, // Cambia a true si no quieres ver la ventana
        defaultViewport: null,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });

    const page = await browser.newPage();

    // Cambia el user agent para parecer más "humano"
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

    // Leer las cookies desde el archivo
    const cookiesString = fs.readFileSync('./cookies.json');
    const cookies = JSON.parse(cookiesString);

    // Establecer las cookies en la página
    await page.setCookie(...cookies);

    // Ir directamente a la página con las cookies ya establecidas
    await page.goto('https://kick.com/streameruniversitario', { waitUntil: 'networkidle2' });

    // Esperar un poco para observar el comportamiento
    await new Promise(r => setTimeout(r, 5000));

    console.log('¡Bot disfrazado y logueado listo!');

    // Cerrar navegador si quieres
    // await browser.close();
})();