// var cors = 'https://cors-anywhere.herokuapp.com/';
var data;
var str = "";
var datalink = "https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97";
var xhr = new XMLHttpRequest();
xhr.open("get", datalink , true);
xhr.send(null);
xhr.onload = function(){ //onreadystatechange
    if(xhr.status === 200){   //xhr.readyState === 4 && xhr.status == 200
        str = JSON.parse(xhr.responseText);
        data = str.result.records;
    } 
    else {
        console.log('錯誤');
    }
    getsingleArea();
};

// DOM元素設定
var domSelect = document.querySelector(".areaselect"); //區域選擇
var domList = document.querySelector(".hotarealist"); //熱門行政區
var title = document.querySelector(".content-title"); //conten內區域名稱
var list = document.querySelector(".list"); //景點區塊全域


//監聽
domSelect.addEventListener("change", selectChangeFun, false); 
domList.addEventListener("click", listFun, false); 



//篩選地區
function selectChangeFun(e) {
    var areaStr = "";
    e.preventDefault();
    title.textContent = domSelect.value;
    areaStr = domSelect.value;
    updataList(areaStr);
}


// 挑選行政區
function getsingleArea() {
    var totalArea = [];
    for (var i = 0; i < data.length; i++) {
        totalArea.push(data[i].Zone);
    }
    var zoneStr = "";
    ZoneArea = [...(new Set(totalArea))];
    console.log(ZoneArea); 
    for (var i = 0; i < ZoneArea.length; i++) {
        if (i == 0) {
        zoneStr += `<option value="" disabled selected="selected">--請選擇行政區--</option>`;
    } else {
        zoneStr += `<option value="${ZoneArea[i]}">${ZoneArea[i]}</option>`;
    }
    }
    domSelect.innerHTML = zoneStr;
}


// 置入至areacontent
function updataList(areaStr) {
    var placeStr = "";
    for (var i = 0; i < data.length; i++) {
        if (data[i].Zone === areaStr) {
        placeStr += `<div class="listbox">
        <div class="card">
        
            <span class="img-title">${data[i].Name}</span>
            <span class="img-area"> ${data[i].Zone}</span>
            <div class="card-img-cover bg-cover" style="background:url(${data[i].Picture1})"></div>
        <div class="card-text">
            <ul>
                <li class="card-opentime"><i class="far fa-clock"></i> ${data[i].Opentime}</li>
                <li class="card-address"><i class="fas fa-map-marker-alt"></i> ${data[i].Add}</li>
                <li class="card-tel"><i class="fas fa-mobile-alt"></i> ${data[i].Tel}</li>
                <span class="card-ticket"><i class="fas fa-tag"></i> ${data[i].Ticketinfo}</span>
                
            </ul>
        </div>
        </div>
        </div>`;
    }
    // console.log(placeStr);
    title.innerHTML = areaStr;
    list.innerHTML = placeStr;
    }
}


// 更新熱門行政區
function listFun(e) {
    e.preventDefault();
    console.log(e.target.nodeName)
    if (e.target.nodeName != "A") { 
        return
    }
    
    areaStr = e.target.innerHTML
    updataList(areaStr)
}

