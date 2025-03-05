const { productsFn } = await import('./productsFn.js');

export const tools = [
  {
    type: 'function',
    function: {
      function: productsFn.searchByName,
      parse: JSON.parse,
      description: 'Search products by EXACT name match including all specifications',
      parameters: {
        type: 'object',
        properties: {
          name: { 
            type: 'string',
            description: 'EXACT product name including model, capacity and color' 
          }
        },
        required: ['name']
      }
    }
  },
  {
    type: 'function',
    function: {
      function: productsFn.listByCategory,
      parse: JSON.parse,
      description: 'List products by category with key details',
      parameters: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            enum: ['tablets', 'accessories', 'phones']
          }
        },
        required: ['category']
      }
    }
  },
  {
    type: 'function',
    function: {
      function: productsFn.getProductDetails,
      parse: JSON.parse,
      description: 'Get detailed specifications for a specific product',
      parameters: {
        type: 'object',
        properties: {
          id: { type: 'number' }
        },
        required: ['id']
      }
    }
  },
  {
    type: 'function',
    function: {
      function: productsFn.filterByPriceRange,
      parse: JSON.parse,
      description: 'Filter products within a specific price range',
      parameters: {
        type: 'object',
        properties: {
          min: { type: 'number' },
          max: { type: 'number' }
        },
        required: ['min', 'max']
      }
    }
  },
  {
    type: 'function',
    function: {
      function: productsFn.filterBySpecs,
      parse: JSON.parse,
      description: 'Filter products by technical specifications',
      parameters: {
        type: 'object',
        properties: {
          specs: {
            type: 'object',
            properties: {
              screenSize: {
                type: 'object',
                properties: {
                  min: { type: 'number' },
                  max: { type: 'number' }
                }
              },
              ram: { type: 'string' },
              capacity: { type: 'string' },
              color: { type: 'string' }
            }
          }
        },
        required: ['specs']
      }
    }
  },
  {
    type: 'function',
    function: {
      function: productsFn.getComparisons,
      parse: JSON.parse,
      description: 'Compare multiple products side-by-side',
      parameters: {
        type: 'object',
        properties: {
          productIds: {
            type: 'array',
            items: { type: 'number' }
          }
        },
        required: ['productIds']
      }
    }
  }
];