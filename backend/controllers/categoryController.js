import asyncHandler from 'express-async-handler';
import Category from '../models/categoryModel.js';
import Subcategory from '../models/subcategoryModel.js'






// @desc    Create a new Category
// route    POST /api/categories/createcategory
// @access  Private
const createCategory = asyncHandler( async (req, res) => {

    const {name} = req.body

    const catCheck = await Category.findOne({name: name});

    if(catCheck){
        res.status(400);
        throw new Error("Category already exists");
    }

    if (!name){
        res.status(400);
        throw new Error("Blog post must have a category");
    }

    const category = await Category.create({
        name: name,
    })



    res.status(200).json(category);
 
 }
 )


 // @desc    Read all categories
// route    GET /api/categories/readcategory
// @access  Private
const readCategory = asyncHandler( async (req, res) => {

    const category = await Category.find();

    res.status(200).json(category);
   
 
 }
 )


  // @desc    update a category
// route    PUT /api/categories/updatecategory
// @access  Private
const updateCategory = asyncHandler( async (req, res) => {

    const {name} = req.body

    const category = await Category.findById(req.params.id);

    if(!category) {
        
        res.status(404);
        throw new Error('Category not found');

    }

   const updatedCategory = await Category.findByIdAndUpdate(req.params.id,
    
    {
        name: name,
 

    },

     {new:true})


    res.status(200).json(updatedCategory);
   
 
 }
 )


 
  // @desc    update a category
// route    PUT /api/categories/updatecategory
// @access  Private
const deleteCategory = asyncHandler( async (req, res) => {



    const category = await Category.findById(req.params.id);

    if(!category) {
        
        res.status(404);
        throw new Error('Category not found');

    }

    await category.deleteOne();

    res.status(200).json({id: req.params.id});
   
 
 }
 )
 

 


// @desc    Create a new Category
// route    POST /api/categories/createcategory
// @access  Private
const createSubCategory = asyncHandler( async (req, res) => {

    const {name, parentCategory} = req.body
    console.log(name, Array.isArray(parentCategory));
    const catCheck = await Subcategory.findOne({name: name});

    if(catCheck){
        res.status(400);
        throw new Error("Category already exists");
    }


    if (!Array.isArray(parentCategory)) {
        return res.status(400).json({ message: 'Invalid subcategories data. Expecting an array.' });
      }

    const sub_category = await Subcategory.create({
        name: name,
        parentCategory: parentCategory,
    })



    res.status(200).json(sub_category);
 
 }
 )


 // @desc    Read all categories
// route    GET /api/categories/readcategory
// @access  Private
const readSubCategory = asyncHandler( async (req, res) => {

    try {
        const sub_category = await Subcategory.find();

        res.status(200).json(sub_category);
        
    } catch (error) {
        res.status(404);
        throw new Error("Couldn't find any sub category");
    }
   
 
 }
 )


  // @desc    update a category
// route    PUT /api/categories/updatecategory
// @access  Private
const updateSubCategory = asyncHandler( async (req, res) => {

    const {name, parentCategory} = req.body

    const sub_category = await Category.findById(req.params.id);

    if(!sub_category) {
        
        res.status(404);
        throw new Error('Sub category not found');

    }

   const updatedSubCategory = await Category.findByIdAndUpdate(req.params.id,
    
    {
        name: name,
        parentCategory: parentCategory,

    },

     {new:true})


    res.status(200).json(updatedSubCategory);
   
 
 }
 )


 
  // @desc    update a category
// route    PUT /api/categories/updatecategory
// @access  Private
const deleteSubCategory = asyncHandler( async (req, res) => {

    const {name} = req.body

    const sub_category = await Subcategory.findById(req.params.id);

    if(!sub_category) {
        
        res.status(404);
        throw new Error('Category not found');

    }

    await sub_category.deleteOne();

    res.status(200).json({id: req.params.id});
   
 
 }
 )
 

  
export { createCategory, readCategory, updateCategory, deleteCategory,
         createSubCategory, readSubCategory, updateSubCategory, deleteSubCategory
    }