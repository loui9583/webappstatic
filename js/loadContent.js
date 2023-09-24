export async function loadContent(page) {
    try {
        const response = await fetch(`./htmlContent/${page}.html`);
        document.getElementById('content').innerHTML = await response.text();

        const module = await import(`./${page}.js`);
        module.load();
    } catch (error) {
        console.error(`Error loading content for ${page}:`, error);
    }
}
