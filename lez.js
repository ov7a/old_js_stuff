function lez(a,b){
	if (a>b) {a=a%b;}
	if (Math.abs(a)==1) {return a;}
	if (a==0) return 1;
	if (a % 2==1){
		if ((a % 4==3) && (b % 4==3)){
			return -lez(b,a)
		}else{
			return lez(b,a)
		}
	}else{
		if (a==2){
			if ((b % 8==1)||(b % 8==7)){
				return 1
			}else{
				return -1
			}
		}else{
			return lez(2,b)*lez(a/2,b)
		}
	}
}

function lezShow(a,b){
s=lez(Number(a),Number(b));
//alert(s);
sudatext.innerHTML=a+' / '+b+' = '+s;
}
