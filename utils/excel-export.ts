export interface PurchaseData {
  id: number
  material: string
  quantity: string
  date: string
  cost: string
  supplier: string
  project: string
  status: string
  category: string
}

export const exportToCSV = (data: PurchaseData[], filename = "purchase-history") => {
  // Create CSV content
  const headers = ["Material", "Quantity", "Date", "Cost", "Supplier", "Project", "Status", "Category"]

  const csvContent = [
    headers.join(","),
    ...data.map((item) =>
      [
        `"${item.material}"`,
        `"${item.quantity}"`,
        `"${item.date}"`,
        `"${item.cost}"`,
        `"${item.supplier}"`,
        `"${item.project}"`,
        `"${item.status}"`,
        `"${item.category}"`,
      ].join(","),
    ),
  ].join("\n")

  // Create and download file
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `${filename}-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

// Keep the Excel export as backup
export const exportToExcelAdvanced = async (data: PurchaseData[], filename = "purchase-history") => {
  try {
    // Dynamic import to avoid SSR issues
    const XLSX = await import("xlsx")

    // Prepare data for Excel
    const excelData = data.map((item) => ({
      Material: item.material,
      Quantity: item.quantity,
      Date: item.date,
      Cost: item.cost,
      Supplier: item.supplier,
      Project: item.project,
      Status: item.status,
      Category: item.category,
    }))

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(excelData)

    // Set column widths
    const columnWidths = [
      { wch: 20 }, // Material
      { wch: 15 }, // Quantity
      { wch: 12 }, // Date
      { wch: 12 }, // Cost
      { wch: 20 }, // Supplier
      { wch: 25 }, // Project
      { wch: 12 }, // Status
      { wch: 18 }, // Category
    ]
    worksheet["!cols"] = columnWidths

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Purchase History")

    // Generate filename with current date
    const currentDate = new Date().toISOString().split("T")[0]
    const finalFilename = `${filename}-${currentDate}.xlsx`

    // Write file
    XLSX.writeFile(workbook, finalFilename)
  } catch (error) {
    console.error("Excel export failed, falling back to CSV:", error)
    // Fallback to CSV export
    exportToCSV(data, filename)
  }
}
