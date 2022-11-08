export default {
    toggle: () => {
        let sidebar = document.getElementById('sidebar');
        let sidebarOuter = document.getElementById('sidebar-outer');
        if (window.getComputedStyle(sidebar).display === 'block') {
            sidebar.style.display = 'none';
            sidebarOuter.style.display = 'none';
            return;
        }

        sidebar.style.display = 'block';
        sidebarOuter.style.display = 'block';
    }
}