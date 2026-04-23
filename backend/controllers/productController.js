const Product = require('../models/products')

// add Product
exports.createProduct = async (req, resp) => {
  try {
    const { name, description, category, stock } = req.body
     
     const imagePaths = req.files
      ? req.files.map(file => `/uploads/${file.filename}`)
      : []
      
    const sizes = req.body.sizes
      ? typeof req.body.sizes === "string"
        ? JSON.parse(req.body.sizes)
        : req.body.sizes
      : [];

    const product = new Product({
      name,
      description,
      category,
      stock,
      images: imagePaths,
      sizes,
    })

    const savedProduct = await product.save();
    resp.status(201).json({message :"product created successfully" ,savedProduct})


  } catch (error) {
    resp.status(500).json({ message: error.message });
  }
}

// Get All Products
exports.getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 6
   
    const { category, exclude } = req.query;

    let query = {};

    //filter by category
    if (category) {
      query.category = category;
    }

    //exclude current product
    if (exclude) {
      query._id = { $ne: exclude };
    }

    const skip = (page - 1) * limit

    const total = await Product.countDocuments(query)

    const products = await Product.find(query)
      .skip(skip)
      .limit(limit)

    const totalPages = Math.ceil(total / limit);

    res.json({products , totalPages, currentPage: page})

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


// Get Single Product
exports.getSingleProduct = async (req, resp) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return resp.status(404).json({ message: "Product not found" })
    }

    resp.json(product)
  } catch (error) {
    resp.status(500).json({ message: error.message })
  }
}

// Delete Product
exports.deleteProduct = async (req, resp) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    resp.json({ message: "Product deleted successfully" })
  } catch (error) {
    resp.status(500).json({ message: error.message })
  }
}

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, existingImages } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.category = category || product.category;
    product.stock = stock ?? product.stock;

    // 🔥 UPDATE SIZES
   if (req.body.sizes) {
       product.sizes =
       typeof req.body.sizes === "string"
      ? JSON.parse(req.body.sizes)
      : req.body.sizes;
    }

    // Parse existing images (coming from frontend)
    let updatedImages = existingImages
      ? JSON.parse(existingImages)
      : product.images;

    // Add new uploaded images
    if (req.files && req.files.length > 0) {
      const newImagePaths = req.files.map(
        (file) => `/uploads/${file.filename}`
      );
      updatedImages = [...updatedImages, ...newImagePaths];
    }

    product.images = updatedImages;

    await product.save();

    res.json({ message: "Product updated successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};