const buttonSearch = document.getElementById("buttonSearch");
const searchId = document.getElementById("searchId");
const btnradio1 = document.getElementById("btnradio1");
const btnradio2 = document.getElementById("btnradio2");
const btnradio3 = document.getElementById("btnradio3");
const contenitore = document.getElementById("contenitore");
const ciao = document.getElementById("ciao");


buttonSearch.addEventListener("click", function(search) {
    search = searchId.value;

    fetch(`https://api.pexels.com/v1/search?query=${search}`, 
        {headers: {
            authorization: "ZyQrutNF9uvRtaS7930OvYBowhf5Wuzmy8JPIVOddA3WYhOAmTKORqHs"
        }}
    )
        .then(response => {return response.json()})

        .then(data => {
            //ESTRAGGO L'ARRAY
            array = data.photos;

            //CREO LA VARIABILE PER ROW
            const row = document.querySelector(".row");

            //CREO UN NUOVO ARRAY VUOTO IN CUI ANDRO AD INSERIRE GLI ELEMENTI FILTRATI
            let filtered = [];

            //FILTRO IN BASE A QUALE RADIO è STATA CLICCATA
            if (btnradio1.checked || btnradio2.checked) {
                if (btnradio1.checked) {
                    filtered = array.filter(element => element.height < 3000)
                } else {
                    filtered = array.filter(element => element.height < 4000)
                }        
            }  else {
                filtered = array;
            }

            //CREO UN NUOVO SINISTO CON MAP SOLO DELL'ALTEZZA DELLE IMMAGINI
            let map = filtered.map(elemento => elemento.height);

            //USO IL REDUCE PER FARE LA SOMMA DELLE ALTEZZE MAPPATE
            let somma = map.reduce((curr,num) => curr + num, 0);

            //INSERISCO IL VALORE DI SOMMA NELL'HTML
            ciao.innerText = `Total height: ${somma}`;

            //CREO LA CARD PER OGNI ELEMENTO FILTRATO
            filtered.forEach(element => {

                //CREO LA CARD
                let card = document.createElement("div");

                //AGGIUNGO LE CLASSI PER STILIZZARE LA CARD
                card.classList.add("card")
                card.classList.add("col")
                card.classList.add("p-0")
                card.style.width = "18rem";

                //INSERISCO IL CONTENUTO DELLA CARD ESTRAENDOLO DA OGNI ELEMENTO DELL'ARRAY FILTRATO CHE è UN OGGETTO
                card.innerHTML =
                `
                <img src="${element.src.original}" class="card-img-top" alt="${element.alt} style="height: 5rem;">
                <div class="card-body">
                    <p class="card-text"><a href="${element.url}" class="card-link link-dark link-underline link-underline-opacity-0 fw-bold ">"${element.alt}"</a></p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">photographer: <a href="${element.photographer_url}" class="card-link link-dark link-underline link-underline-opacity-0 fw-bold ">${element.photographer}</a></li>
                    <li class="list-group-item">height: ${element.height}</li>
                    <li class="list-group-item">width: ${element.width}</li>
                    <li class="list-group-item"><small class="fs-6">id: ${element.id}</small></li>
                </ul>
                `

                //INSERISCO LA CARD ALLA ROW
                row.appendChild(card);
                });

                //RESETTO TUTTO
                filtered = [];
                searchId.value = "";
                search = "";
                if (btnradio1.checked) {
                    btnradio1.checked = !btnradio1.checked;
                } else if (btnradio2.checked) {
                    btnradio2.checked = !btnradio2.checked;
                } else if (btnradio3.checked) {
                    btnradio3.checked = !btnradio3.checked;
                }
                map = [];
                somma = 0;
            })

        .catch(e => {console.error("Errore in jsonplaceholder:", e)})   
})
   