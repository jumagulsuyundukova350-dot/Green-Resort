
const form = document.getElementById("bookingForm");
const dateInput = document.getElementById("date");
const message = document.getElementById("message");
const copyButton = document.getElementById("copyBooking");

let bookingText = "";

function todayDate() {
    const now = new Date();

    return new Date(
        now.getTime() - now.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];
}

dateInput.min = todayDate();

// Брондоо формасы
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const house = document.getElementById("house").value;
    const date = dateInput.value;
    const details = document.getElementById("details").value.trim();

    if (!name || !phone || !house || !date) {
        message.textContent = "Бардык милдеттүү талааларды толтуруңуз.";
        return;
    }

    if (date < todayDate()) {
        message.textContent = "Өткөн күндү тандай албайсыз.";
        return;
    }

    bookingText =
        "Саламатсызбы! Брондоо өтүнүчү:\n\n" +
        "Аты: " + name + "\n" +
        "Телефон: " + phone + "\n" +
        "Эс алуу жайы: " + house + "\n" +
        "Келүү күнү: " + date + "\n" +
        "Кошумча маалымат: " + (details || "Жок");

    message.textContent =
        "✅ Брондоо билдирүүсү даярдалды. Аны көчүрүп, жайдын ээсине жөнөтүңүз.";

    copyButton.hidden = false;
});

// Билдирүүнү көчүрүү
copyButton.addEventListener("click", async function() {
    try {
        await navigator.clipboard.writeText(bookingText);

        message.textContent =
            "✅ Билдирүү көчүрүлдү! Эми аны WhatsApp аркылуу жөнөтсөңүз болот.";
    } catch (error) {
        message.textContent =
            "Көчүрүү иштеген жок. Билдирүүнү кол менен көчүрүп алыңыз.";
    }
});

// Үй тандоо баскычтары брондоо формасына алып барат
document.querySelectorAll(".card-btn").forEach(button => {
    button.addEventListener("click", function() {
        const card = button.closest(".house-card");
        const houseName = card.querySelector("h3").textContent.trim();

        document.getElementById("house").value = houseName;
    });
});
