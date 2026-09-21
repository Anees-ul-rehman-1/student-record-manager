const form = document.querySelector('form');
const studentName = form.querySelector('#name');
const fatherName = form.querySelector('#fatherName');
const gender = form.querySelector('#gender');
const DOB = form.querySelector('#DOB');
const studentPhoto = form.querySelector('#studentPhoto');
const studentClass = form.querySelector('#class');
const classSection = form.querySelector('#section');
const rollNumber = form.querySelector('#rollNo');
const addmissionDate = form.querySelector('#admDate');
const phoneNumber = form.querySelector('#phoneNumber');
const email = form.querySelector('#email');
const address = form.querySelector('#address');

const saveStudent = (photoData) => {
    const newStudent = {
        rollNo: rollNumber.value,
        name: studentName.value,
        fatherName: fatherName.value,
        gender: gender.value,
        DOB: DOB.value,
        class: studentClass.value,
        section: classSection.value,
        admDate: addmissionDate.value,
        phoneNumber: phoneNumber.value,
        email: email.value,
        address: address.value,
        photo: photoData
    };
    addStudent(newStudent);
    window.location.href = "students.html"
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let photoData = '';
    const file = studentPhoto.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const targetWidth = 150;
                const targetHeight = 150;

                canvas.width = targetWidth;
                canvas.height = targetHeight;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

                const compressedImage = canvas.toDataURL('image/jpeg', 0.7);

                photoData = compressedImage;
                saveStudent(photoData);
                form.reset();
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
    } else {
        saveStudent(photoData);
        form.reset();
    }
});