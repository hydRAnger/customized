var genedock = new GeneDockAPI('me+/FZa7PnVtlaBK9x7kLA==', 'CLb5jfTH4QRAm6h/0A3SMeGMbYM=', 'https://cn-cdc-api.genedock.com');
var workflow_id = '56cea6eae6bdc600247f3795';
var task_id;
//上传任务账户名
var currentAccount = 'chinacdc';
var inputForwardFile = {}, checksum = '', progress = 0;

var data = {},
  red = 'red',
  green = 'green';

var file_url, count = 60,
  download_time_count, downloadOutput_enid, enid;

this.getLog_id = getLog_id;

var uploadForwardFile = {};
var uploadReverseFile = {};

var testbtn = false;

// 按钮 RUN Pathon_16sPIP 运行Pathon_16sPIP
$('#cdc_running').click(function() {
  if (testbtn) {
    // new_task
    genedock.activateWorkflowFormal(currentAccount, 'default', {
      'workflow_name': 'Pathon_16sPIP',
      'workflow_version': 1,
      'parameters': PlanRequest,
      'task_name': 'Pathon_16sPIP'
    }, function(res) {
      var restask = JSON.parse(res);
      task_id = restask.task_id;
      // 跳转到loglist.html
      window.location = 'loglist.html?' + task_id + '/';
    }, function(err) {
      uploadForwardP(red, 'Running failed, please try again...');
      console.log('cdc_running失败');
    });
  } else {
    genedock.getParameterFormal(currentAccount, 'default', 'Pathon_16sPIP', {workflow_version: 1}, function(res) {
      var PlanRequest = res.parameter;
      var name = 'Pathon_16sPIP';
      var taskName = name + '_' + getCurrentTime().join('_');

      // update PlanRequest
      PlanRequest.name = name;
      PlanRequest.description = taskName;
      // update Inputs object
      PlanRequest.Inputs['loaddata_node1'].data[0].enid = uploadReverseFile.enid || '';
      PlanRequest.Inputs['loaddata_node1'].data[0].name = uploadReverseFile.name ? 'chinacdc:/' + uploadReverseFile.name : '';
      PlanRequest.Inputs['loaddata_node2'].data[0].enid = uploadForwardFile.enid;
      PlanRequest.Inputs['loaddata_node2'].data[0].name = 'chinacdc:/' + uploadForwardFile.name;

      // update Outputs object
      $.each(PlanRequest.Outputs, function(outputKey, outputVal) {
        for (var i = 0; i < PlanRequest.Outputs[outputKey].data.length; i++) {
          PlanRequest.Outputs[outputKey].data[i].description = name + '_' + outputKey + '_output_' + i;
          PlanRequest.Outputs[outputKey].data[i].name = 'chinacdc:/home/admin/' + taskName + '_' + outputKey + '_' + i + '.' + PlanRequest.Outputs[outputKey].formats[0];
        }
      });
      // update Parameters object
      PlanRequest.Parameters.pip_16s_v2_node3.parameters.format = {
        hint: "NGS data format : fastq or fasta or sam or bam or sff",
        required: true,
        type: "string",
        value: $('#select_format').val(),
        variable: true
      };
      PlanRequest.Parameters.pip_16s_v2_node3.parameters.format = {
        hint: "Analysis mode：fast or sensitive",
        required: true,
        type: "string",
        value: $('#modeFast').is(':checked') ? 'fast' : 'sensitive',
        variable: true
      };
      PlanRequest.Parameters.pip_16s_v2_node3.parameters.thread = {
        hint: "Number of threads",
        maxvalue: 4,
        minvalue: 1,
        required: false,
        type: "integer",
        value: 2,
        variable: true
      };
      PlanRequest.Parameters.txt_to_pdf_node4 = {
        alias: 'pdf',
        parameters: {}
      }
      // update Property object
      PlanRequest.Property.reference_task[0].id = null;
      // new_task
        genedock.activateWorkflowFormal(currentAccount, 'default', {
          'workflow_name': name,
          'workflow_version': 1,
          'parameters': PlanRequest,
          'task_name': name
        }, function(res) {
          var restask = JSON.parse(res);
          task_id = restask.task_id;
          // 跳转到loglist.html
          window.location = 'loglist.html?' + task_id + '/';
        }, function(err) {
          uploadForwardP(red, 'Running failed, please try again...');
          console.log('cdc_running失败');
        });
      }, function(err) {
        var dataMsg = eval("(" + err.responseText + ")");
        uploadForwardP(red, dataMsg.msg);
        console.trace('获取compileWorkflow出现错误');
      });
  }
});

