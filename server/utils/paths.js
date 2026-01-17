import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Go up two levels from utils to server root, then up to data.json
export const DATA_PATH = path.join(__dirname, '..', '..', 'data.json')
export const ADDED_PRODUCTS_PATH = path.join(__dirname, '..', 'addedProducts.json')
export const SALES_PATH = path.join(__dirname, '..', 'sales.json')
export const USERS_PATH = path.join(__dirname, '..', 'users.json')