import {selectedOption} from "../index.js";

const selected = selectedOption();

function setLists (data){
    const list = data;
    // remplir une liste déroulante 
    function fillOptionList (optionListName,options,optionListClass){
        let customOptionsDisplay = document.querySelector(optionListName);
        customOptionsDisplay.innerHTML = "";
        options.forEach(option => customOptionsDisplay.innerHTML+=`<span class="custom-option ${optionListClass}" data-value="${option}">${option}</span>`);
    }
    // filtrer la liste d'option 
    function filterOptionListe (TextName,optionListName,listeToFilter,params) {
        document.querySelector(TextName).addEventListener("input",function(){
            let liste = listeToFilter.filter(item => item.toLowerCase().indexOf(this.value.toLowerCase()) > -1);
            fillOptionList(optionListName,liste,params);
            selectedOption()
        })
    }
    // remplir la liste d'option Ingrédient 
    function setIngredientsList() {
        let listeIngredient = []
        list.forEach(element => element.ingredients.forEach(element =>{
            if(listeIngredient.indexOf(element.ingredient.toLowerCase())<0){
                listeIngredient.push(element.ingredient.toLowerCase());
            }
        }));    
        fillOptionList(".contenaireIngredients",listeIngredient,"ingredients");
        filterOptionListe(".ingredientsInput",".contenaireIngredients",listeIngredient,"ingedients");
        selectedOption();
    }
    // remplir la liste d'option Appareils
    function setAppareilsList (){
        let listeAppareils = []
        list.forEach(element =>{
            if(listeAppareils.indexOf(element.appliance.toLowerCase())<0){
                listeAppareils.push(element.appliance.toLowerCase());
            }
        });
        fillOptionList(".contenaireAppareils",listeAppareils,"appareils");
        filterOptionListe(".appareilsInput",".contenaireAppareils",listeAppareils,"appareils");
        selectedOption();
    }
    // remplir la liste d'option ustensils
    function setUstensilsList (){
        let listeUstensils = []
        list.forEach(element =>{
            element.ustensils.forEach(element =>{
                if(listeUstensils.indexOf(element.toLocaleLowerCase())<0){
                    listeUstensils.push(element.toLocaleLowerCase())
                }
            })
        });
        fillOptionList(".contenaireUstensils",listeUstensils,"ustensiles");
        filterOptionListe(".ustensilesInput",".contenaireUstensils",listeUstensils,"ustensiles");
        selectedOption();
    }
    return {setIngredientsList,setAppareilsList,setUstensilsList}
}

export default setLists;