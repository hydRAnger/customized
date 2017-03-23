var co = require('co');
var OSS = require('ali-oss');
var SparkMD5 = require('spark-md5');


window.browserMD5File = function browserMD5File(file, callback) {
  const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
  const chunkSize = 2097152;
  const chunks = Math.ceil(file.size / chunkSize);
  var currentChunk = 0;
  const spark = new SparkMD5.ArrayBuffer();
  const reader = new FileReader();

  loadNext();

  reader.onloadend = function(e) {
    spark.append(e.target.result); // Append array buffer
    currentChunk++;

    if (currentChunk < chunks) {
      loadNext();
    } else {
      callback(null, spark.end());
    }
  };

  reader.onerror = function() {
    callback('oops, something went wrong.');
  };

  /////////////////////////
  function loadNext() {
    const start = currentChunk * chunkSize;
    const end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

    reader.readAsArrayBuffer(blobSlice.call(file, start, end));
  }
}


window.createBlockMultipartUpload = function createBlockMultipartUpload(block, file, progress) {

  const ossAccessKeyId = block.block_upload_info.access_key_id;
  const ossAccessKeySecret = block.block_upload_info.access_key_secret;
  const ossSecurityToken = block.block_upload_info.security_token;
  const ossDataUploadUrl = block.block_upload_info.data_upload_url;

  const splittedResource = ossDataUploadUrl.split('://')[1].split('/');
  const ossHostName = splittedResource[0];
  const ossBucketName = splittedResource[1];
  const ossPath = `${splittedResource[2]}/${splittedResource[3]}`;

  const client = new OSS.Wrapper({
    secure: true,
    endpoint: `https://${ossHostName}`,
    accessKeyId: ossAccessKeyId,
    accessKeySecret: ossAccessKeySecret,
    stsToken: ossSecurityToken,
    bucket: ossBucketName
  });

  return client.multipartUpload(ossPath, file, {
    progress: p => done => {
      progress(p);
      done();
    }
  })
  
}

window.createOSSClientByBlockInfo = function createOSSClientByBlockInfo({
    access_key_id: ossAccessKeyId,
    access_key_secret: ossAccessKeySecret,
    security_token: ossSecurityToken
  }, ossDataUrl) {
  const splittedResource = ossDataUrl.split('://')[1].split('/');
  const ossHostName = splittedResource[0];
  const ossBucketName = splittedResource[1];

  return {
    ossPath: `${splittedResource[2]}/${splittedResource[3]}`,
    client: new OSS.Wrapper({
      secure: true,
      endpoint: `https://${ossHostName}`,
      accessKeyId: ossAccessKeyId,
      accessKeySecret: ossAccessKeySecret,
      stsToken: ossSecurityToken,
      bucket: ossBucketName
    })
  };
}

window.getFileDownloadUrl = function getFileDownloadUrl({block_download_info: info}, name) {
  const {client, ossPath} = createOSSClientByBlockInfo(info, info.data_download_url);
  const result = client.signatureUrl(ossPath, {
    expires: 3600,
    response: {
      'content-disposition': `attachment; filename='${name}`
    }
  });

  return result;
}