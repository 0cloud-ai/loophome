'use client'

import { useState } from 'react'
import MainLayout from '@/components/Layout/MainLayout'
import ItemGrid from '@/components/Items/ItemGrid'
import ItemModal from '@/components/Items/ItemModal'
import { mockItems } from '@/data/mockItems'
import { Item } from '@/types/item'

export default function Home() {
  const [items, setItems] = useState<Item[]>(mockItems)
  const [isLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add')
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9)
  }

  const handleAddItem = () => {
    setModalMode('add')
    setSelectedItem(null)
    setModalOpen(true)
  }

  const handleEditItem = (item: Item) => {
    setModalMode('edit')
    setSelectedItem(item)
    setModalOpen(true)
  }

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const handleViewItem = (item: Item) => {
    setModalMode('view')
    setSelectedItem(item)
    setModalOpen(true)
  }

  const handleSaveItem = (itemData: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date()
    
    if (modalMode === 'add') {
      const newItem: Item = {
        ...itemData,
        id: generateId(),
        createdAt: now,
        updatedAt: now
      }
      setItems([...items, newItem])
    } else if (modalMode === 'edit' && selectedItem) {
      setItems(items.map(item => 
        item.id === selectedItem.id 
          ? { ...itemData, id: selectedItem.id, createdAt: selectedItem.createdAt, updatedAt: now }
          : item
      ))
    }
  }

  return (
    <MainLayout>
      <ItemGrid
        items={items}
        isLoading={isLoading}
        onAddItem={handleAddItem}
        onEditItem={handleEditItem}
        onDeleteItem={handleDeleteItem}
        onViewItem={handleViewItem}
      />
      <ItemModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        item={selectedItem}
        onSave={handleSaveItem}
        mode={modalMode}
      />
    </MainLayout>
  )
}
