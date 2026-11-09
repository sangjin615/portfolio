(() => {
  document.querySelectorAll('[data-quick-project-list]').forEach(list => {
    (window.PROJECTS || []).forEach(project => {
      const isPending = project.id === 'aftermath';
      const item = document.createElement(isPending ? 'div' : 'a');
      item.className = isPending ? 'quick-project-pending' : 'quick-project-item';

      if (!isPending) {
        item.href = `project.html?id=${encodeURIComponent(project.id)}`;
        item.setAttribute('aria-label', `${project.title} 프로젝트 상세 보기`);
      }

      const icon = document.createElement('img');
      icon.className = 'quick-project-icon';
      icon.src = `assets/project-icons/${project.id}.png`;
      icon.alt = '';
      icon.width = 40;
      icon.height = 40;

      const copy = document.createElement('span');
      copy.className = 'quick-project-copy';

      const title = document.createElement('b');
      title.textContent = `${project.number} · ${project.title}`;

      const summary = document.createElement('span');
      summary.className = 'quick-project-summary';
      summary.textContent = isPending ? '진행 중 · 내용 준비 중' : project.summary;
      copy.append(title, summary);
      item.append(icon, copy);
      list.append(item);
    });
  });

  document.querySelectorAll('.quick-menu').forEach(menu => {
    const toggle = menu.querySelector('.menu-toggle');
    const panel = menu.querySelector('.quick-panel');
    if (!toggle || !panel) return;

    const setOpen = open => {
      menu.dataset.open = String(open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? '상세 페이지 메뉴 닫기' : '상세 페이지 메뉴 열기');
    };

    toggle.addEventListener('click', event => {
      event.stopPropagation();
      setOpen(menu.dataset.open !== 'true');
    });

    panel.addEventListener('click', event => {
      if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('click', event => {
      if (!menu.contains(event.target)) setOpen(false);
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.focus();
      }
    });
  });
})();
