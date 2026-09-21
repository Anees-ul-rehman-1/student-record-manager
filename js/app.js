const toggle = document.querySelector('.toggleBtn');
const sidebar = document.querySelector('.sidebar');
const sidebarItems = sidebar.querySelectorAll('.itemToToggle');

let toggled = 'collapsed';

const applyState = () => {
    sidebarItems.forEach(item => {
        if (toggled === 'collapsed') {
            item.classList.add('hideNavItem');
            sidebar.classList.add('isCollapsed');
            toggle.innerHTML = `<i data-lucide="panel-left-open"></i>`;
        } else {
            item.classList.remove('hideNavItem');
            toggle.innerHTML = `<i data-lucide="panel-left-close"></i>`; 
            sidebar.classList.remove('isCollapsed')
        }
        lucide.createIcons();
    });
};

const savedDataLocalStorage = () => {
    const appData = {
        toggled
    };
    localStorage.setItem('StudentRecord', JSON.stringify(appData));
};

const toggleSideBar = (e) => {
    e.stopPropagation();
    toggled = toggled === 'collapsed' ? 'expanded' : 'collapsed';
    applyState();
    savedDataLocalStorage();
};

const fetchLocalData = () => {
    const savedData = localStorage.getItem('StudentRecord');
    if (savedData) {
        const appData = JSON.parse(savedData);
        toggled = appData.toggled;
    }
    applyState();
};

sidebar.addEventListener('click', (e) => {
    if (e.target.closest('a')) return;
    toggled = 'expanded';
    applyState();

    savedDataLocalStorage();
});

toggle.addEventListener('click', toggleSideBar);
fetchLocalData();