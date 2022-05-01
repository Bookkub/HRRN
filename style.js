let form;
let algo;
let arrival;
let burst;
let sumBurst = 0;
let names = [];
let completed = [];
let waitingTime = [];
let TurnAroundTime = [];
let avgtt = 0;
let avgwt = 0;
let comTime = [];
let show;
let rt;
let timequan = 0;
let count = [];
let Recent_Run_Time = [];
const select = document.getElementsByTagName('select')[0];
select.onchange = function () {
  if (select.value === 'Pre') {
    const quan = document.getElementById('quantum');
    quan.classList.toggle('hidden_1');
  } else {
    const quan = document.getElementById('quantum');
    quan.classList.toggle('hidden_1');
  }
};
function Name() {
  // let x = document.querySelector('tbody');
  // x.innerHTML = "";
  names = [];
  completed = [];
  waitingTime = [];
  TurnAroundTime = [];
  comTime = [];
  sumBurst = 0;
  avgtt = 0;
  avgwt = 0;
  arrivalLength = 0;
  burstLength = 0;
  rt = [];
  Recent_Run_Time = [];
  document.querySelectorAll('tbody tr').forEach((e) => e.remove());
  document.querySelectorAll('.avg h6').forEach((e) => e.remove());
  show = document.querySelector('.hidden');
  show.classList.add('hidden');
  form = document.getElementById('form');
  algo = form.elements['algorithm'].value;
  arrival = form.elements['arrival'].value.trim();
  burst = form.elements['burst'].value.trim();
  if (arrival == '' || burst == '') {
    alert('You need to input something');
    return;
  }
  arrival = arrival.split(' ').map(Number);
  rt = burst.split(' ').map(Number);
  burst = burst.split(' ').map(Number);
  if (arrival.length !== burst.length) {
    alert('Length is not equal');
    return;
  }
  for (let i = 0; i < arrival.length; i++) {
    names[i] = (i + 1);
    completed[i] = 0;
    sumBurst += burst[i];
    count[i] = 0;
  }
  for (let i = 0; i < arrival.length; i++) {
    for (let j = i + 1; j < arrival.length; j++) {
      if (arrival[i] > arrival[j]) {
        let tempA = arrival[i];
        arrival[i] = arrival[j];
        arrival[j] = tempA;
        let tempB = burst[i];
        burst[i] = burst[j];
        burst[j] = tempB;
        let tempC = rt[i];
        rt[i] = rt[j];
        rt[j] = tempC;
        let tempD = names[i];
        names[i] = names[j];
        names[j] = tempD;
      }
    }
    Recent_Run_Time[i] = arrival[i];
  }
  if (algo === 'Non-Pre') {
    const flexcontainer = document.querySelector('.flex-container');
    const box = document.querySelector('.box');
    const boxL = document.createElement('p');
    boxL.classList.add('box--left');
    boxL.textContent = arrival[0];
    box.appendChild(boxL);
    console.log(arrival[0]);
    for (let t = arrival[0]; t < sumBurst; ) {
      let hrr = -9999.0;
      let temp;
      let locs;
      for (let i = 0; i < arrival.length; i++) {
        if (arrival[i] <= t && completed[i] !== 1) {
          temp = (t - arrival[i] + burst[i]) / burst[i];
          if (hrr < temp) {
            hrr = temp;
            locs = i;
          }
        }
      }
      const process = document.createElement('div');
      process.textContent = 'P'+names[locs];
      process.style.fontWeight = '700';
      flexcontainer.appendChild(process);
      const boxR = document.createElement('p');
      boxR.classList.add('box--right');
      t += burst[locs];
      boxR.textContent = t;
      box.appendChild(boxR);
      waitingTime[locs] = t - arrival[locs] - burst[locs];
      TurnAroundTime[locs] = t - arrival[locs];
      comTime[locs] = t;
      avgtt += TurnAroundTime[locs];
      completed[locs] = 1;
      avgwt += waitingTime[locs];
      console.log(t);
    }
    for (let i = 0; i < arrival.length; i++) {
      const info = document.createElement('tr');
      const info1 = document.createElement('td');
      const info2 = document.createElement('td');
      const info3 = document.createElement('td');
      const info4 = document.createElement('td');
      const info5 = document.createElement('td');
      const info6 = document.createElement('td');
      info1.textContent = 'Process '+ names[i];
      info2.textContent = arrival[i];
      info3.textContent = burst[i];
      info4.textContent = comTime[i];
      info5.textContent = TurnAroundTime[i];
      info6.textContent = waitingTime[i];
      info.appendChild(info1);
      info.appendChild(info2);
      info.appendChild(info3);
      info.appendChild(info4);
      info.appendChild(info5);
      info.appendChild(info6);
      const display = document.querySelector('tbody');
      display.appendChild(info);
    }
    show.classList.remove('hidden');
    const reset = document.querySelector('#reset');
    reset.addEventListener('click', Reset);
    document.getElementById('submit').disabled = true;
    const tt = document.createElement('h6');
    const wt = document.createElement('h6');
    const sum = document.querySelector('.avg');
    if (arrival !== '' || burst !== '') {
      tt.textContent = 'TurnAround Avg. Time : ' + avgtt / arrival.length;
      sum.appendChild(tt);
      wt.textContent = 'Waiting Avg. Time : ' + avgwt / arrival.length;
      sum.appendChild(wt);
    }
  } else if (algo === 'Pre') {
    const flexcontainer = document.querySelector('.flex-container');
    const box = document.querySelector('.box');
    const boxL = document.createElement('p');
    boxL.classList.add('box--left');
    boxL.textContent = arrival[0];
    box.appendChild(boxL);
    timequan = parseInt(form.elements['hey'].value.trim());
    for (let t = arrival[0]; t <= sumBurst; ) {
      // Set lower limit to response ratio
      let hrr = -9999;

      // Response Ratio Variable
      let temp = 0;

      // Variable to store next process selected
      let loc;
      let nub = 0;
      let x = true;
      for (let i = 0; i < arrival.length; i++) {
        // Checking if process has arrived and is Incomplete
        if (arrival[i] <= t && completed[i] !== 1) {
          // Calculating Response Ratio
          temp = (rt[i] + (t - Recent_Run_Time[i])) / rt[i];

          // Checking for Highest Response Ratio
          if (hrr < temp) {
            // Storing Response Ratio
            hrr = temp;

            // Storing Location
            loc = i;
          }
        }
      }
      while (x) {
        rt[loc]--;
        nub++;
        if (nub === timequan || rt[loc] === 0) {
          x = false;
        }
      }
      // Updating time value
      count[loc]++;
      t += nub;
      if(names[loc]!== undefined){
        const process = document.createElement('div');
        process.textContent = 'P'+names[loc];
        process.style.fontWeight = '700';
        flexcontainer.appendChild(process);
        const boxR = document.createElement('p');
        boxR.classList.add('box--right');
        boxR.textContent = t;
        box.appendChild(boxR);
      }
      Recent_Run_Time[loc] = t;
      if (rt[loc] <= 0) {
        completed[loc] = 1;
        comTime[loc] = t;
        TurnAroundTime[loc] = comTime[loc] - arrival[loc];
        waitingTime[loc] = TurnAroundTime[loc] - burst[loc];
        avgwt += waitingTime[loc];
        avgtt += TurnAroundTime[loc];
      }
    }

    for(let i = 0; i < arrival.length; i++)
    {
        const info = document.createElement('tr');
        const info1 = document.createElement('td');
        const info2 = document.createElement('td');
        const info3 = document.createElement('td');
        const info4 = document.createElement('td');
        const info5 = document.createElement('td');
        const info6 = document.createElement('td');
        info1.textContent = names[i];
        info2.textContent = arrival[i];
        info3.textContent = burst[i];
        info4.textContent = comTime[i];
        info5.textContent = TurnAroundTime[i];
        info6.textContent = waitingTime[i];
        info.appendChild(info1);
        info.appendChild(info2);
        info.appendChild(info3);
        info.appendChild(info4);
        info.appendChild(info5);
        info.appendChild(info6);
        const display = document.querySelector('tbody');
        display.appendChild(info);
        show.classList.remove('hidden');
        const reset = document.querySelector('#reset');
        reset.addEventListener('click', Reset);
        document.getElementById('submit').disabled = true;
    }

    const tt = document.createElement('h6');
    const wt = document.createElement('h6');
    const sum = document.querySelector('.avg');
    if (arrival !== '' || burst !== '') {
      tt.textContent = 'TurnAround Avg. Time : ' + avgtt / arrival.length;
      sum.appendChild(tt);
      wt.textContent = 'Waiting Avg. Time : ' + avgwt / arrival.length;
      sum.appendChild(wt);
    }
  }
}
function Reset() {
  avgtt = 0;
  avgwt = 0;
  show.classList.add('hidden');
  document.getElementById('submit').disabled = false;
  const quan = document.getElementById('quantum');
  quan.classList.add('hidden_1');
  const flexcontainer = document.querySelector('.flex-container');
  while (flexcontainer.hasChildNodes())
  {
    flexcontainer.removeChild(flexcontainer.firstChild);
  }
  const box = document.querySelector('.box');
  while (box.hasChildNodes()) {
    box.removeChild(box.firstChild);
  }
  select.value == 'Pre'
}
