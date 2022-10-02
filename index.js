const siteUrl = document.getElementById("siteUrl"),
      saveButton  = document.getElementById("saveButton"),
      saveSiteButton = document.getElementById("saveSiteButton"),
      delAllBtn = document.getElementById("DeleteData"),
      errorFillAll = document.getElementById("erorr"),
      savedCorrectly = document.getElementById("savedCorrectly"),
      listDimo = document.getElementById("urlList");
let urlList = [],
    dtIndex = 0;
// check old data to get
if(localStorage.getItem("urlList")){
    urlList = JSON.parse(localStorage.getItem("urlList"));
    render(urlList)
};
    // display data funcation 
function render(leads){
    let list = ""
    for(let i = 0; i < leads.length  ; i++){
        list += `
        <li class="list" >
        <a id="list" href="${leads[i]}" target='_blank'>
        ${leads[i]}</a><button class="delItem" id="dlItem" data-index="${i+1}">Delete</button>
        </li>
        `;
    }
    listDimo.innerHTML = list;
};

// save URL from input
saveButton.addEventListener("click", function(){
    if( siteUrl.value !== ""){
        errorFillAll.style = "display : none";
        savedCorrectly.style = "display : block";
        setTimeout(() => { savedCorrectly.style = "display", "none"; }, 5000);
        urlList.unshift(siteUrl.value)
        localStorage.setItem("urlList", JSON.stringify(urlList))
        siteUrl.value = "";
        render(urlList)
    }else{
        errorFillAll.style = "display : block";
        setTimeout(() => { errorFillAll.style = "display : none"; }, 5000);
    }
});

// save chrome tab URL 
saveSiteButton.addEventListener("click" , function(){
    chrome.tabs.query({active: true , currentWindow: true}, function(tabs){
        urlList.unshift(tabs[0].url)
        localStorage.setItem("urlList", JSON.stringify(urlList));
        render(urlList)
    })
})

//delete all items funcation
delAllBtn.addEventListener("dblclick" , function(){
    localStorage.clear();
    urlList = [];
    render(urlList)
});

//delete item funcation
const delBtn = document.getElementById("dlItem");
delBtn.addEventListener('click', function(){
    dtIndex = this.getAttribute('data-index');
    console.log(dtIndex)
    dtIndex = 0
            // urlList.splice(backIndex,1);
            // localStorage.setItem("urlList", JSON.stringify(urlList));
            // render(urlList)
})