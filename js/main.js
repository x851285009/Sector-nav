window.onload = function(){
	//获取home元素，菜单元素集合
	var homeEle = document.querySelector(".home"),
		  imgs = document.querySelectorAll("#warp>.inner>a");
    //设置home状态控制器
    var flag = true;
    //设置home是否完成当前过渡的阻塞器
    var run = false;
    //设置菜单元素距home元素的直线距离。
    var c = 140;
    //为home元素绑定点击事件
    homeEle.onclick = function(){
    	//判断此次事件是否完成
    	if(run === true){
    		return;
    	}else{
    	run = true;
    	//根据home状态触发不同事件，默认home为关闭状态
    	if(flag){
    		//点击后home元素旋转
    		this.style.transform = "rotate(-720deg)";
    		//home与菜单元素动画同步
    		this.style.transition = 1 +(imgs.length-1)*0.05 +"s"; 
    		//循环遍历imgs分别操作菜单元素
    		for(var i=0;i<imgs.length;i++){
    			//90*i/(imgs.length-1)计算每个菜单元素平分的角度
    			imgs[i].style.left = -getPoint(c,90*i/(imgs.length-1)).left + "px";
    			imgs[i].style.top = -getPoint(c,90*i/(imgs.length-1)).top+ "px";
    			//设置菜单元素的过渡效果
    			imgs[i].style.transform = "rotate(-720deg) scale(1)";
    			//设置过渡时间的延迟效果
    			imgs[i].style.transition = "1s "+i*0.05+"s";
    		}
    	}else{
    		//再次点击回初始位置
    		this.style.transform = "rotate(0deg)";
    		this.style.transition = 1 +(imgs.length-1)*0.05 +"s"; 
    		for(var i=0;i<imgs.length;i++){
    			imgs[i].style.left = 0 + "px";
    			imgs[i].style.top = 0+ "px";
    			imgs[i].style.transform = "rotate(0deg) scale(1)";
    			imgs[i].style.transition = "1s "+(imgs.length-1-i)*0.05 +"s";
    		}
    	}
    	//home元素点击后状态取反
    	flag =!flag 
    	}
    }
    //为home元素添加过渡结束的状态
    homeEle.addEventListener("transitionend",function(){
    	run = false;
    });
    //设置每个菜单元素位置的函数 c:距home的距离；deg:偏移角度
    //已知一角一边
    function getPoint(c,deg){
    	var left = Math.round(c*Math.sin(deg*Math.PI/180));
    	var top = Math.round(c*Math.cos(deg*Math.PI/180));
    	//将得到的值作为对象返回
    	return {left:left,top:top};
    }
	//为菜单元素添加点击事件
	for(var i=0; i<imgs.length;i++){
		imgs[i].onclick = function(){
			this.style.transition="0.5s ";
			this.style.transform="rotate(-720deg) scale(1.5)";
			this.style.opacity=0.1;
			//添加过渡完成事件
			this.addEventListener("transitionend",fn)
		}
	}
	//添加菜单元素过渡完成时执行的函数
	function fn(){
		this.style.transition="0.3s ";
		this.style.transform="rotate(-720deg) scale(1)";
		this.style.opacity=1;
		//在过渡完成后解绑事件
		this.removeEventListener("transitionend",fn);
	}
	
}
