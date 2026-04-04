document.addEventListener('DOMContentLoaded', () => {

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    const placeholderImage = "https://images.unsplash.com/photo-1523626752472-b55a628f1acc?auto=format&fit=crop&w=400&q=60";

    // --- 1. Dynamic Pug Data ---
    const pugData = [
        { id: "pug-01", name: "Tuffy", born: "09-08-2006", died: "28-06-2009", photo: "images/pugs/tuffy.png", description: "The patriarch. Regal, rotund, and permanently convinced he was a lapdog despite weighing 12 kg.", tags: ["snorer", "lap pug", "the boss"], morePhotos: [], videos: [] },
        { id: "pug-02", name: "Sidney", born: "07-09-2008", died: "2018", photo: "images/pugs/sidu.png", description: "Named for how she slept — always twisted into an impossible shape. Champion cuddler.", tags: ["cuddler", "sleepy", "drama queen"], morePhotos: [], videos: [] },
        { id: "pug-03", name: "Simba", born: "02-05-2009", died: "20-12-2023", photo: null, description: "A round little soul who greeted every morning like it was Christmas.", tags: ["morning pug", "food motivated", "gentle"], morePhotos: [], videos: [] },
        { id: "pug-04", name: "Blossom", born: "02-05-2009", died: "2024", photo: "images/pugs/blossom.png", description: "The fastest pug we ever had. Three second zoomies, then a four hour nap.", tags: ["zoomies", "napper", "speedy"], morePhotos: [], videos: [] },
        { id: "pug-05", name: "Nura", born: "02-05-2009", died: "05-12-2023", photo: null, description: "Scrawny, scrappy, and absolutely full of herself. We loved every inch.", tags: ["feisty", "tiny terror", "courageous"], morePhotos: [], videos: [] },
        { id: "pug-06", name: "Timon", born: "02-05-2009", died: "18-07-2018", photo: null, description: "The softest eyes. Would look at you like you'd personally hung the moon.", tags: ["gentle", "sweet", "mama's boy"], morePhotos: [], videos: [] },
        { id: "pug-07", name: "Puka", born: "02-05-2009", died: "20-07-2017", photo: null, description: "The youngest but clearly in charge. Negotiates for treats with alarming sophistication.", tags: ["clever", "food thief", "leader"], morePhotos: [], videos: [] },
        { id: "pug-08", name: "Star", born: "2017", died: "14-09-2025", photo: null, description: "Soft, sweet, and slightly wiggly. Exactly as advertised.", tags: ["wiggly", "sweet", "social"], morePhotos: [], videos: [] },
        { id: "pug-09", name: "Snow White", born: "2020", died: "22-12-2025", photo: null, description: "Named after the chocolate. Dark, sweet, and utterly addictive company.", tags: ["playful", "cheeky", "snuggly"], morePhotos: [], videos: [] },
        { id: "pug-10", name: "Guddu Ji", born: "2021", died: "25-05-2021", photo: null, description: "Bright, tropical energy in a wrinkled package. Cannot sit still for more than 30 seconds.", tags: ["energetic", "zoomies", "sunbather"], morePhotos: [], videos: [] },
        { id: "pug-11", name: "Bhalu", born: "2022", died: "26-04-2023", photo: null, description: "Tiny chip off the old block. Still figuring out the stairs.", tags: ["puppy", "curious", "brave"], morePhotos: [], videos: [] },
        { id: "pug-12", name: "Nimo", born: "2022", died: null, photo: null, description: "Chip's partner in crime. Together they have dismantled two sofas.", tags: ["mischievous", "duo", "puppy"], morePhotos: [], videos: [] },
        { id: "pug-13", name: "Kukudu Ji Original", born: "2022", died: null, photo: "images/pugs/original_kuku.png", description: "Chip's partner in crime. Together they have dismantled two sofas.", tags: ["mischievous", "duo", "puppy"], morePhotos: [], videos: [] },
        { id: "pug-13-b", name: "Kukduji", born: "2022", died: null, photo: null, description: "Chip's partner in crime. Together they have dismantled two sofas.", tags: ["mischievous", "duo", "puppy"], morePhotos: [], videos: [] },
        { id: "pug-14", name: "Thau", born: "2022", died: "13-12-2022", photo: null, description: "Chip's partner in crime. Together they have dismantled two sofas.", tags: ["mischievous", "duo", "puppy"], morePhotos: [], videos: [] },
        { id: "pug-15", name: "Cheery", born: "2022", died: null, photo: null, description: "Chip's partner in crime. Together they have dismantled two sofas.", tags: ["mischievous", "duo", "puppy"], morePhotos: [], videos: [] },
        { id: "pug-16", name: "Paiku", born: "2022", died: null, photo: null, description: "Chip's partner in crime. Together they have dismantled two sofas.", tags: ["mischievous", "duo", "puppy"], morePhotos: [], videos: [] },
        { id: "pug-17", name: "Timba", born: "2022", died: null, photo: null, description: "Chip's partner in crime. Together they have dismantled two sofas.", tags: ["mischievous", "duo", "puppy"], morePhotos: [], videos: [] },
        { id: "pug-18", name: "Popings", born: "2022", died: null, photo: null, description: "Chip's partner in crime. Together they have dismantled two sofas.", tags: ["mischievous", "duo", "puppy"], morePhotos: [], videos: [] }
    ];

    const profileGrid = document.getElementById('profileGrid');
    const pugModal = document.getElementById('pugModal');
    const closeModalBtn = document.querySelector('.close-modal');

    // Make sure we have the HTML elements before running code
    if (!profileGrid || !pugModal || !closeModalBtn) {
        console.error("HTML elements are missing. Make sure your index.html is fully updated.");
        return;
    }

    function renderPugs(filter = 'all') {
        profileGrid.innerHTML = ''; 
        
        const filteredPugs = pugData.filter(pug => {
            const status = pug.died === null ? 'present' : 'memory';
            return filter === 'all' || status === filter;
        });

        filteredPugs.forEach(pug => {
            const card = document.createElement('div');
            card.className = 'profile-card fade-in visible'; 
            card.setAttribute('data-pug-id', pug.id); 

            const isMemory = pug.died !== null;
            const memoryTag = isMemory ? `<span class="memory-tag">In Memory</span>` : '';
            const lifespan = isMemory ? `${pug.born} - ${pug.died}` : `${pug.born} - Present`;
            const tagsHtml = pug.tags.slice(0, 3).map(tag => `<span class="personality-tag">${tag}</span>`).join('');
            const imageSrc = pug.photo ? pug.photo : placeholderImage;

            card.innerHTML = `
                <img src="${imageSrc}" alt="${pug.name}" class="profile-img" loading="lazy">
                <div class="profile-info">
                    <h4 class="profile-name">${pug.name}</h4>
                    ${memoryTag}
                    <p class="lifespan-text">${lifespan}</p>
                    <p class="description-text">${pug.description}</p>
                    <div class="tags-container">
                        ${tagsHtml}
                    </div>
                </div>
            `;
            
            // Add click event to open the detailed modal
            card.addEventListener('click', () => openPugModal(pug.id));
            profileGrid.appendChild(card);
        });
    }

    function openPugModal(pugId) {
        const pug = pugData.find(p => p.id === pugId);
        if (!pug) return;

        document.getElementById('modalName').textContent = pug.name;
        
        const isMemory = pug.died !== null;
        document.getElementById('modalLifespan').textContent = isMemory ? `${pug.born} - ${pug.died}` : `${pug.born} - Present`;
        
        document.getElementById('modalMainImg').src = pug.photo ? pug.photo : placeholderImage;
        document.getElementById('modalMainImg').alt = pug.name;
        document.getElementById('modalDescription').textContent = pug.description;

        const tagsContainer = document.getElementById('modalTags');
        tagsContainer.innerHTML = pug.tags.map(tag => `<span class="personality-tag">${tag}</span>`).join('');

        const gallerySection = document.getElementById('modalGallerySection');
        const galleryGrid = document.getElementById('modalGalleryGrid');
        galleryGrid.innerHTML = ''; 
        
        if (pug.morePhotos && pug.morePhotos.length > 0) {
            gallerySection.style.display = 'block';
            pug.morePhotos.forEach(photoUrl => {
                const img = document.createElement('img');
                img.src = photoUrl;
                img.alt = `${pug.name} photo`;
                img.className = 'modal-gallery-img';
                img.loading = 'lazy';
                img.addEventListener('click', function() {
                    openLightbox(this.src);
                });
                galleryGrid.appendChild(img);
            });
        } else {
            gallerySection.style.display = 'none'; 
        }

        const videoSection = document.getElementById('modalVideoSection');
        const videoGrid = document.getElementById('modalVideoGrid');
        videoGrid.innerHTML = ''; 

        if (pug.videos && pug.videos.length > 0) {
            videoSection.style.display = 'block';
            pug.videos.forEach(videoUrl => {
                const wrapper = document.createElement('div');
                wrapper.className = 'video-wrapper';
                wrapper.innerHTML = `<iframe src="${videoUrl}" title="${pug.name} video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
                videoGrid.appendChild(wrapper);
            });
        } else {
            videoSection.style.display = 'none'; 
        }

        pugModal.classList.add('open');
        document.body.style.overflow = 'hidden'; 
    }

    function closePugModal() {
        pugModal.classList.remove('open');
        document.body.style.overflow = ''; 
        document.getElementById('modalVideoGrid').innerHTML = '';
    }

    closeModalBtn.addEventListener('click', closePugModal);
    
    pugModal.addEventListener('click', (e) => {
        if (e.target === pugModal) closePugModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && pugModal.classList.contains('open')) closePugModal();
    });

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderPugs(e.target.getAttribute('data-filter'));
        });
    });

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightboxBtn = document.querySelector('.close-lightbox');

    function openLightbox(src) {
        lightbox.style.display = 'block';
        lightboxImg.src = src;
    }

    closeLightboxBtn.addEventListener('click', () => { lightbox.style.display = 'none'; });
    lightbox.addEventListener('click', (e) => { if (e.target !== lightboxImg) lightbox.style.display = 'none'; });

    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => { observer.observe(element); });

    renderPugs();
});