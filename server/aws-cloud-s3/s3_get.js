// Copyright 2010-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Licensed under the Apache-2.0 License on an "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND.   

// ABOUT THIS NODE.JS SAMPLE: This sample is part of the SDK for JavaScript Developer Guide topic at
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
//AWS.config.update({region: 'REGION'});

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});

// Create params for S3.createBucket
var readParams = {
  Bucket : 'mybucket1-247',
  Key: 'tempfolder/intemp/'
};

// call S3 to create the bucket
s3.getObject(readParams, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});
