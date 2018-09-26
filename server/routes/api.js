const express = require('express');
const s3Obj = require('../aws-cloud-s3')
const router = express.Router();
var bucketName = 'mybucket1-247';
// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {
    response.data = [{name:"name1"}, {name:"name2"}, {name:"name3"}];
    res.json(response);
});

router.get('/listAll/:folder?', (req, res) => {
    //list all folders and files in a folder/bucket
    var folder;// = "archive";
    var params = {
           Bucket : bucketName
        };
    folder = req.params.folder;
    console.log('list-all-folder', folder);
    if(folder && folder.length !=0){
        folder = folder.replace(/_/gi,'/');
        folder += folder.endsWith('/') ? "": "/";
        params.Prefix = folder;
    }

    s3Obj.listObjects(params).then((s3data)=>{
        s3data = s3data.Contents;
        console.log(JSON.stringify(s3data))
        var data = [];
        s3data.forEach(e => {
            var fileElement = {};
            var key = e.Key;
            fileElement.id = key;
            fileElement.isFolder = key.endsWith('/');
            var arr = e.Key.split('/');
            key = fileElement.isFolder ? key.substr(0, key.length-1): key;
            if(key.indexOf('/') != -1){ // has /
                fileElement.parent = key.substr(0,key.lastIndexOf('/')+1);
                fileElement.name = key.substr(key.lastIndexOf('/')+1, key.length);
            }
            else { // no /
                fileElement.name = key;
            }
            //folder = folder ? folder.replace('/','') : folder;
            //console.log('folder', folder);
            //console.log('fileElement', JSON.stringify(fileElement));
            if((!folder && fileElement.parent == bucketName) || fileElement.parent == folder){
                data.push(fileElement);
                
            }
        });
        // console.log('data', JSON.stringify(data));
        response.data = data;
        res.json(response);
    });
});

router.get('/folder/:key', (req, res) => {
    // download a file
    var key = req.params.key;
    key = key.replace(/_/gi,'/');
    console.log('get-folder-key', key);
    if(key){
        var params = {
            Bucket : bucketName, 
            Key: key
           };
        s3Obj.getFile(params).then((data)=>{
            response.data = data.Contents ? data.Contents : data;
            res.json(response);
        });
    }
    
});

router.put('/folder', (req, res) => {
    //create folder
    console.log(JSON.stringify(req.body));
    var folder = req.body.id;
    // var prefix = req.body.parent;
    var params = {
        Bucket : bucketName, 
        Key: folder
    };
    //if(prefix) params.Prefix = prefix;
    s3Obj.createFolder(params).then((data)=>{
        response.data = data.Contents ? data.Contents : data;
        res.json(response);
    });
});

router.put('/file', (req, res) => {
    // upload a file 
    var params = {
        Body: '<Binary String>',
        Bucket : bucketName, 
        Key: "HappyFace.txt"
       };
    s3Obj.uploadFile(params).then((data)=>{
        response.data = data.Contents ? data.Contents : data;
        res.json(response);
    });
});

router.get('/file/:fileKey', (req, res) => {
    // download a file
    var params = {
        Bucket : bucketName, 
        Key: "mysql-info.txt"
       };
    s3Obj.getFile(params).then((data)=>{
        response.data = data.Contents ? data.Contents : data;
        res.json(response);
    });
});

module.exports = router;
