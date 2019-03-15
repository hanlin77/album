

var id18810854185 = {
    "id": "18810854185",
    "eMail": "136655493@qq.com",
    "name": "Lena",
    "head": "image/touxiang.jpg"
}

//导航栏三个按钮
var headerBtns = document.getElementById("rightDiv").getElementsByTagName("span");
var filterBox = document.getElementsByClassName("filterDiv")[0];
var squareBox = document.getElementsByClassName("contentDiv")[0];
var myBox = document.getElementsByClassName("myDiv")[0];
var albumGroup = document.getElementsByClassName("albumGroup")[0];

albumGroup.style.marginTop = 0;

function btnSelected(x) {
    for (let y = 0; y < headerBtns.length; y++) {
        headerBtns[y].className = "headerLink";
    }
    headerBtns[x].className = "headerLink selected";
}

let filterMove;

headerBtns[0].onclick = () => {

    //删除所有筛选条件
    let selectedPosition = filterBox.getElementsByClassName("selectedPosition");
    let selectedTab = filterBox.getElementsByClassName("selectedTab");
    for(let i=1; i<selectedPosition.length; i++) {
        removeSelected(selectedPosition[i].children[0], selectedPositions);
    }
    for(let j=1; j<selectedTab.length; j++) {
        removeSelected(selectedTab[j].children[0], selectedTabs);
    }
    selectedMonths = [];
    let filterMonthLi = document.getElementsByClassName("filterMonthDiv")[0].getElementsByTagName("li");
    for(let i=0; i<filterMonthLi.length; i++) {
        filterMonthLi[i].className = "";
    }
    pureFilter();
    
    clearInterval(filterMove);
    btnSelected("0");
    squareBox.style.display = "block";
    filterBox.style.display = "none";
    myBox.style.display = "none";
    albumGroup.style.marginTop = "0";
}

function openFilterBox() {
    btnSelected("1");
    squareBox.style.display = "block";
    filterBox.style.display = "block";
    myBox.style.display = "none";
    
    if (parseInt(albumGroup.style.marginTop) === 0) {
        albumGroup.style.marginTop =(-filterBox.offsetHeight-40)+"px";
        filterMove = setInterval(() => {
            if (parseInt(albumGroup.style.marginTop) >= -5) {
                clearInterval(filterMove);
                albumGroup.style.marginTop = "-5px";
            }
            else {
                albumGroup.style.marginTop = parseInt(albumGroup.style.marginTop) + 5 + "px";
            }
        }, 15);
    }
    else { null; }
}

headerBtns[1].onclick = () => {
    openFilterBox();
}

headerBtns[2].onclick = () => {
    btnSelected("2");
    squareBox.style.display = "none";
    myBox.style.display = "block";
    albumGroup.style.marginTop = "-5px";
}

//把数据插入html


function showAlbum(info, where) {

    var albumSections = where.getElementsByClassName("albumSection");
    for (let i = 0; i < info.length; i++) {

        //复制section容器
        where.appendChild(albumSections[0].cloneNode(true));
        albumSections[i + 1].style.display = "block";

        //photo
        let photoScroll = albumSections[i + 1].getElementsByClassName("photoScroll")[0];
        for (let j = 0; j < info[i].src.length; j++) {
            let photoImg = document.createElement("img");
            photoScroll.appendChild(photoImg);
            photoScroll.getElementsByTagName("img")[j].src = info[i].src[j];
        }
        photoScroll.appendChild(document.createElement("p"));
        let afterLastPhoto = photoScroll.getElementsByTagName("p")[0];
        afterLastPhoto.className = "afterLastPhoto";
        afterLastPhoto.innerHTML = "拍摄于<br>"+info[i].takePictureTime;


        //position
        let position = albumSections[i + 1].getElementsByClassName("position")[0].getElementsByTagName("span")[1];
        position.innerHTML = info[i].position;

        //tab
        albumSections[i + 1].getElementsByClassName("tab")[0].getElementsByClassName("tabContent")[0].innerHTML = info[i].tab[0];
        for (let k = 1; k < info[i].tab.length; k++) {
            let tabGroup = albumSections[i + 1].getElementsByClassName("tabGroup")[0];
            let tabBox = tabGroup.getElementsByClassName("tab")[0];
            tabGroup.appendChild(tabBox.cloneNode(true));
            albumSections[i + 1].getElementsByClassName("tab")[k].getElementsByClassName("tabContent")[0].innerHTML = info[i].tab[k];
        }

        //author
        let authorBox = albumSections[i + 1].getElementsByClassName("author")[0];
        authorBox.getElementsByTagName("img")[0].src = info[i].author.head;
        authorBox.getElementsByClassName("authorName")[0].innerHTML = info[i].author.name;
    }
    
}


