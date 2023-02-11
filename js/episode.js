const printDetailEpisode = (url) => {
    getEpisode(url).then(response => {
        console.log(response)
       let episodeDetail = formatEpisodeDetail(response);
     
        mainContainer.innerHTML = `
            <section class="section">
                <h3 class="section__title">DETALLE EPISODIO</h3>
                <section class="section__main">
                    ${episodeDetail}
                </section>
            </section>

        `;
        addEventListenerToResidents (response.characters);
    });
}

const getEpisode = async (url) => {
        let response = await fetch(url);
        let data = await response.json();
        console.log(data)
        data = formatDataEpisode(data);
        
        return data;
}

const formatDataEpisode = (data) => {
   

    let dataFormated = {
        id:data.id,
        name: data.name,
        episode:data.episode,
        date: data.air_date,
        characters: mapResidents2(data.characters),
        urlDetail: data.url
        }
    return dataFormated;
   
}


const mapResidents2 = (options) => {
    let optionFormated = [];
    
    options.forEach( (element, i) =>{
        
        let auxObject = {
            urlImg: element.replace("character","character/avatar") + ".jpeg",
            urlFetch: element
        }

        optionFormated.push(auxObject)
    });
    return optionFormated;
}

const formatCharacters = (option, options) =>{

    let htmlStruct = "";
    options.forEach(element => {
        htmlStruct += `  <img class="detail__img--character" src="${element.urlImg} ">`;
        })
        
        return htmlStruct;
}


const formatEpisodeDetail = (episode) => {
 let residents = formatCharacters ('residents', episode.characters)
    return `
    
    <div class="detail">
    <div class="detail__header">
    <h3 class="detail__title">${episode.name}</h3>
    </div>
    <div class="detail__info">
        <div class="detail__container-b">
            <div class="detail__container--group">
            <p class="detail__info-title"> EPISODE </p>
            <p class="detail__info--subtitle">${episode.episode}</p>
            </div>    
            <div class="detail__container--group">    
            <p class="detail__info-title"> DATE </p>
            <p class="detail__info--subtitle"> ${episode.date} </p>
            </div>
        </div>
        <p class="detail__info-title"> RESIDENTES </p>
        <div class="detail__info--container">
        ${residents}
        </div>
    </div>
</div>
       
    `;
}
 
const addEventListenerToResidents = (characters) => {
    let optionLinks = [...document.getElementsByClassName("detail__img--character")];
    optionLinks.forEach((element,i) => {
        element.addEventListener('click', () => {
           
           printPage("PERSONAJES",characters[i].urlFetch);
        });
    });
}