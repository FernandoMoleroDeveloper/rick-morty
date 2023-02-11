let urlNext = "";

const printCharacters = () => {
  getCharacters().then((response) => {
    
    let charactersCards = formatCharactersCards(response);
    mainContainer.innerHTML = `
            <section class="section">
                <h3 class="section__title">BUSCADOR DE PERSONAJES</h3>
                <section class="section__main">
                ${charactersCards}
                </section>
                <button class="section__more">+MORE</button>
            </section>
        `;

    let elementoBoton = document.getElementsByClassName("section__more")[0];
    elementoBoton.addEventListener("click", () => {
       getMoreCharacters();
    });
    addEventsToCharacterLinks(response);
  });
};

const addEventsToCharacterLinks = (characters) => {
  let cardLinks = [...document.getElementsByClassName('card__link')];
  cardLinks.forEach((element, i) => {
      element.addEventListener('click', () => {
          printPage('PERSONAJES', characters[i].url);
          
      })
  });
}

const formatCharactersCards = (characters) => {

  let templateCharacter = characters.map((character) => {
      return `
            <div class="card">
                <div class="card__header">
                <h4 class="card__title"> ${character.name} </h4>
                <p class="card__status card__status--${character.status}"> ${character.status} </p>
                </div>
                <div class="card__main">
                    <img class="card__img" src="${character.image}">
                    <div class="card__info-container">
                        <p class="card__info-title"> ESPECIE </p>
                        <p class="card__info"> ${character.species} </p>
                        <p class="card__info-title"> GÉNERO </p>
                        <p class="card__info"> ${character.gender} </p>
                        <p class="card__info-title"> ORIGEN </p>
                        <p class="card__info"> ${character.origin.name} </p>
                        <p class="card__info-title"> LOCALIZACIÓN </p>
                        <p class="card__info"> ${character.location.name} </p>
                    </div>
                    
                </div>
                <a class="card__link" href="#"> MÁS DETALLES </a>
            </div> `;

    })
    .join("");
   
  return templateCharacter;
};

const getCharacters = async () => {
  let url;

  if (urlNext === "" || urlNext === null) {
    url = URL_BASE + "/character";
  } else {
    url = urlNext;
  }

  let response = await fetch(url);
  response = await response.json();
  urlNext = response.info.next;
  return response.results;
};

const getMoreCharacters = () => {
  getCharacters().then((response) => {
    let charactersCards = formatCharactersCards(response);
    let sectionCards = document.getElementsByClassName("section__main")[0];
    sectionCards.innerHTML += charactersCards;
  });
};



