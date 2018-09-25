s3data = [{"Key":"tempfolder/"},{"Key":"tempfolder/intemp/"},{"Key":"tempfolder/intemp/intemp1/"}];
        console.log(JSON.stringify(s3data))
        var data = [], folder = 'tempfolder/';
        s3data.forEach(e => {
            var fileElement = {};
            var key = e.Key;
            fileElement.id = key;
            fileElement.isFolder = key.endsWith('/');
            var arr = e.Key.split('/');
            key = fileElement.isFolder ? key.substr(0, key.length-1): key;
            if(key.indexOf('/') != -1){ // has /
                fileElement.parent = key.substr(0,key.lastIndexOf('/'));
                fileElement.name = key.substr(key.lastIndexOf('/')+1, key.length);
            }
            else { // no /
                fileElement.name = key;
            }
            folder = folder.replace('/','');
            if((!folder && fileElement.parent == bucketName) || fileElement.parent == folder){
                data.push(fileElement);
                //console.log('fileElement', JSON.stringify(fileElement));
            }
        });
        console.log('data', JSON.stringify(data));