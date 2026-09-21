const searchBox = document.querySelector('.searchContainer');
const searchInput = document.querySelector('.searchInput');
const suggestions = document.querySelector('.searchSuggestions');
const importFileInput = document.querySelector('.hiddenInput');
const importBtn = document.querySelector('.importBtn');
const editStudentModal = document.querySelector('.editStudentModal');

const getStudents = () => {
    const savedStudent = [];
    let localData = localStorage.getItem('studentRecordManager');
    if (localData) {
        localData = JSON.parse(localData);
        const appData = localData.students;
        savedStudent.push(...appData);
    }
    return savedStudent;
};

const saveAtLocalStorage = (studentsArray) => {
    const appData = {
        students: studentsArray,
    }
    localStorage.setItem('studentRecordManager', JSON.stringify(appData));
};

const addStudent = (newStudent) => {
    const currentStudents = getStudents();
    if (newStudent) {
        let id = 0;
        currentStudents.forEach(student => {
            if (id <= student.id) {
                id = student.id + 1;
            }
        });
        newStudent.id = id;
        currentStudents.push(newStudent)
    }
    saveAtLocalStorage(currentStudents);
};

const deleteStudent = (id) => {
    const currentStudents = getStudents();
    const updatedStudents = currentStudents.filter(student => student.id !== id);
    saveAtLocalStorage(updatedStudents);
};

const editStudent = (id, updateData) => {
    const currentStudents = getStudents();
    const updatedStudents = currentStudents.map(student => {
        if (student.id === id) {
            const updateStudent = { ...student, ...updateData };
            return updateStudent;
        } else {
            return student;
        }
    });
    saveAtLocalStorage(updatedStudents);
};

const fillViewModal = (studentData) => {
    const studentImage = document.querySelector('.studentImage');
    const studentName = document.querySelectorAll('.studentName');
    const studentFather = document.querySelector('.studentFather');
    const gender = document.querySelectorAll('.studentGender');
    const DOB = document.querySelectorAll('.studentDOB');
    const rollNo = document.querySelectorAll('.studentRollNo');
    const studentAddress = document.querySelector('.studentAddress');
    const studentClass = document.querySelector('.studentClass');
    const studentSection = document.querySelector('.studentSection');
    const studentNumber = document.querySelector('.studentNumber');
    const studentEmail = document.querySelector('.studentEmail');
    const studentAge = document.querySelector('.studentAge');

    const dob = new Date(studentData.DOB);
    const birthYear = dob.getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    const photoSrc = studentData.photo
        ? studentData.photo
        : (studentData.gender === 'Male' ? "../assets/images/maleStudent.png" : "../assets/images/femaleStudent.png");

    studentImage.setAttribute('src', photoSrc);
    studentName.forEach(n => n.innerText = studentData.name);
    studentFather.innerText = studentData.fatherName;
    gender.forEach(n => n.innerText = studentData.gender);
    studentAge.innerText = `(Age: ${age})`;
    DOB.forEach(n => n.innerText = studentData.DOB);
    rollNo.forEach(n => n.innerText = studentData.rollNo);
    studentAddress.innerText = studentData.address;
    studentClass.innerText = studentData.class;
    studentSection.innerText = studentData.section;
    studentNumber.innerText = studentData.phoneNumber;
    studentEmail.innerText = studentData.email;
}

