const printLocations = () => {
  getLocations().then((response) => {
    console.log(response);
    let locationsCards = formatLocationsCards(response);
    mainContainer.innerHTML = `
        <section class="section">
            <h3 class="section__title">BUSCADOR DE CIUDADES</h3>
        <section class="section__main">
            ${locationsCards}
        </section>
            <button class="section__more">+MORE</button>
        </section>
        `;

    let elementoBotonL = document.getElementsByClassName("section__more")[0];
    elementoBotonL.addEventListener("click", () => {
      getMoreLocations();
    });
    addEventsToLocationLinks(response);
  });
};

const addEventsToLocationLinks = (locations) => {
  let cardLinks = [...document.getElementsByClassName("card__link")];
  cardLinks.forEach((element, i) => {
    element.addEventListener("click", () => {
      printPage("LOCALIZACIONES", locations[i].url);
    });
  });
};

const formatLocationsCards = (locations) => {
  let templateLocation = locations
    .map((location) => {
      return `
            <div class="card">
            <h3 class="card__loc-title">${location.name}</h3>
            <div class="card__loc-spec">
                <div class="card__loc-spec--typeA">
                    <p class="card__loc-titles">TYPE</p>
                    <p class="card__loc-cont">${location.type}</p>
                </div>
                <div class="card__loc-spec--typeB">
                    <p class="card__loc-titles">DIMENSION</p>
                    <p class="card__loc-cont">${location.dimension}</p>
                </div>
            </div>
            <a class="card__link" href="#"> MÁS DETALLES </a>
        </div> `;
    })
    .join("");

  return templateLocation;
};

let urlNextB = "";

const getLocations = async () => {
  let url;

  if (urlNextB === "" || urlNextB === null) {
    url = URL_BASE + "/location";
  } else {
    url = urlNextB;
  }

  let response = await fetch(url);
  response = await response.json();
  urlNextB = response.info.next;
  console.log(response);
  return response.results;
};

const getMoreLocations = () => {
  getLocations().then((response) => {
    let locationsCards = formatLocationsCards(response);
    let sectionCards = document.getElementsByClassName("section__main")[0];
    sectionCards.innerHTML += locationsCards;
  });
};
