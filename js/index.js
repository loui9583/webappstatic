import { loadContent } from './loadContent.js';
document.getElementById('1').addEventListener('click', () => loadContent('1'));
document.getElementById('2').addEventListener('click', () => loadContent('2'));
document.getElementById('3').addEventListener('click', () => loadContent('3'));
document.getElementById('4').addEventListener('click', () => loadContent('4'));
document.getElementById('5').addEventListener('click', () => loadContent('5'));

loadContent('1').catch(error => console.log(error));
