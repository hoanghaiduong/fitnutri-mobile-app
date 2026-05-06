const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory && f !== 'node_modules' && f !== '.expo' && f !== '.git') {
      walkDir(dirPath, callback);
    } else if (f.endsWith('.tsx') || f.endsWith('.ts')) {
      callback(dirPath);
    }
  });
} 

let count = 0;
walkDir('.', (file) => {
  const content = fs.readFileSync(file, 'utf8');
  const regex = /border-[a-zA-Z\-]+\/[0-9]+/g;
  
  const newContent = content.replace(regex, (match) => {
    console.log(`Replaced ${match} in ${file}`);
    return match.split('/')[0];
  });
  
  if (newContent !== content) {
    fs.writeFileSync(file, newContent, 'utf8');
    count++;
  }
});

console.log('Fixed files: ' + count);
