function weight(k){
var count=0;
while(k!=0){
    if(k%2) count++;
    k=(k-(k%2))/2; //не, ну а как еще целочисленное деление сделать?
}
return count;
}

function calc(){
var s='';
s=inputS.value;
if (s.length==0){
	alert("Может, введешь что-нибудь? Желательно вектор функции, желательно в поле ввода.");
	return;
}
var r=Math.log(s.length)/Math.log(2);
var n;
if ( Math.floor(r) != r) {
	alert("Плохое число! Хочу два в натуральной степени! Убери "+(s.length-Math.pow(2,Math.floor(r)))+" или добавь "+(Math.pow(2,Math.floor(r)+1)-s.length)+" цифр(ы/у/ерки).");
	return;
} else{
    n=Math.floor(r);
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
answer.innerHTML='';
var anstmp="<tr><td><b>f</b></td>";
var tmp1=new Array(),tmp2=new Array();

for (i=0;i<s.length;i++){
    tmp1[i]=0;
    tmp1[i]=s[i]-'0';
    anstmp+="<td><b>"+tmp1[i]+"</b></td>";
}
anstmp+="</tr>";
answer.innerHTML+=anstmp;
for(type=0;type<3;type++){
if (type==1){
    answer.innerHTML+='<tr><td colspan="'+s.length+1+'"><center>Второй тип (Уолша)</center></td></tr>'; 
} else if (type==0){
    answer.innerHTML+='<tr><td colspan="'+s.length+1+'"><center>Первый тип</center></td><tr>';
}
if (type==1){
    anstmp="<tr><td><i>f</i></td>";
    for (i=0;i<s.length;i++){
        tmp1[i]=0;
        tmp1[i]=Math.pow(-1,s[i]-'0');
        anstmp+="<td>"+tmp1[i]+"</td>";
    }
    anstmp+="</tr>";
    answer.innerHTML+=anstmp;
}

var step;
for(j=0;j<n;j++){
    anstmp="<tr><td></td>";
    if(j==n-1) {
        if (type==1) 
            anstmp="<tr><td><i>F</i></td>";
        else if (type==0)
            anstmp="<tr><td>F</td>";
        else anstmp="<tr><td></td>";
    }
    for(i=0;i<s.length;i++) tmp2[i]=tmp1[i];
    step=Math.pow(2,j);
    for(i=0;i<s.length;i=i+step*2){
        for(k=0;k<step;k++){
            tmp1[i+k]=tmp2[i+k]+tmp2[i+step+k];
            if(j!=n-1)
                anstmp+="<td>"+tmp1[i+k]+"</td>";
            else
                anstmp+="<td>"+tmp1[i+k]+"</td>";
        }
        for(k=0;k<step;k++){
            tmp1[i+step+k]=tmp2[i+k]-tmp2[i+step+k];
            if(j!=n-1)
                anstmp+="<td>"+tmp1[i+step+k]+"</td>";
            else
                anstmp+="<td>"+tmp1[i+step+k]+"</td>";
        }
    }  
    anstmp+="</tr>";
    if(!skip.checked||(j==n-1&&type!=2)) answer.innerHTML+=anstmp;
}
if (type==1) 
    anstmp="<tr><td><i>S<i></td>";
else if (type==0)    
    anstmp="<tr><td>S</td>";
else anstmp="<tr><td><i>r<i></td>"; 
for (i=0;i<s.length;i++){
    anstmp+="<td>"+tmp1[i]/Math.pow(2,n)+"</td>";
}
anstmp+="</tr>";
answer.innerHTML+=anstmp; 
var CIord, Nmin;
if (type==1){ 
    Nmin=s.length;
    CIord=n+1;
    anstmp="<tr><td><i>F<sup>2</sup><i></td>";
    for (i=0;i<s.length;i++){
        if(i!=0&&tmp1[i]!=0) CIord=Math.min(CIord,weight(i));
        Nmin=Math.min(Nmin,(Math.pow(2,n)-Math.abs(tmp1[i]))/2);
        tmp1[i]=tmp1[i]*tmp1[i];
        anstmp+="<td>"+tmp1[i]+"</td>";
    }  
    CIord=CIord-1;
    answer.innerHTML+='<tr><td colspan="'+s.length+1+'"><center>Порядок корреляционной иммунности: '+CIord+'</center></td></tr>'; 
    if(tmp1[0])
        answer.innerHTML+='<tr><td colspan="'+s.length+1+'"><center>Функция не равновесна</center></td></tr>'; 
    else
        answer.innerHTML+='<tr><td colspan="'+s.length+1+'"><center>Функция равновесна</center></td></tr>';
    answer.innerHTML+='<tr><td colspan="'+s.length+1+'"><center>Расстояние нелинейности N='+Nmin+'</center></td></tr>'; 
    answer.innerHTML+=anstmp;
}
} //for type
}

