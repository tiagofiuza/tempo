function pegarData(){
var data = new Date();
var ano = data.getFullYear();
var dia = data.getDate();
var mes = data.getMonth();
var m = mes+1;
var day = data.getDay();
var arr = ["Domingo","Segunda-Feira","Terça-Feira","Quarta-Feira","Quinta-Feira","Sexta-Feira","Sabado"];
document.getElementById("datap").innerHTML = ""+dia+"/"+m+"/"+ano+"  "+arr[day];
};
/*-----------------------------------------------------------------------------------------------------------*/
function togglebutton(){
	$('input[type="checkbox"]').on('click', function(e) {
  $(this).parent().toggleClass('checked', $(this).prop('checked'));
});
}
/*-----------------------------------------------------------------------------------------------------------*/
function localizacao(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			/*Obtendo a cidade do usuário*/
			$(document).ready(function(){
				$.get( "http://maps.googleapis.com/maps/api/geocode/json?latlng="+position.coords.latitude + ","+position.coords.longitude+"",function(local){
					$(".cidade").html(local.results[3].formatted_address);
				});
			/*--------------------------*/
			/*Obtendo informações sobre o clima*/
			$.get(  "https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=b1f1e297557063f84b07484cbfd2ee87&units=metric",function(climate){
				$(".temperatura").html(climate.main.temp.toFixed(0)+"&ordmC");
				$(".clima").html(climate.weather[0].main);
				$(".humidade").html(climate.main.humidity+"%");
				$(".vento").html(climate.wind.speed+"m/s");
			/*--------------------------*/
			/*Conversão de Celsius para Fahrenheit*/
			var i = 0;
  			$("#convert").click(function(){
  				if(i == 0){
  				var cel = climate.main.temp;
  				var faren = (cel * 1.8) + 32;
  				$(".temperatura").html(faren.toFixed(0)+"&ordmF");	
  				i = 1;
  				i = 1;}else {	
  				$(".temperatura").html(climate.main.temp.toFixed(0)+"&ordmC");
  				i = 0;
  				}
  			/*-----------------------------------------*/	
  				});
  			/*Trocando papel de parede*/
  				var sid = console.log(climate.weather[0].id);
  				var id = parseInt(sid);
  				if(climate.weather[0].id >= 500 && climate.weather[0].id <= 531){
  					$("body").css("background-image", "url(img/rain.jpg)");
  					$(".container").css("background-color", "#000");
  					$(".fundo").css("background-color","#696969");
  					$(".cidade").css("background-color","#696969");
  					$(".toggle").css("color","#000");
  					$(".toggle .switch").css("background", "#000");

  				}
  				else if(climate.weather[0].id >= 801 && climate.weather[0].id <= 804){
  					$("body").css("background-image", "url(img/clouds.jpg)");
  					$(".container").css("background-color", "#696969");
  					$(".fundo").css("background-color","#BEBEBE");
  					$(".cidade").css("background-color","#BEBEBE");
  					$(".toggle").css("color","#BEBEBE");
  					$(".toggle .switch").css("background", "#BEBEBE");
  				}
  				else if(climate.weather[0].id == 800){
  					$("body").css("background-image", "url(img/clear-sky.jpg)");
  				}
  				else {
  					$("body").css("background-image", "url(img/clear-sky.jpg)");
  					$(".container").css("background-color", "#000");
  					$(".fundo").css("background-color","#696969");
  					$(".cidade").css("background-color","#696969");
  					$(".toggle").css("color","#000");
  					$(".toggle .switch").css("background", "#000");
  				}
  			/*----------------------------------------*/	
			});	
			});

		});
	}
}
