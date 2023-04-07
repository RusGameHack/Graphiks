let primeri = document.querySelectorAll('.blockOutput'),
    znInput = document.querySelector('.znIn'),
    chInput = document.querySelector('.chIn'),
    activeIn = '';

//Выбор поля для формул
znInput.addEventListener('click', (e)=>{
    clickPole(e.target);
});
chInput.addEventListener('click', (e)=>{
    clickPole(e.target);
});
const clickPole = (block) =>{
    block.classList.add('active');
    if(block.classList.contains('znIn')){chInput.classList.remove('active');} else {znInput.classList.remove('active');}
    activeIn = block;
}

//Ввод формул в поле
primeri.forEach(primer => {
    primer.addEventListener('click', ()=>{
        console.log('click')
        if(activeIn==""){
            document.querySelector('.error').innerHTML = 'Пожалуста, выберите числитель, либо знаменатель';
            return 0;
        }
        else {
            document.querySelector('.error').innerHTML = '';
            activeIn.innerHTML += `<div class="${primer.id}">(${primer.innerHTML})</div>`;
        }
    });
});

//Удаление формулы
document.querySelector('.ClearCh').addEventListener('click', ()=>{
    chInput.classList.remove('active');
    chInput.innerHTML = '';
});
document.querySelector('.ClearZn').addEventListener('click', ()=>{
    znInput.classList.remove('active');
    znInput.innerHTML = '';
});