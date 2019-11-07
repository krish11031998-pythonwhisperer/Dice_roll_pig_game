
var scores, roundScore, activePlayer,dice_rolled_number,max_score,d_die,d_die_rolled_num_1,d_die_rolled_num_2;

d_die = false;
max_score = 100;
d_die_rolled_num_1 = [];
d_die_rolled_num_2 = [];
scores = [0,0];
dice_rolled_number = [];
roundScore = 0;
activePlayer = 0;

var player_1 = { 
    score: document.querySelector('#score-0'),
    current_score: document.querySelector('#current-0'),
    name: document.querySelector('#name-0'),
    panel : document.querySelector('.player-0-panel')

}

var player_2 = { 
    score: document.querySelector('#score-1'),
    current_score: document.querySelector('#current-1'),
    name: document.querySelector('#name-1'),
    panel : document.querySelector('.player-1-panel')

}

var all_players = new Array(player_1,player_2);

function refresh(){
    d_die = false;
    player_1.score.textContent = '0';
    player_1.current_score.textContent = scores[0];
    player_1.name.textContent = 'Player 1';
    console.log(player_1.panel.classList.value);
    if(player_1.panel.classList.value != 'player-0-panel active')  player_1.panel.classList.value = 'player-0-panel active';
    console.log(player_1.panel.classList.value);

    block_none_dice('none');

    player_2.score.textContent = '0';
    player_2.current_score.textContent = scores[1];
    player_2.name.textContent = 'Player 2';
    console.log(player_2.panel.classList.value);
    if(player_1.panel.classList.value != 'player-1-panel active') player_2.panel.classList.value = 'player-1-panel';
    console.log(player_2.panel.classList.value);

}

function check_score(score){
    if (score >=max_score){
        return false;
    }
    else{
        return true;
    }
}

function block_none_dice(display_type){
    if (d_die == false){
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = display_type;
    }
    else{
        var dice1DOM,dice2DOM;
        dice1DOM = document.querySelector('.dice-left');
        dice2DOM = document.querySelector('.dice-right');
        dice1DOM.style.display = display_type;
        dice2DOM.style.display = display_type;
    }
}


function changing_func(num){
    dice_rolled_number = [];
    d_die_rolled_num_1 = [];
    d_die_rolled_num_2 = [];
    if (check_score(scores[activePlayer]) == false){
        all_players[activePlayer].name.innerHTML ='<b>'+'WINNER!'+'<b>';
        all_players[activePlayer].panel.classList.toggle('active');
        all_players[activePlayer].panel.classList.add('winner');
        block_none_dice('none');
        // document.querySelector('.dice').style.display = 'none';
    }
    else{
        scores[activePlayer] += roundScore;
        (roundScore == 0) ? console.log("roundScore is already = 0") : roundScore = 0;
        all_players[activePlayer].panel.classList.toggle('active');
        all_players[activePlayer].score.textContent = scores[activePlayer];
        if (check_score(scores[activePlayer]) != false){
            (all_players[activePlayer].current_score.textContent > 0) ? all_players[activePlayer].current_score.textContent = '0' : console.log('its already 0');        
            activePlayer = num;
            all_players[activePlayer].panel.classList.toggle('active');
            block_none_dice('none');
            // document.querySelector('.dice').style.display = "none";
        }
        else{
            all_players[activePlayer].name.innerHTML ='<b>'+'WINNER!'+'<b>';
            all_players[activePlayer].panel.classList.add('winner');
            block_none_dice('none');
            // document.querySelector('.dice').style.display = 'none';
        }
    }
}

function change_players(){
    (activePlayer == 0) ? changing_func(num=1) : changing_func(num=0);
}


refresh();


