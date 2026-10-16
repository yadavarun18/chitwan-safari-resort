(function() {
        "use strict";

        const $ = (selector, parent = document) => parent.querySelector(selector);
        const $$ = (selector, parent = document) =>
            Array.from(parent.querySelectorAll(selector));

        const image = (id, width = 1000) =>
            `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;

        // All photos below are demo/placeholder imagery.
        // Replace the image URLs with real resort photos when available.
        const IMAGES = {
            cottage: image("photo-1445019980597-93fa8acb246c"),
            room: image("photo-1611892440504-42a792e24d32"),
            forest: image("photo-1511497584788-876760111969"),
            landscape: image("photo-1470770841072-f978cf4d019e"),
            jungle: image("photo-1448375240586-882707db888b"),
            wildlife: image("photo-1535338454770-8be927b5a00b"),
            river: image("photo-1500375592092-40eb2168fd21"),
            bird: image("photo-1444464666168-49d633b86797"),
            safari: image("photo-1516026672322-bc52d61a55d5"),
            garden: image("photo-1449158743715-0a90ebb6d2d8"),
            dinner: image("photo-1517248135467-4c7edcad34c4"),
            resort: image("photo-1566073771259-6a8506099945"),
            culture: image("photo-1514525253161-7a46d19cd819"),
            deer: image("photo-1484406566174-9da000fda645"),
            adventure: image("photo-1464822759023-fed622ff2c3b")
        };

        // Logo fallback: keep the supplied resort logo as the first choice.
        // Supported filenames: resort-logo.png, .jpg, .jpeg, .webp or .svg.
        const logoPaths = [
            "images/resort-logo.png",
            "images/resort-logo.jpg",
            "images/resort-logo.jpeg",
            "images/resort-logo.webp",
            "images/resort-logo.svg"
        ];

        $$(".logo, .footer-logo").forEach((logo) => {
            let index = 0;

            logo.onerror = function() {
                index++;

                if (index < logoPaths.length) {
                    logo.src = logoPaths[index];
                } else {
                    // Keep a clear fallback instead of showing a broken-image icon.
                    logo.style.display = "none";
                }
            };

            if (!logo.getAttribute("src")) {
                logo.src = logoPaths[0];
            }
        });

        // Reusable HTML escaping for content inserted into the page.
        function escapeHTML(value) {
            return String(value).replace(/[&<>"']/g, (character) => ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            })[character]);
        }

        // Experience cards.
        const experiences = [{
                title: "Jeep & Jungle Safari",
                description: "Explore the forest with local naturalists and look for wildlife in its natural habitat.",
                image: IMAGES.safari
            },
            {
                title: "Elephant Experiences",
                description: "Discover local wildlife stories and learn about the region's natural environment.",
                image: IMAGES.wildlife
            },
            {
                title: "River & Bird Watching",
                description: "Enjoy peaceful riverside scenery and discover the rich birdlife of the Chitwan region.",
                image: IMAGES.river
            },
            {
                title: "Tharu Cultural Experiences",
                description: "Discover the living traditions, local hospitality and cultural heritage of Sauraha.",
                image: IMAGES.culture
            },
            {
                title: "Jungle Tower & Nature",
                description: "Experience the landscape from a different perspective and enjoy quiet moments in nature.",
                image: IMAGES.forest
            },
            {
                title: "Village & Local Life",
                description: "Explore the rural surroundings and discover the culture and everyday life of the region.",
                image: IMAGES.landscape
            }
        ];

        $("#exp").innerHTML = experiences.map((item, index) => `
    <article class="experience-card">
      <div class="experience-image">
        <img src="${item.image}" alt="${escapeHTML(item.title)}" loading="lazy">
        <span class="experience-index">${String(index + 1).padStart(2, "0")}</span>
      </div>
      <div class="experience-body">
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.description)}</p>
      </div>
    </article>
  `).join("");

        // Stay packages: prices and inclusions retained from the supplied content.
        const packages = [{
                title: "Weekend Gateway Pack",
                duration: "2 nights / 3 days · Cottage for a couple",
                price: "Rs. 8,100",
                image: IMAGES.cottage,
                items: [
                    "Breakfast, dinner and bonfire",
                    "Free bus stand / airport pick-up and drop",
                    "Welcome drinks and water bottle",
                    "Wi-Fi and laundry"
                ],
                type: "Weekend Gateway Pack"
            },
            {
                title: "Adventure / Eco Pack",
                duration: "2 nights / 3 days · Cottage for a couple",
                price: "Rs. 10,100",
                image: IMAGES.adventure,
                items: [
                    "Breakfast, dinner and bonfire",
                    "Jungle pass and professional guide",
                    "Free bus stand / airport pick-up and drop",
                    "Welcome drinks, water bottle, Wi-Fi and laundry"
                ],
                type: "Adventure / Eco Pack"
            },
            {
                title: "Festive / Seasonal Pack",
                duration: "2 nights / 3 days · Couple rooms for groups",
                image: IMAGES.dinner,
                items: [
                    "Live music, DJ music, gala dinner and gift hamper",
                    "Free bus stand / airport pick-up and drop",
                    "Welcome drinks, water bottle, Wi-Fi and laundry"
                ],
                rates: [
                    ["10 people", "Rs. 44,000"],
                    ["30 people", "Rs. 117,000"],
                    ["50 people", "Rs. 167,500"]
                ],
                type: "Festive / Seasonal Pack"
            }
        ];

        $("#packs").innerHTML = packages.map((item) => {
                    const itemList = item.items.map((text) =>
                        `<li>${escapeHTML(text)}</li>`
                    ).join("");

                    const pricing = item.rates ?
                        `<table class="group-rates" aria-label="Group package rates">
          <tbody>${item.rates.map((rate) => `
            <tr><td>${escapeHTML(rate[0])}</td><td>${escapeHTML(rate[1])}</td></tr>
          `).join("")}</tbody>
        </table>`
      : `<div class="package-price">${escapeHTML(item.price)} <small>per package</small></div>`;

    return `
      <article class="package-card">
        <img src="${item.image}" alt="${escapeHTML(item.title)}" loading="lazy">
        <div class="package-body">
          <h3>${escapeHTML(item.title)}</h3>
          <p class="package-duration">${escapeHTML(item.duration)}</p>
          <ul>${itemList}</ul>
          ${pricing}
          <button class="btn btn-dark pick" type="button"
            data-type="${escapeHTML(item.type)}">Enquire about package ↗</button>
        </div>
      </article>
    `;
  }).join("");

  // Facilities.
  const facilities = [
    {
      title: "Reception",
      description:
        "A friendly front desk to help with tour arrangements and local experiences.",
      image: IMAGES.resort
    },
    {
      title: "Restaurant",
      description:
        "Local, Continental, Nepalese and Tharu dishes prepared with quality ingredients.",
      image: IMAGES.dinner
    },
    {
      title: "Conference & Events",
      description:
        "A venue for meetings, gatherings and events with arrangements available on request.",
      image: IMAGES.room
    },
    {
      title: "Outdoor Spaces",
      description:
        "Garden landscapes and outdoor spaces for a peaceful break between adventures.",
      image: IMAGES.garden
    }
  ];

  $("#fac").innerHTML = facilities.map((item) => `
    <article class="facility-card">
      <img src="${item.image}" alt="${escapeHTML(item.title)}" loading="lazy">
      <h3>${escapeHTML(item.title)}</h3>
      <p>${escapeHTML(item.description)}</p>
    </article>
  `).join("");

  // Gallery: images are demo photos, not verified photos of the actual resort.
  const gallery = [
    { title: "The resort experience", category: "stay", image: IMAGES.cottage, size: "tall" },
    { title: "Wildlife & nature", category: "wild", image: IMAGES.wildlife },
    { title: "Forest landscapes", category: "wild", image: IMAGES.jungle },
    { title: "A peaceful stay", category: "stay", image: IMAGES.room, size: "wide" },
    { title: "Riverside scenery", category: "culture", image: IMAGES.river },
    { title: "Birdlife", category: "wild", image: IMAGES.bird },
    { title: "Local culture & music", category: "culture", image: IMAGES.culture, size: "tall" },
    { title: "Green landscapes", category: "wild", image: IMAGES.landscape },
    { title: "Dining moments", category: "stay", image: IMAGES.dinner },
    { title: "Mountain & nature views", category: "culture", image: IMAGES.adventure, size: "wide" },
    { title: "A relaxing retreat", category: "stay", image: IMAGES.resort },
    { title: "Wildlife scenery", category: "wild", image: IMAGES.deer }
  ];

  $("#gal").innerHTML = gallery.map((item) => `
    <figure class="gallery-item ${item.size || ""}"
      data-category="${item.category}"
      data-caption="${escapeHTML(item.title)}"
      tabindex="0" role="button"
      aria-label="Open image: ${escapeHTML(item.title)}">
      <img src="${item.image}" alt="${escapeHTML(item.title)}" loading="lazy">
      <figcaption class="gallery-caption">${escapeHTML(item.title)}</figcaption>
    </figure>
  `).join("");

  // Header appearance on scroll.
  const header = $("#head");

  function updateHeader() {
    header.classList.toggle("scrolled", window.scrollY > 35);
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Mobile navigation.
  const burger = $("#burger");
  const menu = $("#menu");

  function closeMenu() {
    menu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open navigation");
  }

  burger.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(isOpen));
    burger.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  $$("#menu a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      closeLightbox();
    }
  });


  // Four-image automatic hero slider with smooth transitions.
  const slides = $$(".slide", $("#slides"));
  const dotsContainer = $("#dots");
  const counter = $("#slideCounter");
  const previous = $("#prevSlide");
  const next = $("#nextSlide");

  let currentSlide = 0;
  let sliderTimer = null;
  const slideDuration = 5000;

  dotsContainer.innerHTML = "";

  slides.forEach((slide, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Show slide ${index + 1}`);

    dot.addEventListener("click", () => showSlide(index, true));
    dotsContainer.appendChild(dot);
  });

  const dots = $$("button", dotsContainer);

  function showSlide(index, restartTimer = false) {
    if (!slides.length) return;

    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      const active = i === currentSlide;
      slide.classList.toggle("active", active);
      slide.setAttribute("aria-hidden", String(!active));
    });

    dots.forEach((dot, i) => {
      const active = i === currentSlide;
      dot.classList.toggle("active", active);
      dot.setAttribute("aria-current", active ? "true" : "false");
    });

    if (counter) {
      counter.textContent =
        `${String(currentSlide + 1).padStart(2, "0")} / ` +
        `${String(slides.length).padStart(2, "0")}`;
    }

    if (restartTimer) startSlider();
  }

  function startSlider() {
    clearInterval(sliderTimer);
    sliderTimer = null;

    if (document.hidden || slides.length < 2) return;

    sliderTimer = setInterval(() => {
      showSlide(currentSlide + 1);
    }, slideDuration);
  }

  if (previous) {
    previous.addEventListener("click", () => {
      showSlide(currentSlide - 1, true);
    });
  }

  if (next) {
    next.addEventListener("click", () => {
      showSlide(currentSlide + 1, true);
    });
  }

  showSlide(0);
  startSlider();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      clearInterval(sliderTimer);
      sliderTimer = null;
    } else {
      startSlider();
    }
  });


  // Reveal sections when they enter the viewport.
  const revealItems = $$(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  // Animated counters.
  const stats = $$(".stats [data-count]");

  function animateCounter(element) {
    const target = Number(element.dataset.count);
    const suffix = element.dataset.suffix || "";
    const duration = 1300;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      element.textContent = Math.round(target * eased) + suffix;

      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  if ("IntersectionObserver" in window) {
    const statObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.6 });

    stats.forEach((stat) => statObserver.observe(stat));
  }

  // Gallery category filters.
  $$("#tabs button").forEach((button) => {
    button.addEventListener("click", () => {
      $$("#tabs button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      const category = button.dataset.category;

      $$(".gallery-item", $("#gal")).forEach((item) => {
        const shouldShow =
          category === "all" || item.dataset.category === category;

        item.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });

  // Gallery lightbox.
  const lightbox = $("#lb");
  const lightboxImage = $("#lbi");
  const lightboxCaption = $("#lbc");

  function openLightbox(figure) {
    const img = $("img", figure);
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxCaption.textContent = figure.dataset.caption || img.alt;
    lightbox.hidden = false;
    $("#lbx").focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    lightboxImage.removeAttribute("src");
  }

  $$(".gallery-item", $("#gal")).forEach((figure) => {
    figure.addEventListener("click", () => openLightbox(figure));

    figure.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(figure);
      }
    });
  });

  $("#lbx").addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  // Booking form: front-end demo only.
  // Local browser storage is not a real reservation service or secure database.
  const bookingForm = $("#bform");
  const typeSelect = $("#bType");
  const checkIn = $("#bIn");
  const checkOut = $("#bOut");
  const estimate = $("#estimate");
  const message = $("#ok");

  const packagePrices = {
    "Standard Room": 3000,
    "Weekend Gateway Pack": 8100,
    "Adventure / Eco Pack": 10100
  };

  // Use local calendar dates rather than UTC to avoid timezone date errors.
  function localDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const today = localDateString(new Date());
  checkIn.min = today;
  checkOut.min = today;

  function updateCheckoutMinimum() {
    checkOut.min = checkIn.value || today;

    if (checkIn.value && checkOut.value && checkOut.value <= checkIn.value) {
      checkOut.value = "";
    }
  }

  function updateEstimate() {
    const selectedType = typeSelect.value;
    const inDate = checkIn.value;
    const outDate = checkOut.value;

    if (selectedType === "Festive / Seasonal Pack") {
      estimate.value = "Group rate — confirm with resort";
      return;
    }

    if (selectedType !== "Standard Room") {
      estimate.value = packagePrices[selectedType]
        ? `Rs. ${packagePrices[selectedType].toLocaleString("en-IN")} package rate`
        : "Confirm rate with resort";
      return;
    }

    if (!inDate || !outDate || outDate <= inDate) {
      estimate.value = "Select valid dates";
      return;
    }

    const nights = Math.round(
      (new Date(`${outDate}T12:00:00`) - new Date(`${inDate}T12:00:00`))
      / 86400000
    );

    estimate.value = `Rs. ${(nights * 3000).toLocaleString("en-IN")} · ${nights} night${nights === 1 ? "" : "s"}`;
  }

  typeSelect.addEventListener("change", updateEstimate);
  checkIn.addEventListener("change", () => {
    updateCheckoutMinimum();
    updateEstimate();
  });
  checkOut.addEventListener("change", updateEstimate);

  // Package buttons preselect the matching stay type.
  document.addEventListener("click", (event) => {
    const button = event.target.closest(".pick");
    if (!button) return;

    typeSelect.value = button.dataset.type;
    updateEstimate();

    $("#book").scrollIntoView({ behavior: "smooth", block: "start" });

    window.setTimeout(() => {
      $("#bName").focus({ preventScroll: true });
    }, 450);
  });

  updateEstimate();

  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!bookingForm.reportValidity()) return;

    if (checkOut.value <= checkIn.value) {
      message.hidden = false;
      message.textContent = "Please select a check-out date after your check-in date.";
      checkOut.focus();
      return;
    }

    const booking = {
      name: $("#bName").value.trim(),
      phone: $("#bPhone").value.trim(),
      email: $("#bEmail").value.trim(),
      type: typeSelect.value,
      checkIn: checkIn.value,
      checkOut: checkOut.value,
      guests: Number($("#bGuests").value),
      note: $("#bNote").value.trim(),
      submittedAt: new Date().toISOString()
    };

    // Demo only: saved in this browser and not sent to resort staff.
    try {
      const storageKey = "csr_demo_booking_requests";
      const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
      saved.push(booking);
      localStorage.setItem(storageKey, JSON.stringify(saved));

      message.hidden = false;
      message.textContent =
        "Your demo request has been saved in this browser only. It has NOT been sent to the resort. Please call or email the resort to confirm your reservation.";
    } catch (error) {
      message.hidden = false;
      message.textContent =
        "This demo form cannot save requests in this browser. Please contact the resort directly to confirm your reservation.";
    }

    message.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  // Current year in footer.
  $("#yr").textContent = new Date().getFullYear();

})();