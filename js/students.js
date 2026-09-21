const tBody = document.querySelector('.dynamicTable');
const totalStudent = document.querySelector('.totalStudent');
const totalMale = document.querySelector('.totalMale');
const totalFemale = document.querySelector('.totalFemale');
const viewStudentModal = document.querySelector('.viewStudentModal');
const closeViewstuModal = document.querySelectorAll('.closeBtn');
const personalInfoBtn = document.querySelector('.personalInfoBtn');
const academicInfoBtn = document.querySelector('.academicInfoBtn');
const contactInfoBtn = document.querySelector('.contactInfoBtn');
const personalInfo = document.querySelector('.personalInfo');
const academicInfo = document.querySelector('.academicInfo');
const contactInfo = document.querySelector('.contactInfo');
const confirmModal = document.querySelector('.confirmModel');
const confirmBtn = document.querySelector('.confirmBtn');
const cancelBtn = document.querySelector('.cancelBtn');
const closeEditModal = document.querySelectorAll('.closeEditModal');
const saveChangesBtn = document.querySelector('.saveChanges');
const editForm = document.querySelector('.editForm');
const uploadNewPic = document.querySelector('.uploadNewPic');
const newPicInput = document.querySelector('.changeImage');
let currentEditId = null;
let currentDeleteId = null;
let newPhotoData = null;

uploadNewPic.addEventListener('click', () => {
    newPicInput.click();
});

newPicInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = 150;
                canvas.height = 150;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, 150, 150);
                newPhotoData = canvas.toDataURL('image/jpeg', 0.7);
                document.querySelector('.editImage').setAttribute('src', newPhotoData);
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
    }
});

const renderStudents = () => {
    const currentStudents = getStudents();
    const males = currentStudents.filter(student => student.gender === 'Male');

    totalStudent.innerText = currentStudents.length;
    totalMale.innerText = males.length;
    totalFemale.innerText = currentStudents.length - males.length;

    currentStudents.forEach((student, index) => {
        const photoSrc = student.photo ? student.photo : (student.gender === "Male" ? ("../assets/images/maleStudent.png") : ("../assets/images/femaleStudent.png"));
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.rollNo}</td>
            <td class="stackRow">
                <img class="stuProfile" src="${photoSrc}" alt="Student Picture">
                <div class="nameRoll stack">
                    <strong>${student.name}</strong>
                    <span>${student.fatherName}</span>
                </div>
            </td>
            <td>${student.class}</td>
            <td>${student.section}</td>
            <td>${student.gender}</td>
            <td>${student.phoneNumber}</td>
            <td>${student.admDate}</td>
            <td class="stackRow">
                <button type="button" data-id="${student.id}" class="btn viewBtn">
                    <i data-lucide="eye"></i>
                </button>
                <button type="button" data-id="${student.id}" class="btn editBtn">
                    <i data-lucide="pen"></i>
                </button>
                <button type="button" data-id="${student.id}" class="btn dltBtn">
                    <i data-lucide="trash"></i>
                </button>
            </td>
    `;
        tBody.appendChild(tableRow);
    });
    lucide.createIcons();
}

tBody.addEventListener('click', (e) => {
    const clickedBtn = e.target.closest('button');
    if (clickedBtn) {
        let dataId = clickedBtn.dataset.id;
        dataId = Number(dataId);

        if (clickedBtn.classList.contains('viewBtn')) {
            const student = getStudentById(dataId);
            viewStudentModal.classList.add('showViewModal');
            fillViewModal(student);

        } else if (clickedBtn.classList.contains('editBtn')) {
            const student = getStudentById(dataId);
            currentEditId = dataId;
            newPhotoData = null;
            editStudentModal.classList.add('showViewModal');
            editStudentModalData(student);
        } else if (clickedBtn.classList.contains('dltBtn')) {
            currentDeleteId = dataId;
            confirmModal.classList.add('showModal');
        };
    };
});

saveChangesBtn.addEventListener('click', () => {
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

    const oldStudent = getStudentById(currentEditId);

    const updatedData = {
        rollNo: editRollNo.value,
        name: editName.value,
        fatherName: editFather.value,
        gender: editGender.value,
        DOB: editDOB.value,
        class: editClass.value,
        section: editSection.value,
        admDate: editAdmDate.value,
        phoneNumber: editPhone.value,
        email: editEmail.value,
        address: editAddress.value,
        photo: newPhotoData ? newPhotoData : oldStudent.photo
    }

    editStudent(currentEditId, updatedData);
    editStudentModal.classList.remove('showViewModal');
    location.reload();

});

confirmBtn.addEventListener('click', () => {
    if (currentDeleteId !== null) {
        deleteStudent(currentDeleteId);
        tBody.innerHTML = '';
        renderStudents();
        currentDeleteId = null;
    }
    confirmModal.classList.remove('showModal');
});

closeViewstuModal.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        viewStudentModal.classList.remove('showViewModal');
    })
});

const allInfoBoxes = [personalInfo, academicInfo, contactInfo];
const alInfoBtn = [personalInfoBtn, academicInfoBtn, contactInfoBtn];
const addCss = (addStyle) => {
    alInfoBtn.forEach(btn => {
        if (btn === addStyle) btn.classList.add('activeInfoBtn');
        else btn.classList.remove('activeInfoBtn');
    })
}
const showInfoBox = (boxToShow) => {
    allInfoBoxes.forEach(box => {
        if (box === boxToShow) {
            box.classList.remove('hideInfo');

        }
        else {
            box.classList.add('hideInfo');
        }
    });
};

personalInfoBtn.addEventListener('click', () => {
    addCss(personalInfoBtn);
    showInfoBox(personalInfo);
});
academicInfoBtn.addEventListener('click', () => {
    addCss(academicInfoBtn);
    showInfoBox(academicInfo);
});
contactInfoBtn.addEventListener('click', () => {
    addCss(contactInfoBtn);
    showInfoBox(contactInfo);
});
cancelBtn.addEventListener('click', () => {
    confirmModal.classList.remove('showModal');
});
closeEditModal.forEach(close => {
    close.addEventListener('click', () => {
        editStudentModal.classList.remove('showViewModal');
    });
});

renderStudents();

const params = new URLSearchParams(window.location.search);
const viewId = params.get('viewId');

if (viewId) {
    const student = getStudentById(Number(viewId));
    if (student) {
        viewStudentModal.classList.add('showViewModal');
        fillViewModal(student);
    }
}