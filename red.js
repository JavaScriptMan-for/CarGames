let i = 1;
setInterval(()=> {
    if(document.querySelector('#sel').value == "o_1") {
        localStorage.setItem("car","src/img/car.png" ) ;
        i = 1;
    }
    if(document.querySelector('#sel').value == "o_2") {
       localStorage.setItem("car","src/img/car_2.png" ) ;
       i = 2;
    }
    if(document.querySelector('#sel').value == "o_3") {
        localStorage.setItem("car","src/img/car_3.png" ) ;
        i = 3;
     }
     if(document.querySelector('#sel').value == "o_4") {
        localStorage.setItem("car","src/img/car_4.png" ) ;
        i = 4;
     }
     if(document.querySelector('#sel').value == "o_5") {
        localStorage.setItem("car","src/img/car_5.png" ) ;
        i = 5;
     }
     if(document.querySelector('#sel').value == "o_6") {
        localStorage.setItem("car","src/img/car_6.png" ) ;
        i = 6;
     }
     if(document.querySelector('#sel').value == "o_7") {
        localStorage.setItem("car","src/img/car_7.png" ) ;
        i = 7;
     }
     if(document.querySelector('#sel').value == "o_8") {
        localStorage.setItem("car","src/img/car_8.png" ) ;
        i = 8;
     }
     if(document.querySelector('#sel').value == "o_9") {
        localStorage.setItem("car","src/img/car_9.png" ) ;
        i = 9;
     }
},100)

const cnv = document.querySelector('canvas');
const ctx = cnv.getContext("2d");

const Car_1 = new Image();
const Car_2 = new Image();
const Car_3 = new Image();
const Car_4 = new Image();
const Car_5 = new Image();
const Car_6 = new Image();
const Car_7 = new Image();
const Car_8 = new Image();
const Car_9 = new Image();

Car_1.src = "src/img/car.png";
Car_2.src = "src/img/car_2.png";
Car_3.src = "src/img/car_3.png";
Car_4.src = "src/img/car_4.png";
Car_5.src = "src/img/car_5.png";
Car_6.src = "src/img/car_6.png";
Car_7.src = "src/img/car_7.png";
Car_8.src = "src/img/car_8.png";
Car_9.src = "src/img/car_9.png";

let im = Car_1;


setInterval(()=>{
    if(i === 1) {
        im = Car_1;
      localStorage.setItem("m", false)
    } else if(i === 2) {
        im = Car_2;
        localStorage.setItem("m", false)
    } else if(i === 3) {
        im = Car_3;
        localStorage.setItem("m", false)
    } else if(i === 4) {
        im = Car_4;
        localStorage.setItem("m", false)
    } else if(i === 5) {
        im = Car_5;
        localStorage.setItem("m", false)
    } else if( i === 6) {
        im = Car_6;
        localStorage.setItem("m", false)
    } else if( i === 7) {
        im = Car_7;
        localStorage.setItem("m", false)
    } else if( i === 8) {
        im = Car_8;
        localStorage.setItem("m", false)
    } else if( i === 9) {
        im = Car_9;
        localStorage.setItem("m", false)
    }

    ctx.fillStyle = "white";
    ctx.fillRect(0,0, cnv.width, cnv.height)
    ctx.drawImage(im, 0,0, 100, 100)
},1)
