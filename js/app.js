const lineChartContext = document.getElementById('lineChart');
const barChartContext = document.getElementById('barChart');
const circleChartContext = document.getElementById('circleChart');
const fillPattern = 'rgba(173, 108, 173, 0.3)';
const closeButton = document.getElementById('close');
const ul = document.getElementsByClassName('alert-notif')[0];
const notificationReminder = document.querySelector('.notifications');
const bellIcon = document.getElementsByClassName('bell-icon')[0];
const notifCloseIcon = document.getElementsByClassName('notif');
const trafficContent = document.getElementsByClassName('traffic-content')[0];
const searchUser = document.getElementById('members');
const userMessage = document.getElementById('message-user');
let chosen = 2;

function checkChosen() {
    for(let i = 0; i < trafficContent.children.length; i++){
        if(i === chosen) {
            trafficContent.children[chosen].className = 'chosen';
        } else {
            trafficContent.children[i].className = '';
        }
    }
} 

// notification
bellIcon.addEventListener('click', () => {
    if(ul.classList.contains('clicked')){
        ul.className = 'alert-notif unclicked';
    } else {
        ul.className = 'alert-notif clicked';
        notificationReminder.style.display = 'none';
    }
});

// remove notification 
for(let i = 0; i < notifCloseIcon.length; i++){
    notifCloseIcon[i].addEventListener('click', () => {
        notifCloseIcon[i].parentNode.style.display = 'none';
    })
}

// close 
closeButton.addEventListener('click', () => {
    let p = closeButton.parentNode;
    let alertContainer = p.parentNode;
    alertContainer.className += ' close';
    p.style.display = 'none';
});

// Hourly Line Chart
let hourlyTrafficData = {
    labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
    datasets: [{
        data: [20, 35, 40, 15, 45, 25, 5, 10, 30, 25, 45],
        backgroundColor: fillPattern,
        lineTension: 0,
        pointRadius: 5,
        pointHoverRadius: 10
    }]
}

// Daily Line Chart
let dayTrafficData = {
    labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
    datasets: [{
        data: [150, 225, 250, 175, 325, 300, 375, 350, 420, 275, 500],
        backgroundColor: fillPattern,
        lineTension: 0,
        pointRadius: 5,
        pointHoverRadius: 10
    }]
}

// Weekly Line Chart
let weeklyTrafficData = {
    labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
    datasets: [{
        data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
        backgroundColor: fillPattern,
        lineTension: 0,
        pointRadius: 5,
        pointHoverRadius: 10
    }]
};

// Monthly Line Chart
let monthlyTrafficData = {
    labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
    datasets: [{
        data: [6250, 6850, 7500, 7250, 7750, 8250, 6000, 7250, 9000, 9250, 8500],
        backgroundColor: fillPattern,
        lineTension: 0,
        pointRadius: 5,
        pointHoverRadius: 10
    }]
}

let chartOption = {
    maintainAspectRatio: false,
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }],
        xAxes: [{
            gridLines: {
                offsetGridLines: true
            }
          }]
    },
    legend: false
}

let lineChart = new Chart(lineChartContext, {
    type: 'line',
    data: weeklyTrafficData,
    options: chartOption
})


for(let i = 0; i < trafficContent.children.length; i++){
    trafficContent.children[i].addEventListener('click', () => {
        lineChart.destroy();
        if(i === 0) {
            lineChart = new Chart(lineChartContext, {
            type: 'line',
            data: hourlyTrafficData,
            options: chartOption
            });
            chosen = 0;
            checkChosen();
        } else if( i === 1) {
            lineChart = new Chart(lineChartContext, {
            type: 'line',
            data: dayTrafficData,
            options: chartOption
            })
            chosen = 1;
            checkChosen();
        }
        else if( i === 2) {
            lineChart = new Chart(lineChartContext, {
            type: 'line',
            data: weeklyTrafficData,
            options: chartOption
            })
            chosen = 2;
            checkChosen();
        } else if( i === 3) {
            lineChart = new Chart(lineChartContext, {
            type: 'line',
            data: monthlyTrafficData,
            options: chartOption
            })
            chosen = 3;
            checkChosen();
        }
    })
}

// Bar chart
let dailyTrafficData = {
    labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S',],
    datasets: [{
        data: [75, 100, 175, 125, 225, 200, 100],
        backgroundColor: 'rgba(173, 108, 173)',
        barThickness: 25,
        borderWidth: 5
    }]
}

var barChart = new Chart(barChartContext, {
    type:'bar',
    data: dailyTrafficData,
    options: chartOption
});

// circle chart
let mobileUsersData = {
    labels: ['Phones', 'Tablets', 'Desktop'],
    datasets: [{
        data: [1250, 1250, 6000],
        backgroundColor: ['rgba(83, 144, 217)', 'rgba(100, 223, 223)', 'rgba(116, 0, 184)']
    }]
}

let doughnutChartOption = {
    maintainAspectRatio: false,
    legend: {
        position: 'right',
        labels: {
            padding: 20,
            boxWidth: 20
        }
    },
    
}

var barChart = new Chart(circleChartContext, {
    type: 'doughnut',
    data: mobileUsersData,
    options: doughnutChartOption
});

// message validation

const messageSendButton = document.querySelector('.send-button');

function valSubmit() {
    if(searchUser.value === '' || userMessage.value === '') {
        // check if the user hasn't input anything
        alert("You need to put user name and text message before sending a message");
        return false
    } else {
        alert("Your message has been sent!");
        searchUser.value = '';
        userMessage.value = '';
        return true;
    }
}

// local storage

function save() {	
    var emailCheckbox = document.getElementById("email-notification");
    var profileCheckbox = document.getElementById("profile-to-public");
    var timezone = document.getElementById('time')
    localStorage.setItem("email-notification", emailCheckbox.checked);
    localStorage.setItem("profile-to-public", profileCheckbox.checked);
    localStorage.setItem("time", timezone.value);
    alert("Settings has been saved");	
}

function load() {
    var checked = JSON.parse(localStorage.getItem("email-notification"));
    document.getElementById("email-notification").checked = checked;
    checked = JSON.parse(localStorage.getItem("profile-to-public"));
    document.getElementById("profile-to-public").checked = checked;
    if(localStorage.getItem('time') !== null) {
        document.getElementById('time').value = localStorage.getItem("time");
    } else {
        document.getElementById('time').value = 'none';
    }
}

window.addEventListener("load", () => {
    load();
})
