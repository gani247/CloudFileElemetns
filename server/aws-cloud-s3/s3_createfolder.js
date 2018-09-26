var AWS = require('aws-sdk');
// AWS.config.update({
//   accessKeyId: 'YOUR_KEY_HERE',
//   secretAccessKey: 'your_secret_access_key_here'
// });

var bucket = new AWS.S3();

var contentToPost = {
  Bucket: 'mybucket1-247',
  Key: 'f2/'
};
//,Prefix: 'f2/' // gives error
bucket.putObject(contentToPost, function (error, data) {

  if (error) {
      console.log("Error in posting Content [" + error + "]");
      return false;
  } /* end if error */
  else {
      console.log("Successfully posted Content");
  } /* end else error */
})
.on('httpUploadProgress',function (progress) {
  // Log Progress Information
  console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
});