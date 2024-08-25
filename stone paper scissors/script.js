let choice = document.querySelectorAll('.image');
let ans = document.querySelector('.ans');
let humanscore = document.querySelector('.human');
let compscore = document.querySelector('.comp');
let human = 0;
let comp = 0;
let hand = ['Stone','Paper','Scissor'];
function compChoice()
{
    let m = Math.random();
    console.log(m);
    return Math.floor(m*3);

}

for(let i = 0;i<3;i++)
{
    choice[i].addEventListener('click',()=>
    {
        console.log(`${i} choose`);
        ans.innerText = '';
        let cchoice = compChoice();
        if(i === cchoice)
        {
            ans.innerText = 'Draw';
        }
        else if(i < cchoice || (!i && cchoice == 2))
        {
            ans.innerText = `- Computer choose ${hand[cchoice]} \n- Player choose ${hand[i]} \nComputer Wins!!!`;
            compscore.innerText = `Computer : ${++comp}`;
        }
        else
        {
            ans.innerText = `- Computer choose ${hand[cchoice]} \n- Player choose ${hand[i]} \nPlayer win!!!`;
            humanscore.innerText =`Human : ${++human}`;
        }
    })
}