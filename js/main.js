var chess=document.getElementById("drawing");
var a=1,e;
var context = chess.getContext("2d");
var me=1;
var wins=[];
var count=0;
var chessboard=[];
var blackwin=[],whitewin=[],mywin=[],computerwin=[];
var over=false;

drawchessboard();
clearchessboard();

function clearchessboard(){
for(var i=0;i<600;i++) {
	blackwin[i]=0;
	whitewin[i]=0;
	mywin[i]=0;
	computerwin[i]=0;
}

//初始棋盘 0是没下过时 1是黑棋 2是白棋
for(var i=0;i<15;i++){
	chessboard[i]=[];
	for(var j=0;j<15;j++) {
		chessboard[i][j]=0;
	}
}

for(var i=0;i<15;i++) {
	wins[i]=[]
	for(var j=0;j<15;j++) {
		wins[i][j]=[];
		for(var k=0;k<600;k++) {
			wins[i][j][k]=0;
		}
	}
}
//横向
for(var i=0;i<15;i++) {
	for(var j=0;j<11;j++) {
		for(var k=0;k<5;k++) {
			wins[i][j+k][count]=true;
		}
		count++;
	}
}
//竖向
for(var i=0;i<15;i++) {
	for(var j=0;j<11;j++) {
		for(var k=0;k<5;k++) {
			wins[j+k][i][count]=true;
		}
		count++;
	}
}
//\向
for(var i=0;i<11;i++) {
	for(var j=0;j<11;j++) {
		for(var k=0;k<5;k++) {
			wins[i+k][j+k][count]=true;
		}
		count++;
	}

}
for(var i=0;i<11;i++) {
	for(var j=14;j>3;j--) {
		for(var k=0;k<5;k++) {
			wins[i+k][j-k][count]=true;
		}
		count++;
	}
}
console.log(count);
}

function drawchessboard() {
context.strokeStyle="#666666";
for(i=0;i<15;i++) {
	context.beginPath();
	context.moveTo(15+30*i,15);
	context.lineTo(15+30*i,435);
	context.moveTo(15,15+30*i);
	context.lineTo(435,15+30*i);
	context.stroke();
}
}

function onestep(i,j,me) {
	context.beginPath();
	context.arc(15+i*30,15+j*30,13,0,2*Math.PI);
	var gradient=context.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,0);
	if(me==1) {
	gradient.addColorStop(0,"#0a0a0a");//黑
	gradient.addColorStop(1,"#636766");//灰
	}
	else if(me==2){
	gradient.addColorStop(0,"#d1d1d1");//灰
	gradient.addColorStop(1,"#f9f9f9");//白
	}
	context.fillStyle = gradient;
	context.fill();
}

function two()
{
	a=2;	
	newgame();
	chess.onclick=function twoplay(e) {
	var x=e.offsetX;
	var y=e.offsetY;
	var i=Math.floor(x/30);
	var j=Math.floor(y/30);
	if(over) {
		return;
	}
	if(chessboard[i][j]==0) {
	onestep(i,j,me);
	if(me==1) {
		chessboard[i][j]=me;
		for(var k=0;k<count;k++) {
			if(wins[i][j][k]==true)
				blackwin[k]++;
				if(blackwin[k]==5) {alert("black win");over=true;}
			
		}
		me=2;
	}
	else if(me==2) {
		chessboard[i][j]=me;
		for(var k=0;k<count;k++) {
			if(wins[i][j][k]==true) 
				whitewin[k]++;
			    if(whitewin[k]==5) {alert("white win");over=true;}
		}
		me=1;
	}
	
	
	}
}
}
one();
function one()
{
	a=1;
	newgame();
	chess.onclick=function oneplay(e) {
	var x=e.offsetX;
	var y=e.offsetY;
	var i=Math.floor(x/30);
	var j=Math.floor(y/30);
	if(over) {
		return;
	}
	if(chessboard[i][j]==0) {
	onestep(i,j,me);
	if(me==1) {
		chessboard[i][j]=me;
		for(var k=0;k<count;k++) {
			if(wins[i][j][k]==true)
				blackwin[k]++;
				if(blackwin[k]==5) {alert("blackwin");over=true;return;}
			
		}
		me=2;
		computerai();
		
	}
	}
	}
	
}
function newgame()
{
	
	context.clearRect(0,0,450,450);
	drawchessboard();
	count=0;
	clearchessboard();
	over=false;
	me=1;
}
function computerai() {
	var myscore=[];
	var computerscore=[];
	var m=0;
	var u=0,v=0;
	for(var i=0;i<15;i++) {
		myscore[i]=[];
		computerscore[i]=[];
		for(var j=0;j<15;j++) {
			myscore[i][j]=0;
			computerscore[i][j]=0;
		}
	}
	for(var i=0;i<15;i++) {
		for(var j=0;j<15;j++) {
			if(chessboard[i][j]==0) {
				for(var k=0;k<count;k++) {
					if(wins[i][j][k]) {
						if(blackwin[k]==1) {
							myscore[i][j] +=200;
						}
						else if(blackwin[k]==2) {
							myscore[i][j] +=400;
						}
						else if(blackwin[k]==3) {
							myscore[i][j] +=2000;
						}
						else if(blackwin[k]==4) {
							myscore[i][j] +=10000;
						}
						if(computerwin[k]==1) {
							computerscore[i][j] += 220;
						}
						else if(computerwin[k]==2) {
							computerscore[i][j] += 420;
						}
						else if(computerwin[k]==3) {
							computerscore[i][j] += 2100;
						}
						else if(computerwin[k]==4) {
							computerscore[i][j] += 20000;
						}
				    }
				}
				if(myscore[i][j]>m) {
					m=myscore[i][j];
					u=i;
					v=j;
				}				
				else if(myscore[i][j]==m) {
				if(computerscore[i][j]>computerscore[u][v]) {
					u=i;
					v=j;
				}
				}
				if(computerscore[i][j]>m) {
					m=computerscore[i][j];
					u=i;
					v=j;
				}				
				else if(computerscore[i][j]==m) {
				if(myscore[i][j]>myscore[u][v]) {
					u=i;
					v=j;
				}
				}
			}
		}
	}
	console.log(m);
	onestep(u,v,me);
	chessboard[u][v]=2;
	for(var k=0;k<count;k++) {
		if(wins[u][v][k]) {
			computerwin[k]++;
			mywin[k]=99;
				if(computerwin[k]==5) {
					window.alert("computer win");
					over=true;
				}
		}
	}
	if(!over) {
		if(me==1) me=2;
		else if(me==2) me=1;
	}
}


