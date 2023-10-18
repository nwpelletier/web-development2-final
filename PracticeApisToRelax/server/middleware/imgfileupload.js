const formidable = require('formidable');


module.exports = function imageUploadMiddleware(req, res, next) {
 
  form.parse(req, (err, fields, files) => {
    if (err) {
      // Handle parsing errors
      return res.status(500).json({ message: 'Error parsing image upload' });
    }

    if (!files.image) {
      // No image file found in the request
      return res.status(400).json({ message: 'No image file uploaded' });
    }


  });
}

module.exports = imageUploadMiddleware;
