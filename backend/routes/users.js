const express = require('express')
const router = express.Router()

// get all
router.get('/', (request, response) => {
    response.send('Hello world!')
})

// get one
router.get('/:id', (request, response) => {
    
})

// create one
router.post('/', (request, response) => {
    
})

// update one
router.patch('/:id', (request, response) => {
    
})

// delete one
router.delete('/:id', (request, response) => {
    
})

module.exports = router