var PlanRequest;

// 按钮 Test Entrypoint 测试运行
$('#cdc_testRun').click(function() {
  genedock.getParameterFormal(currentAccount, 'default', 'Pathon_16sPIP', {workflow_version: 1}, function(res) {
    PlanRequest = res.parameter;
    var name = 'Pathon_16sPIP';
    var taskName = name + '_' + getCurrentTime().join('_');

    // update PlanRequest
    PlanRequest.name = name;
    PlanRequest.description = taskName;
    // update Inputs object
    PlanRequest.Inputs['loaddata_node1'].data[0].enid = '59a7ca09f1e3f4002fd3eb55';
    PlanRequest.Inputs['loaddata_node1'].data[0].name = 'chinacdc:/16SPIP/reverse_R2.fastq';
    PlanRequest.Inputs['loaddata_node2'].data[0].enid = '59a7c9f8f1e3f4002fd3eb52';
    PlanRequest.Inputs['loaddata_node2'].data[0].name = 'chinacdc:/16SPIP/forward_R1.fastq';
    // update Outputs object
    $.each(PlanRequest.Outputs, function(outputKey, outputVal) {
      for (var i = 0; i < PlanRequest.Outputs[outputKey].data.length; i++) {
        PlanRequest.Outputs[outputKey].data[i].description = name + '_' + outputKey + '_output_' + i;
        PlanRequest.Outputs[outputKey].data[i].name = 'chinacdc:/home/admin/' + taskName + '_' + outputKey + '_' + i + '.' + PlanRequest.Outputs[outputKey].formats[0];
      }
    });
    // update Parameters object
    PlanRequest.Parameters.pip_16s_v2_node3.parameters.format = {
      hint: "NGS data format : fastq or fasta or sam or bam or sff",
      required: true,
      type: "string",
      value: "fastq",
      variable: true
    };
    PlanRequest.Parameters.pip_16s_v2_node3.parameters.format = {
      hint: "Analysis mode：fast or sensitive",
      required: true,
      type: "string",
      value: "fast",
      variable: true
    };
    PlanRequest.Parameters.pip_16s_v2_node3.parameters.thread = {
      hint: "Number of threads",
      maxvalue: 4,
      minvalue: 1,
      required: false,
      type: "integer",
      value: 2,
      variable: true
    };
    PlanRequest.Parameters.txt_to_pdf_node4 = {
      alias: 'pdf',
      parameters: {}
    }
    // update Property object
    PlanRequest.Property.reference_task[0].id = null;

    testbtn = true;

    $('#reverseFileAgent').val('chinacdc:/16SPIP/reverse_R2.fastq');
    $('#forwardFileAgent').val('chinacdc:/16SPIP/forward_R1.fastq');
    $('#modeFast').prop("checked", true);
    $('#select_format').val("fastq");

    uploadForwardP(green, 'please run...');
    $("#cdc_running").removeAttr("disabled");
  }, function(err) {
    uploadForwardP(red, "Running failed, please try again...");
    console.log("获取getWorkflow运行出错");
  });
});

//上传用户提示
function uploadForwardP(color, msg) {
  $("#upload_forward_p").html("<span style='display: block;width: auto;height: auto;border-radius: 5px;background: #cecece;padding: 5px 8px;color: " +
    color + ";text-align: center;word-wrap: break-word;'>" +
    msg + "</span>");
}

