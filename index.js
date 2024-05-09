
let myLeads = [];
let inputBtn = document.getElementById('input-btn');
const ulel = document.getElementById('ul-el');
let inputEl = document.getElementById('input-el');
let tabBtn=document.getElementById('tab-btn');

const leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"));
// console.log(leadsFromLocalStorage);


if(leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage;
    renderLeads(myLeads);
}



tabBtn.addEventListener('click',function(){
    
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log(tabs);
        myLeads.push(tabs[0].url);
        localStorage.setItem('myLeads',JSON.stringify(myLeads));
        renderLeads(myLeads);
    });
   
})

function renderLeads(leads) {

    let listItems = '';
    for (let i = 0; i < leads.length; i++) {

        // console.log(arr[i]);
        // listItems += "<li><a  target='_blank' href='"+arr[i]+"'>" + arr[i]+"</a></li>";
        listItems +=
            `<li>
             <a target='_blank' href='${leads[i]}'>
                     ${leads[i]}
             </a>
         </li>
                        
        `
        // console.log(listItems);
        //    const lis=document.createElement('li');
        //    lis.textContent=arr[i];
        //    ulel.append(lis);

    }
    ulel.innerHTML = listItems;
}
const deleteBtn= document.getElementById("delete-btn");
deleteBtn.addEventListener("dblclick",function(){
    console.log("Double Clicked");
    localStorage.clear();
    myLeads=[];
    renderLeads(myLeads);
})

inputBtn.addEventListener('click', function () {
    myLeads.push(inputEl.value);
    inputEl.value = ""
    localStorage.setItem("myLeads",JSON.stringify(myLeads));
    renderLeads(myLeads);
    // arr.pop(inputEl);
    // console.log(arr);
    // console.log(localStorage.getItem("arr"));

})

