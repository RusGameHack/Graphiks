const startGraph = document.querySelector('.btnDoIt');
startGraph.addEventListener('click', () => {
    //Легкая валидация
    if (document.querySelector('.chIn').innerHTML == '' || document.querySelector('.znIn').innerHTML == '') {
        let errorBlock = document.querySelector('.error')
        if (document.querySelector('.chIn').innerHTML == '' && document.querySelector('.znIn').innerHTML == '') {
            errorBlock.innerHTML = 'Введите формулу и в числитель, и в знаменатель';
        } else {
            if (document.querySelector('.chIn').innerHTML == '') {
                errorBlock.innerHTML = 'Введите формулу в числитель';
            } else {
                errorBlock.innerHTML = 'Введите формулу в знаменатель';
            }
        }
    }
    //Исполнение
    else {
        document.querySelectorAll('.onlyInWorkingForm').forEach(block => {
            block.classList.add('active');
        });

        const P = Math.PI; //Значение Pi
        var mass = [
            // # 1    K       P           "Tp + 1",                 "Tp - 1",                 "1 - Tp"
            ["1", "k", "p", "a", "b", "c"],
            ["1", "K", "jw", "(Twj + 1)", "(Twj - 1)", "(1 - Twj)"],
            ["1", "K", "w", "((1 + T*T*w*w)**0.5)", "((1 + T*T*w*w)**0.5)", "((1 + T*T*w*w)**0.5)"],
            ["0", "0", "Pi/2", "arctg(T*w)", "(Pi - arctg(T*w))", "- arctg(T*w)"]
        ]

        //Устанавливаем числитель и знаменатель
        let chislitel = [],
            znamenatel = [];
        document.querySelectorAll('.chIn div').forEach(element => {
            chislitel.push(element.classList[0]);
        });
        document.querySelectorAll('.znIn div').forEach(element => {
            znamenatel.push(element.classList[0]);
        });
        console.log(`Числитель: ${chislitel}, знаменатель: ${znamenatel}`);



        let chBlock = [document.querySelector('#chislitel'), document.querySelector('#chislitel2'), document.querySelector('#chislitel3')];
        let znBlock = [document.querySelector('#znamenatel'), document.querySelector('#znamenatel2'), document.querySelector('#znamenatel3')];
        let ch = 0;
        chBlock.forEach(element => {
            element.innerHTML = '';
        });
        znBlock.forEach(element => {
            element.innerHTML = '';
        });
        chislitel.forEach(element => {
            for (let i = 0; i < mass[0].length; i++) {
                if (element == mass[0][i]) {
                    for (let j = 0; j < chBlock.length; j++) {
                        if (ch > 0) {
                            chBlock[j].innerHTML += `*${mass[j + 1][i]}`;
                        } else {
                            chBlock[j].innerHTML += mass[j + 1][i];
                        }
                    }
                }
            }
            ch++;
        });
        ch = 0;
        znamenatel.forEach(element => {
            console.log(`Числитель №${ch}`)
            // debugger;

            for (let i = 0; i < mass[0].length; i++) {
                if (element == mass[0][i]) {
                    for (let j = 0; j < znBlock.length; j++) {
                        if (ch > 0) {
                            znBlock[j].innerHTML += `*${mass[j + 1][i]}`;
                        } else {
                            znBlock[j].innerHTML += mass[j + 1][i];
                        }
                    }
                }
            }
            ch++;
        });
        //АЧХ 
        var ACH = `(${document.querySelector('#chislitel2').innerHTML})`;
        ACH += ` / (${document.querySelector('#znamenatel2').innerHTML})`;
        ACH = ACH.replace(/P/g, '');
        ACH = ACH.replace(/K/g, '1');
        ACH = ACH.replace(/T\*/g, '');
        ACH = ACH.replace(/w/g, 'x');
        ACH = ACH.replace(/x\(/g, 'x*(');
        // ACH = ACH.replace(/\(-/g, '(');
        // ACH = ACH.replace(/\(+/g, '(');
        ACH = ACH.replace(/\)\(/g, ')*(');
        console.log(ACH);

        // ФЧХ
        var FCH = `(${document.querySelector('#chislitel3').innerHTML})`;
        FCH += ` - (${document.querySelector('#znamenatel3').innerHTML})`;
        FCH = FCH.replace(/\//g, '-');
        FCH = FCH.replace(/j/g, '');
        FCH = FCH.replace(/0/g, '0');
        FCH = FCH.replace(/arctg/g, 'Math.atan');
        FCH = FCH.replace(/Pi/g, '');
        FCH = FCH.replace(/T/g, '');
        FCH = FCH.replace(/\*/g, '+');
        FCH = FCH.replace(/w/g, 'x');
        FCH = FCH.replace(/x\(/g, 'x*(');
        // FCH = FCH.replace(/\(-/g, '(');
        // FCH = FCH.replace(/\(+/g, '(');
        FCH = FCH.replace(/\)\(/g, ')*(');
        console.log(FCH);

        Diagram();
        Diagram2();
        Diagram3();

        function Diagram() {
            var ctx = document.getElementById("myChart");
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [], //Подписи оси x
                    datasets: [{
                            label: 'АЧХ Отрицательный', //Метка
                            data: [], //Данные
                            borderColor: 'red', //Цвет
                            borderWidth: 2, //Толщина линии
                            fill: false //Не заполнять под графиком
                        },
                        {
                            label: 'АЧХ положительный', //Метка
                            data: [], //Данные
                            borderColor: 'blue', //Цвет
                            borderWidth: 2, //Толщина линии
                            fill: false //Не заполнять под графиком
                        }
                    ],
                },
                options: {
                    responsive: false, //Вписывать в размер canvas
                    scales: {
                        xAxes: [{
                            display: true,
                            stepSize: P / 2,
                        min: 0,
                        max: 2 * P
                        }],
                        yAxes: [{
                            ticks: {
                                fixedStepSize: 0.1,
                                suggestedMin: null,
                                suggestedMax: null,
                            },
                            display: true
                        }],
                    }
                }
            });
            //Заполняем данными
            for(var x = -2 * P; x <= 2 * P; x += P / 2){
                myChart.data.labels.push('' + x.toFixed(2));  
            }
            for (var XX = -2 * P; XX <= 0; XX += P / 2) {
                console.log(`f(x): ${f(XX)}`)
                if (f(XX) == 100 || f(XX) == 100) {
                    console.log('Остановили');
                } else {
                    let YY = f(XX);
                    if(YY < 0){
                        YY = YY*(-1)
                    }
                    myChart.data.datasets[0].data.push(
                        {
                            x: XX, 
                            y: YY.toFixed(2) 
                        }
                    );
                    myChart.data.datasets[1].data.push(
                        {
                            x: null, 
                            y: null,
                        }
                    );
                }
            }
            for (var XX = 0; XX <= 2 * P; XX += P / 2) {
                console.log(`f(x): ${f(x)}`)
                if (f(XX) == 100 || f(XX) == 100) {
                    console.log('Остановили');
                } else {
                    myChart.data.datasets[1].data.push(
                        {
                            x: XX, 
                            y: f(XX).toFixed(2) 
                        }
                    );
                }
            }
            //Обновляем
            myChart.update();

            function f(x) { //Вычисление нужной функции
                if (eval(ACH) > 100) {
                    // console.log(100)
                    return eval(100);
                } else if (eval(ACH) < -100) {
                    // console.log(-100)
                    return eval(-100);
                } else {
                    // console.log(eval(ACH))
                    return eval(ACH);
                }
            }
        }

        function Diagram2() {
            var ctx = document.getElementById("myChart2");
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [], //Подписи оси x
                    datasets: [
                        {
                            label: 'ФЧХ отрицательное', //Метка
                            data: [], //Данные
                            borderColor: 'red', //Цвет
                            borderWidth: 2, //Толщина линии
                            fill: false //Не заполнять под графиком
                        },
                        {
                            label: 'ФЧХ положительное', //Метка
                            data: [], //Данные
                            borderColor: 'red', //Цвет
                            borderWidth: 2, //Толщина линии
                            fill: false //Не заполнять под графиком
                        }
                    ]
                },
                options: {
                    responsive: false, //Вписывать в размер canvas
                    scales: {
                        xAxes: [{
                            display: true
                        }],
                        yAxes: [{
                            ticks: {
                                min: -2 * P,
                                max: 2 * P,
                                suggestedMin: null,
                                suggestedMax: null,
                                fixedStepSize: 2
                            },
                            display: true
                        }]
                    }
                }
            });
            var labels = ['-6', '-5', '-4', '-3', '-2', '-1', '0', '1', '2', '3', '4', '5', '6'];
            //Заполняем данными
            for(var x = -2 * P; x <= 2 * P; x += P / 10){
                myChart.data.labels.push('' + x.toFixed(2));  
            }
            for (var XX = -2 * P; XX <= 0; XX += P / 10) {
                console.log(`f(x): ${f(XX)}`)
                if (f(XX) == 100 || f(XX) == 100) {
                    console.log('Остановили');
                } else {
                    let YY = f(XX);
                    myChart.data.datasets[0].data.push(
                        {
                            x: XX, 
                            y: YY.toFixed(2) 
                        }
                    );
                    myChart.data.datasets[1].data.push(
                        {
                            x: null, 
                            y: null,
                        }
                    );
                }
            }
            for (var XX = 0; XX <= 2 * P; XX += P / 2) {
                console.log(`f(x): ${f(x)}`)
                if (f(XX) == 100 || f(XX) == 100) {
                    console.log('Остановили');
                } else {
                    myChart.data.datasets[1].data.push(
                        {
                            x: XX, 
                            y: f(XX).toFixed(2) 
                        }
                    );
                }
            }
            myChart.update();

            function f(x) { //Вычисление нужной функции
                if (eval(FCH) > 100) {
                    // console.log(100)
                    return eval(100);
                } else if (eval(FCH) < -100) {
                    // console.log(-100)
                    return eval(-100);
                } else {
                    // console.log(eval(FCH))
                    return eval(FCH);
                }
            }
        }

        function Diagram3() {
            var ctx = document.getElementById("myChart3");
            var myChart = new Chart(ctx, {
                type: 'bubble',
                data: {
                    labels: [], //Подписи оси x
                    datasets: [{
                            label: 'Положительный', //Метка для аргумента
                            data: [], //Данные для аргумента
                            backgroundColor: "blue",
                            fill: false //Не заполнять под графиком
                        },
                        {
                            label: 'Отрицательный', //Метка для аргумента
                            data: [], //Данные для аргумента
                            // borderColor: 'red', //Цвет
                            pointBackgroundColor: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                            borderWidth: 2, //Толщина линии
                            fill: false //Не заполнять под графиком
                        }
                    ]
                },
                options: {
                    responsive: false, //Вписывать в размер canvas
                    scales: {
                        xAxes: [{
                            display: true
                        }],
                        yAxes: [{
                            ticks: {
                                fixedStepSize: 1.5
                            },
                            display: true
                        }]
                    }
                }
            });
            var labels = ['-2π', '-3π/2', '-π', '-π/2', '0', 'π/2', 'π', '3π/2', '2π'];
            var data = []; // массив точек
            for (var x = 0; x <= 20; x += .2) {
                var A = Number(eval(ACH));
                var phi = Number(eval(FCH));
                // console.log(`A: ${A}, Fi^ ${phi}`)
                let XX = A * Math.cos(phi);
                let YY = A * Math.sin(phi);
                // console.log(`X: ${XX}, Y: ${YY}`)
                myChart.data.labels.push(labels[((x + 2 * P) / (P / 2)).toFixed(0)]); //Добавляем соответствующую подпись на ось X
                if (XX < 100 && YY < 100 && XX > -100 && YY > -100) {
                    // console.log(`X: ${XX}, Y: ${YY}`)
                    if (x > 10) {
                        // console.log(myChart.getDatasetMeta(0).data[0])
                        for (let b = 10; b < myChart.data.datasets[0].data.length; b++) {
                            var meta = myChart.getDatasetMeta(0);
                            var bar = meta.data[b];
                            bar.custom = bar.custom || {};
                            bar.custom.backgroundColor = 'gold';
                            bar.custom.borderWidth = 0;
                        }
                    }
                }
                myChart.data.datasets[0].data.push({
                    x: XX,
                    y: YY
                });

            }
            let chet = 0;
            for (var x = -20; x <= 0; x += .2) {
                var A = Number(eval(ACH));
                var phi = Number(eval(FCH));
                // console.log(`A: ${A}, Fi^ ${phi}`)
                let XX = A * Math.cos(phi);
                let YY = A * Math.sin(phi);
                // console.log(`X: ${XX}, Y: ${YY}`)
                myChart.data.labels.push(labels[((x + 2 * P) / (P / 2)).toFixed(0)]); //Добавляем соответствующую подпись на ось X
                if (XX < 100 && YY < 100 && XX > -100 && YY > -100) {
                    // console.log(`X: ${XX}, Y: ${YY}`)
                    myChart.data.datasets[1].data.push({
                        x: XX,
                        y: YY
                    });
                    if (x > -10) {
                        // console.log(myChart.getDatasetMeta(1).data[0])
                        for (let b = 90; b < myChart.data.datasets[1].data.length; b++) {
                            var meta = myChart.getDatasetMeta(1);
                            var bar = meta.data[b];
                            bar.custom = bar.custom || {};
                            bar.custom.backgroundColor = 'green';
                            bar.custom.borderWidth = 0;
                        }
                    }
                }

                chet++;
            }
            myChart.update();
        }
    }
});