const editStudentModalData = (studentData) => {
    const editImage = document.querySelector('.editImage');
    const editName = document.querySelector('#editName');
    const editFather = document.querySelector('#editfatherName');
    const editDOB = document.querySelector('#editDOB');
    const editGender = document.querySelector('#editGender');
    const editRollNo = document.querySelector('#editrollNo');
    const editClass = document.querySelector('#editClass');
    const editSection = document.querySelector('#editSection');
    const editAdmDate = document.querySelector('#editAdmDate');
    const editPhone = document.querySelector('#editPhone');
    const editEmail = document.querySelector('#editEmail');
    const editAddress = document.querySelector('#editAddress');
    const photoSrc = studentData.photo
        ? studentData.photo
        : (studentData.gender === 'Male' ? "../assets/images/maleStudent.png" : "../assets/images/femaleStudent.png");

    editImage.setAttribute('src', photoSrc);
    editName.value = studentData.name;
    editFather.value = studentData.fatherName;
    editDOB.value = studentData.DOB;
    editGender.value = studentData.gender;
    editRollNo.value = studentData.rollNo;
    editClass.value = studentData.class;
    editSection.value = studentData.section;
    editAdmDate.value = studentData.admDate;
    editPhone.value = studentData.phoneNumber;
    editEmail.value = studentData.email;
    editAddress.value = studentData.address;
};

const getStudentById = (id) => {
    const currentStudents = getStudents();
    const student = currentStudents.find(student => student.id === id);
    return student;
}

const searchFunction = (e) => {
    const searchTerm = e.target.value.trim().toLowerCase();

    if (searchTerm === '') {
        suggestions.classList.remove('showSuggestion');
    } else {
        const currentStudents = getStudents();
        const filtered = currentStudents.filter(student => {
            return student.name.toLowerCase().includes(searchTerm) || student.rollNo.toLowerCase().includes(searchTerm);
        });

        suggestions.innerHTML = '';
        filtered.forEach(student => {
            const searchResult = document.createElement('div');
            searchResult.classList.add('searchResult');
            searchResult.setAttribute('data-id', student.id);
            searchResult.innerHTML = `
                <p>${student.name}</p>
                <span>${student.rollNo}</span>
`;
            suggestions.append(searchResult);
        });
        suggestions.classList.add('showSuggestion');
    }
}

const eraseData = () => {
    localStorage.removeItem('studentRecordManager');
    location.reload();
}

const exportData = () => {
    const currentStudents = getStudents();
    const jsonString = JSON.stringify(currentStudents, null, 2);

    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'students-data-json';
    a.click();

    URL.revokeObjectURL(url);
};

if (importFileInput) {
    importFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const fileData = reader.result
                const students = JSON.parse(fileData);
                students.forEach(student => {
                    const currentStudents = getStudents();
                    const exists = currentStudents.some(s => s.rollNo === student.rollNo);
                    if (!exists) {
                        addStudent(student);
                        location.reload();
                    };
                });
            };
            reader.readAsText(file);
        };
    });
}

searchInput.addEventListener('input', searchFunction);

suggestions.addEventListener('click', (e) => {
    const clickedResult = e.target.closest('.searchResult');
    if (clickedResult) {
        const studentId = Number(clickedResult.dataset.id);


        const isOnStudentPage = window.location.pathname.includes('students.html');
        if (isOnStudentPage) {
            const student = getStudentById(studentId);
            viewStudentModal.classList.add('showViewModal');
            fillViewModal(student);
        } else {
            window.location.href = `../pages/students.html?viewId=${studentId}`;
        }
    }
});

searchBox.addEventListener('click', (e) => {
    e.stopPropagation();
    searchFunction(e);
});

document.addEventListener('click', () => {
    const searchSuggestions = document.querySelector('.searchSuggestions');
    searchSuggestions.classList.remove('showSuggestion')
});

if (importBtn) {
    importBtn.addEventListener('click', () => {
        importFileInput.click();
    });
}

const changeTheme = () => {
    if (themeModIs === 'light') {
        document.documentElement.classList.remove('dark');
    } else if (themeModIs === 'dark') {
        document.documentElement.classList.add('dark');
    }
    saveTheme(themeModIs);
}

const getTheme = () => {
    return localStorage.getItem('theme') || 'light';
}

const saveTheme = (theme) => {
    localStorage.setItem('theme', theme);
}


let themeModIs = getTheme();
changeTheme();