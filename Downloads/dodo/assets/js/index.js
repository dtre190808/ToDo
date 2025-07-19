document.addEventListener('DOMContentLoaded', function() {
            const banners = document.querySelectorAll('.banner');
            let currentSlide = 0;
            const slideInterval = 5000;
            

            banners.forEach((banner, i) => {
                if (i !== 0) {
                    banner.style.transform = 'translateX(100%)';
                }
            });
            function showSlide(index) {
                banners.forEach((banner, i) => {
                    banner.classList.remove('active');
                    if (i === index) {
                        banner.classList.add('active');
                        banner.style.transform = 'translateX(0)';
                    } else if (i < index) {
                        banner.style.transform = 'translateX(-100%)';
                    } else {
                        banner.style.transform = 'translateX(100%)';
                    }
                });
            }
            function nextSlide() {
                currentSlide = (currentSlide + 1) % banners.length;
                showSlide(currentSlide);
            }
            setInterval(nextSlide, slideInterval);
        });