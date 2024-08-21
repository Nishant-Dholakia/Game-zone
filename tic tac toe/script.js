let grid = document.querySelectorAll(".box");
let result = document.querySelector(".result");
console.log(grid)
let matrix = [
    -1,-1,-1,
    -1,-1,-1,
    -1,-1,-1
]
let valid = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]
let wins = false;
let turn = 0;
let mark = (idx)=>
{
    if(matrix[idx] != -1)
        return;
    if(turn%2 == 1)
    {
        grid[idx].innerText = 'O';
        matrix[idx] = 0;
    }
    else
    {
        grid[idx].innerText = 'X';
        matrix[idx] = 1;
    }
    turn++;
    //check if someone wins
    for(let i = 0;i<8;i++)
        {
            if(matrix[valid[i][0]] === matrix[valid[i][1]] && matrix[valid[i][1]] === matrix[valid[i][2]] && matrix[valid[i][2]] != -1)
                {
                    wins = true;
                    if(turn%2)
                    {
                        result.innerText = 'Player 1 Wins the game!!!';
                    }
                    else
                    {
                        result.innerText = 'Player 2 Wins the game!!!';
                    }
                    grid[valid[i][0]].style.backgroundColor = 'lightgreen';
                    grid[valid[i][1]].style.backgroundColor = 'lightgreen';
                    grid[valid[i][2]].style.backgroundColor = 'lightgreen';
                    return;
                }
        }
        if(turn === 9)
        {
            result.innerText = 'Game Draw!!!';
        }
}
for(let i = 0;i<9;i++)
{
    grid[i].addEventListener('click',()=>{
        if(!wins)
        {
            mark(i);
        }
        
    })
}