const fileToDownload = [];

const startDownloadElem = document.getElementById('startDownload');


const closeBtn = document.getElementById('closeBtn');
const modalPopupLayer = document.querySelector('.modal-popup-layer');
const modalBody = document.querySelector(".modal-body")

let modalYn = false;


multiFile("bigfile.zip");
multiFile("bigfile2.png");
multiFile("bigfile3.jpg");
multiFile("bigfile4.pptx");
multiFile("bigfile5.xlsx");


function multiFile(fileName) {
    fileToDownload.push(fileName);
}


closeBtn.addEventListener("click", () => {
    modalPopupLayer.style.display = 'none';
});



function modalPopupYn(modalYn){
    if(modalYn){
        modalPopupLayer.style.display = 'block';
    }else{
        modalPopupLayer.style.display = 'none'; 
    }
}

startDownloadElem.addEventListener('click', async () => {
    console.log("Download Started");
    modalYn = true;
    modalPopupYn(modalYn);
    startDownloadElem.setAttribute('disabled', 'true');
    const dataChunks = [];
    console.log("fileToDownload" , fileToDownload);
    await Promise.allSettled(fileToDownload.map((el) => fetch(el).then(response => {
            create(el);
            let reader = response.body.getReader();
            const totalSize =  Number(response.headers.get('content-length'));
            let totalSizeDownloaded = 0;
            function readData(){
                return reader.read().then(result =>{
                console.log("ResultVAlue" , result.value);
                if(result.value){
                    dataChunks.push(result.value);
                    totalSizeDownloaded += result.value.length;
                    const percantage = Math.floor((totalSizeDownloaded/totalSize) * 100);
                    console.log(`${totalSizeDownloaded}/${totalSize} (${percantage})`);
                    const downloadProgressElem =  document.querySelectorAll('.download-progress-bar__progress');
                    for(let i = 0; i < downloadProgressElem.length; i++){
                        downloadProgressElem[i].textContent = `${percantage}%`
                        downloadProgressElem[i].style.width = `${percantage}%`;
                    }

                }
                if(!result.done) {
                    return readData();
                }
            });
        }
        readData();
    }).then(() => {
        console.log('Download finished');
        let donwloadAnchor = document.createElement('a');
        //for(let i = 0; i < dataChunks.length; i++){
            let blob =  new Blob(dataChunks);
            donwloadAnchor.href = URL.createObjectURL(blob);
            donwloadAnchor.download =  el;
            document.body.appendChild(donwloadAnchor);
            donwloadAnchor.click();
            document.body.removeChild(donwloadAnchor);
        //}
    })
    .catch(() =>{
        downloadProgressElem.textContent = 'Download error';
        downloadProgressElem.classList.add('error');
    })
    .finally(()=>{
        //modalYn = false;
        //modalPopupYn(modalYn);
        startDownloadElem.removeAttribute('disabled');
    })));

});


function create(el){
    let li = document.createElement("li");
    let div = document.createElement('div');
    li.innerHTML = el; 
    div.innerHTML = '<div class="download-progress-bar__container"><div class="download-progress-bar__progress"></div></div>'                 
    li.appendChild(div);
    modalBody.append(li);
}