'use client'

import { useState } from 'react'
import { Card, CardBody, Button } from '@heroui/react'
import { 
  Package, 
  Plus, 
  Search, 
  Settings, 
  Home,
  Archive,
  Tag,
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { icon: Home, label: '首页', id: 'home', active: true },
    { icon: Package, label: '物品管理', id: 'items' },
    { icon: Plus, label: '添加物品', id: 'add-item' },
    { icon: Search, label: '搜索物品', id: 'search' },
    { icon: Archive, label: '库存管理', id: 'inventory' },
    { icon: Tag, label: '分类管理', id: 'categories' },
    { icon: Users, label: '用户管理', id: 'users' },
    { icon: Settings, label: '设置', id: 'settings' },
  ]

  return (
    <Card className={`${isCollapsed ? 'w-16' : 'w-64'} h-full rounded-none border-r border-divider transition-all duration-300 bg-content1/60 backdrop-blur-md shadow-medium`}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-divider/50">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">物品管理</h1>
                <p className="text-tiny text-default-500 mt-1">系统 v1.0</p>
              </div>
            )}
            <Button
              isIconOnly
              variant="flat"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hover:scale-110 transition-transform"
            >
              {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </Button>
          </div>
        </div>

        <div className="flex-1 p-2 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={item.active ? "shadow" : "light"}
                color={item.active ? "primary" : "default"}
                className={`w-full justify-start ${isCollapsed ? 'px-2' : 'px-3'} h-12 hover:scale-[1.02] transition-all font-medium`}
                startContent={<Icon size={20} />}
              >
                {!isCollapsed && (
                  <span className="ml-2 text-left">{item.label}</span>
                )}
              </Button>
            )
          })}
        </div>

        <div className="p-4">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
            <CardBody className="p-3">
              <div className={`text-tiny font-medium ${isCollapsed ? 'text-center' : ''}`}>
                {isCollapsed ? (
                  <div className="text-primary">v1.0</div>
                ) : (
                  <div>
                    <div className="text-default-700 font-semibold">版本 1.0.0</div>
                    <div className="text-default-500 mt-1">稳定版本</div>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </Card>
  )
}