const cardsData = [
  {
    icon: "hood",
    title: "EDUCAÇÃO E PERFORMANCE",
    topics: [
      "Memoria operacional",
      "Tempo de reação a estímulos",
      "Raciocínio lógico",
      "Rendimento Educacional",
      "Performance Cognitiva",
      "TDAH",
      "AUTISMO",
      "DISLEXIA",
    ],
  },
  {
    icon: "brain",
    title: "COMPORTAMENTO E PERSONALIDADE",
    topics: [
      "comportamento antisocial",
      "comportamentos de risco",
      "instabilidade emocional (neuroticismo)",
    ],
  },
  {
    icon: "folder",
    title: "BEM-ESTAR / QUALIDADE DE VIDA",
    topics: ["CRONÓTIPO", "INSONIA"],
  },
  {
    icon: "people",
    title: "CORPO  E ESTÉTICA ",
    topics: ["ALTURA", "IMC"],
  },
  {
    icon: "balance",
    title: "NUTRI",
    topics: [
      "vit D",
      "consumo de gordura",
      "consumo de carbo",
      "consumo de proteina",
      "consumo de açúcar",
    ],
  },
  {
    icon: "heart",
    title: "SAÚDE MENTAL",
    topics: ["ANOREXIA", "BIPOLAR", "DEPRESSÃO", "TEPT"],
  },
  {
    icon: "health",
    title: "SAÚDE",
    topics: ["pressão arterial", "diabetes", "asma"],
  },
];

const mediaQuery = window.matchMedia("(max-width: 769px)");

const sliderWrapper = document.querySelector(".slider-wrapper");
const slider = document.querySelector(".slider");
const slideCounter = document.querySelector(".slide-counter");

cardsData.map((card) => {
  const hexagon = document.createElement("div");
  hexagon.className = "hexagon";

  const cardContent = document.createElement("div");
  cardContent.className = "card-content";

  const icon = document.createElement("img");
  icon.src = `./assets/images/${card.icon}.svg`;
  icon.className = "card-icon";

  const textTitle = document.createTextNode(card.title);
  const title = document.createElement("p");
  title.className = "card-title";
  title.appendChild(textTitle);

  const topics = document.createElement("ul");
  topics.className = "card-topics";

  card.topics.map((item) => {
    const topic = document.createElement("li");

    const topicText = document.createTextNode(item);
    topics.appendChild(topic);
    topic.appendChild(topicText);
  });

  cardContent.appendChild(icon);
  cardContent.appendChild(title);
  cardContent.appendChild(topics);
  hexagon.appendChild(cardContent);
  slider.appendChild(hexagon);
});

const hexagonCard = document.querySelectorAll(".hexagon");
const maxItems = hexagonCard.length;
let currentCard = 0;
let timer;
const time = 4000;

if (mediaQuery.matches) {
  const halfHexagon = document.querySelectorAll(".halfHexagon");
  sliderWrapper.removeChild(halfHexagon[0]);
  sliderWrapper.removeChild(halfHexagon[1]);
  sliderWrapper.style.padding = "0 32px";

  const container = document.querySelector(".container");
  container.style.backgroundImage =
    "url('./assets/images/mobileBackground.svg')";

  Array.from({
    length: cardsData.length,
  }).map(() => {
    const bullet = document.createElement("div");
    bullet.className = "bullet";
    slideCounter.appendChild(bullet);
  });

  timer = setInterval(() => {
    currentCard += 1;

    if (currentCard >= maxItems) currentCard = 0;

    changeActiveBullet();
    scrollToCard();
  }, time);
} else {
  const title = document.querySelector(".title");
  title.style.fontSize = "58px";
  title.style.lineHeight = "64px";

  Array.from({ length: 3 }).map(() => {
    const bullet = document.createElement("div");
    bullet.className = "bullet";
    slideCounter.appendChild(bullet);
  });

  timer = setInterval(() => {
    currentCard += 3;

    if (currentCard >= maxItems) currentCard = 0;

    scrollToCard();
    changeActiveBullet();
  }, time);
}

const bulletsItems = document.querySelectorAll(".bullet");

let currentBullet = 0;
const maxBulletsItems = bulletsItems.length;

bulletsItems.forEach((bullet, index) => {
  bullet.addEventListener("click", () => selectBullet(index));
});

bulletsItems[currentBullet].classList.add("active-bullet");

function changeActiveBullet(type, current) {
  bulletsItems[currentBullet].classList.remove("active-bullet");

  if (type === "clicked") {
    currentBullet = current;

    bulletsItems[currentBullet].classList.add("active-bullet");
  } else {
    currentBullet += 1;
    if (currentBullet >= maxBulletsItems) currentBullet = 0;
    bulletsItems[currentBullet].classList.add("active-bullet");

    if (currentBullet === 0)
      bulletsItems[maxBulletsItems - 1].classList.remove("active-bullet");
    else bulletsItems[currentBullet - 1].classList.remove("active-bullet");
  }
}

function scrollToCard(type) {
  const currentIndex =
    type === "clicked" && !mediaQuery.matches
      ? currentCard * 2 + 1
      : currentCard;

  hexagonCard[currentIndex].scrollIntoView({
    inline: "center",
    behavior: "smooth",
  });
}

function selectBullet(selected) {
  currentCard = selected;

  scrollToCard("clicked");
  clearInterval(timer);
  changeActiveBullet("clicked", selected);
}

scrollToCard();
