/*-----------------------------------------------------------------------------------------------------------\
|  _____     _   _____ _             _ _          _____  _____  _____  __      _______  _____  _____  _____  |
| |_   _|   (_) /  ___| |           | (_)        / __  \|  _  |/ __  \/  |    / / __  \|  _  |/ __  \|____ | |
|   | | __ _ _  \ `--.| |_ _   _  __| |_  ___    `' / /'| |/' |`' / /'`| |   / /`' / /'| |/' |`' / /'    / / |
|   | |/ _` | |  `--. \ __| | | |/ _` | |/ _ \     / /  |  /| |  / /   | |  / /   / /  |  /| |  / /      \ \ |
|   | | (_| | | /\__/ / |_| |_| | (_| | | (_) |  ./ /___\ |_/ /./ /____| |_/ /  ./ /___\ |_/ /./ /___.___/ / |
|   \_/\__,_|_| \____/ \__|\__,_|\__,_|_|\___/   \_____/ \___/ \_____/\___/_/   \_____/ \___/ \_____/\____/  |
\-----------------------------------------------------------------------------------------------------------*/
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { URL } = require('url'); // Utilisation de la bibliothèque 'url'

dotenv.config();

const SITE_URL = process.env.SITE_URL;
const IN_DIRECTORY = process.env.IN;

if (!SITE_URL || !IN_DIRECTORY) {
    console.error('Veuillez configurer les variables d\'environnement SITE_URL et IN.');
    process.exit(1);
}

function normalizeURL(url) {
    const parsedUrl = new URL(url);

    // Supprimer le chemin IN de l'URL finale
    const relativePath = path.relative(IN_DIRECTORY, parsedUrl.pathname);
    parsedUrl.pathname = '/' + relativePath;

    // Si l'URL ne se termine pas par '/', on l'ajoute
    if (!parsedUrl.pathname.endsWith('/')) {
        parsedUrl.pathname += '/';
    }

    return parsedUrl.toString();
}

function addCanonicalLinkToHTML(filePath) {
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const pageURL = `${normalizeURL(SITE_URL)}${filePath.replace(`${IN_DIRECTORY}\\`, '')}`;
    const canonicalLink = `<link rel="canonical" href="${normalizeURL(pageURL)}" />`;
    const updatedContents = fileContents.replace('</head>', `${canonicalLink}\n</head>`);
    fs.writeFileSync(filePath, updatedContents);
}

function processHTMLFiles(dir) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);

        if (fs.statSync(filePath).isDirectory()) {
            processHTMLFiles(filePath);
        } else if (path.extname(filePath) === '.html') {
            addCanonicalLinkToHTML(filePath);
            console.log(`Added canonical link to: ${filePath}`);
        }
    });
}

processHTMLFiles(IN_DIRECTORY);