function uploadReverseP(color, msg) {
  $("#upload_reverse_p").html("<span style='display: block;width: auto;height: auto;border-radius: 5px;background: #cecece;padding: 5px 8px;color: " +
    color + ";text-align: center;word-wrap: break-word;'>" +
    msg + "</span>");
}

//隐藏中文下的input file，修改为英文状态,判断文件大小,类型
function forwardUploadFile(forwardFastaForm) {
  //英文版的value覆盖原版
  document.getElementById("forwardFileAgent").value = document.getElementById("inputForwardFile").value;
  //判断文件大小
  var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
  var fileSize = 0,
    size, cdc_fileName = forwardFastaForm.value;
  //兼容IE判断大小
  if (isIE && !forwardFastaForm.files) {
    var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
    inputForwardFile = fileSystem.GetFile(cdc_fileName);
    fileSize = inputForwardFile.size;
  } else {
    inputForwardFile = forwardFastaForm.files[0];
    fileSize = forwardFastaForm.files[0].size;
  }
  size = fileSize / 1024;
  if (size > 100000) {
    var cdc_fileSize = size / 1024;
    uploadForwardP(red, "The file size is " + cdc_fileSize.toFixed(2) + "MB，File size cannot exceed 100MB");
    $("#cdc_running,#upload_forward_btn").attr("disabled", "disabled");
  } else {
    //判断类型
    if (cdc_fileName.lastIndexOf(".") != -1) {
      var cdc_fileType = (cdc_fileName.substring(cdc_fileName.lastIndexOf(".") + 1, cdc_fileName.length)).toLowerCase();
      var cdc_fileFormat = ["fastq", "fq", "fasta", "sam", "bam", "sff"];
      for (var i = 0; i < cdc_fileFormat.length; i++) {
        if (cdc_fileFormat[i] == cdc_fileType) {
          $('#upload_forward_p').empty();
          uploadForwardP(green, "Success, please upload");
          $('#upload_forward_btn').removeAttr("disabled");
          return true;
        } else {
          $("#cdc_running,#upload_forward_btn").attr("disabled", "disabled");
          continue;
        }
      }
      $("#cdc_running,#upload_forward_btn").attr("disabled", "disabled");
      uploadForwardP(red, "Don't support the suffix for ." + cdc_fileType + " File upload,Only support (.fastq, .fq, .fasta, .sam, .bam, .sff)");
      return false;
    } else {
      $("#cdc_running,#upload_forward_btn").attr("disabled", "disabled");
      uploadForwardP(red, "Don't support the suffix for ." + cdc_fileType + " File upload,Only support (.fastq, .fq, .fasta, .sam, .bam, .sff)");
    }
  }
}

function reverseUploadFile(reverseFastaForm) {
  //英文版的value覆盖原版
  document.getElementById("reverseFileAgent").value = document.getElementById("inputReverseFile").value;
  //判断文件大小
  var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
  var fileSize = 0,
    size, cdc_fileName = reverseFastaForm.value;
  //兼容IE判断大小
  if (isIE && !reverseFastaForm.files) {
    var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
    inputReverseFile = fileSystem.GetFile(cdc_fileName);
    fileSize = inputReverseFile.size;
  } else {
    inputReverseFile = reverseFastaForm.files[0];
    fileSize = reverseFastaForm.files[0].size;
  }
  size = fileSize / 1024;
  if (size > 100000) {
    var cdc_fileSize = size / 1024;
    uploadReverseP(red, "The file size is " + cdc_fileSize.toFixed(2) + "MB，File size cannot exceed 100MB");
    $("#upload_reverse_btn").attr("disabled", "disabled");
  } else {
    //判断类型
    if (cdc_fileName.lastIndexOf(".") != -1) {
      var cdc_fileType = (cdc_fileName.substring(cdc_fileName.lastIndexOf(".") + 1, cdc_fileName.length)).toLowerCase();
      var cdc_fileFormat = ["fq", "fastq"];
      for (var i = 0; i < cdc_fileFormat.length; i++) {
        if (cdc_fileFormat[i] == cdc_fileType) {
          $('#upload_reverse_p').empty();
          uploadReverseP(green, "Success, please upload");
          $('#upload_reverse_btn').removeAttr("disabled");
          return true;
        } else {
          $("#upload_reverse_btn").attr("disabled", "disabled");
          continue;
        }
      }
      $("#upload_reverse_btn").attr("disabled", "disabled");
      uploadForwardP(red, "Don't support the suffix for ." + cdc_fileType + " File upload,Only support (.fastq, .fq)");
      return false;
    } else {
      $("#upload_reverse_btn").attr("disabled", "disabled");
      uploadForwardP(red, "Don't support the suffix for ." + cdc_fileType + " File upload,Only support (.fastq, .fq)");
    }
  }
}

