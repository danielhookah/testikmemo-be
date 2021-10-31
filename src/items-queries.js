const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

const getItems = (request, response) => {
  pool.query('SELECT * FROM items ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getItemById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM items WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createItem = (request, response) => {
  const { title, label, value, created_at, days_after_to_show } = request.body

  pool.query('INSERT INTO items (title, label, value, created_at, days_after_to_show) VALUES ($1, $2, $3, $4, $5)', [title, label, value, created_at, days_after_to_show], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Item added with ID: ${result.insertId}`)
  })
}

const updateItem = (request, response) => {
  const id = parseInt(request.params.id)
  const { title, label, value, created_at, days_after_to_show } = request.body

  pool.query(
    'UPDATE items SET title = $1, label = $2, value = $3, created_at = $4, days_after_to_show = $5 WHERE id = $6',
    [title, label, value, created_at, days_after_to_show, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Item modified with ID: ${id}`)
    }
  )
}

const deleteItem = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM items WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Item deleted with ID: ${id}`)
  })
}

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
}
