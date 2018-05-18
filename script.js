const breakTimeEl = document.querySelector('.break-time');
const sessionTimeEl = document.querySelector('.session-time');
const addBreak = document.querySelector('.break-plus');
const subBreak = document.querySelector('.break-minus');
const addSession = document.querySelector('.session-plus');
const subSession = document.querySelector('.session-minus');
const pomodoro = document.querySelector('.pomodoro');
const timeRemainingEl = document.querySelector('.time-left');
const clockTitle = document.querySelector('.clock-title');
const alarm = document.querySelector('audio');

var timeOutID;


let breakTime = Number(breakTimeEl.innerText);
let sessionTime = Number(sessionTimeEl.innerText);
let paused = true;
let onBreak = false;
let timeRemaining = toSeconds(timeRemainingEl.innerText);

// ============================
// Interval and clear Functions
// ============================

function countDown(){
	if(timeRemaining <= 0 && onBreak){
		alarm.play();
		onBreak = !onBreak;
		clockTitle.innerText = 'Session';
		timeRemaining = toSeconds(String(sessionTime));
	}
	if(timeRemaining <= 0 && !onBreak){
		alarm.play();
		onBreak = true;
		clockTitle.innerText = 'Break!';
		timeRemaining = toSeconds(String(breakTime));
	}
	timeRemaining--;
	timeRemainingEl.innerText = toTime(timeRemaining);
}

function pause(){
	clearInterval(timeOutID);
}

// ==============
// Time Fomatting
// ==============

function toSeconds(time){
	if(time.indexOf(':') === -1) return time*60;
	return Number(time.slice(0, time.indexOf(':'))) * 60;
}

function toTime(seconds){
	let mins = Math.floor(seconds/60);
	let secs = seconds % 60;
	if(String(secs).length === 1) secs = `0${secs}`
	return `${mins}:${secs}`;
}

// ===============
// Button Handlers
// ===============

addBreak.addEventListener('click', () =>{
	if(paused){
		breakTime++;
		breakTimeEl.innerText = String(breakTime);
		if(onBreak){
			timeRemaining = toSeconds(String(breakTime));
			timeRemainingEl.innerText =  toTime(timeRemaining);
		}
	}
});

subBreak.addEventListener('click', () =>{
	if(paused){
		if(breakTime > 1) breakTime--;
		breakTimeEl.innerText = String(breakTime);
		if(onBreak) {
			timeRemaining = toSeconds(String(breakTime));
			timeRemainingEl.innerText =  toTime(timeRemaining);
		}
	}
});

addSession.addEventListener('click', () =>{
	if(paused){
		sessionTime++;
		sessionTimeEl.innerText = String(sessionTime);
		timeRemaining = toSeconds(String(sessionTime));
		timeRemainingEl.innerText =  toTime(timeRemaining);
	}
});

subSession.addEventListener('click', () =>{
	if(paused){
		if(sessionTime > 1) sessionTime--;
		sessionTimeEl.innerText = String(sessionTime);
		timeRemaining = toSeconds(String(sessionTime));
		timeRemainingEl.innerText =  toTime(timeRemaining);
	}
});

pomodoro.addEventListener('click', () =>{
	if(paused){
		timeOutID = setInterval(countDown, 1000);
		console.log(timeOutID);
	}
	else{
		console.log("Pausing");
		pause();
	}
	paused = !paused;
	console.log(paused);
});


