const todayDate = document.querySelector('.todayDate');
const totalStudents = document.querySelectorAll('.totalStu');
const totalMale = document.querySelectorAll('.totalMale');
const totalFemale = document.querySelectorAll('.totalFemale');
const bigclassName = document.querySelector('.bigClassName');
const bigClass = document.querySelector('.bigClass');
const donutChart = document.querySelector('.donutChart');
const tBody = document.querySelector('.tBody');
const classChartCanvas = document.querySelector('#classChart');
const exportBtn = document.querySelector('.exportBtn');

const today = new Date();
const dateFunction = () => {
    const formatted = today.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
    todayDate.innerText = formatted;
};

const totalNumbers = () => {
    const currentStudents = getStudents();
    const males = currentStudents.filter(student => student.gender === 'Male');
    totalStudents.forEach(total => total.innerText = currentStudents.length);
    totalMale.forEach(total => total.innerText = males.length);
    totalFemale.forEach(total => total.innerText = currentStudents.length - males.length);

    if (currentStudents.length === 0) {
        donutChart.style.background = 'var(--text-muted)';
    } else {
        const totalPercent = 100;
        const malePercent = males.length / currentStudents.length * 100;
        const femalePercent = totalPercent - malePercent;
        donutChart.style.background = 'conic-gradient(var(--blue) 0% var(--male-percent), var(--pink) var(--male-percent) 100%)';
        donutChart.style.setProperty('--male-percent', `${malePercent}%`);
    };
};

const largeClass = () => {
    const classCounts = {};
    const currentStudents = getStudents();
    currentStudents.forEach(student => {
        const studentClass = student.class;
        if (classCounts[studentClass]) {
            classCounts[studentClass] = classCounts[studentClass] + 1;
        } else {
            classCounts[studentClass] = 1;
        }
    });

    let maxCount = 0;
    let maxClassName = '';

    Object.entries(classCounts).forEach(([className, count]) => {
        if (count > maxCount) {
            maxCount = count;
            maxClassName = className;
        }
    });

    bigclassName.innerText = maxClassName;
    bigClass.innerText = maxCount;

    const myChart = new Chart(classChartCanvas, {
        type: 'bar',
        data: {
            labels: Object.keys(classCounts).map(className => `Class ${className}`),
            datasets: [{
                label: 'Students',
                data: Object.values(classCounts),
                // backgroundColor: gradient,
                barPercentage: .6,
                categoryPercentage: .8,
                borderRadius: 100,
                hoverBackgroundColor: '#3B82F6'
            }]
        }
    });

};

const recentTable = () => {
    const currentStudents = getStudents();
    const recentStudents = [...currentStudents].sort((a, b) => b.id - a.id).slice(0, 5);

    recentStudents.forEach((student, index) => {
        const photoSrc = student.photo ? student.photo : (student.gender === "Male" ? ("../assets/images/maleStudent.png") : ("../assets/images/femaleStudent.png"));
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
            <td>${index + 1}</td>
            <td class="stackRow">
                <img class="stuProfile" src="${photoSrc}" alt="Student Picture">
                <div class="nameRoll stack">
                    <strong>${student.name}</strong>
                    <span>Roll NO: ${student.rollNo}</span>
                </div>
            </td>
            <td>${student.class}-${student.section}</td>
            <td>${student.admDate}</td>
    `;
        tBody.appendChild(tableRow);

    });
};




largeClass();
dateFunction();
totalNumbers();
recentTable();
exportBtn.addEventListener('click', exportData);