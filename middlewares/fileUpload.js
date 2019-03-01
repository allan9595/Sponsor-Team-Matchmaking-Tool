const crypto = require('crypto');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');


const mongoURI = require('../config/keys').mongoURI;
const conn = mongoose.createConnection(mongoURI);

let gfs;

//const upload = multer({ dest: 'uploads/' })

//const fileUploadMiddleware =  upload.single('attachment');

conn.once('open', () =>  {
    //init stream

    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
    // all set!
});

//create storage engie


const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
  const upload = multer({ storage });

  module.exports = upload ;
