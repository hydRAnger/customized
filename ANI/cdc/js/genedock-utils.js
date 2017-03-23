// 将时间戳格式化函数
function TimeTamp() {
    var time = arguments[0] || 0;
    var thetime, year, month, day, hours, minutes, seconds;
    thetime = time ? new Date(time * 1000) : new Date();
    year = thetime.getFullYear();
    month = thetime.getMonth() + 1;
    day = thetime.getDate();
    hours = thetime.getHours();
    minutes = thetime.getMinutes();
    seconds = thetime.getSeconds();
    return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day) + ' ' + (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
}

function FormatSize (file_size){
    if (file_size===0 || typeof file_size === 'undefined') return '0B';
    var cutoff = [1024 * 1024 * 1024, 1024 * 1024, 1024, 1];
    var label = ['GB', 'MB', 'KB', 'B'];
    for (var i = 0, len = cutoff.length; i < len; i++)
        if (file_size >= cutoff[i]) {return (file_size * 1.0 / cutoff[i]).toFixed(2) + label[i]; }
}

function getCurrentTime(){
    var today = new Date();
    var year = today.getFullYear(),
       month = (today.getMonth()  + 1) < 10  ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1),
       day   = (today.getDate())  < 10 ? '0' + (today.getDate()) : (today.getDate()),
       hours = (today.getHours()) < 10 ? '0' + (today.getHours()) : (today.getHours()),
     minutes = (today.getMinutes()) < 10 ? '0' + (today.getMinutes()) : (today.getMinutes()),
    seconds  = (today.getSeconds()) < 10 ? '0' + (today.getSeconds()) : (today.getSeconds());
    return [year,month,today.getDate(),hours,minutes,seconds];
}

// 消息处理工具

function Message(bind_name){
    this.bind_name = bind_name;
    this.class_template = ['alert'];
    this.html = "";
    this.pre_html ="";
};

Message.prototype.init=function (){
    $(this.bind_name).html('');
    this.class_template=['alert'];
    this.html="";
    this.pre_html;
    return this;
};

Message.prototype.add_css = function (class_name){
    this.class_template.push(class_name);
    return this;
};

Message.prototype.remove_css = function (class_name) {
    this.class_template.splice(0,class_name);
    return this;
};

Message.prototype.show = function (message){
    var dom_text = '<div class="';

    for(var i=0 ,len=this.class_template.length; i < len ;i++){dom_text +=this.class_template[i] + ' ';}
    dom_text+='" >'+this.pre_html+message+this.html+'</div>';

    $(this.bind_name).html(dom_text);
};

Message.prototype.addhtml = function (str){
    this.html = str;
    return this;
};

Message.prototype.prehtml = function (str){
    this.pre_html=str;
    return this;
};

Message.prototype.success = function (){
    this
        .init()
        .add_css("alert-success");
    return this;
};

Message.prototype.error = function () {
    this
        .init()
        .add_css("alert-danger");
    return this;
};

Message.prototype.success = function (message){
    this
        .init()
        .add_css("alert-success")
        .show(message);
    return true;
};

Message.prototype.error = function (message){
    this
        .init()
        .add_css("alert-danger")
        .show(message);

    return true;
};

// 双向数据bind
JQuery = $;

function DataBinder( object_id){

    var pubSub = JQuery({});

    var data_attr ="bind-"+object_id ;
    var message = object_id +":change";

    JQuery(document).on("change","[data-"+data_attr +"]" , function(evt){
        var $input = JQuery(this);

        pubSub.trigger(message ,[$input.data(data_attr),$input.val() ] );
    });


    pubSub.on(message , function (evt ,prop_name ,new_val){
        JQuery("[data-"+data_attr+"="+prop_name+"]").each(function (){
            var $bound = JQuery(this);

            if($bound.is("input , textarea ,select")){
                $bound.val(new_val);
            } else {
                $bound.html(new_val);
            }
        });
    });

    return pubSub;
}



function User(uid){
  var binder = new DataBinder(uid);

  user = {
    attributes:{},

    set:function (attr_name,val){
        this.attributes[attr_name] = val;
        binder.trigger(uid+":change" ,[attr_name ,val , this]);
    },

    get:function (attr_name){
        return this.attributes[attr_name];
    },
    _binder:binder
  };

  binder.on(uid +":change" , function (evt ,attr_name ,new_val , initiator){
    if(initiator !== user){
        user.set(attr_name,new_val);
    }
  });


  return user;
}


function ErrorHandle(res,messagedom){
    var message = res.statusText;
    if(res.responseJSON){
        message = res.responseJSON.msg;
    }

    return messagedom.error(message);

}


function CreatePassword(len){
    var s = [];

    // var a = parseInt(Math.random() * 25)+(Math.random()>0.5?65:97);

    for (var i=0 ; i< len; i++) {
        s[i]=Math.random() > 0.5
            ? parseInt(Math.random() * 9)
            : String.fromCharCode(parseInt(Math.random()*25)+(Math.random()>0.5? 65: 97));
    }

    return s.join('');
}

function DataTableNoData(str,Data){
    if (Data.length === 0){
        var previous = document.getElementById(str+'_previous');
        var next = document.getElementById(str+'_next')

        previous.innerHTML = '';
        next.innerHTML = '';

    }
}
