window.AudioContext = window.AudioContext || window.webkitAudioContext;
var ctx = null;
var osc = null;

let oscType = 'sine';
let octave = 1;

const keys = document.querySelectorAll('.key');
const startAudioButton = document.querySelector('.startAudio');
const sineWaveButton = document.querySelector('.sinewavetype');
const sawWaveButton = document.querySelector('.sawwavetype');
const octMinusOne = document.querySelector('.octminusone');
const octEven = document.querySelector('.octeven');
const octPlusOne = document.querySelector('.octplusone');

const freqs = {
    do: 261.626,
    dodiesis: 277.183,
    re: 293.665,
    rediesis: 311.127,
    mi: 329.628,
    fa: 349.228,
    fadiesis: 369.994,
    sol: 391.995,
    soldiesis: 415.305,
    la: 440.00,
    ladiesis: 466.164,
    si: 493.883,
    do1: 523.25,
}


function playSound(key) {
    if (osc === null) {
        osc = ctx.createOscillator();
    }

        osc.type = oscType;
        osc.frequency.value = freqs[key] * octave;
        osc.start(0);
        osc.connect(ctx.destination);
}

function stopSound(key) {
        if (osc !== null) {
            osc.stop(0);
            osc = null;
        }
    }

keys.forEach(function(el) {
    el.addEventListener('touchstart', function() {
        playSound(el.id);
    });

    el.addEventListener('mousedown', function() {
        playSound(el.id);
    });
});

keys.forEach(function(el) {
    el.addEventListener('touchend', function() {
        stopSound(el.id);
    });

    el.addEventListener('mouseup', function() {
        stopSound(el.id);
    });
});

startAudioButton.addEventListener('click', function() {
    if (ctx === null) {
       ctx = new AudioContext({latencyHint: 'interactive'});
       ctx.resume();
       startAudioButton.classList.add('started');
       startAudioButton.textContent = ('____OK____ ');
    }
});

sineWaveButton.addEventListener('click', function() {
    oscType = 'sine';

    sineWaveButton.querySelector('img').classList.add('selected');
    sineWaveButton.querySelector('img').classList.remove('unselected');

    sawWaveButton.querySelector('img').classList.add('unselected');
    sawWaveButton.querySelector('img').classList.remove('selected');
});

sawWaveButton.addEventListener('click', function() {
    oscType = 'sawtooth';

    sawWaveButton.querySelector('img').classList.add('selected');
    sawWaveButton.querySelector('img').classList.remove('unselected');

    sineWaveButton.querySelector('img').classList.add('unselected');
    sineWaveButton.querySelector('img').classList.remove('selected');
});

octMinusOne.addEventListener('click', function() {
    octave = Math.max(0.125, octave * 0.5);
});

octEven.addEventListener('click', function() {
    octave = 1;
});

octPlusOne.addEventListener('click', function() {
    octave = Math.min(8, octave * 2);
});

