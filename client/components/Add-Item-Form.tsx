"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { InventoryItem } from "@/app/d"
import { measurementUnits } from "@/app/d"

interface AddItemFormProps {
  onAdd: (item: Omit<InventoryItem, "id" | "dateAdded">) => void
  onCancel: () => void
  rooms: string[]
}

export default function AddItemForm({
  onAdd,
  onCancel,
  rooms,
}: AddItemFormProps) {
  const [name, setName] = useState("")
  const [room, setRoom] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [unit, setUnit] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !room) return

    onAdd({
      name,
      room,
      quantity,
      unit,
      description,
    })
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='w-full max-w-md rounded-lg bg-background p-6 shadow-lg'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-xl font-semibold'>Add New Item</h2>
          <Button
            variant='ghost'
            size='icon'
            onClick={onCancel}
            className='cursor-pointer'>
            <X className='h-4 w-4' />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className='space-y-4 w-full'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Item Name</Label>
            <Input
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter item name'
              required
            />
          </div>

          <div className='space-y-2 w-full'>
            <Label htmlFor='room'>Room</Label>
            <Select value={room} onValueChange={setRoom} required>
              <SelectTrigger id='room'>
                <SelectValue placeholder='Select a room' />
              </SelectTrigger>
              <SelectContent>
                {rooms.map((roomOption) => (
                  <SelectItem key={roomOption} value={roomOption}>
                    {roomOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='grid grid-cols-4 gap-4'>
            <div className='space-y-2 col-span-3'>
              <Label htmlFor='quantity'>Quantity</Label>
              <Input
                id='quantity'
                type='number'
                min='1'
                value={quantity}
                onChange={(e) =>
                  setQuantity(Number.parseInt(e.target.value) || 1)
                }
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='unit'>Unit</Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger id='unit'>
                  <SelectValue placeholder=' ' />
                </SelectTrigger>
                <SelectContent>
                  {measurementUnits.map((unitOption) => (
                    <SelectItem key={unitOption} value={unitOption}>
                      {unitOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='description'>Description (Optional)</Label>
            <Textarea
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Enter item description'
              rows={3}
            />
          </div>

          <div className='flex justify-end gap-2 pt-2'>
            <Button variant='outline' type='button' onClick={onCancel}>
              Cancel
            </Button>
            <Button type='submit'>Add Item</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
