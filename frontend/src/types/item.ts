export interface Item {
  id: string
  name: string
  description: string
  category: string
  quantity: number
  price: number
  image?: string
  status: 'available' | 'low_stock' | 'out_of_stock'
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  description?: string
  color: string
}