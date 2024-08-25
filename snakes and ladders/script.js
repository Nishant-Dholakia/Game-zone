let board = document.querySelectorAll('.box');
let player1 = document.createElement('div');
player1.classList.add('player1');
let player2 = document.createElement('div');
player2.classList.add('player2');
let square = [
    [100, 99, 98, 97, 96, 95, 94, 93, 92, 91],
    [81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
    [80, 79, 78, 77, 76, 75, 74, 73, 72, 71],
    [61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
    [60, 59, 58, 57, 56, 55, 54, 53, 52, 51],
    [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
    [40, 39, 38, 37, 36, 35, 34, 33, 32, 31],
    [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    [20, 19, 18, 17, 16, 15, 14, 13, 12, 11],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
];
let ladders = [
    [13,27],
    [16,67],
    [28,32],
    [33,49],
    [42,63],
    [53,87],
    [62,80],
    [72,90],
    [85,95]
];

let snakes = [
    [23,3],
    [30,10],
    [39,20],
    [47,26],
    [56,36],
    [71,9],
    [78,24],
    [86,66],
    [98,79]
];

let bgsong = new Audio(`./sound effect/mr bean.mp3`);
bgsong.volume = 0.07;
window.onload = setTimeout(()=>
{
    bgsong.play();

},2000);
setInterval(()=>
{
    if(bgsong.ended)
    {
        bgsong.play();
    }
})

let k = 0;
for (let i = 0; i < 10; i++) 
{
    for (let j = 0; j < 10; j++) 
    {
        board[k++].setAttribute('id',`${square[i][j]}`);
        // board[k++].innerHTML = `${square[i][j]}`;
    }
}
let roller = document.querySelector('.roller');
let dice = document.querySelector('.dice');
let gameend = document.querySelector('.gameend');
let turnname = document.querySelector('.turn');

let move1 = 1;
let move2 = 1;
let turn = true;
board[90].appendChild(player1);
board[90].appendChild(player2);


async function checkSnake(player,move)
{
    for(let i = 0;i<snakes.length;i++)
        {
            if(snakes[i][0] == move)
            {
                console.log('incheck got ',move);
                let snakevoice = new Audio(`./sound effect/snake sound.mp3`);
                snakevoice.play();
                return movePlayer(player,move,snakes[i][1]-move);
            }
        }
        return new Promise((resolve)=>
        {
            resolve(move);
        })
}

async function checkLadder(player,move)
{
    for(let i = 0;i<ladders.length;i++)
    {
        if(ladders[i][0] == move)
        {
            console.log('incheck got ',move);
            let laddervoice = new Audio(`./sound effect/ladder sound.mp3`);
            laddervoice.play();
            return movePlayer(player,move,ladders[i][1]-move);
        }
    }
    return new Promise((resolve)=>
    {
        resolve(move);
    })

}

async function movePlayer(player, move, num) 
{
    return new Promise((resolve) => 
    {
        setTimeout(async () => 
        {
            if (move + num <= 100) 
            {
                for (let i = 0; i < 100; i++) 
                {
                    if (move == board[i].id) 
                    {
                        board[i].removeChild(player);
                        break;
                    }
                }
                move += num;
                for (let i = 0; i < 100; i++) 
                {
                    if (move == board[i].id) 
                    {
                        board[i].appendChild(player);
                        console.log('before check ',move);
                        move = await checkLadder(player,move);
                        console.log('after check ',move);
                        move = await checkSnake(player,move);
                        break;
                    }
                }
            }
            resolve(move);
        }, 1000);
    });
}


//when die is rolled
async function rollDie()
{
    let num = Math.ceil(Math.random() * 6);
    dice.setAttribute('src', `./images/${num}.png`);
    roller.classList.toggle('rotate');

    if(turn)
    {
        move1 = await movePlayer(player1,move1,num);
        if(num != 6)
        {
            turn = false;
            turnname.innerText = `Turn : Player-2`;
        }
        console.log('move1 dfd ',move1);
    }
    else
    {
        move2 =await movePlayer(player2,move2,num);
        if(num != 6)
        {
            turn = true;
            turnname.innerText = `Turn : Player-1`;
        }
        console.log('move2 ',move2);
    }
}
roller.addEventListener('click', ()=>
{
    if(move1 != 100 && move2 != 100)
    {
        let dicesound = new Audio('./sound effect/dice sound.mp3');
        dicesound.play();
        rollDie();
    }
    
});
move1 = 100;
setInterval(()=>
{
    if(move1 == 100 && gameend.innerText == '')
        gameend.innerText = `Hurray!!! Player-1 Wins the game...`;
    else if(move2 == 100 && gameend.innerText == '')
        gameend.innerText = `Hurray!!! Player-2 Wins the game...`;  
},500);

let i = 0;
let j = 0;
let count = 5;

