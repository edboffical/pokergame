exports.makePoker = function(arr) {
    
    arr.sort(function(a,b){
        if (a>b) {
        return 1;
        }else if(a<b){
        return -1
        }else{
        return 0;
        }    
    });

    arr2 = arr.slice(0);

    arr2.forEach(function(card,i){
        switch (card) {
            case 10:
                arr2[i]='T'
                break;
            case 11:
                arr2[i]='J'
                break;
            case 12:
                arr2[i]='Q'
                break;
            case 13:
                arr2[i]='K'
                break;
            case 14:
                arr2[i]='A'
                break;
            case 15:
                arr2[i]='2'
                break;
            case 16:
                arr2[i]='￥'
                break;
            case 17:
                arr2[i]='$'
                break;
        }
    });
    console.log(arr);
    return arr2;
}

exports.outCards = function(cards,lastTurn,player) {
    if (lastTurn.player==''||lastTurn.player==player) {
        lastTurn.player=player;
        lastTurn.type=cards.type;
        lastTurn.cards=cards.cards;
        return true;
    }
    if (cards.type!=lastTurn.type && cards.type!='zhadan' && cards.type!='wangzha') {
        return false;
    }else{
        if (cards.cards[0]>lastTurn.cards[0]) {
            lastTurn.player=player;
            lastTurn.type=cards.type;
            lastTurn.cards=cards.cards;
            return true;
        }
    }
    if (cards.type=='zhadan') {
        if (lsatTurn.type=='wangzha') {
            return false;
        }
        if (lsatTurn.type!='zhadan') {
            lastTurn.player=player;
            lastTurn.type=cards.type;
            lastTurn.cards=cards.cards;
            return true;
        }
        if (cards.cards[0]>lastTurn.cards[0]) {
            lastTurn.player=player;
            lastTurn.type=cards.type;
            lastTurn.cards=cards.cards;
            return true;
        }
    }
    if (cards.type=='wangzha') {
            lastTurn.player=player;
            lastTurn.type=cards.type;
            lastTurn.cards=cards.cards;
            return true;
    }
}

exports.delCards = function(arr1,arr2) {
	for(var i = arr2.length - 1; i >= 0; i--){
		var index = arr1.indexOf(arr2[i]);
		if(index === -1){
			result = false;
			break;
		}else{
			arr1.splice(index, 1);
		}
	}
}

exports.checkCards = function(cards,myCards) {
    pokerList = ['3','4','5','6','7','8','9','T','J','Q','K','A','2','￥','$'];
    powerList = [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
    cards = cards.split('');
    cards.forEach(function(card,i){
        illegalPoker = false;
        for (j = 0; j < 18; j++) {
            if (card.toUpperCase()==pokerList[j]) {
                illegalPoker = true;
                cards[i] = powerList[j];
            }
        }
    });

    cards.sort(function(a,b){
        if (a>b) {
        return 1;
        }else if(a<b){
        return -1
        }else{
        return 0;
        }    
    });

    if (!isContained(myCards,cards)) {
        // console.log(myCards);
        // console.log(cards);
        return false;
    }

    // console.log(cards + 'poser arr');

    if (illegalPoker==true) {
        if (cards.length==1) {
            return {type:'danpai',cards:cards};
        }
        if (cards.length==2 && cards[0] == cards[1]) {
            return {type:'duizi',cards:cards};
        }
        if (cards.length==2 && cards[0]==16 && cards[1]==17) {
            return {type:'wangzha',cards:cards};
        }
        if (cards.length==3 && cards[0] == cards[1] && cards[2]==cards[0]) {
            return {type:'sanbudai',cards:cards};
        }
        if (cards.length==4 && cards[0] == cards[1] && cards[1]==cards[2]&& cards[3]==cards[0]) {
            return {type:'zhadan',cards:cards};
        }
        if (cards.length>4) {
            if (cards.every((card, i) => i === 0 || card === (cards[i-1] + 1))) {
                return {type:'shunzi',cards:cards};
            }
        }
        return false;
    }else{
        return false;
    }
}

function isContained(a,b){
    arr1 =  a.slice(0);
    arr2 =  b.slice(0);
	var result = true;
	for(var i = arr2.length - 1; i >= 0; i--){
		var index = arr1.indexOf(arr2[i]);
		if(index === -1){
			result = false;
			break;
		}else{
			arr1.splice(index, 1);
		}
	}
	return result;
}