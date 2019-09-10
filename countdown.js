'use strict';

function divide(a, b) {
  if ((a == 1 || b == 1) || (a == b)) {
    this.result = false;
    this.history = 'no point in doing this';
  } else {
    if (b > a) { [a, b] = [b, a]; }
    if ((a % b == 0)  && (a / b != b)) {
      this.result = a / b;
      this.history = `${a} / ${b} = ${this.result},`;
    } else {
      this.result =  false;
      this.history = `${b} doesn't go into ${a}`;
    }
  }
}

function minus(a, b) {
  if (a == b) {
    this.result = false;
    this.history = 'zero';
  } else {
    if (b > a) { [a, b] = [b, a]; }
    this.result = a - b;
    this.history = `${a} - ${b} = ${this.result},`;
  }
}

function multiply(a, b) {
  if (a == 1 || b == 1) {
    this.result = false;
    this.history = 'no point in multiplying by 1; '
  } else {
  this.result = a * b;
  this.history = `${a} x ${b} = ${this.result},`;
  }
}

function add(a, b) {
  this.result = Number(a) + Number(b); // Number() needed to prevent string concatenation
  this.history = `${a} + ${b} = ${this.result},`;
}

function list_object(numbers, history = '') {
  this.history = history;
  this.numbers = numbers;
}

function new_list(listo, operation, index1, index2) {
  let getres = new operation(listo.numbers[index1], listo.numbers[index2]);
  if (getres.result) {
    let numbers = listo.numbers.concat(getres.result);
    numbers.splice(index1, 1);
    numbers.splice(index2 - 1, 1);
    numbers.sort()
    return new list_object(numbers, listo.history + getres.history);
  } else { return false; }
}

var solutions = [];
var queue = [];
var operations = [add, divide, minus, multiply];

function mainloop(listor, target) {
  for (const oper of operations) {
    for (let i = 0; i < listor.numbers.length; i++) {
      for (let j = i + 1; j < listor.numbers.length; j++) {
        let temp_lob = new_list(listor, oper, i, j);
        if (temp_lob != false) {
          if (temp_lob.numbers.includes(target)) {
            solutions.push(temp_lob.history);
          } else { queue.push(temp_lob); }
        }
      }
    }
  }
}

let testmode = false;
if (testmode) {
  var numberslist = [1, 2, 3, 4, 5, 6];
  var target = 125;
} else {
  var numberslist = [];
  numberslist[0] = prompt('Enter first number');
  numberslist[1] = prompt('Enter second number');
  numberslist[2] = prompt('Enter third number');
  numberslist[3] = prompt('Enter fourth number');
  numberslist[4]= prompt('Enter fifth number');
  numberslist[5] = prompt('Enter sixth number');
  var target = prompt('Enter target number');
  //numberslist = numberslist.map(Number)
  target = Number(target);
}

numberslist.sort();
var test2 = new list_object(numberslist);
queue.push(test2);
for (const listobj of queue) {
  mainloop(listobj, target)
  //queue.splice(0, 1);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//mainloop(test2, 9);
const unique_solutions = [...new Set(solutions)];
let info = 'Numbers: ' + numberslist + '<br>' + 'Target: ' + target + '<br>' + 'Number of solutions: ' + unique_solutions.length + '<br>';
document.getElementById("info").innerHTML = info;
if (unique_solutions.length < 11) {
  showAll();
} else {
  document.getElementById("solutions").innerHTML = 'Random 10 solutions:';
  let ten_solutions = '';
  for (let i = 0; i < 10; i++) {
    let randindex = getRandomInt(unique_solutions.length)
    let solution_split = unique_solutions[randindex].split(",");
    ten_solutions += '<div class = "fullwidth">';
    for (let j = 0; j < solution_split.length - 2; j++) {
      ten_solutions += '<div class = "test"><h2>' + solution_split[j] + '</h2></div>';
      var jj = j;
    }
    ten_solutions += '<div class = "answer"><h2>' + solution_split[jj + 1] + '</h2></div>';
    ten_solutions += '</div>';
  }
  document.getElementById("list").innerHTML = ten_solutions;
  document.write('<button onclick = "showAll(); this.style.display = \'None\';">Show all solutions</button>');
}

function showAll() {
  document.getElementById("solutions").innerHTML = 'All solutions:';
  let all_solutions = '';
  for (let i = 0; i < unique_solutions.length; i++) {
    let solution_split = unique_solutions[i].split(",");
    all_solutions += '<div class = "fullwidth">';
    for (let j = 0; j < solution_split.length - 2; j++) {
      all_solutions += '<div class = "test"><h2>' + solution_split[j] + '</h2></div>';
      var jj = j;
    }
    all_solutions += '<div class = "answer"><h2>' + solution_split[jj + 1] + '</h2></div>';
    all_solutions += '</div>';
  }
  document.getElementById("list").innerHTML = all_solutions;
}
