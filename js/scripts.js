let scripts={
	入门:(function(chessground,mt){
		let dmt;
		if(mt=='black'){
			dmt='white';
		}else{
			dmt='black';
		}
		let fin=function(x,y,t){
			return x>=0&&x<13&&y>=0&&y<13&&(chessground[x][y]==t||chessground[x][y]=='none');
		}
		let gp=function(x,y,t,px,py){
			x=x+px;
			y=y+py;
			let ans={p:0,tot:0}
			while(fin(x,y,t)&&ans.p<=4){
				ans.p++;
				if(chessground[x][y]==t&&ans.p-ans.tot<=1){
					ans.tot++;
				}
				x+=px;
				y+=py;
			}
			return ans;
		}
		let q=function(i,j,t){
			if(chessground[i][j]!='none')return 0;
			let px=[ 0,-1,-1,-1];
			let py=[-1, 0,-1,+1];
			let mx=-1;
			let cx=0;
			for(let pi=0;pi<4;pi++){
				let a1=gp(i,j,t,px[pi],py[pi]);
				let a2=gp(i,j,t,-px[pi],-py[pi]);
				let tot=a1.tot+a2.tot;
				if(a1.p+a2.p>=4){
					if(tot>mx){
						mx=tot;
						cx=0;
					}else if(tot==mx){
						cx++;
					}
				}
			}
			return mx*4+cx;
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
		console.log(q1);
		console.log(q2);
		for(let v=16;v>=4;v--){
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