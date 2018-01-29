
var store={};

//跨域函数get
store.get=function ({url,callback}) {
    $.ajax({
        type:'get',
        dataType: "json",
        url:'http://192.168.11.115:8080/api',
        data:{'url':url},

        success:function (data) {
            callback(data)
        },
        error:function (err) {
            callback(err);
        }
    })
}

//跨域函数post
store.post=function ({url,body={},callback}) {
    $.ajax({
        type:'post',
        dataType: "json",
        url:'http://192.168.11.115:8080/api',
        data:{
            'url':url,
            'data':body,
            'headers':{
                  'Content-Type': 'application/json',
                  'Content-Length': JSON.stringify(body).length,
                  'Authorization':(sessionStorage.getItem('token')||localStorage.getItem('token'))||''
                  }
        },

        success:function (data) {
            callback(data)
        },
        error:function (err) {
            callback(err)
            console.log(err)
        }
   })
}


export default store;