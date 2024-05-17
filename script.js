/*Раздел - начало*/
var made = true;
var pauseWind = document.querySelector("#pauseWind");
pauseWind.close();
if (localStorage.getItem("conf") == "true") {
    document.location.href = "index.html";
    localStorage.setItem("conf", "false");
}
var int = false; //Переменная для того, чтобы функция funct выполнялась один раз при загрузке страницы 
document.querySelector('#play').addEventListener('click', funct)
function funct() {
    if (int === false) {
        int = true;
        //Стили
        var playButt = document.querySelector("#play");
        var flex_1 = document.querySelector(".flex");
        var pauseButt_1 = document.querySelector('#pause');
        var pauseMenu_1 = document.querySelector('#pauseWind');
        var closeButt_1 = document.querySelector("#close");
        playButt.style.cssText = "opacity: 0";
        flex_1.style.cssText = "opacity: 1";
        pauseButt_1.style.cssText = "opacity: 1";
        pauseMenu_1.style.cssText = "opacity: 1";
        //Получение канваса и ctx
        var canvs = document.querySelector('#canvas');
        var ctx_1 = canvs.getContext("2d");
        canvs.style.bottom = String(0);
        var isAsert_1 = 0;
        //Создание переменных для подсчёта очков, лучшего результата и скорости машины
        var animCadr_1 = 0.1;
        var score_1 = 0;
        var mainScore_1 = localStorage.getItem("best");
        //Выведение счёта на экран
        var scoreEl_1 = document.querySelector('#score');
        scoreEl_1.innerHTML = "Счёт: " + score_1;
        //Объявление переменных, в которых хранятся картинки и аудиофайлы
        var backround_1 = new Image();
        var car_1 = new Image();
        var zabor = new Image();
        var zabor_2 = new Image();
        var stone = new Image();
        var spike = new Image();
        var darkstone = new Image();
        var tree = new Image();
        var breakcar_1 = new Audio();
        var rotate_1 = new Audio();
        var run_1 = new Audio();
        var scored_1 = new Audio();
        var bib_1 = new Audio();
        var m = localStorage.getItem("m");
        var sRc = "img/car.png";
        if (m == 'false') {
            sRc = localStorage.getItem("car");
        }
        //Рандом препятствий
        var barriers_1 = [zabor, zabor_2, stone, spike, darkstone, tree];
        var randBarr_1;
        var rand_1 = barriers_1[Math.floor(Math.random() * 6)];
        setInterval(function () {
            if (isAsert_1 % 2 == 0) {
                randBarr_1 = barriers_1[Math.floor(Math.random() * 6)];
            }
        }, 10);
        //Объявления пути для файлов игры
        backround_1.src = "img/back.png";
        car_1.src = sRc;
        zabor.src = "img/zabor.png";
        zabor_2.src = "img/zabor_2.png";
        stone.src = "img/stone.png";
        spike.src = "img/spike.png";
        darkstone.src = "img/darkstone.png";
        tree.src = "img/tree.png";
        breakcar_1.src = "audio/breack.mp3";
        run_1.src = "audio/run.mp3";
        rotate_1.src = "audio/rotate.mp3";
        scored_1.src = "audio/scored.mp3";
        bib_1.src = "audio/bib.mp3";
        //Проигрывание звука гуда машины
        run_1.volume = 1;
        run_1.play();
        setInterval(function () {
            run_1.volume = 0.8;
            run_1.play();
        }, 500);
        //Создание класса, на основе которого будут описанны координаты всех игровых объектов
        var GameObject = /** @class */ (function () {
            function GameObject(x, y, name) {
                this.x = x;
                this.y = y;
                this.name = name;
            }
            Object.defineProperty(GameObject.prototype, "info", {
                get: function () {
                    return this.name + " - игровой объект";
                },
                set: function (value) {
                    console.error('Невозможно изменить данные игрового объекта. Вы изменили ' + value);
                },
                enumerable: false,
                configurable: true
            });
            return GameObject;
        }());
        //Для рандомизации появления препятствий
        var xPos_1 = [137, 110, 164].reverse();
        var xPos2 = [110, 136, 164];
        //Создание объектов на основе класса, на основе которого будут описанны их координаты 
        var barrier_1 = new GameObject(xPos_1[Math.floor(Math.random() * 3)], 20, 'barrier');
        var barrier_2_1 = new GameObject(xPos2[Math.floor(Math.random() * 3)], 20, 'barrier_2');
        var carObj_1 = new GameObject(137, 110, 'car');
        var back_1 = new GameObject(100, 0, 'backround');
        var back_2_1 = new GameObject(100, 0, 'backround');
        //Прорисовка всех картинок 
        var game_1 = setInterval(function () {
            ctx_1.drawImage(backround_1, back_1.x, back_1.y, 100, 150);
            ctx_1.drawImage(backround_1, back_2_1.x, back_2_1.y, 100, 150);
            ctx_1.drawImage(car_1, carObj_1.x, carObj_1.y, 25, 40);
            ctx_1.drawImage(rand_1, barrier_1.x, barrier_1.y, 25, 20);
            ctx_1.drawImage(rand_1, barrier_2_1.x, barrier_2_1.y, 25, 20);
            //Если препятствие проехали, то появляется новое
            if (barrier_1.y > 144) {
                barrier_1.x = xPos_1[Math.floor(Math.random() * 3)];
                barrier_1.y = 20;
                barrier_2_1.y = 20;
                scored_1.play();
                isAsert_1++;
                rand_1 = randBarr_1;
                score_1++;
                localStorage.setItem("yesteday", String(score_1));
                scoreEl_1.innerHTML = "Счёт: " + score_1;
            }
        }, 1);
        /*Раздел - механика игры*/
        // Для иметации движения машины
        var backAnim_1 = setInterval(function () {
            back_2_1.y += 30;
            setTimeout(function () {
                back_2_1.y -= 30;
            });
        }, 1);
        var barr_1 = setInterval(function () {
            barrier_1.y += animCadr_1;
            barrier_2_1.y += animCadr_1;
            if (score_1 % 10 === 0) {
                //Увеличение скорости по мере роста счёта.
                animCadr_1 += 0.002;
            }
            localStorage.setItem("speed", String(animCadr_1));
            if (score_1 > Number(mainScore_1) || Number(localStorage.getItem("yesteday")) < score_1) {
                mainScore_1 = score_1;
                localStorage.setItem("best", String(mainScore_1));
            }
        }, 10);
        //Добавление управления
        document.addEventListener('keydown', key);
        function key(e) {
            if (e.keyCode == 37 || e.keyCode == 65) {
                //влево
                rotate_1.play();
                carObj_1.x -= 27;
                if (carObj_1.x !== 110 && carObj_1.x !== 137) {
                    gameOver();
                }
            }
            if (e.keyCode == 39 || e.keyCode == 68) {
                //вправо
                rotate_1.play();
                carObj_1.x += 27;
                if (carObj_1.x !== 137 && carObj_1.x !== 164) {
                    gameOver();
                }
            }
            if (e.keyCode == 69) {
                bib_1.play();
            }
            if (e.keyCode == 27) {
                run_1.pause();
                pause();
            }
            if (e.keyCode == 82) {
                run_1.pause();
                var config = confirm("Хотите отредактировать машину? Игра перезапустится!");
                if (config === true) {
                    document.location.href = "redact.html";
                }
                else {
                    console.log("Возвращение в игру");
                }
            }
        }
        //Функция для определения умер игрок или нет
        var findDead_1 = setInterval(function () {
            if (carObj_1.x === 110 && barrier_1.x === 110 && barrier_1.y >= 92) {
                gameOver();
            }
            if (carObj_1.x == 137 && barrier_1.x === 137 && barrier_1.y >= 92) {
                gameOver();
            }
            if (carObj_1.x == 164 && barrier_1.x === 164 && barrier_1.y >= 92) {
                gameOver();
            }
            if (carObj_1.x === 110 && barrier_2_1.x === 110 && barrier_2_1.y >= 92) {
                gameOver();
            }
            if (carObj_1.x === 137 && barrier_2_1.x === 137 && barrier_2_1.y >= 92) {
                gameOver();
            }
            if (carObj_1.x === 164 && barrier_2_1.x === 164 && barrier_2_1.y >= 92) {
                gameOver();
            }
        }, 0.1);
        //Функция окончания игры
        function gameOver() {
            clearInterval(backAnim_1);
            run_1.pause();
            rotate_1.pause();
            breakcar_1.play();
            clearInterval(game_1);
            clearInterval(findDead_1);
            localStorage.setItem("yesteday", String(score_1));
            var conf = window.confirm("Вы проиграли! Переходите в главное меню?");
            localStorage.setItem("conf", String(conf));
            document.location.reload();
        }
        //Управление для телефонов
        var leftB = document.querySelector('#left');
        var rightB = document.querySelector('#right');
        var bibB = document.querySelector('#bib');
        var pauseB = document.querySelector('#pause');
        leftB.addEventListener('click', left);
        rightB.addEventListener('click', right);
        bibB.addEventListener('click', bibo);
        pauseB.addEventListener('click', pause);
        //Поворот влево
        function left() {
            rotate_1.play();
            carObj_1.x -= 27;
            if (carObj_1.x !== 110 && carObj_1.x !== 137) {
                gameOver();
            }
        }
        //Поворот вправо
        function right() {
            rotate_1.play();
            carObj_1.x += 27;
            if (carObj_1.x !== 137 && carObj_1.x !== 164) {
                gameOver();
            }
        }
        //Гудок
        function bibo() {
            bib_1.play();
        }
        //Поставить игру на паузу
        function pause() {
            flex_1.style.cssText = "opacity: 0";
            pauseButt_1.style.cssText = "opacity: 0";
            run_1.pause();
            pauseMenu_1.show();
            pauseMenu_1.style.cssText = "opacity: 1";
            clearInterval(barr_1);
            setTimeout(function () {
                pauseMenu_1.close();
                if (made) {
                    setInterval(function () {
                        barrier_1.y += animCadr_1;
                        barrier_2_1.y += animCadr_1;
                        if (score_1 % 10 === 0) {
                            //Увеличение скорости по мере роста счёта.
                            animCadr_1 += 0.002;
                            localStorage.setItem("speed", String(animCadr_1));
                        }
                        if (score_1 > Number(mainScore_1) || Number(localStorage.getItem("yesteday")) < score_1) {
                            mainScore_1 = score_1;
                            localStorage.setItem("best", String(mainScore_1));
                        }
                    }, 10);
                    made = false;
                    flex_1.style.cssText = "opacity: 1";
                    pauseButt_1.style.cssText = "opacity: 1";
                }
            }, 3000);
            closeButt_1.addEventListener('click', function () {
                pauseMenu_1.close();
            });
        }
    }
}
