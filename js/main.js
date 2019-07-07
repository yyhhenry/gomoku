let Chessman;
let Chess;
let lastClick=null;
function aet(s,c){
	document.getElementById('tip').style.color=c;
	document.getElementById('tip').innerText=s;
}
Chessman=function(x,y){
	this.fail=function(){
		return(x<1||x>13||y<1||y>13);
	}
	this.getX=function(){
		return x;
	}
	this.getY=function(){
		return y;
	}
	this.equal=function(v){
		return(x==v.getX()&&y==v.getY());
	}
}
Chess=function(element){
	let whiteChessmen=[];
	let blackChessmen=[];
	let winner=null;
	this.hasSet=function(chessman){
		for(let i=0;i<whiteChessmen.length;i++){
			if(chessman.equal(whiteChessmen[i])){
				return true;
			}
		}
		for(let i=0;i<blackChessmen.length;i++){
			if(chessman.equal(blackChessmen[i])){
				return true;
			}
		}
		return false;
	}
	this.getWinner=function(){
		return winner;
	}
	this.iswin=function(chessmen){
		let chessground=[[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
		for(let i=0;i<chessmen.length;i++){
			chessground[chessmen[i].getX()][chessmen[i].getY()]=1;
		}
		let addc;
		addc=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
		for(let i=0;i<=14;i++){
			addc[i][0]=addc[0][i]=addc[i][14]=0;
		}
		for(let i=1;i<=13;i++){
			for(let j=1;j<=13;j++)if(chessground[i][j]==1){
				addc[i][j]=addc[i][j-1]+1;
				if(addc[i][j]>=5)return true;
			}else addc[i][j]=0;
		}
		addc=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
		for(let i=0;i<=14;i++){
			addc[i][0]=addc[0][i]=addc[i][14]=0;
		}
		for(let i=1;i<=13;i++){
			for(let j=1;j<=13;j++)if(chessground[i][j]==1){
				addc[i][j]=addc[i-1][j]+1;
				if(addc[i][j]>=5)return true;
			}else addc[i][j]=0;
		}
		addc=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
		for(let i=0;i<=14;i++){
			addc[i][0]=addc[0][i]=addc[i][14]=0;
		}
		for(let i=1;i<=13;i++){
			for(let j=1;j<=13;j++)if(chessground[i][j]==1){
				addc[i][j]=addc[i-1][j-1]+1;
				if(addc[i][j]>=5)return true;
			}else addc[i][j]=0;
		}
		addc=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
		for(let i=0;i<=14;i++){
			addc[i][0]=addc[0][i]=addc[i][14]=0;
		}
		for(let i=1;i<=13;i++){
			for(let j=1;j<=13;j++)if(chessground[i][j]==1){
				addc[i][j]=addc[i-1][j+1]+1;
				if(addc[i][j]>=5)return true;
			}else addc[i][j]=0;
		}
		return false;
	}
	this.dowhite=function(dofunc){
		if(winner!=null)return;
		let chessman=dofunc(whiteChessmen,blackChessmen);
		if(chessman.fail()){
			aet('白棋子下在了棋盘外 点此重开一局','white');
			winner='black';
		}else if(this.hasSet(chessman)){
			aet('白棋子下在了其他棋子上 点此重开一局','white');
			winner='black';
		}else{
			whiteChessmen[whiteChessmen.length]=chessman;
			if(this.iswin(whiteChessmen)){
				winner='white';
				aet('白方胜利 点此重开一局','white');
			}else if(whiteChessmen.length+blackChessmen.length==13*13){
				winner='none';
				aet('下满-平局 点此重开一局','white');
			}
			this.draw();
		}
	}
	this.doblack=function(dofunc){
		if(winner!=null)return;
		let chessman=dofunc(blackChessmen,whiteChessmen);
		if(chessman.fail()){
			aet('黑棋子下在了棋盘外 点此重开一局','black');
			winner='white';
		}else if(this.hasSet(chessman)){
			aet('黑棋子下在了其他棋子上 点此重开一局','black');
			winner='white';
		}else{
			blackChessmen[blackChessmen.length]=chessman;
			if(this.iswin(blackChessmen)){
				winner='black';
				aet('黑方胜利 点此重开一局','black');
			}else if(whiteChessmen.length+blackChessmen.length==13*13){
				winner='none';
				aet('下满-平局 点此重开一局','black');
			}
			this.draw();
		}
	}
	
	let chessv=document.getElementById('chess');
	chessv.innerHTML='';
	let v=[];
	for(let i=1;i<=13;i++){
		v[i]=[];
		let qv=document.createElement('div');
		qv.style.position='absolute';
		qv.style.top=(31*(i-1))+'px';
		chessv.append(qv);
		for(let j=1;j<=13;j++){
			let element=document.createElement('div');
			element.style.float='left';
			element.style.height='30px';
			element.style.width='30px';
			element.style.border='1px solid red';
			element.style.borderRadius='15px';
			element.style.background='rgb(155,155,30)';
			qv.appendChild(element);
			v[i][j]=element;
			v[i][j].onclick=function(){
				lastClick=new Chessman(i,j);
			}
		}
	}
	this.draw=function(){
		let chessground=[[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
		for(let i=0;i<blackChessmen.length;i++){
			chessground[blackChessmen[i].getX()][blackChessmen[i].getY()]=1;
		}
		for(let i=0;i<whiteChessmen.length;i++){
			chessground[whiteChessmen[i].getX()][whiteChessmen[i].getY()]=2;
		}
		for(let i=1;i<=13;i++){
			for(let j=1;j<=13;j++){
				if(chessground[i][j]==1){
					v[i][j].style.background='rgb(0,0,0)';
				}else if(chessground[i][j]==2){
					v[i][j].style.background='rgb(255,255,255)';
				}
			}
		}
	}
	
	this.draw();
}
let doblack;
let dowhite;
let chess=null;
let blackTurn;

let popup=document.getElementById('popup');
popup.innerHTML='';
let aselect=document.createElement('select');
aselect.innerHTML='<option value=\'入门\'>黑入门</option><option value=\'玩家\'>黑玩家</option>';
popup.append(aselect);
let bselect=document.createElement('select');
bselect.innerHTML='<option value=\'入门\'>白入门</option><option value=\'玩家\'>白玩家</option>';
popup.append(bselect);
let button=document.createElement('button');
button.innerText='OK';
button.style.float='right';
popup.append(button);
button.onclick=function(){
	popup.style.display='none';
	document.getElementById('mp').style.display='block';
	doblack=aselect.value;
	dowhite=bselect.value;
	let pu=false;
	let cl=false;
	document.getElementById('tip').onclick=function(){
		if(pu)cl=true;
	}
	let interval=setInterval(function(){
		if(chess==null||chess.getWinner()!=null){
			if(chess!=null){
				pu=true;
				if(cl){
					pu=false;
					cl=false;
					chess=null;
				}
			}else{
				chess=new Chess(document.getElementById('chess'));
				blackTurn=true;
				aet('黑方氪命中','black');
			}
		}else{
			if(blackTurn){
				if(doblack=='people'&&lastClick==null)return;
				chess.doblack(scripts[doblack]);
			}else{
				if(dowhite=='people'&&lastClick==null)return;
				chess.dowhite(scripts[dowhite]);
			}
			blackTurn=!blackTurn;
			if(chess.getWinner()==null){
				if(blackTurn){
					aet('黑方氪命中','black');
				}else{
					aet('白方修仙中','white');
				}
			}
		}
		lastClick=null;
	},300);
}