(function () {
  // start with retrieving the elements from the page, and then adding event handling. then write the logic. refer to the seasons example / homework
  var images = document.querySelectorAll('.data-ref');
  const httpRequest = new XMLHttpRequest();
  var appliedClass;

    function getCarData(){
      //make an AJAX call to the db; handle errors first;
      if(!httpRequest) {
        alert('giving up... your browser sucks!');
        return false;
      }

      httpRequest.onreadystatechange = processRequest;
      httpRequest.open('GET', './includes/functions.php?carModel=' + this.id);
      httpRequest.send();
    }

    function processRequest() {
     let reqIndicator = document.querySelector('.request-state');
     reqIndicator.textContent = httpRequest.readyState;
     //debugger;

     if (httpRequest.readyState === XMLHttpRequest.DONE) {
       if (httpRequest.status === 200) { // 200 means everything is awesome
         //debugger;
         let data = JSON.parse(httpRequest.responseText);
         processResult(data);
       } else {
         alert('There was a problem with the request.');
       }
     }
   }
   function processResult(data){
    console.log(data.modelName);
    const {modelName, pricing, modelDetails} = data;

    let model = document.querySelector('.modelInfo');
    let header = document.querySelector('.modelName').textContent = modelName;
    let price = document.querySelector('.priceInfo').innerHTML = pricing;
    let text = document.querySelector('.modelDetails').textContent = modelDetails;

    images.forEach(function(car, index){
      car.classList.add('nonActive');
    });
    document.querySelector(`#${data.model}`).classList.remove('nonActive');

    //different way of doing it
    //
    // header.textContent = data.modelName;
    // price.innerHTML = "$"+data.pricing;
    // text.textContent = data.modelDetails;
   }


  // function changeContent() {
  //   let model = document.querySelector('.modelInfo');
  //   let objIndex = carData[this.id];
  //
  //   for(let i=0; i < images.length; i++){
  //     images[i].classList.add('nonActive');
  //   }
  //   this.classList.remove('nonActive');
  //
  //   //add data
  //   header.textContent = objIndex.name;
  //   price.textContent = objIndex.price;
  //   text.textContent = objIndex.description;
  // }

  images.forEach(function(img, index){
    img.addEventListener('click', getCarData, false);
  });

  // changeContent.call(document.querySelector('#F55'));
  getCarData.call(document.querySelector('#F55'));
})();
