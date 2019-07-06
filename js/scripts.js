let scripts={
	rand:(function(myChessmen,otherChessmen){
		let chessground=[[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
		for(let i=0;i<myChessmen.length;i++){
			chessground[myChessmen[i].getX()][myChessmen[i].getY()]=1;
		}
		for(let i=0;i<otherChessmen.length;i++){
			chessground[otherChessmen[i].getX()][otherChessmen[i].getY()]=1;
		}
		let p=Math.round(Math.random()*(13*13-myChessmen.length-otherChessmen.length-1))+1;
		for(let i=1;i<=13;i++){
			for(let j=1;j<=13;j++){
				if(chessground[i][j]!=1){
					p--;
					if(p==0){
						return new Chessman(i,j);
					}
				}
			}
		}
	}),
	people:(function(){return lastClick;})
	
};