//基于稳定性，使用jquery.from代替try获取enid。
function forwardFastaForm() {
  $('#upload_forward_p').html('uploading：<progress>');
  var filepath = $('#forwardFileAgent').val();
  var filename = filepath.substring(filepath.lastIndexOf('\\') + 1, filepath.length);
  const path = '/' + filename;
  //生成MD5码
  browserMD5File(inputForwardFile, function(err, checksum){
    checksum = checksum;
    //创建文件
    genedock.putDataFormal(currentAccount, 'default', path, function(res){
      const entityId = JSON.parse(res).entity_id;
      const payload = {
        checksum: checksum,
        compression_type: '',
        block_type: 'default',
        file_size: inputForwardFile.size
      };
      //创建上传过程
      genedock.createDataUploadProcessFormal(currentAccount, 'default', entityId, payload, function(processRes){
        const blockId = processRes.next_block_url.split('/').slice(-2, -1)[0];
        const entity_id = processRes.entity_id;
        const upload_process_id = processRes.upload_process_id;

        //创建分块上传过程
        genedock.putDataUploadBlockFormal(currentAccount, 'default', entity_id, blockId,
          {upload_process_id:upload_process_id, is_end: true}, function(blockRes){
            //上传分块到OSS

            createBlockMultipartUpload(blockRes, inputForwardFile, function(p) {})
              .then(function(result) {
                if (result.res.status === 200) {
                    genedock.callbackDataUploadBlock(currentAccount, 'default', entity_id, blockId, {
                      block_begin: 0,
                      upload_process_id: upload_process_id,
                      block_end: inputForwardFile.size,
                      block_size: inputForwardFile.size,
                      block_checksum: checksum,
                      block_system_size: inputForwardFile.size
                    }, function(res){
                      progress = 0;
                      genedock.listDataFormal(currentAccount, 'default', '/', function(res){
                        var files = res.data_list;
                        for (var i = 0; i < files.length; i++) {
                          if (files[i].name == filename) {
                            uploadForwardFile.enid = files[i].entity_id;
                            uploadForwardFile.name = files[i].name;
                            $('#cdc_running').removeAttr('disabled');
                            uploadForwardP(green, 'Uploaded successfully, please run...');
                            testbtn = false;
                          }
                        }
                      }, function(err) {
                        $('#upload_forward_p').html('uploading：<progress>');
                      });
                    })
                }
              }).catch(function(error) {
                  uploadForwardP(red, 'Uploaded failed, please retry...');
                });
          }, function(putBlockerr){
            $('#upload_forward_p').html('uploading：<progress>');          
          })
      }, function(createProcesserr){
        $('#upload_forward_p').html('uploading：<progress>');
      })
    }, function(createFoldererr){
      $('#upload_forward_p').html('uploading：<progress>');
    });
  });  
  
  return false;
}

