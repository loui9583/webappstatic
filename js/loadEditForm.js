export async function loadEditForms(page, id) {
    try {
        const response = await fetch(`./htmlContent/${page}.html`);
        document.getElementById('content').innerHTML = await response.text();

        const module = await import(`./${page}.js`);
        module.load(id);
        } catch (error) {
        console.error(`Error loading content for ${page}:`, error);
    }
}
