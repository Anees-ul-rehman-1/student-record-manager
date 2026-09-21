const demoBtn = document.querySelector('.loadBtn');
const eraseDataBtn = document.querySelectorAll('.eraseDataBtn');
const exportBtn = document.querySelector('.exportBtn');
const confirmModal = document.querySelector('.confirmModel');
const confirmBtn = document.querySelector('.confirmBtn');
const cancelBtn = document.querySelector('.cancelBtn');
const confirmBoxPera = document.querySelector('.confirmBoxPera');
const darkTheme = document.querySelector('.darkTheme');
const lighTheme = document.querySelector('.lightTheme');

let pendingAction = null;

const demoStudents = [
    {
        rollNo: '1001',
        name: 'Ali Khan',
        fatherName: 'Ahmed Khan',
        gender: 'Male',
        DOB: '2010-05-12',
        class: '10',
        section: 'A',
        admDate: '2025-04-10',
        phoneNumber: '03001234567',
        email: 'ali.khan@example.com',
        address: 'Gulshan-e-Iqbal, Karachi',
        photo: ''
    },
    {
        rollNo: '1002',
        name: 'Sara Ahmed',
        fatherName: 'Usman Ahmed',
        gender: 'Female',
        DOB: '2011-02-18',
        class: '9',
        section: 'B',
        admDate: '2025-04-12',
        phoneNumber: '03121234567',
        email: 'sara.ahmed@example.com',
        address: 'North Nazimabad, Karachi',
        photo: ''
    },
    {
        rollNo: '1003',
        name: 'Hamza Ali',
        fatherName: 'Imran Ali',
        gender: 'Male',
        DOB: '2009-11-05',
        class: '10',
        section: 'A',
        admDate: '2025-04-15',
        phoneNumber: '03211234567',
        email: 'hamza.ali@example.com',
        address: 'PECHS, Karachi',
        photo: ''
    },
    {
        rollNo: '1004',
        name: 'Ayesha Malik',
        fatherName: 'Farhan Malik',
        gender: 'Female',
        DOB: '2010-08-22',
        class: '11',
        section: 'C',
        admDate: '2025-05-01',
        phoneNumber: '03331234567',
        email: 'ayesha.malik@example.com',
        address: 'DHA, Karachi',
        photo: ''
    },
    {
        rollNo: '1005',
        name: 'Bilal Hussain',
        fatherName: 'Zafar Hussain',
        gender: 'Male',
        DOB: '2009-03-30',
        class: '12',
        section: 'A',
        admDate: '2025-05-05',
        phoneNumber: '03451234567',
        email: 'bilal.hussain@example.com',
        address: 'Clifton, Karachi', photo: ''
    },
    {
        rollNo: '1006',
        name: 'Zainab Fatima',
        fatherName: 'Kashif Mehmood',
        gender: 'Female',
        DOB: '2011-01-14',
        class: '9',
        section: 'B',
        admDate: '2025-05-10',
        phoneNumber: '03551234567',
        email: 'zainab.fatima@example.com',
        address: 'Malir, Karachi',
        photo: ''
    },
    {
        rollNo: '1007',
        name: 'Usman Tariq',
        fatherName: 'Tariq Mehmood',
        gender: 'Male',
        DOB: '2010-07-19',
        class: '10',
        section: 'D',
        admDate: '2025-05-12',
        phoneNumber: '03661234567',
        email: 'usman.tariq@example.com',
        address: 'Federal B Area, Karachi',
        photo: ''
    },
    {
        rollNo: '1008',
        name: 'Mahnoor Siddiqui',
        fatherName: 'Adnan Siddiqui',
        gender: 'Female',
        DOB: '2011-09-08',
        class: '11',
        section: 'A',
        admDate: '2025-05-15',
        phoneNumber: '03771234567',
        email: 'mahnoor.siddiqui@example.com',
        address: 'Gulistan-e-Johar, Karachi',
        photo: ''
    },
    {
        rollNo: '1009',
        name: 'Fahad Sheikh',
        fatherName: 'Naveed Sheikh',
        gender: 'Male',
        DOB: '2009-12-25',
        class: '12',
        section: 'B',
        admDate: '2025-05-18',
        phoneNumber: '03881234567',
        email: 'fahad.sheikh@example.com',
        address: 'Korangi, Karachi',
        photo: ''
    },
    {
        rollNo: '1010',
        name: 'Hira Yousuf',
        fatherName: 'Yousuf Raza',
        gender: 'Female',
        DOB: '2010-06-03',
        class: '9',
        section: 'C',
        admDate: '2025-05-20',
        phoneNumber: '03991234567',
        email: 'hira.yousuf@example.com',
        address: 'Landhi, Karachi',
        photo: ''
    }
];

const demoFunction = () => {
    if (getStudents().length > 0) {
        confirmModal.classList.add('showModal');
        confirmBoxPera.innerText = 'Are you sure you want to load demo data? This will be added to your existing records.'
        pendingAction = () => {
            demoStudents.forEach(student => addStudent(student));
            window.location = 'students.html'
        }
    } else {
        demoStudents.forEach(student => addStudent(student));
        window.location = 'students.html';
    }
}

const eraseFunction = () => {
    confirmModal.classList.add('showModal');
    confirmBoxPera.innerText = 'Are you sure you want to erase all data? This cannot be undone.';
    pendingAction = eraseData;
}

confirmBtn.addEventListener('click', () => {
    if (pendingAction) {
        pendingAction();
    }
    confirmModal.classList.remove('showModal');
});
cancelBtn.addEventListener('click', () => {
    confirmModal.classList.remove('showModal');
    pendingAction = null;
});
demoBtn.addEventListener('click', demoFunction);
eraseDataBtn.forEach(btn => {
    btn.addEventListener('click', eraseFunction);
});
exportBtn.addEventListener('click', exportData);
importBtn.addEventListener('click', () => {
    importFileInput.click();
});

darkTheme.addEventListener('click', () => {
    themeModIs = 'dark';
    changeTheme()
});
lighTheme.addEventListener('click', () => {
    themeModIs = 'light';
    changeTheme()
});

