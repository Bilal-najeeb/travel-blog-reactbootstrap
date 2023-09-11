import mongoose from 'mongoose'



const subLocationSchema = new mongoose.Schema({

    name: {type: String, required: true},

    parentLocation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
    },
    // Other sub-location properties
  });



  const SubLocation = mongoose.model('SubLocation', subLocationSchema);

  export default SubLocation