function reverseFastaForm() {
  $('#upload_reverse_p').html('uploading：<progress>');
  var filepath = $('#reverseFileAgent').val();
  var filename = filepath.substring(filepath.lastIndexOf('\\') + 1, filepath.length);
  const path = '/' + filename;
  //生成MD5码
  browserMD5File(inputReverseFile, function(err, checksum){
    checksum = checksum;
    //创建文件
    genedock.putDataFormal(currentAccount, 'default', path, function(res){
      const entityId = JSON.parse(res).entity_id;
      const payload = {
        checksum: checksum,
        compression_type: '',
        block_type: 'default',
        file_size: inputReverseFile.size
      };
      //创建上传过程
      genedock.createDataUploadProcessFormal(currentAccount, 'default', entityId, payload, function(processRes){
        const blockId = processRes.next_block_url.split('/').slice(-2, -1)[0];
        const entity_id = processRes.entity_id;
        const upload_process_id = processRes.upload_process_id;

        //创建分块上传过程
        genedock.putDataUploadBlockFormal(currentAccount, 'default', entity_id, blockId,
          {upload_process_id:upload_process_id, is_end: true}, function(blockRes){
            //上传分块到OSS

            createBlockMultipartUpload(blockRes, inputReverseFile, function(p) {})
              .then(function(result) {
                if (result.res.status === 200) {
                    genedock.callbackDataUploadBlock(currentAccount, 'default', entity_id, blockId, {
                      block_begin: 0,
                      upload_process_id: upload_process_id,
                      block_end: inputReverseFile.size,
                      block_size: inputReverseFile.size,
                      block_checksum: checksum,
                      block_system_size: inputReverseFile.size
                    }, function(res){
                      progress = 0;
                      genedock.listDataFormal(currentAccount, 'default', '/', function(res){
                        var files = res.data_list;
                        for (var i = 0; i < files.length; i++) {
                          if (files[i].name == filename) {
                            uploadReverseFile.enid = files[i].entity_id;
                            uploadReverseFile.name = files[i].name;
                            uploadReverseP(green, 'Uploaded successfully, please run...');
                            testbtn = false;
                          }
                        }
                      }, function(err) {
                        $('#upload_reverse_p').html('uploading：<progress>');
                      });
                    })
                }
              }).catch(function(error) {
                  uploadReverseP(red, 'Uploaded failed, please retry...');
                });
          }, function(putBlockerr){
            $('#upload_reverse_p').html('uploading：<progress>');          
          })
      }, function(createProcesserr){
        $('#upload_reverse_p').html('uploading：<progress>');
      })
    }, function(createFoldererr){
      $('#upload_reverse_p').html('uploading：<progress>');
    });
  });  
  
  return false;
}




/****调用getTaskLogList函数，获取jobid*****/
var getLog_id = function(taskId, callback) {
  genedock.get_jobs_info(taskId, function(res) {
    var html = showLog_jobid_panl(res.data);
    return callback(html);
  }, function(err) {
    console.log(err);
  });
};

