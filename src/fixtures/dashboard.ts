import type { ProductCategory, RelationshipManager } from '../types/dashboard'

export const relationshipManagerFixture: RelationshipManager = {
  name: 'Adaeze Okonkwo',
  role: 'Relationship Manager',
  location: 'Victoria Island, Lagos',
  grade: 'RM 2',
  referralCode: 'QM-2038G8J',
}

export const productCategoriesFixture: ProductCategory[] = [
  {
    id: 'personal',
    label: 'Personal Banking',
    values: { easySavings: 452000, queensStash: 1250000, queensLock: 800000, myKolo: 207050 },
    customers: [
      { initials: 'CE', name: 'Chioma Eze', accountNumber: '0012345678', values: { easySavings: 452000, queensStash: 0, queensLock: 0, myKolo: 0 }, directions: { easySavings: 'up' } },
      { initials: 'TB', name: 'Tunde Bakare', accountNumber: '0012345678', values: { easySavings: 0, queensStash: 1250000, queensLock: 0, myKolo: 80050 }, directions: { myKolo: 'down' } },
      { initials: 'FA', name: 'Fatima Aliyu', accountNumber: '0012345678', values: { easySavings: 0, queensStash: 0, queensLock: 800000, myKolo: 0 }, directions: { queensLock: 'down' } },
      { initials: 'YA', name: 'Yemi Adesanya', accountNumber: '0012345678', values: { easySavings: 0, queensStash: 0, queensLock: 0, myKolo: 127000 }, directions: { myKolo: 'up' } },
    ],
  },
  {
    id: 'business',
    label: 'Business Banking',
    values: { easySavings: 3400000, queensStash: 750000, queensLock: 1903000, myKolo: 290000 },
    customers: [
      { initials: 'CE', name: 'Chioma Eze', accountNumber: '0012345678', values: { easySavings: 200000, queensStash: 0, queensLock: 0, myKolo: 0 }, directions: { easySavings: 'down' } },
      { initials: 'TB', name: 'Tunde Bakare', accountNumber: '0012345678', values: { easySavings: 0, queensStash: 750000, queensLock: 0, myKolo: 0 }, directions: { queensStash: 'down' } },
      { initials: 'FA', name: 'Fatima Aliyu', accountNumber: '0012345678', values: { easySavings: 0, queensStash: 0, queensLock: 1903000, myKolo: 0 }, directions: { queensLock: 'up' } },
      { initials: 'YA', name: 'Yemi Adesanya', accountNumber: '0012345678', values: { easySavings: 3200000, queensStash: 0, queensLock: 0, myKolo: 290000 }, directions: { easySavings: 'up', myKolo: 'up' } },
    ],
  },
]

export const totalValuesFixture = { easySavings: 3852000, queensStash: 2000000, queensLock: 2703000, myKolo: 497050 }

export const accountsOpenedFixture = [
  { initials: 'AA', name: 'Amina Abubakar', type: 'Personal', products: 'Easy Savings', balance: 452000, movement: 72000, direction: 'up' },
  { initials: 'BK', name: 'Bashir Kone', type: 'Personal', products: 'Queens Stash', balance: 1250000, movement: 120050, direction: 'down' },
  { initials: 'CL', name: 'Chioma Leke', type: 'Business', products: 'Queens Lock', balance: 800000, movement: 0, direction: undefined },
  { initials: 'DJ', name: 'David Juma', type: 'Business', products: 'Easy Savings, My Kolo', balance: 3490000, movement: 85000, direction: 'up' },
  { initials: 'ES', name: 'Esther Sule', type: 'Business', products: 'Queens Stash', balance: 750000, movement: 50000, direction: 'up' },
  { initials: 'FM', name: 'Farida Mohammed', type: 'Personal', products: 'Easy Savings', balance: 1903000, movement: 0, direction: undefined },
  { initials: 'GN', name: 'Gabriel Nwosu', type: 'Business', products: 'Queens Lock', balance: 290000, movement: 30000, direction: 'down' },
  { initials: 'TB', name: 'Tunde Bakare', type: 'Personal', products: 'My Kolo', balance: 127000, movement: 57000, direction: 'up' },
] as const

export const balanceMovementsFixture = [
  { name: 'Fatima Aliyu', product: 'Easy Savings', balance: 452000, movement: 72000, direction: 'up' },
  { name: 'Taslim Balogun', product: 'Queens Stash', balance: 800000, movement: 120000, direction: 'down' },
  { name: 'Tunde Bakare', product: 'Queens Lock', balance: 452000, movement: 72000, direction: 'up' },
  { name: 'Obinna Ekezie', product: 'My Kolo', balance: 452000, movement: 72000, direction: 'up' },
  { name: 'Yemi Adesanya', product: 'Queens Stash', balance: 800000, movement: 120000, direction: 'down' },
  { name: 'Tunde Bakare', product: 'Queens Lock', balance: 452000, movement: 72000, direction: 'up' },
] as const

export const kpiFixture = [
  { label: 'Account Openings', status: 'In Progress', percentage: 85, tone: 'amber', icon: 'users' },
  { label: 'Deposit Mobilization', status: 'In Progress', percentage: 77, tone: 'amber', icon: 'chart' },
  { label: 'Customer Retention', status: 'On Track', percentage: 100, tone: 'green', icon: 'badge' },
] as const
