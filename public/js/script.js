/* Author: Luke Steensen

*/

String.prototype.toCamel = function(){
  return this.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
};

var client = new Faye.Client('/faye');

var frontDriverTireTemp       = new TimeSeries();
var frontDriverAmbientTemp    = new TimeSeries();
var frontPassengerTireTemp    = new TimeSeries();
var frontPassengerAmbientTemp = new TimeSeries();
var rearDriverTireTemp        = new TimeSeries();
var rearDriverAmbientTemp     = new TimeSeries();
var rearPassengerTireTemp     = new TimeSeries();
var rearPassengerAmbientTemp  = new TimeSeries();

var data_sub = client.subscribe('/data', function(message) {
  $('#' + message.name).html(message.value + message.units);
  // eval(message.name.toCamel()).append(message.time, message.value);
  eval(message.name.toCamel()).append(Date.now(), message.value);
});

function createTimeline() {
  var chart0 = new SmoothieChart();
  chart0.addTimeSeries(frontDriverAmbientTemp, { strokeStyle: 'rgba(0, 0, 255, 1)', fillStyle: 'rgba(0, 0, 255, 0.2)', lineWidth: 2 });
  chart0.addTimeSeries(frontDriverTireTemp, { strokeStyle: 'rgba(255, 0, 0, 1)', fillStyle: 'rgba(255, 0, 0, 0.2)', lineWidth: 4 });
  chart0.streamTo(document.getElementById("front-driver-tire-temp-chart"), 500);

  var chart1 = new SmoothieChart();
  chart1.addTimeSeries(frontPassengerAmbientTemp, { strokeStyle: 'rgba(0, 0, 255, 1)', fillStyle: 'rgba(0, 0, 255, 0.2)', lineWidth: 2 });
  chart1.addTimeSeries(frontPassengerTireTemp, { strokeStyle: 'rgba(255, 0, 0, 1)', fillStyle: 'rgba(255, 0, 0, 0.2)', lineWidth: 4 });
  chart1.streamTo(document.getElementById("front-passenger-tire-temp-chart"), 500);

  var chart2 = new SmoothieChart();
  chart2.addTimeSeries(rearDriverAmbientTemp, { strokeStyle: 'rgba(0, 0, 255, 1)', fillStyle: 'rgba(0, 0, 255, 0.2)', lineWidth: 2 });
  chart2.addTimeSeries(rearDriverTireTemp, { strokeStyle: 'rgba(255, 0, 0, 1)', fillStyle: 'rgba(255, 0, 0, 0.2)', lineWidth: 4 });
  chart2.streamTo(document.getElementById("rear-driver-tire-temp-chart"), 500);

  var chart3 = new SmoothieChart();
  chart3.addTimeSeries(rearPassengerAmbientTemp, { strokeStyle: 'rgba(0, 0, 255, 1)', fillStyle: 'rgba(0, 0, 255, 0.2)', lineWidth: 2 });
  chart3.addTimeSeries(rearPassengerTireTemp, { strokeStyle: 'rgba(255, 0, 0, 1)', fillStyle: 'rgba(255, 0, 0, 0.2)', lineWidth: 4 });
  chart3.streamTo(document.getElementById("rear-passenger-tire-temp-chart"), 500);
}

$(function() {
  
  createTimeline();

});