/****获得jobid，之后渲染到页面panl头部*****/
var showLog_jobid_panl = function(data) {
  var str = "";
  if (data) {
    var Glog = data;
    var glogClass = "";
    var glogPhoneclass = "";
    for (var i = 0; i < Glog.length; i++) {
      if (GlogShowFilter(Glog[i].jobid)) continue;
      var jobstatus = Glog[i].status;
      var status_success = "success";
      var status_running = "running";
      var status_failed = "failed";
      var status_compiled = "compiled";
      var status_waiting = "waiting";
      var status_submit = "submit";
      if (Glog[i].start_time == "" || Glog[i].start_time == null || Glog[i].start_time == undefined) {
        Glog[i].start_time = "---";
      } else {
        Glog[i].start_time = TimeTamp(Glog[i].start_time);
      };
      if (Glog[i].end_time == "" || Glog[i].end_time == null || Glog[i].end_time == undefined) {
        Glog[i].end_time = "---";
      } else {
        Glog[i].end_time = TimeTamp(Glog[i].end_time);
      };
      if (jobstatus === status_success) {
        glogClass = "<div class='jobstatus status_success'>" + Glog[i].status + "</div>";
        glogPhoneclass = "<button class=' status_success'>状态：" + Glog[i].status + "</button>";
      } else if (jobstatus === status_running) {
        glogClass = "<div class='jobstatus status_running'>" + Glog[i].status + "</div>";
        glogPhoneclass = "<button class=' status_running'>状态：" + Glog[i].status + "</button>";
      } else if (jobstatus === status_failed) {
        glogClass = "<div class='jobstatus status_failed'>" + Glog[i].status + "</div>";
        glogPhoneclass = "<button class=' status_failed'>状态：" + Glog[i].status + "</button>";
      } else if (jobstatus === status_compiled) {
        glogClass = "<div class='jobstatus status_compiled'>" + Glog[i].status + "</div>";
        glogPhoneclass = "<button class=' status_compiled'>状态：" + Glog[i].status + "</button>";
      } else if (jobstatus === status_waiting) {
        glogClass = "<div class='jobstatus status_waiting'>" + Glog[i].status + "</div>";
        glogPhoneclass = "<button class=' status_waiting'>状态：" + Glog[i].status + "</button>";
      } else if (jobstatus === status_submit) {
        glogClass = "<div class='jobstatus status_submit'>" + Glog[i].status + "</div>";
        glogPhoneclass = "<button class=' status_submit'>状态：" + Glog[i].status + "</button>";
      }
      str += "<div class='panel panel-default'>\
                  <div class='panel-heading'>\
                    <div class='clearfix'>\
                    <a data-toggle='collapse' class='log_btna' data-parent='#accordion' data-id='" +
        Glog[i].job_id + "' href='#collapse" + i + "'>\
                    <div class='pull-left'>\
                      <h4 class='panel-title'><b class='caret'></b>" +
        Glog[i].app_name + "\
                      </h4></div></a>\
                      <div class='phone_time_status'>\
                      <button class='phone_start_time'>开始时间：" + Glog[i].start_time + "</button>\
                      <button class='phone_end_time'>结束时间：" + Glog[i].end_time + "</button>" + glogPhoneclass + "</div>\
                      <div class='pull-right'>\
                      <div class='jobtime'>" + Glog[i].start_time + "</div><span>&nbsp;~</span>\
                      <div class='jobtime'>" + Glog[i].end_time + "</div>" + glogClass + "</div></div></div>\
                    <div id='collapse" + i + "' class='panel-collapse collapse'>\
                      <div class='panel-body'></div>\
                    </div>\
                </div>";
    }
  } else {
    str += "<li>没有数据</li>";
  }
  return str;
};

function GlogShowFilter(data) {
  var pattern = /(_loaddata_app|_storedata_app)$/g;
  if (pattern.test(data)) return true;
  return false;
}

var temp = function() {
  var glog = "";
  var GLog_LogDetail = "";
  var g_d_l = "";
  $("#accordion .log_btna").click(function() {
    $("#accordion .panel-body").html("");
    var JobId = String($(this).data('id'));
    genedock.get_job_log(taskId, JobId, function(data) {
      if (data !== "") {
        GLog_LogDetail = data;
        g_d_l = GLog_LogDetail.data;
        glog = g_d_l.replace(/\n/g, "<br>");
        $("#accordion .panel-body").html(glog);
      } else {
        $("#accordion .panel-body").html("没有日志");
      }
    }, function(err) {
      console.log(err);
    });
  });
};

get_cdc_report = function(taskId, callback) {
  genedock.getReports(taskId, function(res) {
    callback(show_cdc_report(res));
  }, function(err) {
    console.log(err);
  });
}

show_cdc_report = function(data) {
  var GLog_Report;
  var str = '';
  if (data) {
    var GLog_Report = data.data;
    str = "<div class='table-responsive report_table'>" + GLog_Report + "</div>";
  } else {
    str = "<p>没有数据</p>";
  }
  return str;
};

