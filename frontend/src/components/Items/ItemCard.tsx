'use client'

import { Card, CardBody, CardHeader, Button, Chip, Image } from '@heroui/react'
import { Edit, Trash2, Eye } from 'lucide-react'
import { Item } from '@/types/item'

interface ItemCardProps {
  item: Item
  onEdit?: (item: Item) => void
  onDelete?: (id: string) => void
  onView?: (item: Item) => void
}

export default function ItemCard({ item, onEdit, onDelete, onView }: ItemCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'success'
      case 'low_stock': return 'warning'
      case 'out_of_stock': return 'danger'
      default: return 'default'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return '库存充足'
      case 'low_stock': return '库存不足'
      case 'out_of_stock': return '缺货'
      default: return '未知'
    }
  }

  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader className="flex gap-3">
        <Image
          alt={item.name}
          height={60}
          radius="md"
          src={item.image || "/placeholder-item.jpg"}
          width={60}
          fallbackSrc="/placeholder-item.jpg"
        />
        <div className="flex flex-col flex-1">
          <p className="text-md font-semibold">{item.name}</p>
          <p className="text-small text-default-500">{item.category}</p>
        </div>
        <Chip 
          color={getStatusColor(item.status)} 
          size="sm"
          variant="flat"
        >
          {getStatusText(item.status)}
        </Chip>
      </CardHeader>
      <CardBody className="px-4 pt-0 pb-4">
        <p className="text-default-600 mb-3 line-clamp-2">{item.description}</p>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="text-small text-default-500">
              库存数量
            </div>
            <div className="bg-content2 px-2 py-1 rounded-full">
              <span className="text-small font-semibold">{item.quantity}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-small text-default-500">
              价格
            </div>
            <div className="text-xl font-bold text-primary">
              ¥{item.price.toFixed(2)}
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 justify-end mt-4 pt-3 border-t border-divider">
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            color="default"
            onClick={() => onView?.(item)}
            className="hover:scale-110 transition-transform"
          >
            <Eye size={16} />
          </Button>
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            color="primary"
            onClick={() => onEdit?.(item)}
            className="hover:scale-110 transition-transform"
          >
            <Edit size={16} />
          </Button>
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            color="danger"
            onClick={() => onDelete?.(item.id)}
            className="hover:scale-110 transition-transform"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}