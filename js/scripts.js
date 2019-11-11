let scripts={
	入门:(function(chessground,mt){
		let dmt;
		if(mt=='black'){
			dmt='white';
		}else{
			dmt='black';
		}
		let fin=function(x,y,t){
			return x>=0&&x<13&&y>=0&&y<13&&chessground[x][y]==t;
		}
		let q=function(i,j,t){
			if(chessground[i][j]!='none')return 0;
			let px=[ 0,-1,-1,-1];
			let py=[-1, 0,-1,+1];
			let mx=0;
			for(let pi=0;pi<4;pi++){
				let tot=0;
				let x,y;
				let p=0;
				x=i+px[pi];
				y=j+py[pi];
				while(fin(x,y,t)){
					tot++;
					x+=px[pi];
					y+=py[pi];
				}
				if(fin(x,y,'none')){
					p++;
				}
				x=i-px[pi];
				y=j-py[pi];
				while(fin(x,y,t)){
					tot++;
					x-=px[pi];
					y-=py[pi];
				}
				if(fin(x,y,'none')){
					p++;
				}
				tot=tot*3+p;
				if(tot>mx)mx=tot;
			}
			return mx;
		}
		let q1=[];
		let q2=[];
		for(let i=0;i<13;i++){
			q1[i]=[];
			q2[i]=[];
			for(let j=0;j<13;j++){
				q1[i][j]=q(i,j,mt);
				q2[i][j]=q(i,j,dmt);
			}
		}
		for(let v=12;v>=3;v--){
			let tot=[];
			for(let i=0;i<13;i++){
				for(let j=0;j<13;j++){
					if(q1[i][j]>=v){
						tot.push({x:i,y:j});
					}
				}
			}
			if(tot.length!=0){
				return tot[Math.round(Math.random()*(tot.length-1))];
			}
			for(let i=0;i<13;i++){
				for(let j=0;j<13;j++){
					if(q2[i][j]>=v){
						tot.push({x:i,y:j});
					}
				}
			}
			if(tot.length!=0){
				return tot[Math.round(Math.random()*(tot.length-1))];
			}
		}
		return {x:6,y:6};
	})
};