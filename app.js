
var scores, roundScore, activePlayer,dice;

scores = [0,0];
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
    document.querySelector('.dice').style.display = "none";
    dice = Math.floor(Math.random()*6)+1;
    console.log(dice);
    player_1.score.textContent = dice;
    scores[0] = dice;
    player_1.current_score.textContent = scores[0];
    player_1.name.textContent = 'Player 1';
    console.log(player_1.panel.classList.value);
    if(player_1.panel.classList.value != 'player-0-panel active')  player_1.panel.classList.value = 'player-0-panel active';
    console.log(player_1.panel.classList.value);

    dice = Math.floor(Math.random()*6)+1;
    console.log(dice);
    player_2.score.textContent = dice;
    scores[1] = dice;
    player_2.current_score.textContent = scores[1];
    player_2.name.textContent = 'Player 2';
    console.log(player_2.panel.classList.value);
    if(player_1.panel.classList.value != 'player-1-panel active') player_2.panel.classList.value = 'player-1-panel';
    console.log(player_2.panel.classList.value);


}

function check_score(score){
    if (score >=100){
        return false;
    }
    else{
        return true;
    }
}

function changing_func(num){
    if (check_score(scores[activePlayer]) == false){
        all_players[activePlayer].name.innerHTML ='<b>'+'WINNER!'+'<b>';
        all_players[activePlayer].panel.classList.toggle('active');
        all_players[activePlayer].panel.classList.add('winner');
        document.querySelector('.dice').style.display = 'none';
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
            document.querySelector('.dice').style.display = "none";
        }
        else{
            all_players[activePlayer].name.innerHTML ='<b>'+'WINNER!'+'<b>';
            all_players[activePlayer].panel.classList.add('winner');
            document.querySelector('.dice').style.display = 'none';
        }
    }
}

function change_players(){

    (activePlayer == 0) ? changing_func(num=1) : changing_func(num=0);
}

refresh();

function froll_dice(){
    if (check_score(scores[activePlayer]) != false){
        var dice = Math.floor(Math.random()*6)+1;
        if (dice == 1){
            all_players[activePlayer].current_score.textContent = '0';
            roundScore = 0;
            change_players();
        }
        else{
            var diceDOM = document.querySelector('.dice');
            diceDOM.style.display = 'block';
            diceDOM.src ='dice-'+dice+'.png';
            roundScore+=dice;
            all_players[activePlayer].current_score.textContent = roundScore;
            if (check_score(score[activePlayer])){
                all_players[activePlayer].panel.toggle('active');
                all_players[activePlayer].panel.add('winner');
            }
        }
    }
}

document.querySelector('.btn-roll').addEventListener('click',froll_dice);

document.querySelector('.btn-hold').addEventListener('click',change_players);

document.querySelector('.btn-new').addEventListener('click',function(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    refresh();
})