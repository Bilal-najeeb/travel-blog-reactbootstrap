// multerConfig.js
import multer from 'multer';
import path from 'path';

// Define a function to create the Multer middleware
const storageConfig = (folderName) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const destinationFolder = `uploads/`; // Specify the subfolder
      cb(null, destinationFolder);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extname = path.extname(file.originalname);
      cb(null, `${uniqueSuffix}${extname}`);
    },
  });

  return multer({ storage });
};

export default storageConfig;