showAlbum(albumInfo, albumGroup);

//筛选

var filterInputs = filterBox.getElementsByTagName("input");
var filterBtns = filterBox.getElementsByTagName("button");

var selectedPositions = [];
var selectedTabs = [];
var selectedMonths = [];

function pureFilter() {

    var albumSections = albumGroup.getElementsByClassName("albumSection");

    for (let i = 0; i < albumInfo.length; i++) {

        let positionNum = 0;
        let tabNum = 0;
        let monthNum = 0;

        for (let j = 0; j < selectedPositions.length; j++) {
            if (albumInfo[i].position.indexOf(selectedPositions[j]) === -1) {
                positionNum++;
            }
        }

        for (let j = 0; j < selectedTabs.length; j++) {
            if (albumInfo[i].tab.join("，").indexOf(selectedTabs[j]) === -1) {
                tabNum++;
            }
        }

        for(let k = 0; k < selectedMonths.length; k++) {
            if((albumInfo[i].takePictureTime[5]+albumInfo[i].takePictureTime[6]).indexOf(selectedMonths[k]) === -1) {
                monthNum++;
            }
            else {
                monthNum = 0;
                break;
            }
        }

        if (positionNum === 0 && tabNum === 0 && monthNum === 0) {
            albumSections[i+1].style.display = "block";
        }
        else {
            albumSections[i+1].style.display = "none";
        }
    }
    function scrollToTop(){
        let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        let header0 = document.getElementById("header0");
        if (currentScroll > header0.offsetHeight + 20) {
             window.requestAnimationFrame(scrollToTop);
             window.scrollTo (0,currentScroll - (currentScroll/5));
        }
    }
    scrollToTop();
}

//地点筛选
function positionFilter(value) {

    //右侧selected
    if (selectedPositions.toString().indexOf(value) === -1) {
        var selectedPositionBox = filterBox.getElementsByClassName("selectedPositionDiv")[0];
        var selectedPosition = filterBox.getElementsByClassName("selectedPosition");

        selectedPositionBox.appendChild(selectedPosition[0].cloneNode(true));

        var selectedPositionText = selectedPosition[selectedPosition.length - 1].getElementsByTagName("span")[0];

        selectedPosition[selectedPosition.length - 1].style.display = "inline-block";
        selectedPositionText.innerHTML = value;

        selectedPositions.push(value);
    }
    else { null; }
    //筛选
    pureFilter();

}

//标签筛选
function tabFilter(value) {

    //右侧selected
    if (selectedTabs.toString().indexOf(value) === -1) {
        var selectedTabBox = filterBox.getElementsByClassName("selectedTabDiv")[0];
        var selectedTab = filterBox.getElementsByClassName("selectedTab");

        selectedTabBox.appendChild(selectedTab[0].cloneNode(true));

        var selectedTabText = selectedTab[selectedTab.length - 1].getElementsByTagName("span")[0];

        selectedTab[selectedTab.length - 1].style.display = "inline-block";
        selectedTabText.innerHTML = value;

        selectedTabs.push(value);
    }
    else { null; }
    //筛选
    pureFilter();

}

