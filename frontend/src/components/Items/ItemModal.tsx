'use client'

import { useState, useEffect } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem
} from '@heroui/react'
import { Item } from '@/types/item'

interface ItemModalProps {
  isOpen: boolean
  onClose: () => void
  item?: Item | null
  onSave: (item: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => void
  mode: 'add' | 'edit' | 'view'
}

const categories = [
  '电子产品',
  '办公用品',
  '家电',
  '家具',
  '服装',
  '书籍',
  '食品',
  '其他'
]

const statusOptions = [
  { key: 'available', label: '库存充足' },
  { key: 'low_stock', label: '库存不足' },
  { key: 'out_of_stock', label: '缺货' }
]

export default function ItemModal({ isOpen, onClose, item, onSave, mode }: ItemModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    quantity: 0,
    price: 0,
    status: 'available' as Item['status'],
    image: ''
  })

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        description: item.description,
        category: item.category,
        quantity: item.quantity,
        price: item.price,
        status: item.status,
        image: item.image || ''
      })
    } else {
      setFormData({
        name: '',
        description: '',
        category: '',
        quantity: 0,
        price: 0,
        status: 'available',
        image: ''
      })
    }
  }, [item, isOpen])

  const handleSave = () => {
    if (!formData.name.trim() || !formData.category) {
      return
    }
    
    onSave(formData)
    onClose()
  }

  const isReadonly = mode === 'view'

  const getTitle = () => {
    switch (mode) {
      case 'add': return '添加物品'
      case 'edit': return '编辑物品'
      case 'view': return '查看物品详情'
      default: return '物品信息'
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" scrollBehavior="inside" backdrop="blur">
      <ModalContent className="bg-gradient-to-br from-content1 to-content2">
        <ModalHeader className="flex flex-col gap-1 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          <h2 className="text-2xl font-bold">{getTitle()}</h2>
          {mode !== 'view' && (
            <p className="text-small text-default-500 font-normal">
              {mode === 'add' ? '填写下方信息来添加新物品' : '修改物品信息'}
            </p>
          )}
        </ModalHeader>
        <ModalBody className="gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="物品名称"
              placeholder="请输入物品名称"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              isRequired
              isReadOnly={isReadonly}
              variant="bordered"
              labelPlacement="outside"
            />
            
            <Select
              label="分类"
              placeholder="选择分类"
              selectedKeys={formData.category ? [formData.category] : []}
              onSelectionChange={(keys) => setFormData({ ...formData, category: Array.from(keys)[0] as string || '' })}
              isRequired
              isDisabled={isReadonly}
              variant="bordered"
              labelPlacement="outside"
              items={categories.map(cat => ({key: cat, label: cat}))}
            >
              {(item: {key: string, label: string}) => (
                <SelectItem key={item.key}>{item.label}</SelectItem>
              )}
            </Select>

            <Input
              label="数量"
              type="number"
              placeholder="请输入数量"
              value={formData.quantity.toString()}
              onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
              min={0}
              isReadOnly={isReadonly}
              variant="bordered"
              labelPlacement="outside"
            />

            <Input
              label="价格"
              type="number"
              placeholder="请输入价格"
              value={formData.price.toString()}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              min={0}
              step={0.01}
              startContent="¥"
              isReadOnly={isReadonly}
              variant="bordered"
              labelPlacement="outside"
            />

            <Select
              label="状态"
              placeholder="选择状态"
              selectedKeys={[formData.status]}
              onSelectionChange={(keys) => setFormData({ ...formData, status: Array.from(keys)[0] as Item['status'] || 'available' })}
              isDisabled={isReadonly}
              variant="bordered"
              labelPlacement="outside"
              items={statusOptions}
            >
              {(item: {key: string, label: string}) => (
                <SelectItem key={item.key}>{item.label}</SelectItem>
              )}
            </Select>

            <Input
              label="图片URL"
              placeholder="请输入图片链接(可选)"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              isReadOnly={isReadonly}
              variant="bordered"
              labelPlacement="outside"
              className="md:col-span-2"
            />
          </div>

          <Textarea
            label="描述"
            placeholder="请输入物品描述"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            minRows={4}
            maxRows={6}
            isReadOnly={isReadonly}
            variant="bordered"
            labelPlacement="outside"
          />
        </ModalBody>
        <ModalFooter className="gap-3">
          <Button 
            color="danger" 
            variant="flat" 
            onPress={onClose}
            className="font-medium"
          >
            {mode === 'view' ? '关闭' : '取消'}
          </Button>
          {mode !== 'view' && (
            <Button 
              color="primary" 
              onPress={handleSave}
              isDisabled={!formData.name.trim() || !formData.category}
              variant="shadow"
              className="font-medium px-8"
            >
              {mode === 'edit' ? '保存修改' : '添加物品'}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}