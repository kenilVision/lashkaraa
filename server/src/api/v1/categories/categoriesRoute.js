const router = require('express').Router();
const {   createCategory , addSubCategory , getAllCategories, getCategoryById , deleteCategory , deleteSubCategory  , getLatestSubcategories} = require('./categoriesController');
const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../../../public/categories'))
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname)
      const name = file.fieldname + '-' + Date.now() + ext
      cb(null, name)
    }
  })
  
  const upload = multer({ storage })

  


router.post('/createCategory',
    upload.fields([
      { name: 'image', maxCount: 1 },
    ]), createCategory)

    router.post('/addSubCategory/:categoryId',
      upload.fields([
        { name: 'subCategoryImage', maxCount: 1 },
      ]), 
      addSubCategory
    );

    router.get('/getAllCategories', getAllCategories);
    router.get('/getLatestSubcategories', getLatestSubcategories);
    router.get('/getCategoryById/:categoryId', getCategoryById);

    router.delete('/categories/:categoryId', deleteCategory);
    router.delete('/subcategories/:subCategoryId', deleteSubCategory);
    router.delete('/deleteCategory',deleteCategory)
    router.delete('/deleteSubCategory',deleteSubCategory)
module.exports = router;


