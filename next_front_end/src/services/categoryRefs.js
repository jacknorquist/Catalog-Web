const filterCategories = [
  { id:'allProducts', name:'All Products', url:'/products'},
  { id: 'paversSlabs', name: 'Pavers & Slabs', url: '/products/pavers-slabs' },
  { id: 'permeablePavements', name: 'Permeable Pavements', url: '/products/permeable-pavements' },
  { id: 'walls', name: 'Walls', url: '/products/walls' },
  { id: 'steps', name: 'Steps', url: '/products/steps' },
  { id: 'edgers', name: 'Edgers', url: '/products/edgers' },
  { id: 'caps', name: 'Caps', url: '/products/caps' },
  { id: 'outdoorFireplaceKits', name: 'Outdoor & Fireplace Kits', url: '/products/outdoor-&-fireplace-kits' },
  { id: 'accessories', name: 'Accessories', url: '/products/accessories' },
];

const categoryLinks = {
  'Permeable Pavements': '/products/permeable-pavements',
  'Pavers & Slabs': '/products/pavers-slabs',
  'Walls': '/products/walls',
  'Steps': '/products/steps',
  'Edgers': '/products/edgers',
  'Caps': '/products/caps',
  'Outdoor & Fireplace Kits': '/products/outdoor-&-fireplace-kits',
  'Accessories': '/products/accessories',
}


const filterRef = {
  undefined :0,
  'pavers-slabs': 1,
  'permeable-pavements': 2,
  'walls': 3,
  'steps': 4,
  'edgers': 5,
  'caps': 6,
  'outdoor-&-fireplace-kits':7,
  'accessories': 8
}

export {filterCategories, categoryLinks, filterRef}