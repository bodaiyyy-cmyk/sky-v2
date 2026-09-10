// =========================
// FLIGHTS DATA
// =========================
const flights = [
    {
        number: "SKY204",
        from: "CAI",
        to: "BER",
        dept: "09:30",
        arr: "13:30",
        duration: "4h 00m",
        aircraft: "Airbus A350-900",
        gate: "B12",
        price: "EGP 18,450"
    },
    {
        number: "SKY310",
        from: "CAI",
        to: "BER",
        dept: "15:20",
        arr: "19:35",
        duration: "4h 15m",
        aircraft: "Boeing 787-9",
        gate: "A04",
        price: "EGP 19,800"
    },
    {
        number: "SKY401",
        from: "CAI",
        to: "CDG",
        dept: "10:15",
        arr: "14:35",
        duration: "4h 20m",
        aircraft: "Airbus A350-900",
        gate: "C08",
        price: "EGP 19,200"
    },
    {
        number: "SKY512",
        from: "CAI",
        to: "DXB",
        dept: "08:40",
        arr: "13:00",
        duration: "4h 20m",
        aircraft: "Airbus A320neo",
        gate: "A12",
        price: "EGP 12,800"
    },
    {
        number: "SKY620",
        from: "CAI",
        to: "LHR",
        dept: "11:30",
        arr: "16:20",
        duration: "4h 50m",
        aircraft: "Boeing 787-9",
        gate: "B04",
        price: "EGP 21,750"
    },
    {
        number: "SKY701",
        from: "CAI",
        to: "IST",
        dept: "14:10",
        arr: "17:20",
        duration: "3h 10m",
        aircraft: "Airbus A321",
        gate: "C14",
        price: "EGP 14,900"
    },
    {
        number: "SKY808",
        from: "CAI",
        to: "FRA",
        dept: "17:45",
        arr: "21:55",
        duration: "4h 10m",
        aircraft: "Airbus A350-900",
        gate: "B07",
        price: "EGP 18,900"
    },
    {
        number: "SKY909",
        from: "CAI",
        to: "ATH",
        dept: "19:20",
        arr: "21:35",
        duration: "2h 15m",
        aircraft: "Airbus A320neo",
        gate: "A09",
        price: "EGP 10,500"
    }
];

// =========================
// RENDER FLIGHTS
// =========================
function renderFlights() {
    const flightList = document.getElementById("flightList");
    if (!flightList) return;

    flightList.innerHTML = "";

    flights.forEach((flight, index) => {
        const item = document.createElement("article");
        item.className = "flight-item";

        item.innerHTML = `
            <div>
                <div class="flight-company">Skyline Air</div>
                <div class="flight-code">${flight.number}</div>
                <span class="badge">${flight.gate}</span>
            </div>

            <div class="flight-route">
                <div class="flight-time">
                    <strong>${flight.dept}</strong>
                    <small>${flight.from}</small>
                </div>

                <div class="route-line">
                    ${flight.duration}
                    <i></i>
                    ${flight.to}
                </div>

                <div class="flight-time">
                    <strong>${flight.arr}</strong>
                    <small>${flight.to}</small>
                </div>
            </div>

            <div class="aircraft">
                ${flight.aircraft}
                <br>
                Gate ${flight.gate}
            </div>

            <div class="price">
                <strong>${flight.price}</strong>
                <small>ROUND TRIP</small>
            </div>

            <button
                class="btn btn-primary select-btn"
                data-flight="${index}"
                type="button">
                Select →
            </button>
        `;

        flightList.appendChild(item);
    });

    document.querySelectorAll(".select-btn").forEach(button => {
        button.addEventListener("click", () => {
            const index = Number(button.dataset.flight);
            openSeatModal(flights[index]);
        });
    });
}

// =========================
// SEAT SELECTION MODAL
// =========================
const seatModal = document.getElementById("seatModal");
const seatGrid = document.getElementById("seatGrid");
const modalDetails = document.getElementById("modalDetails");

let selectedSeat = null;
let selectedFlight = null;