//时间筛选

function monthFilter() {

    var filterMonthLi = document.getElementsByClassName("filterMonthDiv")[0].getElementsByTagName("li");
    
    for(let i=0; i<filterMonthLi.length; i++) {
        let index = i<9 ? "0"+(i+1) : i+1;
        filterMonthLi[i].onclick = () => {
            if(!filterMonthLi[i].className) {
                filterMonthLi[i].className = "selectedMonth";
                selectedMonths.push(index.toString());
                pureFilter();
            }
            else {
                filterMonthLi[i].className = "";
                let cancelMonth = selectedMonths.indexOf(index.toString());
                selectedMonths.splice(cancelMonth, 1);
                pureFilter();
            }
        }
    }
}

monthFilter();


filterBtns[0].onclick = () => {
    positionFilter(filterInputs[0].value);
    filterInputs[0].value = "";
}
filterBtns[1].onclick = () => {
    tabFilter(filterInputs[1].value);
    filterInputs[1].value = "";
}
function positionOnkeypress() {
    if(event.keyCode === 13) {
        positionFilter(filterInputs[0].value);
        filterInputs[0].value = "";
    }
}
function tabOnkeypress() {
    if(event.keyCode === 13) {
        tabFilter(filterInputs[1].value);
        filterInputs[1].value = "";
    }
}

//点击地点和标签，展开筛选box并筛选

function clickAlbumFilter() {

    var albumPositions = document.getElementsByClassName("position");
    var albumTabs = document.getElementsByClassName("tab");
    
    for(let i=0; i<albumPositions.length; i++) {
        albumPositions[i].onclick = () => {
            openFilterBox();
            let positionContent = albumPositions[i].getElementsByClassName("positionContent")[0];
            positionFilter(positionContent.innerHTML);
        }
    }
    
    for(let i=0; i<albumTabs.length; i++) {
        albumTabs[i].onclick = () => {
            openFilterBox();
            let tabContent = albumTabs[i].getElementsByClassName("tabContent")[0];
            tabFilter(tabContent.innerHTML);
        }
    }
}

clickAlbumFilter();

//热门关键词

var hotPositions = filterBox.getElementsByClassName("hotKeywordsDiv")[0].getElementsByTagName("p");
var hotTabs = filterBox.getElementsByClassName("hotKeywordsDiv")[1].getElementsByTagName("p");



for(let i=0; i<hotPositions.length; i++) {
    hotPositions[i].onclick = () => {
        positionFilter(hotPositions[i].innerHTML);
    }
}

for(let i=0; i<hotTabs.length; i++) {
    hotTabs[i].onclick = () => {
        tabFilter(hotTabs[i].innerHTML);
    }
}

//删除关键词

function removeSelected(obj, arr) {
    obj.parentNode.parentNode.removeChild(obj.parentNode);
    let cancelkeyword = arr.indexOf(obj.previousSibling.innerHTML);
    arr.splice(cancelkeyword, 1);
}

function cancelSelectedPosition(obj){
    obj.parentNode.className = "selectedPosition cancelingKeyword"
    setTimeout( () => {
        removeSelected(obj, selectedPositions);
        pureFilter();
    }, 200);
}

function cancelSelectedTab(obj){
    obj.parentNode.className = "selectedTab cancelingKeyword"
    setTimeout( () => {
        removeSelected(obj, selectedTabs);
        pureFilter();
    }, 200);

}

//myDiv

myBox.getElementsByClassName("headImg")[0].src = id18810854185.head;
myBox.getElementsByClassName("myName")[0].innerHTML = id18810854185.name;

//转动导航栏

var myMenu = myBox.getElementsByClassName("myMenu")[0];
var myMenuCircle = myBox.getElementsByClassName("myMenuCircle")[0];
var myContentBoxs = myBox.getElementsByClassName("myContentDiv")[0].children;