var report_style_click = function() {
  $(".report_table .toc").show();
  $("#open_left").hide();
  $(".report_table input:eq(0)").remove();
  $(".report_table .report_open_right:eq(0)").remove();
  var $report_right = "<button class='report_open_right' id='open_right'><span class='glyphicon glyphicon-chevron-right'></span></button>";
  var $report_left = "<button class='report_open_left' id='open_left'><span class='glyphicon glyphicon-chevron-left'></span></button>";
  if (window.screen.availWidth < 767) {
    $(".report_table").css({
      "width": "100%",
    });
    $($report_right).css("display", "none");
  } else {
    $(".report_table").css({
      "position": "fixed",
      "border": "1px solid rgb(204, 204, 204)",
      "padding": "10px",
      "width": "70.5%",
      "float": "left",
      "background": "#fff",
      "overflow-y": "scroll"
    }).height($(window).height() - 150);
  }
  $(".report_table table").addClass("table table-bordered table-hover table-condensed");
  $(".report_table .toc").css({
    "position": "fixed",
    "padding": "5px",
    "left": "80.3%",
    "top": "122px",
    "right": "15px",
    "border": "1px solid rgb(204, 204, 204)",
    "border-radius": "5px",
    "overflow-y": "scroll",
    "overflow-x": "hidden",
    "overflow-wrap": "break-word"
  });
  $(".report_table .toc ul").first().height($(window).height() - 150);
  $(".report_table .toc ul li").css({
    "border-bottom": "1px solid rgb(221, 221, 221)"
  });
  $(".report_table .toc ul li a").css({
    "display": "block",
    "padding": "5px",
  });

  $(".report_table table th").css({
    "background": "rgb(230, 230, 230)",
  });
  $(".report_table p").css({
    "padding": "10px",
    "width": "100%"
  });
  $(".report_table :header").css("border-bottom", "1px solid rgb(238, 238, 238)");
  $(".report_table h1").css({
    "text-align": "left"
  }).addClass("jumbotron");
  $(".report_table .jumbotron").css({
    "margin-top": "0",
    "color": "inherit",
  });
  $(".report_table p img").css({
    "height": "auto",
    "width": "100%",
    "cursor": "pointer"
  });
  $(".report_table p img").attr("title", "另存为查看大图");
  $(".report_table strong").css({
    "text-align": "center",
    "display": "block",
    "width": "100%"
  });
  $(".report_table p img[alt*=logo]").css({
    "height": "auto",
    "width": "auto",
  });
  if (window.screen.availWidth < 1170) {
    $($report_left).prependTo(".report_table").css({
      "position": "fixed",
      "height": "25px",
      "width": "25px",
      "border": "none",
      "background": "rgb(51, 133, 255)",
      "border-radius": "20px",
      "color": "#fff",
      "right": "18%",
      "top": "45%",
      "display": "none",
      "font-size": "12px"
    });
    $($report_right).prependTo(".report_table").css({
      "position": "fixed",
      "height": "25px",
      "width": "25px",
      "border": "none",
      "background": "rgb(51, 133, 255)",
      "border-radius": "20px",
      "color": "#fff",
      "right": "17.5%",
      "top": "45%",
      "font-size": "12px"
    });
    $("#open_right").click(function() {
      $(".report_table").css({
        "width": "100%",
      });
      $(".report_table .toc").hide();
      $("#open_right").css("right", "8px");
      $("#open_left").css("right", "8px");
      $(this).hide();
      $("#open_left").show();
    });
    $("#open_left").click(function() {
      $(".report_table").css({
        "width": "82%",
      });
      $(".report_table .toc").show();
      $("#open_right").css("right", "17.5%");
      $("#open_left").css("right", "17.5%");
      $(this).hide();
      $("#open_right").show();
    });
  } else {
    $($report_left).prependTo(".report_table").css({
      "position": "fixed",
      "height": "28px",
      "width": "28px",
      "border": "none",
      "background": "rgb(51, 133, 255)",
      "border-radius": "20px",
      "color": "#fff",
      "right": "20%",
      "top": "40%",
      "display": "none"
    });
    $($report_right).prependTo(".report_table").css({
      "position": "fixed",
      "height": "28px",
      "width": "28px",
      "border": "none",
      "background": "rgb(51, 133, 255)",
      "border-radius": "20px",
      "color": "#fff",
      "right": "20%",
      "top": "40%"
    });
    $("#open_right").click(function() {
      $(".report_table").css({
        "width": "90%",
      });
      $(".report_table .toc").hide();
      $("#open_right").css("right", "8px");
      $("#open_left").css("right", "8px");
      $(this).hide();
      $("#open_left").show();
    });
    $("#open_left").click(function() {
      $(".report_table").css({
        "width": "70.5%",
      });
      $(".report_table .toc").show();
      $("#open_right").css("right", "20%");
      $("#open_left").css("right", "20%");
      $(this).hide();
      $("#open_right").show();
    });
  };
}

