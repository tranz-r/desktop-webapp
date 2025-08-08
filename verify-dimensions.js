const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public/data/Tranzr_goods_enriched_dimensions-Depth.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const itemsMissingLength = data.goods.filter(item => !item.hasOwnProperty('length'));
const itemsMissingWidth = data.goods.filter(item => !item.hasOwnProperty('width'));
const itemsMissingHeight = data.goods.filter(item => !item.hasOwnProperty('height'));

console.log(`✅ Verification complete:`);
console.log(`- Items missing length: ${itemsMissingLength.length}`);
console.log(`- Items missing width: ${itemsMissingWidth.length}`);
console.log(`- Items missing height: ${itemsMissingHeight.length}`);

if (itemsMissingLength.length === 0 && itemsMissingWidth.length === 0 && itemsMissingHeight.length === 0) {
  console.log(`\n🎉 All items now have complete dimensions!`);
} else {
  console.log(`\n⚠️  Some items still missing dimensions:`);
  if (itemsMissingLength.length > 0) {
    console.log(`Missing length: ${itemsMissingLength.map(item => item.name).join(', ')}`);
  }
  if (itemsMissingWidth.length > 0) {
    console.log(`Missing width: ${itemsMissingWidth.map(item => item.name).join(', ')}`);
  }
  if (itemsMissingHeight.length > 0) {
    console.log(`Missing height: ${itemsMissingHeight.map(item => item.name).join(', ')}`);
  }
}
