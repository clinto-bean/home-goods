"use client"

import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import AddItemForm from "./Add-Item-Form"
import InventoryList from "./Inventory-List"
import StatsCards from "./Stats-Cards"

import type { InventoryItem } from "@/app/d"

// Sample rooms for categorization
export const rooms = [
  "Living Room",
  "Kitchen",
  "Bedroom",
  "Bathroom",
  "Office",
  "Garage",
  "Storage",
  "Other",
]

// Sample initial data
const initialItems: InventoryItem[] = [
  {
    id: "1",
    name: "Coffee Maker",
    room: "Kitchen",
    quantity: 1,
    description: "Stainless steel drip coffee maker",
    dateAdded: new Date("2023-01-15"),
  },
  {
    id: "2",
    unit: "lb",
    name: "Desk Lamp",
    room: "Office",
    quantity: 2,
    description: "LED desk lamp with adjustable brightness",
    dateAdded: new Date("2023-02-20"),
  },
  {
    id: "3",
    name: "Throw Pillows",
    room: "Living Room",
    quantity: 4,
    description: "Decorative pillows for the couch",
    dateAdded: new Date("2023-03-10"),
  },
  {
    id: "4",
    name: "Toolbox",
    room: "Garage",
    quantity: 1,
    description: "Complete set of household tools",
    dateAdded: new Date("2023-01-05"),
  },
  {
    id: "5",
    name: "Bath Towels",
    room: "Bathroom",
    quantity: 6,
    description: "Cotton bath towels, various colors",
    dateAdded: new Date("2023-04-12"),
  },
]

export default function Dashboard() {
  const [items, setItems] = useState<InventoryItem[]>(initialItems)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeRoom, setActiveRoom] = useState<string>("all")
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [viewStats, setViewStats] = useState(false)
  const [viewItems, setViewItems] = useState(true)

  // Filter items based on search query and active room
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRoom = activeRoom === "all" || item.room === activeRoom
    return matchesSearch && matchesRoom
  })

  // Add a new item to the inventory
  const addItem = (item: Omit<InventoryItem, "id" | "dateAdded">) => {
    const newItem: InventoryItem = {
      ...item,
      id: Math.random().toString(36).substring(2, 9),
      dateAdded: new Date(),
    }
    setItems([...items, newItem])
    setIsAddingItem(false)
  }

  // Calculate stats for the dashboard
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const uniqueItems = items.length
  const roomCounts = items.reduce((acc, item) => {
    acc[item.room] = (acc[item.room] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className='flex min-h-screen w-full flex-col'>
      <header className='sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
        <h1 className='text-xl font-semibold max-md:hidden'>
          Home Goods: Personal Inventory Manager
        </h1>
        <div className='ml-auto flex justify-center gap-4 max-md:w-full'>
          <Button onClick={() => setIsAddingItem(true)} size='sm'>
            <Plus className='mr-2 h-4 w-4' />
            Add Item
          </Button>
          <Button
            size='sm'
            className={viewItems ? `bg-yellow-800` : ``}
            onClick={() => setViewItems(!viewItems)}>
            View Items
          </Button>
          <Button
            size='sm'
            className={viewStats ? `bg-blue-600` : ``}
            onClick={() => {
              setViewStats(!viewStats)
            }}>
            View Stats
          </Button>
        </div>
      </header>
      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {viewStats && (
            <StatsCards
              totalItems={totalItems}
              uniqueItems={uniqueItems}
              roomCounts={roomCounts}
            />
          )}
        </div>
        <div className='grid gap-4 md:grid-cols-[1fr_3fr]'>
          {viewItems && (
            <>
              <Card className='h-full'>
                <CardHeader>
                  <CardTitle>Filters</CardTitle>
                  <CardDescription>Filter your inventory items</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='space-y-2'>
                    <div className='relative'>
                      <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                      <Input
                        type='search'
                        placeholder='Search items...'
                        className='pl-8'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <h3 className='text-sm font-medium'>Rooms</h3>
                    <div className='flex flex-wrap gap-2'>
                      <Badge
                        variant={activeRoom === "all" ? "default" : "outline"}
                        className='cursor-pointer'
                        onClick={() => setActiveRoom("all")}>
                        All
                      </Badge>
                      {rooms.map((room) => (
                        <Badge
                          key={room}
                          variant={activeRoom === room ? "default" : "outline"}
                          className='cursor-pointer'
                          onClick={() => setActiveRoom(room)}>
                          {room}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Tabs defaultValue='grid' className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <h2 className='text-2xl font-semibold tracking-tight'>
                    Your Items {activeRoom !== "all" && `- ${activeRoom}`}
                  </h2>
                  <TabsList>
                    <TabsTrigger value='grid'>Grid</TabsTrigger>
                    <TabsTrigger value='list'>List</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value='grid' className='space-y-4'>
                  <InventoryList items={filteredItems} view='grid' />
                </TabsContent>
                <TabsContent value='list' className='space-y-4'>
                  <InventoryList items={filteredItems} view='list' />
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>

      {isAddingItem && (
        <AddItemForm
          onAdd={addItem}
          onCancel={() => setIsAddingItem(false)}
          rooms={rooms}
        />
      )}
    </div>
  )
}
