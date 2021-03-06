app.controller('brandController',function($scope,$http,$controller,brandService){
	
	$controller('baseController',{$scope:$scope});
	
	$scope.findAll=function(){
		brandService.findAll().success(
			function(response){
				$scope.list=response;
			}	
		);
		
	}
	
	
	/*$scope.paginationConf  = {
		 currentPage: 1,
		 totalItems: 10,
		 itemsPerPage: 10,
		 perPageOptions: [10, 20, 30, 40, 50],
		 onChange: function(){
			$scope.reloadList();
		 }
	};*/ 
	
	/*//重新加载列表数据
	$scope.reloadList=function(){
		$scope.search( $scope.paginationConf.currentPage , $scope.paginationConf.itemsPerPage );
	}*/
	
	//分页
	$scope.findPage=function(page,rows){
		brandService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows; //显示当前页数据
				$scope.paginationConf.totalItems=response.total; //更新总记录数
			}
		);		
	}
	
	$scope.save=function(){
		var object = null;
		if($scope.entity.id !=null){
			object = brandService.update($scope.entity);
		}else{
			object = brandService.add($scope.entity	);
		}
		object.success(
			function(response){
				if(response.success){
					//重新查询 
					 $scope.reloadList();//重新加载
				 }else{
					 alert(response.message);
				 }
			}		
		);				
	}
	
	
	$scope.findOne=function(id){
		brandService.findOne(id).success(
			function(response){
				$scope.entity=response;
			}	
		);
	}
	
	
	/*$scope.selectIds=[];
	
	$scope.updateSelection=function($event,id){
		if($event.target.checked){
			$scope.selectIds.push(id);
		}else{
			var index=$scope.selectIds.indexOf(id);
			$scope.selectIds.splice(index,1);
		}	
	}*/
	
	$scope.dele=function(){
		brandService.dele($scope.selectIds).success(
			function(response){
				if(response.success){
					$scope.reloadList();
				}else{
					alter(response.message);
				}
			}		
		);
	}
	
	//条件查询
	$scope.searchEntity={};
	$scope.search=function(page,rows){
		brandService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows; //显示当前页数据
				$scope.paginationConf.totalItems=response.total; //更新总记录数
			}		
		);
	}
});