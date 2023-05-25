let h2New = document.querySelector("#date-today");
let now = new Date();
console.log(now);
let hours = now.getHours();
console.log(hours);
let minutes = now.getMinutes();
console.log(minutes);

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

h2New.innerHTML = `${day} ${hours}:${String(minutes).padStart(2, 0)}`;
