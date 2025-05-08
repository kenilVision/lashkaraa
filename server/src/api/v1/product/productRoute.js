const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const { createProduct ,  getAllProducts,
    getProductBySlug } = require('./productController');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "";
    if (file.fieldname === 'productVideos') {
      folder = path.join(__dirname, '../../../public/productVideos');  
    } else {
      folder = path.join(__dirname, '../../../public/products');  
    }
    cb(null, folder);  
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}${Math.floor(Math.random() * 10000)}${path.extname(file.originalname)}`); 
  },
});

const upload = multer({ storage: storage });


router.post('/createProduct', upload.fields([{ name: 'images'}, { name: 'productVideos', maxCount: 1 }]), createProduct);
router.get("/getAllProducts/:slug", getAllProducts);
router.get("/getProductBySlug/:slug", getProductBySlug);

module.exports = router;
