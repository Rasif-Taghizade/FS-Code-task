//* constants
const formOuter = document.querySelector(".form-outer > form");
const steps = document.querySelectorAll(".step");
let currentStep;

let bookData = {
  staff_id: null,
  service_id: null,
  date: null,
  time: null,
  customer: {
    name: null,
    email: null,
    phone: null,
  },
};

//* data
const staffs = [
  {
    id: 1,
    name: "Alex Rosetta",
    email: "alexrosetta@gmail.com",
    image: "./assets/images/staff-1.png",
  },
  {
    id: 2,
    name: "Maria July",
    email: "mariajuly@gmail.com",
    image: "./assets/images/staff-2.png",
  },
  {
    id: 3,
    name: "John Doe",
    email: "johndoe@gmail.com",
    image: "./assets/images/staff-1.png",
  },
];
const services = [
  {
    id: 1,
    name: "Oral hygiene",
    image: "./assets/images/service-1.png",
    duration: "1 hour",
    price: 50.0,
  },
  {
    id: 2,
    name: "Teeth whitening",
    image: "./assets/images/service-2.png",
    duration: "1 hour",
    price: 100.0,
  },
  {
    id: 3,
    name: "Implants",
    image: "./assets/images/service-3.png",
    duration: "1 hour 30 minutes",
    price: 120.0,
  },
  {
    id: 4,
    name: "Check up",
    image: "./assets/images/service-3.png",
    duration: "1 hour 12 minutes",
    price: 140.0,
  },
];
const dates = [
  "2024-01-02",
  "2024-01-03",
  "2024-01-04",
  "2024-02-04",
  "2024-02-05",
  "2024-02-06",
  "2024-02-07",
  "2024-02-08",
  "2024-02-09",
];
const time = [
  {
    start_time: "09:00",
    end_time: "09:30",
  },
  {
    start_time: "09:30",
    end_time: "10:00",
  },
  {
    start_time: "10:00",
    end_time: "10:30",
  },
];

//* prevetn form submit
formOuter.addEventListener("submit", (e) => {
  e.preventDefault();
});

//* pages
function staffPage() {
  currentStep = 0;
  checkStep(currentStep);
  formOuter.innerHTML = `
      <div class="page">
        <header class="page__title">Select staff</header>
        <div class="field">
          ${repeatStaffsCard().join("")}
        </div>
        <div class="field btns">
          <div class="warning disabled">
            <img src="./assets/icons/info.svg" alt="warning" />
            <p>Select staff</p>
          </div>
          <button class="btn-next" onclick="servicePage()">Next</button>
        </div>
      </div>
    `;
}
staffPage();

function servicePage() {
  if (bookData.staff_id) {
    currentStep = 1;
    checkStep(currentStep);
    formOuter.innerHTML = `
      <div class="page">
        <header class="page__title">Select service</header>
        <div class="field">
          ${repeatServicesCard().join("")}
        </div>
        <div class="field btns">
          <button class="btn-back" onclick="staffPage()">Back</button>
          <div class="warning disabled">
            <img src="./assets/icons/info.svg" alt="warning" />
            <p>Select Service</p>
          </div>
          <button class="btn-next" onclick="datePage()">Next</button>
        </div>
      </div>
    `;
  } else {
    const warning = document.querySelector(".warning");
    warning.classList.remove("disabled");
    setTimeout(() => {
      warning.classList.add("disabled");
    }, 1000);
  }
}

function datePage() {
  if (bookData.service_id) {
    currentStep = 2;
    checkStep(currentStep);
    formOuter.innerHTML = `
      <div class="page">
        <header class="page__title">Select date & time</header>
        <div class="field">
          <div class="date__picker">
            ${createDatepicker()}
            <div class="time__picker-container">
              <div class="time__picker-header">
                <h3>Time</h3>
              </div>
              <div class="time__picker__body">
                <div class="time__picker-title">
                  <h3>Select date</h3>
                </div>
                <div class="time__picker__card-container ${
                  bookData.date ? "" : "disabled"
                }">
                  ${repeatTimeCard().join("")}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="field btns">
          <button class="btn-back" onclick="servicePage()">Back</button>
          <div class="warning disabled">
            <img src="./assets/icons/info.svg" alt="warning" />
            <p>Select staff</p>
          </div>
          <button class="btn-next" onclick="confirmPage()">Next</button>
        </div>
      </div>
    `;
  } else {
    const warning = document.querySelector(".warning");
    warning.classList.remove("disabled");
    setTimeout(() => {
      warning.classList.add("disabled");
    }, 1000);
  }
}

