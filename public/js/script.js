/* Author: Luke Steensen

*/

$(function() {

  var random0 = new TimeSeries();
  setInterval(function() {
    data = Math.random() * 10000;
    random0.append(new Date().getTime(), data);
    $("#front-driver-tire-temp").html("" + Math.round(data));
  }, 500);

  var random1 = new TimeSeries();
  setInterval(function() {
    data = Math.random() * 10000;
    random1.append(new Date().getTime(), data);
    $("#front-driver-ambient-temp").html("" + Math.round(data));
  }, 500);

  var random2 = new TimeSeries();
  setInterval(function() {
    data = Math.random() * 10000;
    random2.append(new Date().getTime(), data);
    $("#front-passenger-tire-temp").html("" + Math.round(data));
  }, 500);

  var random3 = new TimeSeries();
  setInterval(function() {
    data = Math.random() * 10000;
    random3.append(new Date().getTime(), data);
    $("#front-passenger-ambient-temp").html("" + Math.round(data));
  }, 500);

  var random4 = new TimeSeries();
  setInterval(function() {
    data = Math.random() * 10000;
    random4.append(new Date().getTime(), data);
    $("#rear-driver-tire-temp").html("" + Math.round(data));
  }, 500);

  var random5 = new TimeSeries();
  setInterval(function() {
    data = Math.random() * 10000;
    random5.append(new Date().getTime(), data);
    $("#rear-driver-ambient-temp").html("" + Math.round(data));
  }, 500);

  var random6 = new TimeSeries();
  setInterval(function() {
    data = Math.random() * 10000;
    random6.append(new Date().getTime(), data);
    $("#rear-passenger-tire-temp").html("" + Math.round(data));
  }, 500);

  var random7 = new TimeSeries();
  setInterval(function() {
    data = Math.random() * 10000;
    random7.append(new Date().getTime(), data);
    $("#rear-passenger-ambient-temp").html("" + Math.round(data));
  }, 500);

  function createTimeline() {
    var chart0 = new SmoothieChart();
    chart0.addTimeSeries(random0, { strokeStyle: 'rgba(0, 0, 255, 1)', fillStyle: 'rgba(0, 0, 255, 0.2)', lineWidth: 2 });
    chart0.addTimeSeries(random1, { strokeStyle: 'rgba(255, 0, 0, 1)', fillStyle: 'rgba(255, 0, 0, 0.2)', lineWidth: 4 });
    chart0.streamTo(document.getElementById("front-driver-tire-temp-chart"), 500);

    var chart1 = new SmoothieChart();
    chart1.addTimeSeries(random2, { strokeStyle: 'rgba(0, 0, 255, 1)', fillStyle: 'rgba(0, 0, 255, 0.2)', lineWidth: 2 });
    chart1.addTimeSeries(random3, { strokeStyle: 'rgba(255, 0, 0, 1)', fillStyle: 'rgba(255, 0, 0, 0.2)', lineWidth: 4 });
    chart1.streamTo(document.getElementById("front-passenger-tire-temp-chart"), 500);

    var chart2 = new SmoothieChart();
    chart2.addTimeSeries(random4, { strokeStyle: 'rgba(0, 0, 255, 1)', fillStyle: 'rgba(0, 0, 255, 0.2)', lineWidth: 2 });
    chart2.addTimeSeries(random5, { strokeStyle: 'rgba(255, 0, 0, 1)', fillStyle: 'rgba(255, 0, 0, 0.2)', lineWidth: 4 });
    chart2.streamTo(document.getElementById("rear-driver-tire-temp-chart"), 500);

    var chart3 = new SmoothieChart();
    chart3.addTimeSeries(random6, { strokeStyle: 'rgba(0, 0, 255, 1)', fillStyle: 'rgba(0, 0, 255, 0.2)', lineWidth: 2 });
    chart3.addTimeSeries(random7, { strokeStyle: 'rgba(255, 0, 0, 1)', fillStyle: 'rgba(255, 0, 0, 0.2)', lineWidth: 4 });
    chart3.streamTo(document.getElementById("rear-passenger-tire-temp-chart"), 500);
  }
  
  createTimeline();

});