function openSeatModal(flight) {
    if (!seatModal || !seatGrid) return;

    selectedFlight = flight;
    selectedSeat = null;

    modalDetails.textContent = `${flight.number} · ${flight.from} → ${flight.to} · ${flight.price}`;
    seatGrid.innerHTML = "";

    for (let row = 1; row <= 8; row++) {
        for (let col = 0; col < 4; col++) {
            const letters = ["A", "B", "C", "D"];
            const seatNumber = `${row}${letters[col]}`;

            const seat = document.createElement("button");
            seat.type = "button";
            seat.className = "seat";
            seat.textContent = seatNumber;

            if (
                seatNumber === "2B" ||
                seatNumber === "4C" ||
                seatNumber === "6A" ||
                seatNumber === "7D"
            ) {
                seat.classList.add("unavailable");
                seat.disabled = true;
            }

            seat.addEventListener("click", () => {
                document.querySelectorAll(".seat.active").forEach(s => s.classList.remove("active"));
                seat.classList.add("active");
                selectedSeat = seatNumber;
            });

            seatGrid.appendChild(seat);
        }
    }

    seatModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

function closeSeatModal() {
    if (!seatModal) return;
    seatModal.classList.add("hidden");
    document.body.style.overflow = "";
    selectedSeat = null;
    selectedFlight = null;
}

document.getElementById("closeModal")?.addEventListener("click", closeSeatModal);
document.getElementById("cancelSeat")?.addEventListener("click", closeSeatModal);

document.getElementById("confirmSeat")?.addEventListener("click", () => {
    if (!selectedSeat) {
        alert("Please choose a seat first.");
        return;
    }
    alert(`Seat ${selectedSeat} selected for ${selectedFlight.number}.`);
    closeSeatModal();
});

// =========================
// FLIGHT STATUS
// =========================
function checkFlightStatus() {
    const input = document.getElementById("statusInput");
    const result = document.getElementById("statusResult");
    if (!input || !result) return;

    const code = input.value.trim().toUpperCase();

    if (!code) {
        result.textContent = "Please enter a flight number.";
        return;
    }

    const flight = flights.find(item => item.number === code);

    if (!flight) {
        result.textContent = "Flight not found. Try SKY204 or SKY310.";
        return;
    }

    result.textContent = `${flight.number} · ${flight.from} → ${flight.to} · Gate ${flight.gate} · Departure ${flight.dept}`;
}

document.getElementById("statusBtn")?.addEventListener("click", checkFlightStatus);
document.getElementById("statusInput")?.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        event.preventDefault();
        checkFlightStatus();
    }
});

// =========================
// SERVICE MODALS
// =========================
const serviceData = {
    Departures: "Check-in desks, boarding gates and departure guidance are available throughout Terminal 3.",
    Arrivals: "Follow the arrival signs toward baggage claim and ground transportation.",
    Baggage: "Standard checked baggage allowance is 23 kg. Oversized baggage support is available.",
    Lounges: "Relax in the Terminal 3 lounges with comfortable seating, quiet spaces and refreshments.",
    Immigration: "Follow passport-control signs and use the available e-gates when eligible.",
    Transportation: "Taxis, airport transfers and car pickup services are available from Terminal 3."
};

const serviceModal = document.getElementById("serviceModal");
const serviceTitle = document.getElementById("serviceTitle");
const serviceBody = document.getElementById("serviceBody");

function openServiceModal(service) {
    if (!serviceModal) return;
    serviceTitle.textContent = service;
    serviceBody.textContent = serviceData[service] || "More information about this service will be available soon.";
    serviceModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

document.querySelectorAll("[data-service]").forEach(button => {
    button.addEventListener("click", () => {
        openServiceModal(button.dataset.service);
    });
});

function closeServiceModal() {
    serviceModal?.classList.add("hidden");
    document.body.style.overflow = "";
}

document.getElementById("closeService")?.addEventListener("click", closeServiceModal);

// =========================
// CONTACT FORM
// =========================
const contactForm = document.getElementById("contactForm");
contactForm?.addEventListener("submit", event => {
    event.preventDefault();
    alert("Thank you! Your message has been sent to Skyline Air.");
    contactForm.reset();
});

// =========================
// BACK TO TOP BUTTON LOGIC
// =========================
const backToTopBtn = document.getElementById("backToTop");
const heroSection = document.getElementById("home");

window.addEventListener("scroll", () => {
    const heroHeight = heroSection ? heroSection.offsetHeight : 400;
    if (window.scrollY > heroHeight - 100) {
        backToTopBtn?.classList.add("show");
    } else {
        backToTopBtn?.classList.remove("show");
    }
});

backToTopBtn?.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// =========================
// CLOSE MODALS WHEN CLICKING OUTSIDE
// =========================
document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", event => {
        if (event.target === modal) {
            modal.classList.add("hidden");
            document.body.style.overflow = "";
        }
    });
});

// =========================
// START WEBSITE
// =========================
document.addEventListener("DOMContentLoaded", () => {
    renderFlights();
});


// =========================
// BOTTOM NAV ACTIVE STATE
// =========================
const bottomNavItems = document.querySelectorAll(".bottom-nav-item");

bottomNavItems.forEach(item => {
  item.addEventListener("click", () => {
    bottomNavItems.forEach(nav => nav.classList.remove("active"));
    item.classList.add("active");
  });
});

// تحديث الزر النشط بناءً على القسم المعروض أثناء السكرول
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const scrollPos = window.scrollY + 200;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollPos >= top && scrollPos < top + height) {
      bottomNavItems.forEach(item => {
        item.classList.remove("active");
        if (item.getAttribute("href") === `#${id}`) {
          item.classList.add("active");
        }
      });
    }
  });
});