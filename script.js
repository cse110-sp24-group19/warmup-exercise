// dummy data for journal entries
let journalEntries = [
    { date: "4/24/2024", title: "Completed Major Project Ahead of Schedule" },
    { date: "4/23/2024", title: "Received Employee of the Month Award" },
    { date: "4/22/2024", title: "Delivered Engaging Presentation to Stakeholders" },
    { date: "4/21/2024", title: "Successfully Resolved Complex Technical Issue" },
    { date: "4/20/2024", title: "Implemented Efficiency-Boosting Process Improvement" },
    { date: "4/19/2024", title: "Secured New Client Account" },
    { date: "4/18/2024", title: "Received Positive Feedback from Supervisor" },
    { date: "4/17/2024", title: "Met Tight Deadline on Key Project" },
    { date: "4/16/2024", title: "Collaborated Effectively with Cross-Functional Team" },
    { date: "4/15/2024", title: "Completed Training Program with High Marks" },
    { date: "4/14/2024", title: "Implemented Innovative Solution to Improve Workflow" },
    { date: "4/13/2024", title: "Recognized for Outstanding Customer Service" },
    { date: "4/12/2024", title: "Published Article in Industry Journal" },
];

// function to retrieve journal entry titles from the array of journal entries
function getTitles(date) {
    const titles = [];
    for (let entry of journalEntries) {
        if (entry.date === date) {
            titles.push(entry.title);
        }
    }
    return titles;
}

// get current date information
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
 
const day = document.querySelector(".calendar-dates");
 
const currdate = document
    .querySelector(".calendar-current-date");
 
const prenexIcons = document
    .querySelectorAll(".calendar-navigation span");

const calendarView = document
    .querySelector('.calendar-container');

const dayView = document
    .querySelector('.day-view');

const returnCalendarButton = document
    .getElementById('return-calendar');
 
// Array of month names
const months = [
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
    "December"
];
 
// Function to generate the calendar
const manipulate = () => {
 
    // Get the first day of the month
    let dayone = new Date(year, month, 1).getDay();
 
    // Get the last date of the month
    let lastdate = new Date(year, month + 1, 0).getDate();
 
    // Get the day of the last date of the month
    let dayend = new Date(year, month, lastdate).getDay();
 
    // Get the last date of the previous month
    let monthlastdate = new Date(year, month, 0).getDate();
 
    // Variable to store the generated calendar HTML
    let lit = "";
 
    // Loop to add the last dates of the previous month
    for (let i = dayone; i > 0; i--) {
        lit +=
            `<li class="inactive">${monthlastdate - i + 1}</li>`;
    }
 
    // Loop to add the dates of the current month
    for (let i = 1; i <= lastdate; i++) {
 
        // Check if the current date is today
        let isToday = i === date.getDate()
            && month === new Date().getMonth()
            && year === new Date().getFullYear()
            ? "active"
            : "";
        lit += `<li class="date-item ${isToday}" data-date="${year}-${String(month+1).padStart(2,'0')}-${String(i).padStart(2, '0')}">${i}</li>`;
    }
 
    // Loop to add the first dates of the next month
    for (let i = dayend; i < 6; i++) {
        lit += `<li class="inactive">${i - dayend + 1}</li>`;
    }
 
    // Update the text of the current date element 
    // with the formatted current month and year
    currdate.innerText = `${months[month]} ${year}`;
 
    // update the HTML of the dates element 
    // with the generated calendar
    day.innerHTML = lit;

    //Attach event listeners to each date for opening day view
    document.querySelectorAll('.date-item').forEach(item => {
        item.addEventListener('click', function(){
            openDayView(this.getAttribute('data-date'));
        });
    });
};
 
manipulate();

//Function that opens the day view
function openDayView(dateString){
    //Update day view content based on the clicked date
    let formattedDate = formatDateForJournalEntries(dateString);
    document.querySelector('.day-view-date').textContent = formattedDate;

    // Shows journal entries for selected date
    let titles = getTitles(formattedDate);
    let journalList = document.getElementById('journal-list');
    journalList.innerHTML = '';
    titles.forEach(title => {
        let listItem = document.createElement('li');
        listItem.textContent = title;
        journalList.appendChild(listItem);
    });

    //Shows day view
    dayView.style.display = 'block';
    //Hide calendar view
    calendarView.style.display = 'none';
}

//Format date for journal entries
function formatDateForJournalEntries(dateString){
    const[year, month, day] = dateString.split('-');
    return `${parseInt(month)}/${parseInt(day)}/${year}`;
}

//Function to close day view and return to calendar
function closeDayView(){

    //Hides day view
    dayView.style.display = 'none';

    //Shows calendar view
    calendarView.style.display = 'block';
}

// Attach a click event listener to each icon
prenexIcons.forEach(icon => {
 
    // When an icon is clicked
    icon.addEventListener("click", () => {
 
        // Check if the icon is "calendar-prev"
        // or "calendar-next"
        month = icon.id === "calendar-prev" ? month - 1 : month + 1;
 
        // Check if the month is out of range
        if (month < 0 || month > 11) {
 
            // Set the date to the first day of the 
            // month with the new year
            date = new Date(year, month, new Date().getDate());
 
            // Set the year to the new year
            year = date.getFullYear();
 
            // Set the month to the new month
            month = date.getMonth();
        }
 
        else {
 
            // Set the date to the current date
            date = new Date();
        }
 
        // Call the manipulate function to 
        // update the calendar display
        manipulate();
    });
});

// Back button functionality 
document.querySelector('.back-button').onclick = closeDayView;

// Attach event listener for the return to calendar button in the day view
returnCalendarButton.addEventListener('click', closeDayView);