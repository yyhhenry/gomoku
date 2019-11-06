let CanvasButton;
let CanvasChess;
let PlayingPage;
let choosePage;
CanvasButton=function(){
	let thisCanvasButton=this;
	let canvas;
	let text;
	let font;
	let textColor;
	let backgroundColor;
	let x;
	let y;
	let width;
	let height;
	this.init=function(_canvas,_text,_font,_textColor,_backgroundColor,_x,_y,_width,_height){
		canvas=_canvas;
		text=_text;
		font=_font;
		textColor=_textColor;
		backgroundColor=_backgroundColor;
		x=_x;
		y=_y;
		width=_width;
		height=_height;
		return this;
	}
	this.setText=function(newText){
		text=newText;
	}
	this.draw=function(mouse){
		let ctx=canvas.getContext('2d');
		ctx.fillStyle=backgroundColor;
		ctx.fillRect(x,y,width,height);
		thisCanvasButton.hit(mouse,function(){
			ctx.fillStyle='rgba(128,128,128,0.3)';
			ctx.fillRect(x,y,width,height);
		});
		ctx.fillStyle=textColor;
		ctx.font=font;
		ctx.textAlign='center';
		ctx.textBaseline='middle';
		ctx.fillText(text,x+width/2,y+height/2);
	}
	this.hit=function(mouse,f){
		if(mouse.x>=x&&mouse.x<x+width&&mouse.y>=y&&mouse.y<y+height)f();
	}
}
CanvasChess=function(){
	let thisCanvasChess=this;
	let canvas;
	let x;
	let y;
	let width;
	let height;
	let val;
	let waitFor;
	let last;
	let lastPaintTime;
	let brightTime;
	let bright;
	let win;
	this.init=function(_canvas,_x,_y,_width,_height){
		canvas=_canvas;
		x=_x;
		y=_y;
		width=_width;
		height=_height;
		val=[];
		for(let i=0;i<13;i++){
			val[i]=[];
			for(let j=0;j<13;j++){
				val[i][j]='none';
			}
		}
		waitFor='none';
		win='none';
		last={x:-1,y:-1};
		lastPaintTime=new Date().getTime();
		brightTime=0;
		bright=false;
		return this;
	}
	this.setWaitFor=function(newWaitFor){
		waitFor=newWaitFor;
	}
	this.add=function(x,y,c){
		val[x][y]=c;
		last.x=x;
		last.y=y;
	}
	this.getVal=function(){
		return val;
	}
	this.win=function(){
		if(win!='none')return win;
		let q1=function(i,j,t){
			if(i<4)return false;
			for(let k=0;k<5;k++){
				if(val[i-k][j]!=t)return false;
			}
			return true;
		}
		let q2=function(i,j,t){
			if(j<4)return false;
			for(let k=0;k<5;k++){
				if(val[i][j-k]!=t)return false;
			}
			return true;
		}
		let q3=function(i,j,t){
			if(i<4||j<4)return false;
			for(let k=0;k<5;k++){
				if(val[i-k][j-k]!=t)return false;
			}
			return true;
		}
		let q4=function(i,j,t){
			if(i<4||j>8)return false;
			for(let k=0;k<5;k++){
				if(val[i-k][j+k]!=t)return false;
			}
			return true;
		}
		for(let i=0;i<13;i++){
			for(let j=0;j<13;j++){
				if(q1(i,j,'white')||q2(i,j,'white')||q3(i,j,'white')||q4(i,j,'white')){
					win='white';
				}else if(q1(i,j,'black')||q2(i,j,'black')||q3(i,j,'black')||q4(i,j,'black')){
					win='black';
				}
			}
		}
		let he=false;
		for(let i=0;i<13;i++){
			for(let j=0;j<13;j++){
				if(val[i][j]=='none'){
					he=true;
				}
			}
		}
		if(!he){
			win='equal';
		}
		return win;
	}
	this.draw=function(mouse){
		let thisPaintTime=new Date().getTime();
		brightTime+=thisPaintTime-lastPaintTime;
		if(brightTime>500){
			brightTime=0;
			bright=!bright;
		}
		let ctx=canvas.getContext('2d');
		ctx.shadowBlur=0;
		ctx.fillStyle='rgb(230,210,160)';
		ctx.fillRect(x,y,width,height);
		for(let i=0;i<13;i++){
			ctx.fillStyle='rgb(60,50,20)';
			ctx.beginPath();
			ctx.moveTo(x+width/26+i*width/13,y+height/26);
			ctx.lineTo(x+width/26+i*width/13,y+height-height/26);
			ctx.closePath();
			ctx.lineWidth=3;
			ctx.stroke();
		}
		for(let i=0;i<13;i++){
			ctx.fillStyle='rgb(60,50,20)';
			ctx.beginPath();
			ctx.moveTo(x+width/26,y+height/26+i*height/13);
			ctx.lineTo(x+width-width/26,y+height/26+i*width/13);
			ctx.closePath();
			ctx.lineWidth=3;
			ctx.stroke();
		}
		for(let i=0;i<13;i++){
			for(let j=0;j<13;j++){
				if(val[i][j]=='black'){
					ctx.fillStyle='rgb(0,0,0)';
				}else if(val[i][j]=='white'){
					ctx.fillStyle='rgb(255,255,255)';
				}else{
					continue;
				}
				ctx.beginPath();
				ctx.arc(x+width/26+i*width/13,y+height/26+j*height/13,Math.min(width,height)/13*0.4,0,2*Math.PI);
				ctx.closePath();
				ctx.fill();
				if(i==last.x&&j==last.y&&bright){
					ctx.fillStyle='rgb(128,128,128,0.3)';
					ctx.fill();
				}
			}
		}
		thisCanvasChess.hit(mouse,function(i,j){
				if(waitFor=='black'){
					ctx.fillStyle='rgba(0,0,0,0.7)';
				}else if(waitFor=='white'){
					ctx.fillStyle='rgba(255,255,255,0.7)';
				}
				ctx.beginPath();
				ctx.arc(x+width/26+i*width/13,y+height/26+j*height/13,Math.min(width,height)/13*0.4,0,2*Math.PI);
				ctx.closePath();
				ctx.fill();
		});
		lastPaintTime=thisPaintTime;
	}
	this.hit=function(mouse,f){
		if(waitFor!='none'&&mouse.x>=x&&mouse.x<x+width&&mouse.y>=y&&mouse.y<y+height){
			let i=Math.floor((mouse.x-x)/width*13);
			let j=Math.floor((mouse.y-y)/height*13);
			if(val[i][j]=='none')f(i,j);
		}
	}
}
PlayingPage=function(){
	let thisPlayingPage=this;
	let page;
	let canvas;
	let blacksci;
	let whitesci;
	let mouse;
	let life;
	let canvasChess;
	let turnFor;
	let nextOne;
	let rechoose;
	let lastPaintTime;
	let waitTime;
	this.init=function(_page,_blacksci,_whitesci){
		page=_page;
		canvas=document.createElement('canvas');
		canvas.style.position='fixed';
		canvas.style.left='0px';
		canvas.style.top='0px';
		canvas.style.right='0px';
		canvas.style.bottom='0px';
		canvas.onmousemove=function(event){
			mouse.x=event.layerX;
			mouse.y=event.layerY;
		}
		canvas.onclick=function(event){
			canvasChess.hit(mouse,function(x,y){
				canvasChess.add(x,y,turnFor);
				canvasChess.setWaitFor('none');
				if(turnFor=='black'){
					turnFor='white';
				}else{
					turnFor='black';
				}
			});
			if(nextOne!=null){
				nextOne.hit(mouse,function(){
					canvasChess=new CanvasChess().init(canvas,100,50,500,500);
					nextOne=null;
					turnFor='black';
				});
			}
			rechoose.hit(mouse,function(){
				thisPlayingPage.clear();
				new choosePage().init(page);
			});
		}
		page.append(canvas);
		blacksci=_blacksci;
		whitesci=_whitesci;
		canvasChess=new CanvasChess().init(canvas,100,50,500,500);
		rechoose=new CanvasButton().init(canvas,'Home','25px 黑体','rgb(0,0,0)','rgb(220,160,220)',0,0,100,40);
		nextOne=null;
		turnFor='black';
		life=true;
		mouse={x:0,y:0};
		lastPaintTime=new Date().getTime();
		waitTime=0;
		thisPlayingPage.draw();
		return this;
	}
	this.clear=function(){
		page.innerHTML='';
		life=false;
	}
	this.draw=function(){
		if(!life)return;
		let thisPaintTime=new Date().getTime();
		if(canvasChess.win()!='none'){
			if(canvasChess.win()=='black'){
				nextOne=new CanvasButton().init(canvas,'黑胜','25px 黑体','rgb(255,255,255)','rgb(0,0,0)',275,0,150,40);
			}else if(canvasChess.win()=='white'){
				nextOne=new CanvasButton().init(canvas,'白胜','25px 黑体','rgb(0,0,0)','rgb(255,255,255)',275,0,150,40);
			}else{
				nextOne=new CanvasButton().init(canvas,'平局','25px 黑体','rgb(0,0,0)','rgb(255,255,255)',275,0,150,40);
			}
		}else if(turnFor=='black'){
			if(blacksci=='玩家'){
				canvasChess.setWaitFor('black');
			}else{
				waitTime+=thisPaintTime-lastPaintTime;
				if(waitTime>500){
					canvasChess.setWaitFor('none');
					let ans=scripts[blacksci](canvasChess.getVal(),'black');
					canvasChess.add(ans.x,ans.y,'black');
					turnFor='white';
					waitTime=0;
				}
			}
		}else{
			if(whitesci=='玩家'){
				canvasChess.setWaitFor('white');
			}else{
				waitTime+=thisPaintTime-lastPaintTime;
				if(waitTime>500){
					canvasChess.setWaitFor('none');
					let ans=scripts[whitesci](canvasChess.getVal(),'white');
					canvasChess.add(ans.x,ans.y,'white');
					turnFor='black';
					waitTime=0;
				}
			}
		}
		canvas.width=window.outerWidth;
		canvas.height=window.outerHeight;
		let ctx=canvas.getContext('2d');
		ctx.shadowBlur=0;
		ctx.fillStyle='rgb(200,220,250)';
		ctx.fillRect(0,0,canvas.width,canvas.height);
		canvasChess.draw(mouse);
		rechoose.draw(mouse);
		if(nextOne!=null)nextOne.draw(mouse);
		lastPaintTime=thisPaintTime;
		setTimeout(thisPlayingPage.draw,20);
	}
}

