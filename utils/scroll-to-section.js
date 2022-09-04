export  function scrollToSection(e, device) {
  e.preventDefault();
  const navbar = document.getElementById('nav');
  const id = e.currentTarget.getAttribute('href').slice(1);
  const element = document.getElementById(id);
  const navHeight = navbar.getBoundingClientRect().height;

  let position = element.offsetTop - navHeight;

  if (device !== 'large') {
    const linksContainer = document.getElementById('links');
    const linksContainerHeight = linksContainer.getBoundingClientRect().height;
    position += linksContainerHeight + 24;
  }

  window.scrollTo({
    left: 0,
    top: position,
  });
}
