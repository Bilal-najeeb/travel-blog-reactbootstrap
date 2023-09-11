import asyncHandler from 'express-async-handler';
import SubLocation from '../models/subLocationModel.js';
import Location from '../models/locationModel.js'






// @desc    Create a new Category
// route    POST /api/categories/createcategory
// @access  Private
const createLocation = asyncHandler( async (req, res) => {

  const {name} = req.body

  const locationCheck = await Location.findOne({name: name});

  if(locationCheck){
      res.status(400);
      throw new Error("Location already exists");
  }

  if (!name){
      res.status(400);
      throw new Error("Each blog must have a location");
  }

  const location = await Location.create({
      name: name,
  })



  res.status(200).json(location);
 
 }
 )


 // @desc    Read all categories
// route    GET /api/categories/readcategory
// @access  Private
const readLocation = asyncHandler( async (req, res) => {

  const location = await Location.find();

  res.status(200).json(location);
 
   
 }
 )


  // @desc    update a category
// route    PUT /api/categories/updatecategory
// @access  Private
const updateLocation = asyncHandler( async (req, res) => {

  const {name} = req.body

  const location = await Location.findById(req.params.id);

  if(!location) {
      
      res.status(404);
      throw new Error('Location not found');

  }

 const updatedlocation = await Location.findByIdAndUpdate(req.params.id,
  
  {
      name: name,


  },

   {new:true})


  res.status(200).json(updatedlocation)
 
 }
 )


 
  // @desc    update a category
// route    PUT /api/categories/updatecategory
// @access  Private
const deleteLocation = asyncHandler( async (req, res) => {

  const location = await Location.findById(req.params.id);

    if(!location) {
        
        res.status(404);
        throw new Error('Category not found');

    }

    await location.deleteOne();

    res.status(200).json({id: req.params.id});
   

   
 
 }
 )
 

 


// @desc    Create a new Category
// route    POST /api/categories/createcategory
// @access  Private
const createSubLocation = asyncHandler( async (req, res) => {

    const {name, parentLocationId} = req.body;
    
    const subLocationCheck = await SubLocation.findOne({name: name});


    if(subLocationCheck){
      res.status(400);
      throw new Error("Sub Location already exists");
  }


  const subLocation = await SubLocation.create({
      name: name,
      parentLocation: parentLocationId,
  })



  res.status(200).json(subLocation);
 
 }
 )


 // @desc    Read all categories
// route    GET /api/categories/readcategory
// @access  Private
const readSubLocation = asyncHandler( async (req, res) => {

  const locationQuery = req.query.locationQuery || "";
  


  if (locationQuery){
    const subLocation = await SubLocation.find({parentLocation: locationQuery});
    res.status(200).json(subLocation);
   
  } else {
    const subLocation = await SubLocation.find().populate('parentLocation', 'name')
    res.status(200).json(subLocation);
  }

 }
 )


  // @desc    update a category
// route    PUT /api/categories/updatecategory
// @access  Private
const updateSubLocation = asyncHandler( async (req, res) => {

   
 
 }
 )


 
  // @desc    update a category
// route    PUT /api/categories/updatecategory
// @access  Private
const deleteSubLocation = asyncHandler( async (req, res) => {

 
   
 
 }
 )
 

  
export { createLocation, readLocation, updateLocation, deleteLocation,
        createSubLocation, readSubLocation, updateSubLocation, deleteSubLocation
    }