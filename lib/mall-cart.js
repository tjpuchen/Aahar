var a=angular.module("cartlist",[]);

a.controller("cartlistctrl",function($scope,$http){
    $scope.cartlist=[];//餐饮类型信息
    $scope.total = 0;
   	$scope.useq="";

    
    var config = {
    	headers:{'Content-Type':'application/json'}
    };
    //初始化页面
    $scope.init1=function(){
    	$scope.useq=1;
    	var f=$http.post("http://127.0.0.1:8080/Carts/useq/"+$scope.useq).success(function (data) {
                    console.log(data);
               });
        f.success(function(data){
            $scope.cartlist=data;
            if($scope.cartlist.length==0){
            	swal({
	                title: "当前购物车为空",
	                text: "赶紧去菜单中看看吧",
	                type: "success"
            	},function () {
            		window.location.href="mall-menu-list.html";
            	});
            	
            }
            $scope.totalMoney();
        });
        
    };
    $scope.init1();
    
    $scope.pay=function(){
     	window.location.href="mall-orderfrom.html";
    };
    
    //点击加减按钮，数量加减;
	$scope.reduce=function(cart){
		cart.num--;
		if (goods.number<=0) goods.number=0;
		$scope.updateNum(cart);
		$scope.totalMoney();
	};
      
    $scope.add=function(cart){
        cart.num++;
        $scope.updateNum(cart);
        $scope.totalMoney();
    };
    
    $scope.updateNum=function(cart){
    	var seq = cart.seq;
    	var num = cart.num;
    	var data = {
    		"seq":seq,
    		"num":num
    	}
    	console.log(data);
    	var f=$http.put("http://127.0.0.1:8080/Cart/id/"+seq,data).success(function (data) {
                    console.log(data);
               });
        f.success(function(data){

        });
    };
    
    /*总金额计算*/
    $scope.totalMoney=function(){
    	var total=0;
    	for(var i=0;i<$scope.cartlist.length;i++){
         	total +=$scope.cartlist[i].price*$scope.cartlist[i].num;
    	}
    	$scope.total = total;
  	};
  	
  	 //删除
    $scope.del=function(seq){
    	//alert(seq);
        var f=$http.delete("http://127.0.0.1:8080/Cart/id/"+seq).success(function (data) {
                console.log(data);
           }).success(function(data){
           	swal({
	                title: "删除成功",
	                text: "赶紧去菜单中看看吧",
	                type: "warning"
            	},function () {
        		window.location.href="mall-cart.html";
    		});
           	
        });
    }
});