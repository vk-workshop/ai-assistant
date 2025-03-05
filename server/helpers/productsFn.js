import { readFile } from 'fs/promises';

const products = JSON.parse(await readFile(new URL('../../public/api/products.json', import.meta.url), 'utf-8'));

export const productsFn = {
  listByCategory: async ({ category }) => {
    return products
      .filter(item => item.category === category)
      .map(item => ({ 
        name: `${item.name} (ID: ${item.id})`,
        id: item.id,
        price: item.price,
        color: item.color
      }));
  },

  searchByName: async ({ name }) => {
    return products
      .filter(item => item.name.toLowerCase().includes(name.toLowerCase()))
      .map(item => ({ 
        name: item.name, 
        id: item.id,
        category: item.category
      }));
  },

  getProductDetails: async ({ id }) => {
    const product = products.find(item => item.id === id);
    return product ? {
      name: product.name,
      price: product.price,
      color: product.color,
      capacity: product.capacity,
      year: product.year,
      category: product.category,
      specs: {
        screen: product.screen,
        ram: product.ram,
        storage: product.capacity
      }
    } : null;
  },

  filterByPriceRange: async ({ min, max }) => {
    return products
      .filter(item => item.price >= min && item.price <= max)
      .map(item => ({
        name: item.name,
        id: item.id,
        price: item.price,
        category: item.category
      }));
  },

  filterBySpecs: async ({ specs }) => {
    return products.filter(item => {
      return Object.entries(specs).every(([key, value]) => {
        if (key === 'screenSize') {
          const itemScreenSize = parseFloat(item.screen);
          return itemScreenSize >= value.min && itemScreenSize <= value.max;
        }
        return item[key] === value;
      });
    }).map(item => ({
      name: item.name,
      id: item.id,
      category: item.category,
      price: item.price
    }));
  },
  
  getComparisons: async ({ productIds }) => {
    return products
      .filter(item => productIds.includes(item.id))
      .map(item => ({
        name: item.name,
        id: item.id,
        price: item.price,
        specs: {
          screen: item.screen,
          ram: item.ram,
          storage: item.capacity
        }
      }));
  }
};