"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

interface AddPurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (purchase: any) => void
}

export function AddPurchaseModal({ isOpen, onClose, onAdd }: AddPurchaseModalProps) {
  const [formData, setFormData] = useState({
    material: "",
    quantity: "",
    cost: "",
    supplier: "",
    project: "",
    status: "Pending",
    category: "",
  })
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const categories = ["Concrete & Steel", "Lumber & Tools", "Roofing & Insulation", "Hardware & Fixtures"]
  const statuses = ["Pending", "In Transit", "Delivered"]
  const projects = [
    "Residential Complex A",
    "Commercial Plaza B",
    "Industrial Warehouse C",
    "Office Building D",
    "Retail Center E",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.material ||
      !formData.quantity ||
      !formData.cost ||
      !formData.supplier ||
      !formData.project ||
      !formData.category
    ) {
      alert("Please fill in all required fields")
      return
    }

    const newPurchase = {
      id: Date.now(),
      ...formData,
      date: format(selectedDate, "yyyy-MM-dd"),
      cost: formData.cost.startsWith("$") ? formData.cost : `$${formData.cost}`,
    }

    onAdd(newPurchase)

    // Reset form
    setFormData({
      material: "",
      quantity: "",
      cost: "",
      supplier: "",
      project: "",
      status: "Pending",
      category: "",
    })
    setSelectedDate(new Date())
    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Purchase</DialogTitle>
          <DialogDescription>add a new purchase record to your history</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="material">Material *</Label>
            <Input
              id="material"
              value={formData.material}
              onChange={(e) => handleInputChange("material", e.target.value)}
              placeholder="e.g., Concrete Mix"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity *</Label>
            <Input
              id="quantity"
              value={formData.quantity}
              onChange={(e) => handleInputChange("quantity", e.target.value)}
              placeholder="e.g., 50 bags"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cost">Cost *</Label>
            <Input
              id="cost"
              value={formData.cost}
              onChange={(e) => handleInputChange("cost", e.target.value)}
              placeholder="e.g., 2500 or ₹2500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="supplier">Supplier *</Label>
            <Input
              id="supplier"
              value={formData.supplier}
              onChange={(e) => handleInputChange("supplier", e.target.value)}
              placeholder="e.g., BuildMart Pro"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project">Project *</Label>
            <Select value={formData.project} onValueChange={(value) => handleInputChange("project", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project} value={project}>
                    {project}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Purchase Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
              Add Purchase
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
