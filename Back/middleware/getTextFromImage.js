import Tesseract from 'tesseract.js';

Tesseract.recognize(
  'https://tesseract.projectnaptha.com/img/eng_bw.png',
  'esp',
  { logger: m => console.log(m) }
).then(({ data: { text } }) => {
  console.log(text);
})