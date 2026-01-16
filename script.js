// 배너 슬라이더
let currentSlide = 0;
const bannerItems = document.querySelectorAll('.banner-item');
const bannerTabs = document.querySelectorAll('.banner-tab');
let isPlaying = true;
let slideInterval;

function showSlide(index) {
    bannerItems.forEach(item => item.classList.remove('active'));
    bannerTabs.forEach(tab => tab.classList.remove('active'));

    if (bannerItems[index]) {
        bannerItems[index].classList.add('active');
        bannerTabs[index].classList.add('active');
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % bannerItems.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + bannerItems.length) % bannerItems.length;
    showSlide(currentSlide);
}

function startAutoPlay() {
    isPlaying = true;
    slideInterval = setInterval(nextSlide, 5000);
}

function stopAutoPlay() {
    isPlaying = false;
    clearInterval(slideInterval);
}

// 배너 컨트롤 버튼
const bannerPrev = document.querySelector('.banner-prev');
const bannerNext = document.querySelector('.banner-next');
const bannerPlay = document.querySelector('.banner-play');

if (bannerPrev) {
    bannerPrev.addEventListener('click', () => {
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
    });
}

if (bannerNext) {
    bannerNext.addEventListener('click', () => {
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
    });
}

if (bannerPlay) {
    bannerPlay.addEventListener('click', () => {
        if (isPlaying) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    });
}

// 배너 탭
bannerTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        stopAutoPlay();
        currentSlide = index;
        showSlide(currentSlide);
        startAutoPlay();
    });
});

// 자동 재생 시작
startAutoPlay();

// 상임위 버튼
const committeeButtons = document.querySelectorAll('.committee-btn');
committeeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        committeeButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// 공지사항 탭
const noticeTabs = document.querySelectorAll('.notice-tab');
noticeTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        noticeTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

// 큐레이션 슬라이더
const curationSliders = document.querySelectorAll('.curation-slider');
curationSliders.forEach(slider => {
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    const items = slider.querySelector('.curation-items');

    if (prevBtn && items) {
        prevBtn.addEventListener('click', () => {
            items.scrollBy({
                left: -370,
                behavior: 'smooth'
            });
        });
    }

    if (nextBtn && items) {
        nextBtn.addEventListener('click', () => {
            items.scrollBy({
                left: 370,
                behavior: 'smooth'
            });
        });
    }
});

// 키워드 슬라이더
const keywordsSlider = document.querySelector('.keywords-slider');
if (keywordsSlider) {
    const prevBtn = keywordsSlider.querySelector('.slider-prev');
    const nextBtn = keywordsSlider.querySelector('.slider-next');
    const list = keywordsSlider.querySelector('.keywords-list');

    if (prevBtn && list) {
        prevBtn.addEventListener('click', () => {
            list.scrollBy({
                left: -400,
                behavior: 'smooth'
            });
        });
    }

    if (nextBtn && list) {
        nextBtn.addEventListener('click', () => {
            list.scrollBy({
                left: 400,
                behavior: 'smooth'
            });
        });
    }
}

// 스크롤 시 헤더 고정
let lastScroll = 0;
const header = document.querySelector('.header-top');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 150) {
        if (header) {
            header.style.position = 'fixed';
            header.style.top = '0';
            header.style.left = '0';
            header.style.right = '0';
            header.style.zIndex = '1000';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    } else {
        if (header) {
            header.style.position = 'relative';
            header.style.boxShadow = 'none';
        }
    }

    lastScroll = currentScroll;
});

// 검색창 포커스
const searchInput = document.querySelector('.search-input input');
if (searchInput) {
    searchInput.addEventListener('focus', function() {
        this.parentElement.parentElement.style.borderColor = '#27619c';
    });

    searchInput.addEventListener('blur', function() {
        this.parentElement.parentElement.style.borderColor = '#4b83c4';
    });
}

// 검색 버튼
const searchBtn = document.querySelector('.search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const input = document.querySelector('.search-input input');
        if (input && input.value.trim()) {
            alert('검색 기능: ' + input.value);
        }
    });
}

// 엔터키로 검색
if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && searchInput.value.trim()) {
            alert('검색 기능: ' + searchInput.value);
        }
    });
}

// 메뉴 버튼
const menuBtn = document.querySelector('.menu-btn');
if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        alert('메뉴 기능');
    });
}

// 스크롤 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 섹션 애니메이션 적용
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s, transform 0.6s';
    observer.observe(section);
});

// 카드 호버 효과
const cards = document.querySelectorAll('.resource-card, .notice-card, .review-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.transition = 'transform 0.3s';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// 스무스 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// 로딩 완료
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s';
});

// 초기 스타일
document.body.style.opacity = '0';
