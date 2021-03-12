  
const menuBtn = document.querySelector(".menu-btn");
const cancelBtn = document.querySelector(".cancel-btn");
menuBtn.onclick = ()=>{
  navbar.classList.add("show");
  menuBtn.classList.add("hide");
  body.classList.add("disabled");
}
cancelBtn.onclick = ()=>{
  body.classList.remove("disabled");
  navbar.classList.remove("show");
  menuBtn.classList.remove("hide");
}
window.onscroll = ()=>{
  this.scrollY > 20 ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");
}


 //filter functionality on travel cards
 let $travelItems = $('.travel-items').isotope({
  itemSelector:'.travel-item',
})

$('.filter a').on("click" , function(event){
  event.preventDefault();
  var value = $(this).attr('data-name');
  console.log(value);
  console.log($travelItems)
  $travelItems.isotope({
    filter : value
    
  })
})

const body = document.querySelector("body");
const navbar = document.querySelector(".navbar");



const display = new Display();

const store = new Store();

//add a bboking info on submit
document.getElementById('travel-booking-form').addEventListener('submit', function(event){

  //prevent submission without inputs
  event.preventDefault();

    const location = document.querySelector('#location');
    const checkIn  = document.querySelector('#checkin');
    const checkOut = document.querySelector('#checkout');
    const noPeople = document.querySelector('#nopeople');

  //create an object for the constructor function
  const booking = new Booking(this.location.value, this.checkin.value, this.checkout.value,this.nopeople.value );

  //validate input fields
  display.validateField(booking,store);


});

//display constructor function
function Display(){
  this.location = document.querySelector('#location');
  this.checkIn = document.querySelector('#checkin');
  this.checkOut = document.querySelector('#checkout');
  this.noPeople = document.querySelector('#nopeople');
  this.bookings = document.getElementById("book");;
  
}

//pizza constructor function
function Booking(location,checkIn,checkOut,noPeople){
  this.location = location
  this.checkIn = checkIn;
  this.checkOut = checkOut;
  this.noPeople = noPeople;
  
}
//Local storage constructor
function Store(){

}


//checking validation for fields
Display.prototype.validateField = function(booking,store){
  //check if inputs are empty

 

  if(this.location.value === '' ||this.checkIn.value === ''|| this.checkOut.value  === ''|| this.noPeople.value  === ''){
      alert("Please fill all fields");

  }else{
      alert("You have successfully made your Booking Order");
      this.clearFields();
      this.addBooking(booking);
      store.addBookings(booking);
  }
}

Display.prototype.addBooking = function(booking){

  let bookingPrice=0;
  if(booking.location == 'Nairobi National Park' ){
      bookingPrice = 2500;
  }else if(booking.location == 'Malindi'){
      bookingPrice = 20000;
  }else if(booking.location == 'Diani'){
      bookingPrice = 20000;
  }else if(booking.location == 'Sagana'){
    bookingPrice = 5500;
  }else if(booking.location == 'Mt.Longonot' ){
    bookingPrice = 2000;
   }else if(booking.location == 'Mt.Aberdares'){
    bookingPrice = 7000;
   }else if(booking.location == 'Lamu'){
    bookingPrice = 50,000;
   }else if(booking.location == 'Chalbi'){
    bookingPrice = 100000;
   }else if(booking.location == 'Nanyuki'){
    bookingPrice = 17000;
  }else if(booking.location == 'Mombasa'){
      bookingPrice = 12000;
  }else if(booking.location == 'Amboseli'){
    bookingPrice = 36000;
  }else if(booking.location == 'Kisumu' ){
    bookingPrice = 15000;
  }else if(booking.location == 'Mt.Kenya'){
    bookingPrice = 12925;
  }else if(booking.location == 'Naivasha'){
    bookingPrice = 8000;
  }else if(booking.location == 'Maasai Mara'){
    bookingPrice = 10000;
  }
   else{
    bookingPrice = 0;
  }
  let totalPrice = booking.noPeople * bookingPrice;



const tableRow = document.createElement('tr')
 
  //appending new booking info to the booking list.
  tableRow.innerHTML= `
  <tr>
  <td id="bookingLocation">${booking.location}</td>
  <td id="bookingCheckIn">${booking.checkIn}</td>
  <td id="bookingCheckOut">${booking.checkOut}</td>
  <td id="bookingNoPeople">${booking.noPeople}</td>
  <td >KES  <span>${bookingPrice}</span></td>
  <td >KES  <span id="bookingPrice">${totalPrice}</span></td>
  </tr>
  `;
  this.bookings.appendChild(tableRow);
  this.showTotals();

}


Display.prototype.showTotals = function(){
  //an array to get the totals for the item count and item price
  const totals = [];
  const itemPrice = document.querySelectorAll('#bookingPrice');
  
  itemPrice.forEach((item)=>{
      //pushing items to my array using the .push Javascript array method
      totals.push(item.textContent)
      console.log(item.textContent)
  })
  console.log(itemPrice)
  console.log(totals)
  
  let intTotals = totals.map((i)=>Number(i));
  console.log(intTotals)
  
  let totalMoney = intTotals.reduce(function(a,b){
      return a+b;
  },0)
  console.log(totalMoney)
  document.querySelector('.total-price').textContent = totalMoney;

}

Display.prototype.clearFields = function(){
  this.location.value = '';
  this.checkIn.value = '';
  this.checkOut.value = '';
  this.noPeople.value = '';
}

Store.prototype.getBookings= function(){
  let bookings;
  if(localStorage.getItem('bookings') === null){
      bookings = []
  }else{
      bookings = JSON.parse(localStorage.getItem('bookings'))
      console.log("Got Bookings")
  }
  console.log("getBoookings successfully runned ")
  return bookings;
  

}

Store.prototype.addBookings = function(booking){
  let bookings = this.getBookings();
  bookings.push(booking);

  localStorage.setItem('bookings' ,JSON.stringify(bookings))
  console.log("addBookings successfully runned")
}

Display.prototype.displayBookings = function(){
  const bookings = store.getBookings();

  bookings.forEach((booking)=>{
      this.addBooking(booking);
  })
  console.log("display bookings successfully runned")
}

document.addEventListener('DOMContentLoaded', 
display.displayBookings())

document.querySelector("#btnClear").addEventListener('click', function(){
  let response = prompt("Are you sure you want to cancel your bookings? YES / NO ").toUpperCase() ;
//  let response = res.toUppercase();
  if(response === 'YES'){
    window.localStorage.removeItem('bookings');
    window.location.reload();
  }

  

});

$(document).ready(function(){
       
       
  $('#bookings-total').hide()
  $('#btnClear').hide()
 
  $('#btnCheckout').click(function(){

    if(window.localStorage.getItem('bookings') === null){
      $('#btnClear').hide();
      alert("No Travel Packages Booked ! ")

    }else if( (window.localStorage.getItem('bookings') !== null)){
      $('#btnClear').show()
      $('#bookings-total').show()


    }else{
      $('#bookings-total').show()


    }
    
  });
})






