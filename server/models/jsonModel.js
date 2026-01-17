import fs from 'fs'

// Helper to read data
export const readJSON = (filePath) => {
  try {
    if (!fs.existsSync(filePath)) {
      return [] // Return empty array if file doesn't exist
    }
    const data = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error)
    return []
  }
}

// Helper to write data
export const writeJSON = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error)
    return false
  }
}