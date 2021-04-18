console.log("hello")

var takenFields = [];
var playerFields = [];
var computerFields = [];

function play() {
    let played = parseInt(this.id.replace(/[^0-9]/g, ''), 10); 
    if(!takenFields.includes(played)){
        takenFields.push(played);
        playerFields.push(played);
        $('#field_'+played).text("X");
        if(checkWin(playerFields)){
            $('.field').off();
            setTimeout(function(){
                $('.player-win').show();
                increaseScore("wins");
                $('#board').hide();
                setTimeout(function(){
                    $('#reset').trigger('click');
                }, 1000);
            }, 500);

        }else{
            let computerMove = AImove(computerFields, takenFields, false);
            if(computerMove == 0){
                computerMove = AImove(playerFields, takenFields, true);
            }
            if(takenFields.length < 9){
                while(takenFields.includes(computerMove)){
                    computerMove = Math.floor((Math.random() * 9) + 1);
                }
                takenFields.push(computerMove);
                computerFields.push(computerMove);
                $('#field_'+computerMove).html("O");
                //$('#field_'+computerMove).addClass("played-field-computer");
                if(checkWin(computerFields)) {
                    $('.field').off();
                    setTimeout(function(){
                        $('.computer-win').show();
                        increaseScore("losses");
                        $('#board').hide();
                        setTimeout(function(){
                            $('#reset').trigger('click');
                        }, 1000);
                    }, 500);
                }              
            }
        }
    }
    if(takenFields.length >= 9 && !checkWin(computerFields) && !checkWin(playerFields)){
        $('.field').off();
        increaseScore("draws");
        setTimeout(function(){
            $('.draw').show();
            $('#board').hide();
            setTimeout(function(){
                $('#reset').trigger('click');
            }, 1000);
        }, 500);
    }
}
$('.field').click(play);

function checkWin(fields){
    if(contains(fields, [1, 2, 3]) || contains(fields, [4, 5, 6]) || contains(fields, [7, 8, 9]) ||
    contains(fields, [1, 4, 7]) || contains(fields, [2, 5, 8]) || contains(fields, [3, 6, 9]) ||
    contains(fields, [1, 5, 9]) || contains(fields, [3, 5, 7])){       
        return true;
    }
    return false;
}

function AImove(fields, computers, rand){
    let output = 0;
    if((contains(fields, [1, 2]) || contains(fields, [7, 5]) || contains(fields, [9, 6])) && !computers.includes(3)) output = 3;
    if((contains(fields, [3, 2]) || contains(fields, [7, 4]) || contains(fields, [9, 5])) && !computers.includes(1)) output = 1;
    if((contains(fields, [1, 3]) || contains(fields, [8, 5])) && !computers.includes(2)) output = 2;
    if((contains(fields, [1, 7]) || contains(fields, [6, 5])) && !computers.includes(4)) output = 4;
    if((contains(fields, [8, 2]) || contains(fields, [6, 4]) || contains(fields, [1, 9]) || contains(fields, [3, 7])) && !computers.includes(5)) output = 5;
    if((contains(fields, [4, 5]) || contains(fields, [3, 9])) && !computers.includes(6)) output = 6;
    if((contains(fields, [1, 4]) || contains(fields, [8, 9]) || contains(fields, [5, 3])) && !computers.includes(7)) output = 7;
    if((contains(fields, [7, 9]) || contains(fields, [2, 5])) && !computers.includes(8)) output = 8;
    if((contains(fields, [3, 6]) || contains(fields, [7, 8]) || contains(fields, [1, 5])) && !computers.includes(9)) output = 9;

    if(output == 0 && rand){
       output = Math.floor((Math.random() * 9) + 1);
    }
    return output;
}

const contains = (first, second) => {
    let output = true;
    second.forEach(function(element){
        if(!first.includes(element)) output = false;
    });
    return output;
 }

function increaseScore(divId){
    let output = parseInt($('#'+divId).text());
    $('#'+divId).text(output + 1);
}

 $('#reset').click(function(){
    computerFields = [];
    playerFields = [];
    takenFields = [];
    $('.field').text("");
    //$('.field').removeClass("played-field-computer");
    //$('.field').removeClass("played-field-user");
    $('.computer-win').hide();
    $('.player-win').hide();
    $('.draw').hide();
    $('.field').click(play);
    $('#board').show();
 });