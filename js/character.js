const printDetailCharacter = (url) => {
    getCharacter(url).then(response => {
        console.log(response)
       let characterDetail = formatCharacterDetail(response);
        mainContainer.innerHTML = `
            <section class="section">
                <h3 class="section__title">DETALLE PERSONAJE</h3>
                <section class="section__main">
                    ${characterDetail}
                </section>
            </section>

        `;
        let elementoStatus = document.getElementById(response.status.toLowerCase());
        elementoStatus.classList.add(`detail__status-container-normal--${response.status.toLowerCase()}`);
        addEventListenerToepisodes (response.episode);
    });
}



const getCharacter = async (url) => {
        let response = await fetch(url);
        let data = await response.json();
        console.log(data)
        data = formatDataCharacter(data);
        
        return data;
}

const formatDataCharacter = (data) => {
   

    let dataFormated = {
        id:data.id,
        name: data.name.toUpperCase(),
        img:data.image,
        status: data.status.toUpperCase(),
        origin: data.origin.name,
        species: data.species,
        locations: data.location.name,
        episode: mapEpisodes(data.episode, "episode"),
        urlDetail: data.url
        }
    return dataFormated;
   
}

const mapEpisodes = (arrayEpisodios) => {

    let nuevoArray = [];

    arrayEpisodios.forEach ((element, i) => {
        let ObjAux= {
            episode: element.replace("https://rickandmortyapi.com/api/episode/",""),
            url: element
        }
        nuevoArray.push(ObjAux)

    });

    return nuevoArray;
}

const formatEpisodes = (option, options) => {
    
    let htmlStructure = "";
    options.forEach(element => {
    htmlStructure += ` <button class="detail__episode-btn"> ${element.episode} </button>`;
    })
    
    return htmlStructure;
}

const formatCharacterDetail = (character) => {

  let episodes = formatEpisodes ('episodes', character.episode)
  console.log(episodes)
    return `
    
    <div class="detail">
        <div class="detail__header">
            <img class="detail__header--img" src="${character.img}">
            <p class="detail__header--title">${character.name} </p>
        </div>
            <div class="detail__info">
                <p class="detail__info-title"> ESTATUS </p>
                <div class="detail__status-container">
                    <p id= "alive" class="detail__status-container--normal "> ALIVE </p>
                    <p id="dead" class="detail__status-container--normal "> DEAD  </p>
                    <p id="unknown" class="detail__status-container--normal"> UNKNOWN </p>
                </div>
            <div class="detail__container-b">
                <div class="detail__container--group">
                    <p class="detail__info-title"> ESPECIE </p>
                    <p class="detail__info--subtitle"> ${character.species}</p>
                </div>    
                <div class="detail__container--group">    
                    <p class="detail__info-title"> ORIGEN </p>
                    <p class="detail__info--subtitle"> ${character.origin} </p>
                </div>    
                <div class="detail__container--group">
                    <p class="detail__info-title"> LOCALIZACION </p>
                    <p class="detail__info--localization"> ${character.locations} </p>
                </div>
            </div>
            <p class="detail__info-title"> EPISODIOS </p>
                <div class="detail__info--container">
                ${episodes}
                </div>
        </div>
    </div>   
    `;
}
 
const addEventListenerToepisodes = (episodes) => {
    let optionLinks = [...document.getElementsByClassName("detail__episode-btn")];
    optionLinks.forEach((element,i) => {
        element.addEventListener('click', () => {
            console.log(episodes[i])
           printPage("EPISODIOS",episodes[i].url);
        });
    });
}