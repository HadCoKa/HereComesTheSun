let h2New = document.querySelector("#date-today");
let now = new Date();
console.log(now);
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
// console.log(hours);
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
// console.log(minutes);

let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
console.log(days);

// h2New.innerHTML = `${day} ${hours}:${String(minutes).padStart(2, 0)}`;
h2New.innerHTML = `${day} ${hours}:${minutes}`;

// time according to location- connect to api
