let modebut = document.querySelector(".mode");
let modeval = 'light';
let submode = document.querySelectorAll('.submode');
let modeChange = () =>
{
    if(modeval === 'light')
    {
        document.body.setAttribute("class",'dark');
        modebut.classList.add('dark');
        modebut.classList.remove('light');
        submode[0].classList.add('dark');
        submode[0].classList.remove('light');
        submode[1].classList.add('light');
        submode[1].classList.remove('dark');
        modeval = 'dark';
    }
    else
    {
        document.body.setAttribute("class",'light');
        modebut.classList.add('light');
        modebut.classList.remove('dark');
        submode[0].classList.add('light');
        submode[0].classList.remove('dark');
        submode[1].classList.add('dark');
        submode[1].classList.remove('light');
        modeval = 'light';
    }
}
modebut.addEventListener('click',modeChange);


// <div class="mode">
//       <div class="submode light"></div>
//       <div class="submode dark"></div>
//     </div>
//     <h2>Hello I am a sample text...</h2>

setInterval(()=>
{
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('portrait').catch(function(error) {
            console.error('Orientation lock failed: ', error);
        });
    } else {
        console.warn('Orientation lock not supported on this device.');
    }
    
},100);