function myNavTurn() {
    var myNavs = myMenuCircle.getElementsByTagName("span");
    
    function getDeg(x, y) {
        let deg = Math.round(Math.atan(x/y) / (Math.PI / 180));
        if(y < 0 && x >= 0) {
            return deg + 180;
        }
        else if(y < 0 && x < 0) {
            return deg - 180;
        }
        else {
            return deg;
        }
    }

    function standardDeg(deg) {

        if(deg >= 180) {
            return deg - 360;
        }
        else if(deg < -180) {
            return deg + 360;
        }
        else {
            return deg;
        }
    }

    function areaX(finallyDeg) {
        let x = 0;
        if(finallyDeg >= -36 && finallyDeg < 36) {
            x = 0;
        }
        else if(finallyDeg >= 36 && finallyDeg < 108) {
            x = 1;
        }
        else if(finallyDeg >= 108 && finallyDeg < 180) {
            x = 2;
        }
        else if(finallyDeg >= -180 && finallyDeg < -108) {
            x = 3;
        }
        else if (finallyDeg >= -108 && finallyDeg < -36){
            x = 4;
        }
        else {
            console.log("areaX-false");
        }
        return x;
    }


    for(let i=0; i<myNavs.length; i++) {
        myNavs[i].onmousedown = (event) => {
            let currentTransform = window.getComputedStyle(myMenuCircle, null).getPropertyValue("transform");
            let transformArr = currentTransform.split("(")[1].split(",");
            let originalDeg = getDeg(transformArr[1], transformArr[0]);

            let scrollX = document.documentElement.scrollLeft;
            let scrollY = document.documentElement.scrollTop;
            let x = -myMenu.offsetLeft-myBox.offsetLeft-100+scrollX;
            let y = 100+myMenu.offsetTop+myBox.offsetTop-scrollY;
            let userOriDeg = getDeg(event.clientX+x, y-event.clientY);
            let addDeg = originalDeg - userOriDeg;

            let finallyDeg = 0;

            document.onmousemove = (event) => {
                finallyDeg = standardDeg(addDeg + getDeg(event.clientX+x, y-event.clientY));

                myMenuCircle.style.transform = "rotate(" + finallyDeg + "deg)";
                for(let j=0; j<myNavs.length; j++) {
                    myNavs[j].style.transform = "rotate(" + -finallyDeg + "deg)";
                    myNavs[j].style.fontWeight = "400";
                }
                myNavs[areaX(finallyDeg)].style.fontWeight = "800";

                document.onmouseup = () => {
                    document.onmousemove = null;
    
                    function selectedMyNav(targetDeg) {
                        let selectedMyNavMove = setInterval(() => {
                            let currentTransform = window.getComputedStyle(myMenuCircle, null).getPropertyValue("transform");
                            let transformArr = currentTransform.split("(")[1].split(",");
                            let currentDeg = standardDeg(getDeg(transformArr[1], transformArr[0]));
    
                            let speed = (targetDeg - currentDeg) / 8;
                            myMenuCircle.style.transform = "rotate(" + (currentDeg + speed) + "deg)";
                            for(let k=0; k<myNavs.length; k++) {
                                myNavs[k].style.transform = "rotate(" + -(currentDeg + speed) + "deg)";
                            }
    
                            if(Math.abs(speed) < 0.6) {
                                clearInterval(selectedMyNavMove);
                                myMenuCircle.style.transform = "rotate(" + targetDeg + "deg)";
                                for(let k=0; k<myNavs.length; k++) {
                                    myNavs[k].style.transform = "rotate(" + -targetDeg + "deg)";
                                }
                            }
                        }, 20);
                    }
    
                    let targetDegs = [0, 72, 144, -144, -72];
                    selectedMyNav(targetDegs[areaX(finallyDeg)]);
    
                    for(let l=0; l<myContentBoxs.length; l++) {
                        myContentBoxs[l].style.display = "none";
                    }
                    myContentBoxs[areaX(finallyDeg)].style.display = "block";
                }
            }
        }
    }

    for(let i=0; i<myNavs.length; i++) {

        myNavs[i].ontouchstart = (event) => {
            let currentTransform = window.getComputedStyle(myMenuCircle, null).getPropertyValue("transform");
            let transformArr = currentTransform.split("(")[1].split(",");
            let originalDeg = getDeg(transformArr[1], transformArr[0]);

            let scrollX = document.documentElement.scrollLeft;
            let scrollY = document.documentElement.scrollTop;
            let x = -myMenu.offsetLeft-myBox.offsetLeft-100+scrollX;
            let y = 100+myMenu.offsetTop+myBox.offsetTop-scrollY;
            let touch = event.touches[0];
            let userOriDeg = getDeg(touch.pageX+x, y-touch.pageY);
            let addDeg = originalDeg - userOriDeg;

            let finallyDeg = 0;

            myNavs[i].ontouchmove = (event) => {

                myNavs[i].addEventListener('touchmove', function(event) {
                    // 判断默认行为是否可以被禁用
                    if (event.cancelable) {
                        // 判断默认行为是否已经被禁用
                        if (!event.defaultPrevented) {
                            event.preventDefault();
                        }
                    }
                }, false);
            
                touch = event.touches[0];
                finallyDeg = standardDeg(addDeg + getDeg(touch.pageX+x, y-touch.pageY));

                myMenuCircle.style.transform = "rotate(" + finallyDeg + "deg)";
                for(let j=0; j<myNavs.length; j++) {
                    myNavs[j].style.transform = "rotate(" + -finallyDeg + "deg)";
                    myNavs[j].style.fontWeight = "400";
                }
                myNavs[areaX(finallyDeg)].style.fontWeight = "800";

                myNavs[i].ontouchend = () => {
                    document.onmousemove = null;
    
                    function selectedMyNav(targetDeg) {
                        let selectedMyNavMove = setInterval(() => {
                            let currentTransform = window.getComputedStyle(myMenuCircle, null).getPropertyValue("transform");
                            let transformArr = currentTransform.split("(")[1].split(",");
                            let currentDeg = standardDeg(getDeg(transformArr[1], transformArr[0]));
    
                            let speed = (targetDeg - currentDeg) / 8;
                            myMenuCircle.style.transform = "rotate(" + (currentDeg + speed) + "deg)";
                            for(let k=0; k<myNavs.length; k++) {
                                myNavs[k].style.transform = "rotate(" + -(currentDeg + speed) + "deg)";
                            }
    
                            if(Math.abs(speed) < 0.6) {
                                clearInterval(selectedMyNavMove);
                                myMenuCircle.style.transform = "rotate(" + targetDeg + "deg)";
                                for(let k=0; k<myNavs.length; k++) {
                                    myNavs[k].style.transform = "rotate(" + -targetDeg + "deg)";
                                }
                            }
                        }, 20);
                    }
    
                    let targetDegs = [0, 72, 144, -144, -72];
                    selectedMyNav(targetDegs[areaX(finallyDeg)]);
    
                    for(let l=0; l<myContentBoxs.length; l++) {
                        myContentBoxs[l].style.display = "none";
                    }
                    myContentBoxs[areaX(finallyDeg)].style.display = "block";
                }
            }
        }
    }
}

myNavTurn();


//我的相册中的数据导入

var myAlbumContent = myContentBoxs[0].getElementsByClassName("myAlbumContent")[0];
var myAlbumInfo = [];

for(let i=0; i<albumInfo.length; i++) {
    if(albumInfo[i].author.id === id18810854185.id) {
        myAlbumInfo.push(albumInfo[i]);
    }
}

showAlbum(myAlbumInfo, myAlbumContent);

clickAlbumFilter();


