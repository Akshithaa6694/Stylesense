const form = document.getElementById("form");
const resultsDiv = document.getElementById("results");
const loader = document.getElementById("loader");

function login() {
    const name = document.getElementById("username").value;

    if (name.trim() === "") {
        alert("Please enter your name");
        return;
    }

    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("appPage").classList.remove("hidden");
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const gender = document.getElementById("gender").value;
    const occasion = document.getElementById("occasion").value;
    const budget = document.getElementById("budget").value;
    const style = document.getElementById("style").value;

    resultsDiv.innerHTML = "";
    loader.classList.remove("hidden");

    // Simulate AI Thinking 😎
    setTimeout(() => {

        loader.classList.add("hidden");

        const outfits = generateAIOutfits(gender, occasion, budget, style);

        outfits.forEach(outfit => {
            resultsDiv.innerHTML += `
                <div class="card">
                    <h3>${outfit.name}</h3>
                    <img src="${outfit.image}">
                    <p>${outfit.description}</p>
                    <p><i>${outfit.reason}</i></p>
                    <p style="color:green;">Confidence: ${outfit.confidence}%</p>
                </div>
            `;
        });

    }, 1200);
});


// ✅ AI Simulation Engine 🔥
function generateAIOutfits(gender, occasion, budget, style) {

    const allOutfits = [

        // ✅ WOMEN
        {
            name: "Elegant Saree",
            image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c",
            description: "A graceful saree perfect for celebrations.",
            gender: "Women",
            tags: ["wedding", "festival", "traditional", "party"],
        },

        {
            name: "Chic Casual Dress",
            image: "https://images.unsplash.com/photo-1520975922284-8b456906c813",
            description: "Comfortable yet stylish for casual outings.",
            gender: "Women",
            tags: ["casual", "outing", "friends", "daily"],
        },

        {
            name: "Modern Office Wear",
            image: "https://images.unsplash.com/photo-1593032465171-8f0e2d0c4d5f",
            description: "Professional & confident appearance.",
            gender: "Women",
            tags: ["office", "formal", "meeting", "work"],
        },

        // ✅ MEN
        {
            name: "Smart Casual Look",
            image: "https://images.unsplash.com/photo-1520975661595-6453be3f7070",
            description: "Relaxed yet stylish everyday outfit.",
            gender: "Men",
            tags: ["casual", "outing", "friends"],
        },

        {
            name: "Formal Office Suit",
            image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7",
            description: "Professional & confident business attire.",
            gender: "Men",
            tags: ["office", "formal", "meeting", "work"],
        },

        {
            name: "Party Night Style",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
            description: "Bold & impressive evening look.",
            gender: "Men",
            tags: ["party", "night", "event"],
        }

    ];

    // ✅ FILTER BY GENDER 🔥
    let genderFiltered = allOutfits.filter(outfit => outfit.gender === gender);

    // ✅ FILTER BY OCCASION
    let filtered = genderFiltered.filter(outfit =>
        outfit.tags.some(tag =>
            occasion.toLowerCase().includes(tag)
        )
    );

    // Fallback if no match
    if (filtered.length === 0) {
        filtered = genderFiltered;
    }

    return filtered.map(outfit => ({
        ...outfit,
        reason: `AI selected this based on your ${style} style & ${occasion} occasion.`,
        confidence: Math.floor(Math.random() * 15) + 85
    }));
}
