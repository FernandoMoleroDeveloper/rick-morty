const printDetailLocation = (url) => {
    getLocation(url).then(response => {
       let locationDetail = formatLocationDetail(response);
        mainContainer.innerHTML = `
            <section class="section">
                <h3 class="section__title">DETALLE LOCALIZACIÓN</h3>
                <section class="section__main">
                    ${locationDetail}
                </section>
            </section>

        `;
        addEventListenerToResident();
    });
}

const getLocation = async (url) => {
        let response = await fetch(url);
        let data = await response.json();
        console.log(data)
        data = formatDataLocation(data);
        
        return data;
}

const formatDataLocation = (data) => {
   

    let dataFormated = {
        id:data.id,
        name: data.name,
        img:data.image,
        type: data.type,
        dimension: data.dimension,
        residents:  mapResidents(data.residents),
        urlDetail: data.url
        }
    return dataFormated;
   
}

const mapResidents = (options) => {
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

const formatResidents = (option, options) =>{

    let htmlStruct = "";
    options.forEach(element => {
        htmlStruct += `  <img class="detail__img--character" src="${element.urlImg} ">`;
        })
        
        return htmlStruct;
} 


const formatLocationDetail = (location) => {
    let residents = formatResidents ('residents', location.residents)
    return `
    
    <div class="detail">
    <div class="detail__header">
    <h3 class="detail__title">${location.name}</h3>
    </div>
    <div class="detail__info">
        <div class="detail__container-b">
            <div class="detail__container--group">
            <p class="detail__info-title"> TIPO </p>
            <p class="detail__info--subtitle">${location.type}</p>
            </div>    
            <div class="detail__container--group">    
            <p class="detail__info-title"> DIMENSION </p>
            <p class="detail__info--subtitle"> ${location.dimension} </p>
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
 
const addEventListenerToResident = (characters) => {
    let optionLinks = [...document.getElementsByClassName("detail__img--character")];
    optionLinks.forEach((element,i) => {
        element.addEventListener('click', () => {
           
           printPage("PERSONAJES",characters[i].urlFetch);
        });
    });
}