'use client'

import { useState } from 'react'
import { Card, CardBody, Input, Button, Select, SelectItem, Spinner } from '@heroui/react'
import { Search, Plus, Package } from 'lucide-react'
import ItemCard from './ItemCard'
import { Item } from '@/types/item'

interface ItemGridProps {
  items: Item[]
  isLoading?: boolean
  onAddItem?: () => void
  onEditItem?: (item: Item) => void
  onDeleteItem?: (id: string) => void
  onViewItem?: (item: Item) => void
}

export default function ItemGrid({ 
  items, 
  isLoading = false,
  onAddItem,
  onEditItem,
  onDeleteItem,
  onViewItem
}: ItemGridProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const categories = Array.from(new Set(items.map(item => item.category)))
  const statuses = [
    { key: 'available', label: '库存充足' },
    { key: 'low_stock', label: '库存不足' },
    { key: 'out_of_stock', label: '缺货' }
  ]

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !categoryFilter || item.category === categoryFilter
    const matchesStatus = !statusFilter || item.status === statusFilter
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">物品管理</h1>
          <p className="text-default-500 mt-1">管理您的物品库存和信息</p>
        </div>
        <Button 
          color="primary" 
          size="lg"
          startContent={<Plus size={20} />} 
          onClick={onAddItem}
          className="shadow-lg"
        >
          添加物品
        </Button>
      </div>

      <Card className="shadow-medium">
        <CardBody>
          <div className="flex gap-4 mb-4 flex-wrap">
            <Input
              className="flex-1 min-w-[200px]"
              placeholder="搜索物品名称或描述..."
              startContent={<Search size={18} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select
              className="w-48"
              placeholder="选择分类"
              selectedKeys={categoryFilter ? [categoryFilter] : []}
              onSelectionChange={(keys) => setCategoryFilter(Array.from(keys)[0] as string || '')}
              items={[{key: '', label: '所有分类'}, ...categories.map(cat => ({key: cat, label: cat}))]}
            >
              {(item: {key: string, label: string}) => (
                <SelectItem key={item.key}>{item.label}</SelectItem>
              )}
            </Select>
            <Select
              className="w-48"
              placeholder="选择状态"
              selectedKeys={statusFilter ? [statusFilter] : []}
              onSelectionChange={(keys) => setStatusFilter(Array.from(keys)[0] as string || '')}
              items={[{key: '', label: '所有状态'}, ...statuses]}
            >
              {(item: {key: string, label: string}) => (
                <SelectItem key={item.key}>{item.label}</SelectItem>
              )}
            </Select>
          </div>
        </CardBody>
      </Card>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                onEdit={onEditItem}
                onDelete={onDeleteItem}
                onView={onViewItem}
              />
            ))
          ) : (
            <Card className="col-span-full border-dashed border-2 border-default-200">
              <CardBody className="text-center py-12">
                <Package className="mx-auto mb-4 text-default-300" size={48} />
                <p className="text-default-500 text-lg font-medium">
                  {searchTerm || categoryFilter || statusFilter ? '没有找到匹配的物品' : '暂无物品数据'}
                </p>
                <p className="text-default-400 text-sm mt-2">
                  {!searchTerm && !categoryFilter && !statusFilter && '点击上方按钮开始添加物品'}
                </p>
              </CardBody>
            </Card>
          )}
        </div>
      )}

      <Card className="bg-content2/50">
        <CardBody className="text-center py-3">
          <p className="text-default-600 font-medium">
            共找到 <span className="text-primary font-bold">{filteredItems.length}</span> 个物品
          </p>
        </CardBody>
      </Card>
    </div>
  )
}