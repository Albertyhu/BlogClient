
export const ObservePhotos = (element) => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const intersecting = entry.isIntersecting
            entry.target.style.backgroundColor = intersecting ? "blue" : "orange"
        })
    })

    observer.observe(element)
}