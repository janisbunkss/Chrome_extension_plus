let myLeads = []

const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") ) 
console.log(leadsFromLocalStorage) // pārbaude
// lokālais tabs parāda kā jāformē url /////////////////////////////////////////////////////////////
// const tabs = [
//     {url: "https://www.linkedin.com/in/per-harald-borgen/"}
// ]
// tabBtn.addEventListener("click", function(){
//     myLeads.push(tabs[0].url)
//     //tabs pievienots array myLeads, lai pievienotu krātuvei JSONstringify atkal visu array 
//     localStorage.setItem("myLeads", JSON.stringify(myLeads) )
//     izveidoHTML(myLeads)
// })
// /////////////////////////////////////////////////////////////////////////////////////////////////

// 4) pārbauda vai krātuvē ir dati. (VSC live server logā dati ir redzami lidz tie ir vai nu nodzēsti ar clear, vai serveris tiek apturēts)
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    izveidoHTML(myLeads)
}

tabBtn.addEventListener("click", function(){
    // chrome.tabs API interact with the browser's tab system. You can use this API to create, modify, and rearrange tabs in the browser
    // chrome.tabs jautā 1) vai atvērtā tabula, 2) vai tajā pašā logā
    // ja tas ir true izpilda funkciju: paņem 'pirmās' tabulas url    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {        
    myLeads.push(tabs[0].url)
    //tabs pievienots array myLeads, lai pievienotu krātuvei JSONstringify atkal visu array 
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    izveidoHTML(myLeads)
    })
})


// 2)  izveido jaunu html elementu li, kurā ieraksta ievadītās string!!! vērtību
// universāla funkcija arrow elementu ierakstīšanai HTML li elementā
// izsaucot funkciju parametra leads vietā jāieraksta attiecigais parametrs, šoreiz array myLeads
function izveidoHTML(leads) {
    let listItems = ""      
    for (let i=0; i<leads.length; i++) {    
                listItems  +=   `<li> 
                                    <a href="${leads[i]}"target ="_blanc">
                                        ${leads[i]}
                                    </a>
                                </li>`
    }
    ulEl.innerHTML = listItems // papildina ul ar iveidoto li
}

 // atsevišķa funkcija krātuves notīrīšanai
deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    //null.innerHTML = " "
    izveidoHTML(myLeads)
})
// 1) nolasa input vērtību, pievieno to array myLeads, attīra input lauku jauniem ievadiem, iereksta krātuvē
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value) // nolasa input vērtību un pievieno virknei. input.value ir teksts, tātad string
    
    inputEl.value = " "         // n0tīra input lauku
    localStorage.setItem("myLeads", JSON.stringify(myLeads)) // ievieto stringu krātuvē. Tā kā myLeads ir array, tad to pārvērš par textu t.i. stringu

    izveidoHTML(myLeads)
    
    console.log(localStorage.getItem("myLeads"))
})





//vietējās krātuves pamatmetodes: set, get un clear
//localStorage.setItem("manaAtslēga", "ierakstiBurtus")
//console.log(localStorage.getItem("manaAtslēga"))
//localStorage.clear()

// truthy

// falsy values:
    // false
    // 0
    // ""
    // null -> how you as a developer signalize emptiness
    // undefined -> how JavaScript signalizes emptiness
    // NaN