function single_dice_roll(){
    if (check_score(scores[activePlayer]) != false){
        var dice = Math.floor(Math.random()*6)+1;
        dice_rolled_number.push(dice);
        // var dice_2 = Math.floor(Math.random()*6)+1;
        if (dice == 1){
            all_players[activePlayer].current_score.textContent = '0';
            roundScore = 0;
            change_players();
        }
        else if (dice_rolled_number.length >= 2 && (dice_rolled_number[dice_rolled_number.length - 1] == 6 && dice_rolled_number[dice_rolled_number.length - 2] == 6))
        {
            console.log(dice_rolled_number[dice_rolled_number.length - 1]+" , "+dice_rolled_number[dice_rolled_number.length - 2]);
            all_players[activePlayer].current_score.textContent = '0';
            roundScore = 0;
            scores[activePlayer] = 0;
            change_players();
        }
        else{
            var diceDOM = document.querySelector('.dice');
            block_none_dice('block');
            // diceDOM.style.display = 'block';
            diceDOM.src ='dice-'+dice+'.png';
            roundScore+=dice;
            all_players[activePlayer].current_score.textContent = roundScore;
            if (check_score(scores[activePlayer]) == false){
                all_players[activePlayer].panel.classList.toggle('active');
                all_players[activePlayer].panel.classList.add('winner');
            }
        }
    }
}

function double_die_roll(){
    if (check_score(scores[activePlayer]) != false){
        var dice_1 = Math.floor(Math.random()*6)+1;
        var dice_2 = Math.floor(Math.random()*6)+1;
        d_die_rolled_num_1.push(dice_1);
        d_die_rolled_num_2.push(dice_2);
        if (dice_1 == 1 || dice_2 == 1){
            all_players[activePlayer].current_score.textContent = '0';
            roundScore = 0;
            change_players();
        }
        else if ((d_die_rolled_num_1.length >= 2 && d_die_rolled_num_2.length >= 2) && ((d_die_rolled_num_1[d_die_rolled_num_1.length - 1] == 6 && d_die_rolled_num_1[d_die_rolled_num_1.length - 2] == 6) || (d_die_rolled_num_2[d_die_rolled_num_2.length - 1] == 6 && d_die_rolled_num_2[d_die_rolled_num_2.length - 2] == 6)))
        {
            console.log('Dice 1:'+d_die_rolled_num_1[d_die_rolled_num_1.length - 1]+","+d_die_rolled_num_1[d_die_rolled_num_1.length - 2]+"\tDice 2: "+d_die_rolled_num_2[d_die_rolled_num_2.length - 1]+","+d_die_rolled_num_2[d_die_rolled_num_2.length - 2]);
            all_players[activePlayer].current_score.textContent = '0';
            roundScore = 0;
            scores[activePlayer] = 0;
            change_players();
        }
        else{
            var dice1DOM = document.querySelector('.dice-left');
            var dice2DOM = document.querySelector('.dice-right');
            block_none_dice('block');
            dice1DOM.src ='dice-'+dice_1+'.png';
            dice2DOM.src ='dice-'+dice_2+'.png';
            roundScore+= (dice_1+dice_2);
            all_players[activePlayer].current_score.textContent = roundScore;
            if (check_score(scores[activePlayer]) == false){
                all_players[activePlayer].panel.classList.toggle('active');
                all_players[activePlayer].panel.classList.add('winner');
            }
        }
    }
}

document.querySelector('.btn-roll').addEventListener('click',function(){
    (d_die == false) ? single_dice_roll() : double_die_roll();
    // if (d_die == false){
    //     single_dice_roll();
    // }
    // else{
    //     double_die_roll();
    // }
});

document.querySelector('.btn-score').addEventListener('click',function(){
    max_score = prompt('Enter the new max score');
});

document.querySelector('.btn-dice').addEventListener('click',function(){
    d_die = true;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-left').style.display = 'block';
    document.querySelector('.dice-right').style.display = 'block';
});

document.querySelector('.btn-hold').addEventListener('click',change_players);

document.querySelector('.btn-new').addEventListener('click',function(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    refresh();
})