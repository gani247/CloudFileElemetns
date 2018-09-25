var AWS = require('aws-sdk');
var uuid = require('uuid');

// Create unique bucket name
var bucketName = 'mybucket1-247';// + uuid.v4();
// Create name for uploaded object key
//var keyName = 'mysql-info.txt';

// Create a promise on S3 service object
var s3 = new AWS.S3({apiVersion: '2006-03-01'});

var listObjects = function(params ) {
  return s3.listObjectsV2(params).promise();
  // var params = {
  //   Bucket : 'BUCKET_NAME',
  // };
  // s3.listObjects(params, function(err, data) {
  //   if (err) {
  //     console.log("Error", err);
  //   } else {
  //     console.log("Success", data);
  //     return data;
  //   }
  // });
};

var createFolder = function (params) {
  return s3.putObject(params).promise();
  // var bucketParams = {
  //   Bucket: "examplebucket", 
  //   Key: "objectkey"
  // };
  
  // // call S3 to create the bucket
  // s3.putObject(bucketParams, function(err, data) {
  //   if (err) {
  //     console.log("Error", err);
  //   } else {
  //     console.log("Success", data.Location);
  //   }
  // });
};

var getFile = function(params) {
  return s3.getObject(params).promise();
}
var uploadFile = function(params) {
  return s3.putObject(params).promise();
  /*var params = {
    Body: '<Binary String>', 
    Bucket: "examplebucket", 
    Key: "HappyFace.jpg", 
    ServerSideEncryption: "AES256", 
    StorageClass: "STANDARD_IA"
   };
   s3.putObject(params, function(err, data) {
     if (err) console.log(err, err.stack); // an error occurred
     else     console.log(data);           // successful response
     /*
     data = {
      ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"", 
      ServerSideEncryption: "AES256", 
      VersionId: "CG612hodqujkf8FaaNfp8U..FIhLROcp"
     }
     * /
   });*/
}

module.exports = {
  listObjects: listObjects
  ,createFolder : createFolder
  ,getFile: getFile
  ,uploadFile: uploadFile
};
/* var renameObject = function(params){
  var BUCKET_NAME = 'your-bucket-name';
  var OLD_KEY = '/original-file.js';
  var NEW_KEY = '/new-file.js';
  var params = {
    Bucket: BUCKET_NAME, 
    CopySource: `${BUCKET_NAME}${OLD_KEY}`, 
    Key: NEW_KEY
  };
  // Copy the object to a new location
  s3.copyObject(params)
    .promise()
    .then(() => 
      // Delete the old object
      s3.deleteObject({
        Bucket: BUCKET_NAME, 
        Key: OLD_KEY
      }).promise()
    )
    // Error handling is left up to reader
    .catch((e) => console.error(e));
}

*/