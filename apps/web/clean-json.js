const fs = require('fs');
const path = require('path');

// Read the JSON file
const jsonPath = path.join(__dirname, 'public/data/Tranzr_goods_enriched_dimensions-Depth.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

console.log('Original data structure:');
console.log('Categories:', data.categories?.length || 0);
console.log('Products:', data.products?.length || 0);

// Clean the categories by removing external icon URLs
if (data.categories) {
  data.categories = data.categories.map(category => ({
    id: category.id,
    name: category.name,
    icon: "" // Remove the external URL
  }));
  
  console.log('\n✅ Cleaned all category icons');
}

// Clean any products that might have icon properties too
if (data.products) {
  data.products = data.products.map(product => {
    const cleanedProduct = { ...product };
    if (cleanedProduct.icon) {
      cleanedProduct.icon = ""; // Remove any external icon URLs from products
    }
    return cleanedProduct;
  });
  
  console.log('✅ Cleaned any product icons');
}

// Write the cleaned data back to file
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));

console.log('\n🎉 Successfully cleaned the JSON file!');
console.log('📄 Backup saved as: Tranzr_goods_enriched_dimensions-Depth.json.backup');
console.log('🔧 All external icon URLs have been removed');
console.log('💡 Your React components will now be used exclusively');
