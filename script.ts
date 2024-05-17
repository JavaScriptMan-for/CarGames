/*Раздел - начало*/ 
let made:boolean = true;
const pauseWind = document.querySelector("#pauseWind") as HTMLDialogElement 
pauseWind.close()
if(localStorage.getItem("conf") == "true") {
    document.location.href = "index.html";
    localStorage.setItem("conf", "false")
}
let int:boolean = false; //Переменная для того, чтобы функция funct выполнялась один раз при загрузке страницы 
function funct () {
    if(int === false) {
    int = true;
    //Стили
    const playButt = document.querySelector("#play") as HTMLButtonElement;
    const flex = document.querySelector(".flex") as HTMLElement
    const pauseButt = document.querySelector('#pause') as HTMLButtonElement
    const pauseMenu = document.querySelector('#pauseWind') as HTMLDialogElement
    const closeButt = document.querySelector("#close") as HTMLButtonElement

playButt.style.cssText = `opacity: 0`
flex.style.cssText = `opacity: 1`
pauseButt.style.cssText = `opacity: 1`
pauseMenu.style.cssText = `opacity: 1`
    //Получение канваса и ctx
const canvs = document.querySelector('#canvas') as HTMLCanvasElement;
const ctx = canvs.getContext("2d") as CanvasRenderingContext2D;
canvs.style.bottom = String(0);
let isAsert:number = 0;

//Создание переменных для подсчёта очков, лучшего результата и скорости машины

let animCadr:number = 0.1;
let score:number = 0;
let mainScore:string | null | number = localStorage.getItem("best");



//Выведение счёта на экран
const scoreEl = <HTMLElement> document.querySelector('#score') 
scoreEl.innerHTML = "Счёт: " + score;

//Объявление переменных, в которых хранятся картинки и аудиофайлы

const backround = new Image();
const car = new Image();
const zabor = new Image();
const zabor_2 = new Image();
const stone = new Image();
const spike = new Image();
const darkstone = new Image();
const tree = new Image();

const breakcar = new Audio();
const rotate = new Audio();
const run = new Audio();
const scored = new Audio();
const bib = new Audio();

let m:string | null = localStorage.getItem("m")
let sRc:any = "img/car.png";
if(m == 'false') {
    sRc = localStorage.getItem("car") 
}

//Рандом препятствий

let barriers:HTMLImageElement[] = [zabor,zabor_2,stone, spike, darkstone, tree];
let randBarr:any;
let rand = barriers[Math.floor(Math.random()*6)];
setInterval(()=>{
    if(isAsert % 2 == 0) {
        randBarr = barriers[Math.floor(Math.random()*6)];
    }
},10)

//Объявления пути для файлов игры

backround.src = "img/back.png";
car.src = sRc;
zabor.src = "img/zabor.png";
zabor_2.src = "img/zabor_2.png";
stone.src = "img/stone.png";
spike.src = "img/spike.png";
darkstone.src = "img/darkstone.png";
tree.src = "img/tree.png";

breakcar.src = "audio/breack.mp3";
run.src = "audio/run.mp3";
rotate.src = "audio/rotate.mp3";
scored.src = "audio/scored.mp3";
bib.src = "audio/bib.mp3";

//Проигрывание звука гуда машины

run.volume = 1;
run.play(); 
setInterval(()=> {
    run.volume = 0.8;
    run.play(); 
},500)

//Создание класса, на основе которого будут описанны координаты всех игровых объектов

class GameObject {
    public x;
    public y;
    public name;
    constructor(x:number,y:number,name:string) {
        this.x = x;
        this.y = y;
        this.name = name
    }
 get info () {
    return this.name + " - игровой объект"
 }
 set info (value) {
    console.error('Невозможно изменить данные игрового объекта. Вы изменили ' + value)
 }
}
//Для рандомизации появления препятствий

let xPos:number[] = [137,110,164].reverse();
let xPos2:number[] = [110,136,164];

//Создание объектов на основе класса, на основе которого будут описанны их координаты 

let barrier = new GameObject(xPos[Math.floor(Math.random()*3)],20,'barrier');
let barrier_2 = new GameObject(xPos2[Math.floor(Math.random()*3)],20,'barrier_2')
let carObj = new GameObject(137,110, 'car');
let back = new GameObject(100,0,'backround');
let back_2 = new GameObject(100,0,'backround');

//Прорисовка всех картинок 

let game = setInterval(()=>{
    ctx.drawImage(backround,back.x,back.y, 100, 150);
    ctx.drawImage(backround,back_2.x,back_2.y, 100, 150);
    ctx.drawImage(car, carObj.x,carObj.y, 25,40);
    ctx.drawImage(rand, barrier.x, barrier.y, 25,20);
    ctx.drawImage(rand,barrier_2.x,barrier_2.y,25,20);
    //Если препятствие проехали, то появляется новое
    if(barrier.y > 144) {
        barrier.x =  xPos[Math.floor(Math.random()*3)];
        barrier.y = 20;
        barrier_2.y = 20;
        scored.play();
        isAsert++
        rand = randBarr;
        score++;
        localStorage.setItem("yesteday", String(score))
       scoreEl.innerHTML = "Счёт: " + score;
    }
},1);

/*Раздел - механика игры*/
// Для иметации движения машины

    let backAnim = setInterval(()=>{
         back_2.y+=30;
         setTimeout(()=>{
             back_2.y-=30;
         })
     },1)


  

  let barr =  setInterval(()=>{
        barrier.y += animCadr;
        barrier_2.y += animCadr;
        if(score % 10 === 0) {
            //Увеличение скорости по мере роста счёта.
            animCadr += 0.002
        }
        localStorage.setItem("speed", String(animCadr))
        if(score > Number(mainScore) || Number(localStorage.getItem("yesteday")) < score) {
            mainScore = score;
            localStorage.setItem("best", String(mainScore))
        }
    },10);
    
    //Добавление управления

  document.addEventListener('keydown',key);
  function key(e:KeyboardEvent) {
    if(e.keyCode == 37 || e.keyCode == 65) {
            //влево
            rotate.play()
            carObj.x -= 27;
        if(carObj.x !== 110 && carObj.x !== 137 ) {gameOver()}
    }
    if(e.keyCode == 39 || e.keyCode == 68) {
        //вправо
        rotate.play()
        carObj.x += 27;
        if( carObj.x !== 137 && carObj.x !== 164) {gameOver()}
    }
    if(e.keyCode == 69) {
        bib.play()
    }
    if(e.keyCode == 27) {
        run.pause();
        pause()
    }
    if(e.keyCode == 82) {
        run.pause();
        let config = confirm("Хотите отредактировать машину? Игра перезапустится!");
        if(config === true) {
            document.location.href = "redact.html";
        } else {
            console.log("Возвращение в игру")
        }
    }
  }

  //Функция для определения умер игрок или нет

let findDead = setInterval(()=>{
    if(carObj.x === 110 && barrier.x === 110 && barrier.y >= 92) {
        gameOver();
    }
    if(carObj.x == 137 && barrier.x === 137 && barrier.y >= 92) {
        gameOver();
    }
    if(carObj.x == 164 && barrier.x === 164 && barrier.y >= 92) {
        gameOver();
    }
    if(carObj.x === 110 && barrier_2.x === 110 && barrier_2.y >= 92) {
        gameOver();
    }
    if(carObj.x === 137 && barrier_2.x === 137 && barrier_2.y >= 92) {
        gameOver();
    }
    if(carObj.x === 164 && barrier_2.x === 164 && barrier_2.y >= 92) {
        gameOver();
    }
},0.1)

    //Функция окончания игры

  function gameOver() {
    clearInterval(backAnim)
    run.pause();
    rotate.pause();
    breakcar.play();
    clearInterval(game);
    clearInterval(findDead);
    localStorage.setItem("yesteday", String(score));
   let conf =  window.confirm("Вы проиграли! Переходите в главное меню?");
   localStorage.setItem("conf", String(conf));
    document.location.reload();
  }

    //Управление для телефонов
  const leftB =  document.querySelector('#left') as HTMLImageElement;
  const rightB = document.querySelector('#right') as HTMLImageElement;
  const bibB =  document.querySelector('#bib') as HTMLImageElement;
  const pauseB = document.querySelector('#pause') as HTMLImageElement;
    leftB.addEventListener('click', left);
    rightB.addEventListener('click', right);
    bibB.addEventListener('click', bibo);
    pauseB.addEventListener('click', pause);
    //Поворот влево
    function left() {
        rotate.play()
        carObj.x -= 27;
    if(carObj.x !== 110 && carObj.x !== 137 ) {gameOver()}
      }
      //Поворот вправо
      function right () {
        rotate.play();
        carObj.x += 27;
        if( carObj.x !== 137 && carObj.x !== 164) {gameOver()}
      }
      //Гудок
      function bibo() {
        bib.play();
      }
      //Поставить игру на паузу
     function pause() {
        flex.style.cssText = `opacity: 0`
        pauseButt.style.cssText = `opacity: 0`
        run.pause() 
        
         pauseMenu.show();
        pauseMenu.style.cssText = `opacity: 1`
       clearInterval(barr)
       
        setTimeout(() => {
          pauseMenu.close();
          if(made) {
            setInterval(()=>{
                barrier.y += animCadr;
                barrier_2.y += animCadr;
                if(score % 10 === 0) {
                    //Увеличение скорости по мере роста счёта.
                    animCadr += 0.002
                    localStorage.setItem("speed", String(animCadr))
                }
                if(score > Number(mainScore) || Number(localStorage.getItem("yesteday")) < score) {
                    mainScore = score;
                    localStorage.setItem("best",String(mainScore))
                }
            },10);
            made = false
            flex.style.cssText = `opacity: 1`
            pauseButt.style.cssText = `opacity: 1`
          }
       }, 3000); 

       closeButt.addEventListener('click', ()=>{
            pauseMenu.close();
       })
    
            
           
        
           
       
          
      }
   }
    }
