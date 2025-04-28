
let intervalID;
let isPaused = false;

function ascender() {
    let counter = document.getElementById('counter');
    let zero = Number(counter.textContent);
    zero++
    counter.textContent = zero;
}

function plus() {
    const add = document.getElementById('plus');
    let counter = document.getElementById('counter');

    add.addEventListener('click', () => {
        let num = Number(counter.textContent);
        num++;
        counter.textContent = num;
    })
}

function minus() {
    const sub = document.getElementById('minus');
    let counter = document.getElementById('counter');

    sub.addEventListener('click', () => {
        let num = Number(counter.textContent);
        num--;
        counter.textContent = num;
    })
}

function liked() {
    const heart = document.getElementById('heart');
    let counter = document.getElementById('counter');
    let TBD = {};


    heart.addEventListener('click', () => {
        let currentNum = Number(counter.textContent);

        if (TBD[currentNum]) {
            TBD[currentNum] += 1;
        } else {
            TBD[currentNum] = 1;
        }
        let existingLi = document.querySelector(`[data-num='${currentNum}']`);
        if (existingLi) {
            existingLi.textContent = `${currentNum} was liked ${TBD[currentNum]} times`;
        } else {
            const li = document.createElement('li');
            li.dataset.num = currentNum; 
            li.textContent = `${currentNum} was liked ${TBD[currentNum]} times`;
            document.querySelector('.likes').appendChild(li);
        }
    });
}

function startInterval() {
    intervalID = setInterval(ascender, 1000);
}

function pause() {
    let paused = document.querySelector('#pause');
    let btn = document.querySelectorAll('button');

    paused.addEventListener('click', () => {
       if(intervalID) {
        clearInterval(intervalID)
        btn.forEach((button) => {
            if (button.id === 'pause') {
                button.disabled = false;
            } else {
                button.disabled = true
            }
        })
        intervalID = null;
        paused.textContent = 'Resume';
        console.log('Paused')
       } else {
        startInterval();
        btn.forEach((button) => button.disabled = false)
        paused.textContent = 'Pause';
        console.log('resumed')
       }
    })
}

function buildEntry(entry) {
    const p = document.createElement('p');
    const li = document.createElement('li');

    p.textContent = `${entry}`
    li.style.listStyle = 'none';

    li.appendChild(p)
    document.querySelector('#list').appendChild(li)
}

function makeComment() {
    const form = document.querySelector('#comment-form');
    form.addEventListener('submit', (e) => {
        const input = document.querySelector('input') 
        e.preventDefault()
        buildEntry(input.value)
        form.reset();
    })
}

function initializer() {
    startInterval()
    pause()
    plus()
    minus()
    liked()
    makeComment()
}
addEventListener('DOMContentLoaded', () => initializer())