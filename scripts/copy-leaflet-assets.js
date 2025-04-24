const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../node_modules/leaflet/dist/images');
const destDir = path.join(__dirname, '../public');

// Create public directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy marker icon files
const files = ['marker-icon.png', 'marker-icon-2x.png', 'marker-shadow.png'];

files.forEach(file => {
  const sourcePath = path.join(sourceDir, file);
  const destPath = path.join(destDir, file);
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Copied ${file} to public directory`);
  } else {
    console.error(`File not found: ${sourcePath}`);
  }
}); 