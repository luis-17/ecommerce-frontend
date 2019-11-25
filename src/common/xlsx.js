import XLSX from 'xlsx';

function getHeaderRow(sheet) {
  const headers = [];
  const range = XLSX.utils.decode_range(sheet['!ref']);
  let C;
  const R = range.s.r;
  for (C = range.s.c; C <= range.e.c; ++C) {
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
    let hdr = `UNKNOWN ${C}`;
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
    headers.push(hdr);
  }
  return headers;
}

function fixdata(data) {
  const w = 10240;
  let o = '';
  let l = 0;
  for (; l < data.byteLength / w; ++l) {
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, (l * w) + w)));
  }
  o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
  return o;
}

export default function (file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const fixedData = fixdata(data);
      const workbook = XLSX.read(btoa(fixedData), { type: 'base64' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const headers = getHeaderRow(worksheet).filter(header => !header.startsWith('UNKNOWN'));
      const rows = XLSX.utils.sheet_to_json(worksheet);
      rows.forEach((row) => {
        headers.forEach((header) => {
          if (!Object.prototype.hasOwnProperty.call(row, header)) {
            row[header] = '';
          }
        });
        Object.keys(row).forEach((key) => {
          if (headers.includes(key) === -1) {
            delete row[key];
          }
        });
      });
      setTimeout(() => {
        resolve({ headers, rows });
      }, 1000);
    };
    reader.readAsArrayBuffer(file);
  });
}
