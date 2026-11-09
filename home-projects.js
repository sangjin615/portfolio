(() => {
  const list = document.querySelector('#home-project-list');
  if (!list) return;

  (window.PROJECTS || []).forEach(project => {
    const isPending = project.id === 'aftermath';
    const card = document.createElement(isPending ? 'article' : 'a');
    card.className = `home-project-preview${isPending ? ' is-pending' : ''}`;

    if (!isPending) {
      card.href = `project.html?id=${encodeURIComponent(project.id)}`;
      card.setAttribute('aria-label', `${project.title} 프로젝트 상세 보기`);
    }

    const icon = document.createElement('span');
    icon.className = 'home-project-icon';

    const iconImage = document.createElement('img');
    iconImage.src = `assets/project-icons/${project.id}.png`;
    iconImage.alt = '';
    iconImage.width = 64;
    iconImage.height = 64;
    icon.append(iconImage);

    const number = document.createElement('span');
    number.className = 'home-project-number';
    number.textContent = `${project.number} / ${project.category || 'PROJECT'}`;

    const title = document.createElement('h4');
    title.textContent = project.title;
    card.append(icon, number, title);

    if (isPending) {
      const status = document.createElement('span');
      status.className = 'home-project-status';
      status.textContent = '진행 중 · 내용 준비 중';
      card.append(status);
    } else {
      const role = document.createElement('p');
      role.className = 'home-project-role';
      role.textContent = project.role;

      const summary = document.createElement('p');
      summary.className = 'home-project-summary';
      summary.textContent = project.summary;

      const more = document.createElement('span');
      more.className = 'home-project-more';
      more.textContent = '상세 내용 보기 →';
      card.append(role, summary, more);
    }

    list.append(card);
  });
})();
