"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Edit, MoreHorizontal, Plus, Trash } from "lucide-react"

type Product = {
  id: string
  name: string
  category: string
  price: string
  stock: number
  status: "in-stock" | "low-stock" | "out-of-stock"
}

const initialProducts: Product[] = [
  {
    id: "PROD-001",
    name: "Premium Headphones",
    category: "Electronics",
    price: "$299.99",
    stock: 45,
    status: "in-stock",
  },
  {
    id: "PROD-002",
    name: "Wireless Keyboard",
    category: "Electronics",
    price: "$89.99",
    stock: 12,
    status: "low-stock",
  },
  {
    id: "PROD-003",
    name: "Smart Watch",
    category: "Electronics",
    price: "$199.99",
    stock: 28,
    status: "in-stock",
  },
  {
    id: "PROD-004",
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: "$129.99",
    stock: 0,
    status: "out-of-stock",
  },
  {
    id: "PROD-005",
    name: "Laptop Stand",
    category: "Accessories",
    price: "$49.99",
    stock: 56,
    status: "in-stock",
  },
  {
    id: "PROD-006",
    name: "External SSD",
    category: "Storage",
    price: "$159.99",
    stock: 8,
    status: "low-stock",
  },
]

export function ProductManagement() {
  const { toast } = useToast()
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    category: "",
    price: "",
    stock: 0,
    status: "in-stock",
  })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const filteredProducts = products.filter((product) => {
    if (searchQuery === "") return true
    const query = searchQuery.toLowerCase()
    return (
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.price.toLowerCase().includes(query) ||
      product.status.toLowerCase().includes(query)
    )
  })

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      toast({
        title: "Error",
        description: "Name, category, and price are required",
        variant: "destructive",
      })
      return
    }

    const product: Product = {
      id: `PROD-${String(products.length + 1).padStart(3, "0")}`,
      name: newProduct.name,
      category: newProduct.category,
      price: newProduct.price.startsWith("$") ? newProduct.price : `$${newProduct.price}`,
      stock: newProduct.stock || 0,
      status: determineStatus(newProduct.stock || 0),
    }

    setProducts([...products, product])
    setNewProduct({
      name: "",
      category: "",
      price: "",
      stock: 0,
      status: "in-stock",
    })
    setIsAddDialogOpen(false)
    toast({
      title: "Product added",
      description: `${product.name} has been added successfully`,
    })
  }

  const handleEditProduct = () => {
    if (!editingProduct) return

    // Update status based on stock
    const updatedProduct = {
      ...editingProduct,
      status: determineStatus(editingProduct.stock),
    }

    setProducts(products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)))
    setIsEditDialogOpen(false)
    toast({
      title: "Product updated",
      description: `${updatedProduct.name} has been updated`,
    })
  }

  const handleDeleteProduct = () => {
    if (!editingProduct) return

    setProducts(products.filter((product) => product.id !== editingProduct.id))
    setIsDeleteDialogOpen(false)
    toast({
      title: "Product deleted",
      description: `${editingProduct.name} has been removed`,
    })
  }

  const openEditDialog = (product: Product) => {
    setEditingProduct({ ...product })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (product: Product) => {
    setEditingProduct(product)
    setIsDeleteDialogOpen(true)
  }

  const determineStatus = (stock: number): "in-stock" | "low-stock" | "out-of-stock" => {
    if (stock <= 0) return "out-of-stock"
    if (stock <= 15) return "low-stock"
    return "in-stock"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Product Management</h1>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>Add a new product to your inventory.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="Premium Headphones"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  placeholder="Electronics"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  placeholder="$299.99"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: Number.parseInt(e.target.value) })}
                  placeholder="0"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddProduct}>Add Product</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Products</CardTitle>
              <CardDescription>Manage your product inventory and stock levels.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search products..."
                className="w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No products found
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          product.status === "in-stock"
                            ? "default"
                            : product.status === "low-stock"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {product.status.replace("-", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditDialog(product)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => openDeleteDialog(product)}>
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update product information and stock levels.</DialogDescription>
          </DialogHeader>
          {editingProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Product Name</Label>
                <Input
                  id="edit-name"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Category</Label>
                <Input
                  id="edit-category"
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-price">Price</Label>
                <Input
                  id="edit-price"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-stock">Stock</Label>
                <Input
                  id="edit-stock"
                  type="number"
                  value={editingProduct.stock}
                  onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number.parseInt(e.target.value) })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditProduct}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Product Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {editingProduct && (
            <div className="py-4">
              <p>
                <strong>Product:</strong> {editingProduct.name}
              </p>
              <p>
                <strong>ID:</strong> {editingProduct.id}
              </p>
              <p>
                <strong>Price:</strong> {editingProduct.price}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Delete Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