function confirmPage() {
  if (bookData.date && bookData.time) {
    currentStep = 3;
    checkStep(currentStep);
    formOuter.innerHTML = `
      <div class="page">
        <header class="page__title">Confirm detailes</header>
        <div class="field">
          <div class="customer__info">
            <div class="customer__info__group">
              <label>
                First name <span>*</span>
                <input type="text" id="firstName"/>
              </label>
              <label>
                Last name <span>*</span>
                <input type="text" id="lastName"/>
              </label>  
            </div>
            <div class="customer__info__group">
              <label>
                E-maile <span>*</span>
                <input type="email" id="email"/>
              </label>
              <label>
                Phone
                <input type="phone" id="phone"/>
              </label>  
            </div>
          </div>
          <p class="note-title">Note</p>
          <div class="note-group">
            <div>
              <h3>Staff:</h3>
              <p>${
                staffs.find((staff) => staff.id === bookData.staff_id).name
              }</p>
            </div>
            <div>
              <h3>Service:</h3>
              <p>${
                services.find((service) => service.id === bookData.service_id)
                  .name
              }</p>
            </div>
            <div>
              <h3>Date:</h3>
              <p>${bookData.date} / ${bookData.time}</p>
            </div>
            <div>
              <h3>Total:</h3>
              <p class="note-group__total">${
                services.find((service) => service.id === bookData.service_id)
                  .price
              }$</p>
            </div>
          </div>
        </div>
        <div class="field btns">
          <button class="btn-back" onclick="datePage()">Back</button>
          <button class="btn-next" onclick="checkCustomerData()">Confirm Booking</button>
        </div>
      </div>
    `;
  } else {
    const warning = document.querySelector(".warning");
    warning.classList.remove("disabled");
    setTimeout(() => {
      warning.classList.add("disabled");
    }, 1000);
  }
}

//* repeat staffs card
function repeatStaffsCard() {
  return staffs.map((staff) => {
    return `
      <div class="staff__card ${
        staff.id === bookData.staff_id ? "selected" : ""
      }" onclick="selectStaff(this)">
        <div class="staff__card__img">
          <img src="${staff.image}" alt="staff" />
        </div>
        <div class="staff__card__info">
          <h3>${staff.name}</h3>
          <p>${staff.email}</p>
        </div>
      </div>
    `;
  });
}

//* repeat services card
function repeatServicesCard() {
  return services.map((service) => {
    return `
      <div class="service__card ${
        service.id === bookData.service_id ? "selected" : ""
      }" onclick="selectService(this)">
        <div class="service__card__img">
          <img src="${service.image}" alt="service" />
        </div>
        <div class="service__card__info">
          <h3>${service.name}</h3>
          <p>${service.duration}</p>
        </div>
        <div class="service__card__price">
          <p>${service.price}$</p>
        </div>
      </div>
    `;
  });
}

//* repeat time card
function repeatTimeCard() {
  return time.map((time) => {
    return `
      <div class="time__picker__card ${
        time.start_time === bookData.time ? "selected" : ""
      }" onclick="selectTimePickerCard(this,'${time.start_time}')">
        <div class="time__picker__card__time" >
          <p>${time.start_time}</p>
          <p>${time.end_time}</p>
        </div>
      </div>
    `;
  });
}

//* create datepicker
let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function createDatepicker() {
  return `
    <div class="calendar">
      <div class="calendar__header">
        <div class="calendar__btns">
          <button class="btn-prev" onclick="prevMonth()">
            <img src="./assets/icons/chevron-left.svg" alt="prev" />
          </button>
          <span class="calendar__month">${
            monthNames[currentMonth] + " " + currentYear
          }</span>
          <button class="btn-next" onclick="nextMonth()">
            <img src="./assets/icons/chevron-right.svg" alt="next" />
          </button>
        </div>
      </div>
      <div class="calendar__body">
        <div class="calendar__days">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <ul class="calendar__dates">
        ${renderCalendar()}
      </ul>
      </div>
    </div>
  `;
}

