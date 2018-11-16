window.base={
    g_restUrl:'https://www.zhihuiquanyi.com/api/public/index.php/api/v1/',



    getUserToken:function(callback){


        var param = this.GetRequest();
        console.log(param);
        if(param.code){
            var postData = {
                thirdapp_id:2,
                code:param.code,
            };
            var c_callback = (res)=>{
                console.log(res)
                if(res.token){
                    localStorage.setItem('user_token',res.token);
                    localStorage.setItem('user_no',res.info.user_no);
                    localStorage.setItem('user_info',res.info);
                    callback&&callback();
                }else{
                    alert('获取token失败')
                };
            };  
            this.getWxauthToken(postData,c_callback);
        }else if(localStorage.getItem('user_token')){
            callback&&callback();
        }else{
            var href =  window.location.href;
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2545d65d73be5e00&redirect_uri='+
            encodeURIComponent(href)+'&response_type=code&scope=snsapi_userinfo';
        };
        
    }, 

    getSelectValue:function(e) {   
        return e.target.selectedOptions[0].text;
    },  

    realPay(param,callback){
        
        function onBridgeReady(param){
		   WeixinJSBridge.invoke(
		      'getBrandWCPayRequest', {
		        "appId":"wx2545d65d73be5e00",     //公众号名称，由商户传入     
		        'timeStamp': param.timeStamp,
				'nonceStr': param.nonceStr,
				'package': param.package,
				'signType': param.signType,
				'paySign': param.paySign,
		      },
		      function(res){
		  
		      if(res.err_msg == "get_brand_wcpay_request:ok" ){
		      // 使用以上方式判断前端返回,微信团队郑重提示：
		            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
		        callback && callback(1);
		      }else{
		      	callback && callback(0);
		      }
		   }); 
		}
		if (typeof WeixinJSBridge == "undefined"){
		   if( document.addEventListener ){
		       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
		   }else if (document.attachEvent){
		       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
		       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
		   }
		}else{
		   onBridgeReady(param);
		}

    },

    getData:function(params){
        if(!params.type){
            params.type='get';
        }
        var that=this;
        $.ajax({
            type:params.type,
            url:this.g_restUrl+params.url,
            data:params.data,
            success:function(res){
                if(res.solely_code==201000){
                    var loca = window.location;
                    window.location.href = loca.origin + loca.pathname;
                }else if(res.solely_code==200000){
                    localStorage.removeItem('user_token');
                    localStorage.removeItem('user_no');
                    that.getUserToken();
                }else{
                    params.sCallback && params.sCallback(res);
                };
            },
            error:function(res){
                params.eCallback && params.eCallback(res);
            }
        });
    },


    getWxauthToken:function(param,callback) {
  
        var allParams = {
            url:'Wxauth',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams);
        
    },

    articleList:function(param,callback) {
  
        var allParams = {
            url:'Common/Article/get',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },

    userGet:function(param,callback) {

        var allParams = {
            url:'Base/User/get',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    }, 

    pay(param,callback){
        var allParams ={
            url:'Base/Pay/pay',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.getData(allParams);
    },

    userInfoUpdate:function(param,callback) {
  
        var allParams = {
            url:'Common/UserInfo/update',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },   


    orderGet:function(param,callback){
        var allParams ={
            url:'Common/Order/get',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.getData(allParams);
    },

    addOrder(param,callback){
        var allParams ={
            url:'Func/Order/addOrder',
            type:'post',
            data:param,
            sCallback: function(data) {
                callback && callback(data);
            }
        };
        this.getData(allParams);       
    } ,

    upLoadImg:function(param,callback) {
    
        $.ajax({ // $.post，告辞
            type: 'post',
            contentType: false, // 关关关！必须得 false
                                // 这个不关会扔一个默认值 application/x-www-form-urlencoded 过去，后端拿不到数据的！
                                // 而且你甚至不能传个字符串 'multipart/form-data'，后端一样拿不到数据！
            processData: false, // 关关关！重点
            url: 'https://www.zhihuiquanyi.com/api/public/index.php/api/v1/Base/FtpImage/upload',
            data: param,
            success:function(res){
                callback && callback(res);
            },
            error:function(res){
                callback && callback(res);
            }
        });

    },


    labelGet:function(param,callback) {
  
        var allParams = {
            url:'Common/Label/get',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },   

    messageAdd:function(param,callback) {
  
        var allParams = {
            url:'Common/Message/add',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },
    productAdd:function(param,callback) {
        var allParams = {
            url:'Common/Product/add',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },
    productGet:function(param,callback) {
            var allParams = {
                url:'Common/Product/get',
                type:'post',
                data:param,
                sCallback: function(data){
                    callback&&callback(data);
                }
            };
            this.getData(allParams)
        },



    WxJssdk:function(param,callback) {
  
        var allParams = {
            url:'WxJssdk',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams);
    },

    
    articleGet:function(param,callback) {
  
        var allParams = {
            url:'Common/Article/get',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },
    flowLogGet:function(param,callback) {
  
        var allParams = {
            url:'Common/FlowLog/get',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },

    flowLogAdd:function(param,callback) {
  
        var allParams = {
            url:'Common/FlowLog/add',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },  
    
    checkComplete:function(obj){
        var pass = true;
        for(var key in obj){
          if(!obj[key]){
            pass = false;
          };
        };
        return pass;
        console.log(pass);
    },
    articleOne:function(param,callback) {
        var allParams = {
            url:'UserArticle/GetInfo',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },

    menuOne:function(param,callback) {
        var allParams = {
            url:'UserMenu/GetInfo',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },

    themeList:function(param,callback) {
        var allParams = {
            url:'UserContent/GetList',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },

    themeOne:function(param,callback) {
        var allParams = {
            url:'UserContent/GetInfo',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },

    themeNum:function(param,callback) {
        var allParams = {
            url:'UserContent/GetHomeTheme',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },

    categoryTree:function(param,callback) {
        var allParams = {
            url:'UserCategory/GetTree',
            type:'post',
            data:param,
            sCallback: function(data){
                callback&&callback(data);
            }
        };
        this.getData(allParams)
    },

    cloneForm:function(form) {
        var res =  JSON.parse(JSON.stringify(form));   
        return res; 
    },
    
    getDataSet:function(e) {   
        return e.target.dataset; 
    },
    getDataset:function(ele){
        if(ele.dataset){
            return ele.dataset;
        }else{
            var attrs = ele.attributes,//元素的属性集合
                dataset = {},
                name,
                matchStr;

            for(var i = 0;i<attrs.length;i++){
                //是否是data- 开头
                matchStr = attrs[i].name.match(/^data-(.+)/);
                if(matchStr){
                    //data-auto-play 转成驼峰写法 autoPlay
                    name = matchStr[1].replace(/-([\da-z])/gi,function(all,letter){
                        return letter.toUpperCase();
                    });
                    dataset[name] = attrs[i].value;
                }
            }
            return dataset;
        }
    },
    findKeyFromArray:function(Array,key,value) {  
        var new_array = []; 
        for (var i = 0; i < Array.length; i++) {
            
            if(Array[i][key]&&Array[i][key] == value){
                new_array.push(Array[i])
                console.log('Array',Array[i])
            };
        };
        return new_array; 
    },
    
    GetRequest:function() {  
       var url = decodeURI(location.search); //获取url中"?"符后的字串  
       var theRequest = new Object();  
       if (url.indexOf("?") != -1) {  
          var str = url.substr(1);  //去掉“？”
          strs = str.split("&");  
          for(var i = 0; i < strs.length; i ++) {  
             theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);  
          }  
       }  
       return theRequest;  
    },

    getUrlVars() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
         return vars;
    }, 
    computePageArr:function(self) {   
        self.allPages = Math.ceil(self.paginate['count']/self.paginate['pagesize']);
        console.log(self.allPages);
        console.log(self.paginate);
        self.pageArray = [];
        self.pageArray.push(self.paginate.currentPage);
        if(self.paginate.currentPage+1 <= self.allPages){
            if(self.paginate.currentPage+2 <= self.allPages){
                self.pageArray.push(self.paginate.currentPage+1);
                self.pageArray.push(self.paginate.currentPage+2);
            }else{
                self.pageArray.push(self.paginate.currentPage+1);
            }
        };
        if(self.paginate.currentPage-1 > 0){
            if(self.paginate.currentPage-2 > 0){
                self.pageArray.unshift(self.paginate.currentPage-1);
                self.pageArray.unshift(self.paginate.currentPage-2);
                
            }else{
                self.pageArray.unshift(self.paginate.currentPage-1);
            }
        };
         
    },

    changePage:function(dataSet,self) {   
        if(dataSet.type == 'next'){
            if(self.paginate.currentPage >= self.allPages){
                alert('已经到底啦')
            }else{
                self.paginate.currentPage++;
                self.getMainData();
            }
        };
        if(dataSet.type == 'back'){
            if(self.paginate.currentPage == 1){
                alert('已经没有啦')
            }else{
                self.paginate.currentPage--;
                self.getMainData();
            }
        };
         
    },

    linkTo:function(self) {   
        if(self.linkPage>self.allPages||self.linkPage<1){
            alert('没有那一页');
            self.linkPage = '';
        }else{
            self.paginate.currentPage = self.linkPage;
            self.getMainData();
        }
         
    },
}

// console.log(this);