choosePage=function(){
	let thisChoosePage=this;
	let canvas;
	let life;
	let page;
	let mouse;
	let blackButton;
	let whiteButton;
	let okButton;
	let blacksci='入门';
	let whitesci='入门';
	this.init=function(_page){
		page=_page;
		canvas=document.createElement('canvas');
		canvas.style.position='fixed';
		canvas.style.left='0px';
		canvas.style.top='0px';
		canvas.style.right='0px';
		canvas.style.bottom='0px';
		page.append(canvas);
		life=true;
		mouse={x:0,y:0};
		blackButton=new CanvasButton().init(canvas,'黑入门','20px 黑体','rgb(255,255,255)','rgb(0,0,0)',200,100,150,40);
		whiteButton=new CanvasButton().init(canvas,'白入门','20px 黑体','rgb(0,0,0)','rgb(255,255,255)',350,100,150,40);
		okButton=new CanvasButton().init(canvas,'确认','20px 黑体','rgb(0,0,0)','rgb(240,140,100)',275,180,150,40);
		canvas.onmousemove=function(event){
			mouse.x=event.layerX;
			mouse.y=event.layerY;
		}
		canvas.onclick=function(event){
			blackButton.hit(mouse,function(){
				if(blacksci=='入门'){
					blacksci='玩家';
					blackButton.setText('黑玩家');
				}else{
					blacksci='入门';
					blackButton.setText('黑入门');
				}
			});
			whiteButton.hit(mouse,function(){
				if(whitesci=='入门'){
					whitesci='玩家';
					whiteButton.setText('白玩家');
				}else{
					whitesci='入门';
					whiteButton.setText('白入门');
				}
			});
			okButton.hit(mouse,function(){
				thisChoosePage.clear();
				new PlayingPage().init(page,blacksci,whitesci);
			});
		}
		thisChoosePage.draw();
		return this;
	}
	this.clear=function(){
		page.innerHTML='';
		life=false;
	}
	this.draw=function(){
		if(!life)return;
		canvas.width=window.outerWidth;
		canvas.height=window.outerHeight;
		let ctx=canvas.getContext('2d');
		ctx.shadowBlur=0;
		ctx.fillStyle='rgb(200,220,250)';
		ctx.fillRect(0,0,canvas.width,canvas.height);
		blackButton.draw(mouse);
		whiteButton.draw(mouse);
		okButton.draw(mouse);
		setTimeout(thisChoosePage.draw,20);
	}
}

window.onload=function(){
	let page=document.getElementById('page');
	new choosePage().init(page);
}