export function scrollToSection(e, device) {
  e.preventDefault();
  const navbar = document.getElementById('nav');
  const id = e.currentTarget.getAttribute('href').slice(2);
  const element = document.getElementById(id);
  const navHeight = navbar.getBoundingClientRect().height;

  let position = element.offsetTop - navHeight;

  if (device !== 'large') {
    const linksContainer = document.getElementById('links');
    if (linksContainer !== null) {
      const linksContainerHeight =
        linksContainer.getBoundingClientRect().height ?? 0;
      position += linksContainerHeight +120;
    }
  }

  window.scrollTo({
    left: 0,
    top: position,
    behavior: 'smooth',
  });
}

export function scrollToSectionByPath(path, device) {
  
  const id = path.slice(2);
  const navbar = document.getElementById('nav');
  const element = document.getElementById(id);
  const navHeight = navbar.getBoundingClientRect().height;
  console.log({ id, element });
  let position = element.offsetTop - navHeight;

  if (device !== 'large') {
    const linksContainer = document.getElementById('links');
    const linksContainerHeight =
      linksContainer?.getBoundingClientRect()?.height;
    position += linksContainerHeight + 24;
  }

  window.scrollTo({
    left: 0,
    top: position,
    behavior: 'smooth',
  });
}
