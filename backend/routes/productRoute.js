const express = require('express')
const { createProduct, getProducts, getSingleProduct, updateProduct, deleteProduct  } = require('../controllers/productController')
const { protectAdmin } = require('../middleware/adminMiddleware')
const upload = require('../middleware/upload')


const router = express.Router()

router.get('/' , getProducts)
router.get('/:id' , getSingleProduct)


//admin protected route
router.post('/' , protectAdmin , upload.array("images", 10), createProduct)
router.put('/:id' , protectAdmin , upload.array("images", 10), updateProduct)
router.delete('/:id' , protectAdmin , deleteProduct)



module.exports = router