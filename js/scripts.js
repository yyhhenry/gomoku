let scripts={
	入门:(function(myChessmen,otherChessmen){
		let chessground=[[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
		for(let i=0;i<myChessmen.length;i++){
			chessground[myChessmen[i].getX()][myChessmen[i].getY()]=1;
		}
		for(let i=0;i<otherChessmen.length;i++){
			chessground[otherChessmen[i].getX()][otherChessmen[i].getY()]=2;
		}
		let q=function(i,j,t){
			if(chessground[i][j]!=null)return 0;
			let px=[ 0,-1,-1,-1];
			let py=[-1, 0,-1,+1];
			let mx=0;
			for(let pi=0;pi<4;pi++){
				let tot=0;
				let x,y;
				let p=0;
				x=i+px[pi];
				y=j+py[pi];
				while(x>0&&x<14&&y>0&&y<14&&chessground[x][y]==t){
					tot++;
					x+=px[pi];
					y+=py[pi];
				}
				if(x>0&&x<14&&y>0&&y<14&&chessground[x][y]==0){
					p=1;
				}
				x=i-px[pi];
				y=j-py[pi];
				while(x>0&&x<14&&y>0&&y<14&&chessground[x][y]==t){
					tot++;
					x-=px[pi];
					y-=py[pi];
				}
				if(x>0&&x<14&&y>0&&y<14&&chessground[x][y]==0){
					p=1;
				}
				tot=tot*2+p;
				if(tot>mx)mx=tot;
			}
			if(i==7&&j==8)console.log(t,mx);
			return mx;
		}
		for(let v=9;v>=1;v--){
			let tot=[];
			for(let i=1;i<=13;i++){
				for(let j=1;j<=13;j++){
					if(q(i,j,1)>=v){
						tot.push(new Chessman(i,j));
					}
				}
			}
			if(tot.length!=0){
				return tot[Math.round(Math.random()*(tot.length-1))];
			}
			for(let i=1;i<=13;i++){
				for(let j=1;j<=13;j++){
					if(q(i,j,2)>=v){
						tot.push(new Chessman(i,j));
					}
				}
			}
			if(tot.length!=0){
				return tot[Math.round(Math.random()*(tot.length-1))];
			}
		}
		return new Chessman(7,7);
	}),
	玩家:(function(){return lastClick;})
};