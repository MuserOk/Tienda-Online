export function setupMenu() {
    const menu = document.getElementById('mobileMenu');
    const btnMenu = document.getElementById('btnMenu');

    if (!menu || !btnMenu) {
        console.error("Elementos del menú no encontrados.");
        return;
    }

    btnMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !btnMenu.contains(e.target)) {
            menu.classList.add('hidden');
        }
    });
}