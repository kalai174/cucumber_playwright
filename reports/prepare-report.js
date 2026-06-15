import * as fs from 'node:fs';


const dirs = ['reports', 'reports/screenshots', 'reports/html-report'];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});