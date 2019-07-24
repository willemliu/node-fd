export function ripple(e: React.MouseEvent) {
    const targetEl = e.currentTarget as HTMLElement;
    if (!targetEl.classList.contains('ripple')) {
        return;
    }
    let inkEl = targetEl.querySelector('.ink') as HTMLElement;

    inkEl = document.createElement('span');
    inkEl.classList.add('ink');
    const size = Math.max(targetEl.offsetWidth, targetEl.offsetHeight);
    inkEl.style.width = inkEl.style.height = size + 'px';
    targetEl.appendChild(inkEl);
    inkEl.addEventListener('animationend', () => {
        inkEl.remove();
    });

    let top = targetEl.getBoundingClientRect().top;
    let left = targetEl.getBoundingClientRect().left;
    top = top ? e.clientY - top - size / 2 : top + e.clientY - size / 2;
    left = left ? e.clientX - left - size / 2 : left + e.clientX - size / 2;
    inkEl.style.left = left + 'px';
    inkEl.style.top = top + 'px';
    inkEl.classList.add('animate');
}