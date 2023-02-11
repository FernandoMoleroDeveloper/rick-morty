const printEpìsodes = () => {
  getEpisodes().then((response) => {
    console.log(response);
    let episodesCards = formatEpisodesCards(response);
    mainContainer.innerHTML = `
        <section class="section">
              <h3 class="section__title">EPISODIOS</h3>
            <section class="section__main">
               ${episodesCards}
            </section>
        </section>
          `;

    addEventsToEpisodeLinks(response);
  });
};

const getEpisodes = async () => {
  let url = URL_BASE + "/episode/";
    
    let urlNext = null;
    let dataAll = [];
    do {
        let response = (urlNext !== null) ? await fetch(urlNext): await fetch(url);
        data = await response.json();
        dataAll = [...dataAll, ...data.results];
        urlNext = data.info.next;
      

    } while (urlNext !== null)
   
    let dataMaped = dataAll.map(element => {

      let objtAux = {

        date: element.air_date,
        name: element.name,
        temporada: element.episode.slice(0,3),
        url: element.url
      }
      
      return objtAux;
    })

    arrayGlobal=[];
    arrayTemporada=[];

    for (let i=0; i<dataMaped.length;i++){

      if ( i<dataMaped.length-1 && dataMaped[i].temporada === dataMaped[i+1].temporada){
        arrayTemporada.push(dataMaped[i])
      }else{
       arrayTemporada.push(dataMaped[i])
       arrayGlobal.push(arrayTemporada)
       arrayTemporada=[]
    } 
  }
    console.log(arrayGlobal)
    return dataMaped;
};



const formatEpisodesCards = (episode) => {

      return `
              <div class="card-episode">
                        <h4 class="card__temp-title"> ${episode.temporada} </h4>
                    <div class="card__date-container">
                        <p class="card__date-title"> DATE </p>
                        <p class="card__date-info"> ${episode.air_date} </p>
                    </div>
                    <p class="card__date-title"> EPISODES </p>
                    <div class="card__epi-btns">
                        <a class="card__link--epi" href="#"> ${episode.name} </a>
                        
                    </div>
                </div> `;
    
};

const addEventsToEpisodeLinks = (episodes) => {
  let cardLinks = [...document.getElementsByClassName("card__link--epi")];
  cardLinks.forEach((element, i) => {
    element.addEventListener("click", () => {
      printPage("EPISODIOS", episodes[i].url);
    });
  });
};
