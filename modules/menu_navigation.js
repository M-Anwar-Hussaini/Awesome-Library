const navigateMenuItems = () => {
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.btn--nav');

  navItems.forEach((curBtn, index) => {
    curBtn.addEventListener('click', () => {
      for (let i = 0; i < sections.length; i += 1) {
        if (i === index) {
          sections[i].classList.remove('d-none');
          navItems[i].classList.add('btn-success');
          navItems[i].classList.remove('btn-light');
        } else {
          sections[i].classList.add('d-none');
          navItems[i].classList.remove('btn-success');
          navItems[i].classList.add('btn-light');
        }
      }
    });
  });
};

export default navigateMenuItems;