function renderCalendar() {
  //* get the first date of the month
  let lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  //* get the last day of the month
  let lastDayOfMonths = new Date(
    currentYear,
    currentMonth,
    lastDateOfMonth
  ).getDay();
  //* get the last date of the last month
  let lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate();
  //* get the first day of the month
  let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  let liTags = "";

  //* create li tags for the last days of the last month
  for (let i = firstDayOfMonth; i > 0; i--) {
    liTags += `<li class="disabled">
      ${lastDateOfLastMonth - i + 1}
    </li>`;
  }

  //* create li tags for the current month
  for (let i = 1; i <= lastDateOfMonth; i++) {
    // get the same day of the current month and year to compare with the dates array
    let sameDay = `${currentYear}-${
      currentMonth + 1 < 10 ? "0" + (currentMonth + 1) : currentMonth + 1
    }-${i < 10 ? "0" + i : i}`;

    // check if the same day is in the dates array
    if (dates.includes(sameDay)) {
      liTags += `<li onclick="selectDate(this, '${sameDay}')" class="active ${
        sameDay === bookData.date ? "selected" : ""
      }">
        ${i}
      </li>`;
    } else {
      liTags += `<li>${i}</li>`;
    }
  }

  //* create li tags for the next month
  for (let i = lastDayOfMonths; i < 6; i++) {
    liTags += `<li class="disabled">${i - lastDayOfMonths + 1}</li>`;
  }
  return liTags;
}

function selectDate(selectedTag, day) {
  // remove selected class from all dates
  Array.from(selectedTag.parentNode.children).forEach((date) => {
    date.classList.remove("selected");
  });

  // add selected class to the clicked date
  selectedTag.classList.add("selected");

  // set the selected date to the bookData
  bookData.date = day;

  document
    .querySelector(".time__picker__card-container")
    .classList.remove("disabled");
}

function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  document.querySelector(".calendar__month").innerHTML =
    monthNames[currentMonth] + " " + currentYear;
  document.querySelector(".calendar__dates").innerHTML = renderCalendar();
}

function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  document.querySelector(".calendar__month").innerHTML =
    monthNames[currentMonth] + " " + currentYear;
  document.querySelector(".calendar__dates").innerHTML = renderCalendar();
}

//* create popup
function createPopup(isError) {
  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.innerHTML = `
    <div class="popup__content">
      <div class="popup__content__header">
        <button class="popup__close" onclick="closePopup()">
          <img src="./assets/icons/xmark.svg" alt="close" />
        </button>
      </div>
      <div class="popup__content__body">
        <p class="${isError ? "error" : ""}">
          ${
            isError
              ? "Please, fill the all required fields!"
              : "Confirmation successfully completed!"
          }
        </p>
      </div>
    </div>
  `;
  document.body.appendChild(popup);
}

function closePopup() {
  document.querySelector(".popup").remove();
}

//* events
function selectStaff(card) {
  // remove selected class from all cards
  Array.from(card.parentNode.children).forEach((card) => {
    card.classList.remove("selected");
  });
  // add selected class to the clicked card
  card.classList.add("selected");

  // set the selected staff id to the bookData
  bookData.staff_id =
    staffs[Array.from(card.parentNode.children).indexOf(card)].id;
  servicePage();
}

function selectService(card) {
  // remove selected class from all cards
  Array.from(card.parentNode.children).forEach((card) => {
    card.classList.remove("selected");
  });
  // add selected class to the clicked card
  card.classList.add("selected");

  // set the selected service id to the bookData
  bookData.service_id =
    services[Array.from(card.parentNode.children).indexOf(card)].id;
  datePage();
}

function selectTimePickerCard(card, selectedTime) {
  // remove selected class from all cards
  Array.from(card.parentNode.children).forEach((card) => {
    card.classList.remove("selected");
  });
  // add selected class to the clicked card
  card.classList.add("selected");

  // set the selected time to the bookData
  bookData.time = selectedTime;
  confirmPage();
}

function checkCustomerData() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  if (firstName && lastName && email) {
    bookData.customer.name = `${firstName} ${lastName}`;
    bookData.customer.email = email;
    bookData.customer.phone = phone;
    console.log(bookData);
    createPopup(false);
    bookData = {};
    setTimeout(() => {
      staffPage();
    }, 500);
  } else {
    createPopup(true);
  }
}

//* check step
function checkStep(stepCount) {
  steps.forEach((step, index) => {
    if (index < stepCount) {
      step.classList.add("completed");
      step.querySelector(
        ".bullet"
      ).innerHTML = `<img src="./assets/icons/check.svg" alt="check" />`;
    } else if (index === stepCount) {
      step.classList.add("active");
      step.classList.remove("completed");
      step.querySelector(".bullet").innerHTML = index + 1;
    } else {
      step.classList.remove("active");
      step.classList.remove("completed");
      step.querySelector(".bullet").innerHTML = index + 1;
    }
  });
}
