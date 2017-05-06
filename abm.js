function calc(){
var s='';
s=inputS.value;
if (s.length==0){
	alert("Может, введешь что-нибудь? Желательно последовательность, желательно в поле ввода.");
	return;
}
for(i=0;i<s.length;i++){
	if (s[i]!='0'&&s[i]!='1'){
		alert("Не-не, я только 0 и 1 умею. И не надо посылать меня буквами и прочими символами.");
		return;
	}
}
if (s.length<=2){
	alert("Не, ну это смешно. Может, ты и до трех считать не умеешь?");
}
//по идее в S теперь только 0 и 1
answer.innerHTML='<tr><th align=center>n</th><th align=center>S<sup>n+1</sup></th><th align=center>δ</th><th align=center>С(D)</th><th align=center>2L&le;n</th><th align=center>C*(D)</th><th align=center>L</th><th align=center>λ</th></tr><tr><td align=center>.</td><td>Начальное заполнение</td><td align=center>.</td><td align=right>1</td><td align=center>.</td><td align=right>1</td><td align=center>0</td><td align=center>1</td></tr>';
var c = "1",c2 = "1",t='',ccopy='',c2copy='';
var b=0,flag=0,L=0,la=1;
for (n=0;n<s.length;n++){
	b=0;	
	flag=0;
	for(i=0;i<c.length;i++) {
		b+=c[i]*s[n-i];
	}
	b=b%2;
	if (b==0){
		la=la+1;
	}else{
		t=c+''; //ибо клонирования не существует(
		for(i=c.length;i<la+c2.length;i++){
			c=c+'0';
		}
		for(i=la;i<Math.min(c.length,la+c2.length);i++){
	        	if((c[i]*1+c2[i-la]*1)%2==1) {
				c=c.substr(0,i)+'1'+c.substr(i+1);
			}else{
				c=c.substr(0,i)+'0'+c.substr(i+1);
			}
		}
        	if (2*L<=n){
	    		flag=1;
		        L=n+1-L;
		        la=1;
		        c2=t+'';
	        }else{
        		la=la+1;
		}
	}
	ccopy=c+'';
	ccopy=ccopy.split('').reverse().join('');
	c2copy=c2+'';
	c2copy=c2copy.split('').reverse().join('');
	answer.innerHTML+='<tr><td align=center>'+n+'</td><td>'+s.substr(0,n+1)+'</td><td align=center>'+b+'</td><td align=right>'+ccopy+'</td><td align=center>'+flag+'</td><td align=right>'+c2copy+'</td><td align=center>'+L+'</td><td align=center>'+la+'</td></tr>';
}
ans='<b>n = '+s.length+ '<br>L = '+L+'<br> C(D) = 1';
for(i=1;i<=L;i++){
	if(c[i]=='1') ans+='+ D<sup>'+i+'</sup>';
}
ans+='</b>';
otvet.innerHTML=ans;
canva.width=L*20+20+20;
if(L!=0) canva.height=80; else canva.height=40;
if (canva.getContext){
	var ctx = canva.getContext('2d');
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.strokeStyle = "rgb(0,0,0)";
 	ctx.textAlign = "left";
        ctx.textBaseline = 'top';
	ctx.font = "14pt Arial";
	ctx.moveTo(20,10);
	ctx.lineTo(0,10);
	ctx.lineTo(5,8);
	ctx.moveTo(0,10);
	ctx.lineTo(5,12);
	ctx.stroke();
	if (L!=0){
		for(i=0;i<L;i++){
			ctx.strokeRect(20+i*20,0,19,20);
			ctx.fillText(""+s[i], 25+i*20, 2);	
		}	
		ctx.moveTo(20+L*10,60);
		ctx.lineTo(20+L*10,70);	
		ctx.lineTo(20+L*20+10,70);	
		ctx.lineTo(20+L*20+10,10);	
		ctx.lineTo(20+L*20,10);	
	
		ctx.moveTo(20+L*10,50-7);
		ctx.lineTo(20+L*10,50+7);
		ctx.moveTo(20+L*10-7,50);
		ctx.lineTo(20+L*10+7,50);
		ctx.stroke();
	
		ctx.beginPath();
		ctx.arc(20+L*10, 50, 7, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.stroke();
		for(i=0;i<L;i++){
			if(c[L-i]==1) ctx.strokeRect(30+i*20,20,0,20);
		}
		ctx.strokeRect(20,40,L*20,20);
	}else{
		ctx.beginPath();
		ctx.arc(20+7, 10, 7, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.stroke();
		
		ctx.moveTo(37,0);
		ctx.lineTo(17,20);
		ctx.stroke();
	}
}

}

