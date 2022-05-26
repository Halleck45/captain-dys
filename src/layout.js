class Layout {
  init() {
    let toggleSidebar = () => {

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

    document.querySelectorAll('.burger-link').forEach(e => {
      e.addEventListener('click', () => {
        toggleSidebar()
      });
    });
    document.querySelectorAll('.sidebar-outer').forEach(e => {
      e.addEventListener('click', () => {
        toggleSidebar()
      });
    });

    document.querySelectorAll('.btn-editor-print').forEach(e => {
      e.addEventListener('click', () => {
        window.print();
      });
    });

  }
}

export default Layout
