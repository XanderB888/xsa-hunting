export const mockPosts = [
  {
    id: 1,
    username: "Example.user898",
    photo: "https://placehold.co/600x400",   // placeholder image URL
    caption: "What a walk and stalk to get this Impala",
    location: "Limpopo, South Africa",
    species: "Impala",
    sex: "Ram",
    distance: 184,                             // metres
    shotPlacement: {
      image: "https://placehold.co/300x200",   // the animal diagram image
      x: 55,                                    // % from left (red-dot system)
      y: 40,                                    // % from top
      timeOfDay: "Early Morning",
      wind: "Little to no wind, 0-5 km/h",
      weather: "Sunny, clear skies, 28°C",
    },
    firearm: {
      brand: "Howa",
      caliber: ".300 Win Mag",
      ammo: "Federal Power-Shok Soft Point",
      grain: 180,
    },
    comments: [
      { id: 1, username: "User.338Killshot", text: "Nice shot placement!" },
      { id: 2, username: "Example.user898", text: "Thanks! Just under a roland." },
    ],
  },
  {
    id: 2,
    username: "StalkerOfBucks123",
    photo: "https://placehold.co/600x400",   // placeholder image URL
    caption: "Great walk and stalk today!",
    location: "Vaalwater, South Africa",
    species: "Kudu",
    sex: "Bull",
    distance: 75,                             // metres
    shotPlacement: {
      image: "https://placehold.co/300x200",   // the animal diagram image
      x: 40,                                    // % from left (red-dot system)
      y: 20,                                    // % from top
      timeOfDay: "Mid-Day",
      wind: "Little to no wind, 0-5 km/h",
      weather: "overcast, 18°C",
    },
    firearm: {
      brand: "Sako",
      caliber: ".338 Win Mag",
      ammo: "Federal Power-Shok Soft Point",
      grain: 200,
    },
    comments: [
      { id: 3, username: "AfricanSniper", text: "My favorite animal!" },
      { id: 4, username: "Example.user898", text: "Great Kudu there my friend!" },
    ],
  },
  {
    id: 3,
    username: "LekkerHunting",
    photo: "https://placehold.co/600x400",   // placeholder image URL
    caption: "Lekker day in the bush",
    location: "Vrystaat, South Africa",
    species: "Warthog",
    sex: "Boar",
    distance: 222,                             // metres
    shotPlacement: {
      image: "https://placehold.co/300x200",   // the animal diagram image
      x: 75,                                    // % from left (red-dot system)
      y: 80,                                    // % from top
      timeOfDay: "Late afternoon",
      wind: "Little to no wind, 0-5 km/h",
      weather: "Sunny, clear skies, 28°C",
    },
    firearm: {
      brand: "Howa",
      caliber: ".270 Win Mag",
      ammo: "Federal Power-Shok Soft Point",
      grain: 150,
    },
    comments: [
      { id: 5, username: "StalkerOfBucks123", text: "Lekker Vrystaat!" },
      { id: 6, username: "Example.user898", text: "Daar vat hy nou!" },
    ],
  }
];

