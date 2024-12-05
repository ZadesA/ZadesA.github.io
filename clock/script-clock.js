function displayTime() {
    const now = new Date();
    

    const date = now.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
    

    const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  

    document.getElementById('date').textContent = `${date}`;
    document.getElementById('time').textContent = `${time}`;
  }
  

  setInterval(displayTime, 1000);
  
  updateTime();