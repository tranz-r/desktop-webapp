const fs = require('fs');
const path = require('path');

// Read both files
const mainFilePath = path.join(__dirname, 'public/data/Tranzr_goods_enriched_dimensions-Depth.json');
const backupFilePath = path.join(__dirname, 'public/data/Tranzr_goods_enriched_dimensions-Depth.json.backup');

const mainData = JSON.parse(fs.readFileSync(mainFilePath, 'utf8'));
const backupData = JSON.parse(fs.readFileSync(backupFilePath, 'utf8'));

// Create a map of backup items by ID for quick lookup
const backupItemsMap = new Map();
backupData.goods.forEach(item => {
  backupItemsMap.set(item.id, item);
});

let updatedCount = 0;

// Process each item in main data
mainData.goods = mainData.goods.map(item => {
  const newItem = { ...item };
  
  // If item is missing length, try to get it from backup
  if (!newItem.hasOwnProperty('length')) {
    const backupItem = backupItemsMap.get(item.id);
    if (backupItem) {
      // Try to get length from backup (either length_cm or length)
      if (backupItem.length_cm !== undefined) {
        newItem.length = backupItem.length_cm;
        updatedCount++;
        console.log(`Restored length for ${item.name} (ID: ${item.id}) from length_cm: ${backupItem.length_cm}`);
      } else if (backupItem.length !== undefined) {
        newItem.length = backupItem.length;
        updatedCount++;
        console.log(`Restored length for ${item.name} (ID: ${item.id}) from length: ${backupItem.length}`);
      } else {
        console.log(`Warning: No length found in backup for ${item.name} (ID: ${item.id})`);
      }
    } else {
      console.log(`Warning: No backup item found for ${item.name} (ID: ${item.id})`);
    }
  }
  
  // If item is missing width, try to get it from backup
  if (!newItem.hasOwnProperty('width')) {
    const backupItem = backupItemsMap.get(item.id);
    if (backupItem) {
      if (backupItem.width_cm !== undefined) {
        newItem.width = backupItem.width_cm;
        updatedCount++;
        console.log(`Restored width for ${item.name} (ID: ${item.id}) from width_cm: ${backupItem.width_cm}`);
      } else if (backupItem.width !== undefined) {
        newItem.width = backupItem.width;
        updatedCount++;
        console.log(`Restored width for ${item.name} (ID: ${item.id}) from width: ${backupItem.width}`);
      }
    }
  }
  
  // If item is missing height, try to get it from backup
  if (!newItem.hasOwnProperty('height')) {
    const backupItem = backupItemsMap.get(item.id);
    if (backupItem) {
      if (backupItem.height_cm !== undefined) {
        newItem.height = backupItem.height_cm;
        updatedCount++;
        console.log(`Restored height for ${item.name} (ID: ${item.id}) from height_cm: ${backupItem.height_cm}`);
      } else if (backupItem.height !== undefined) {
        newItem.height = backupItem.height;
        updatedCount++;
        console.log(`Restored height for ${item.name} (ID: ${item.id}) from height: ${backupItem.height}`);
      }
    }
  }
  
  return newItem;
});

// Write the updated data back to the main file
fs.writeFileSync(mainFilePath, JSON.stringify(mainData, null, 2));
console.log(`\n✅ Successfully restored ${updatedCount} missing dimension properties`);