//获取下载参数接口
var parameter = function() {
  genedock.get_task(taskId, function(res) {
    var para = res.data.parameters,
      paraOutput = "",
      paraInput = "";
    $.each(para.Outputs, function(outputKey, outputVal) {
      accountname = para.Outputs[outputKey].data[0].name.split(":")[0];
      datapath = para.Outputs[outputKey].data[0].name.split(":")[1];
      datapatharr = datapath.split("/");
      dataname = datapatharr[datapatharr.length-1];
      genedock.listDataFormal(accountname, 'default', datapath, function(res) {
        enid = res.entity_id;
        paraOutput += "<li class='list-group-item'>output_data ：" +
          dataname + "<button onclick=output_download('" +
          enid + "','" + dataname + "') class='btn btn-default pull-right download_btn" +
          enid + "' style='margin: -7px 5px;'>下载</button></li>";

       $("#para").html("<div class='well well-sm'><h1>" + para.name + "</h1><p>" + para.description + "</p></div><h4>Output Data:</h4><ul class='list-group'>" + paraOutput + "</ul><h4>Input Data:</h4><ul class'list-group'>" + paraInput + "</ul>");

      }, function(err) {
        console.log(err);
      });
        
    });
    $.each(para.Inputs, function(key, val) {
      for (var i = 0; i < para.Inputs[key].data.length; i++) {
        paraInput += "<li class='list-group-item'>" + para.Inputs[key].alias + " ：" + para.Inputs[key].data[i].name + "</li>";
      }
    });

  }, function(err) {
    $("#para").html("无数据");
    console.log(err);
  });
}

var taskstatus = function(taskId) {
  genedock.get_task(taskId, function(res) {
    if (res.data.status === "success") {
      $(".cdc_back").css({
        "display": "block"
      });
      $("#report_display").attr("href", "report.html?" + taskId + "/");
      $("#parameter_display").attr("href", "parameter.html?" + taskId + "/");
      $("#log_display").attr("href", "log.html?" + taskId + "/");
    };
  }, function(err) {
    console.log(err);
  });
}

function output_download(id,name) {
  clearInterval(download_time_count);
  $(".download_btn" + id).text("waiting...").attr("disabled", "disabled");
  genedock.getDataDownloadProcessFormal(currentAccount, 'default', id, function(res) {
    if (res.blocks.length === 1 && !res.compression_type) {
      genedock.getDataDownloadBlockFormal(currentAccount, 'default', id, res.blocks[0].block_id, function(block){
        file_url = getFileDownloadUrl(block,name);
        if (file_url) {
          window.location = file_url;
          $(".download_btn" + id).text("已经下载").attr("disabled", "disabled");
        } else {
          download_time_count = setInterval("get()", 1000)
        };
      }, function(err) {
        console.log(err);
      });
    }   
  }, function(err) {
    console.log(err);
  });
  downloadOutput_enid = id;
}

function get() {
  if (file_url) {
    window.location = file_url;
    $(".download_btn" + downloadOutput_enid).text("已经下载").attr("disabled", "disabled");
  } else {
    count--;
    $(".download_btn" + downloadOutput_enid).text("正在下载(" + count + ")").attr("disabled", "disabled");
    if (count == 0) {
      count = 60;
      id = downloadOutput_enid;
      output_download(id);
    };
  };
}
