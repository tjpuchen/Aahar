var a=angular.module("cartlist",[]);

a.controller("cartlistctrl",function($scope,$http){
    $scope.cartlist=[];//餐饮类型信息
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
        });
        
    };
    $scope.init1();
    
});