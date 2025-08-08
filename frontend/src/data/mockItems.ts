import { Item } from '@/types/item'

export const mockItems: Item[] = [
  {
    id: '1',
    name: '苹果 iPhone 15',
    description: '最新款苹果手机，配备A17芯片，性能强劲',
    category: '电子产品',
    quantity: 25,
    price: 5999,
    status: 'available',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '2',
    name: '戴尔笔记本电脑',
    description: '商务办公笔记本，16GB内存，512GB固态硬盘',
    category: '电子产品',
    quantity: 5,
    price: 7499,
    status: 'low_stock',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: '3',
    name: '办公椅',
    description: '人体工学办公椅，舒适透气，支持多角度调节',
    category: '办公用品',
    quantity: 0,
    price: 899,
    status: 'out_of_stock',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-19')
  },
  {
    id: '4',
    name: '无线鼠标',
    description: '罗技无线鼠标，精准定位，长续航',
    category: '电子产品',
    quantity: 50,
    price: 199,
    status: 'available',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-21')
  },
  {
    id: '5',
    name: '咖啡机',
    description: '全自动咖啡机，支持多种咖啡制作',
    category: '家电',
    quantity: 8,
    price: 2999,
    status: 'available',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-22')
  },
  {
    id: '6',
    name: '蓝牙耳机',
    description: '降噪蓝牙耳机，高音质，长续航',
    category: '电子产品',
    quantity: 3,
    price: 799,
    status: 'low_stock',
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '7',
    name: '书桌',
    description: '实木书桌，简约现代风格，适合居家办公',
    category: '家具',
    quantity: 12,
    price: 1299,
    status: 'available',
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-17')
  },
  {
    id: '8',
    name: '台灯',
    description: 'LED护眼台灯，可调节亮度和色温',
    category: '家电',
    quantity: 20,
    price: 299,
    status: 'available',
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-23')
  }
]