import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Box, Home, Package, PackageCheck } from "lucide-react"

interface StatsCardsProps {
  totalItems: number
  uniqueItems: number
  roomCounts: Record<string, number>
}

export default function StatsCards({ totalItems, uniqueItems, roomCounts }: StatsCardsProps) {
  // Find the room with the most items
  let mostPopulatedRoom = { name: "None", count: 0 }
  for (const [room, count] of Object.entries(roomCounts)) {
    if (count > mostPopulatedRoom.count) {
      mostPopulatedRoom = { name: room, count }
    }
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Items</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalItems}</div>
          <p className="text-xs text-muted-foreground">Total quantity of all items</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unique Items</CardTitle>
          <PackageCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{uniqueItems}</div>
          <p className="text-xs text-muted-foreground">Number of different items</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Most Items In</CardTitle>
          <Home className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mostPopulatedRoom.name}</div>
          <p className="text-xs text-muted-foreground">{mostPopulatedRoom.count} unique items</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Rooms Used</CardTitle>
          <Box className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Object.keys(roomCounts).length}</div>
          <p className="text-xs text-muted-foreground">Out of 8 available rooms</p>
        </CardContent>
      </Card>
    </>
  )
}
