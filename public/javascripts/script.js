var currentDate = new Date().toISOString().slice(0, 10);
  var currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  document.getElementById('date').value = currentDate;
  document.getElementById('time').value = currentTime;