import { formatDistanceToNow } from "date-fns"
import type { InventoryItem } from "@/app/d"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu"

interface InventoryListProps {
  items: InventoryItem[]
  view: "grid" | "list"
}

export default function InventoryList({ items, view }: InventoryListProps) {
  if (items.length === 0) {
    return (
      <div className='flex h-[300px] w-full items-center justify-center rounded-md border border-dashed'>
        <div className='text-center'>
          <h3 className='text-lg font-medium'>No items found</h3>
          <p className='text-sm text-muted-foreground'>
            Try adjusting your search or filters
          </p>
        </div>
      </div>
    )
  }

  if (view === "list") {
    return (
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Added</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              // TODO: FIX GRID LAYOUT FOR TABLE

              <TableRow key={item.id}>
                <ContextMenu key={item.id}>
                  <ContextMenuTrigger>
                    <TableCell className='font-medium'>{item.name}</TableCell>
                    <TableCell>
                      <Badge variant='outline'>{item.room}</Badge>
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell className='max-w-[300px] truncate'>
                      {item.description || "—"}
                    </TableCell>
                    <TableCell className='text-muted-foreground'>
                      {formatDistanceToNow(item.dateAdded, { addSuffix: true })}
                    </TableCell>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem>Modify</ContextMenuItem>
                    <ContextMenuItem>Remove</ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {items.map((item) => (
        <ContextMenu key={item.id}>
          <ContextMenuTrigger>
            <Card key={item.id}>
              <CardHeader className='pb-2'>
                <div className='flex items-start justify-between'>
                  <CardTitle className='text-base'>{item.name}</CardTitle>
                  <Badge>
                    {item.unit
                      ? `${item.quantity + ` ` + item.unit}`
                      : item.quantity > 1
                      ? `${item.quantity} items`
                      : "1 item"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className='text-sm text-muted-foreground line-clamp-2'>
                  {item.description || item.name}
                </div>
              </CardContent>
              <CardFooter className='flex justify-between text-xs text-muted-foreground'>
                <Badge variant='outline'>{item.room}</Badge>
                <span>
                  {formatDistanceToNow(item.dateAdded, { addSuffix: true })}
                </span>
              </CardFooter>
            </Card>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem className='cursor-pointer'>Modify</ContextMenuItem>
            <ContextMenuItem className='cursor-pointer group bg-red-950 text-gray-50 focus:bg-red-700 focus:text-gray-50 flex justify-between transition-colors duration-250'>
              <p>Remove</p>
              <svg
                className='opacity-0 group-focus:opacity-100 transition-opacity duration-250 size-4'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='white'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9ZM14.5 4L13.5 3H10.5L9.5 4H6V6H18V4H14.5Z'
                  fill='white'
                />
              </svg>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ))}
    </div>
  )
}
