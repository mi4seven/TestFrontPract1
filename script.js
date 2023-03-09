    const imgMap = document.getElementById('map');
    const imgTreasure = document.getElementById('treasure');
    const imgTreasureHunter = document.getElementById('treasure-hunter');
    const imgTreasureHunterCircle = document.getElementById('treasure-hunter-circle');    
    const hint = document.getElementById('hint');
    const btnRestart = document.getElementById('restart');
    const divTopPanel = document.getElementById('top-panel');
    const mapWidth = 600;
    const mapHeight = 600;

    let clickNum = 0;
    let color, hintText;
    let treasureX, treasureY, hunterX, hunterY = 0;

    function randVal(maxVal) {
      return Math.floor(Math.random() * maxVal);
    };

    function intitMap() {
      clickNum = 0;
      imgTreasureHunter.style.left = 0;
      imgTreasureHunter.style.top = 0;    

      imgTreasureHunterCircle.style.left = 0;
      imgTreasureHunterCircle.style.top = 0;      

      imgTreasure.style.transition = 'none';
      imgTreasure.style.opacity = 0;

      treasureX = randVal(mapWidth);
      treasureY = randVal(mapWidth);

      imgTreasure.style.left = treasureX + 'px';
      imgTreasure.style.top = treasureY + 'px';

      btnRestart.style.display = "none";
      imgMap.style.pointerEvents = "auto";
      imgTreasure.style.transform = 'scale(3)';
      imgTreasure.style.transition = 'transform 1s ease';
      imgTreasure.style.zIndex = 0;      
      imgMap.style.zIndex = 1;
    }

    // відстань між шукачем і скарбрм
    function calcDistance() {
      var dX = hunterX - treasureX;
      var dY = hunterY - treasureY;
      return Math.sqrt((dX * dX) + (dY * dY));
    }

    function treasureFound () {
      imgMap.style.zIndex = 0;      
      imgTreasure.style.zIndex = 1;
      imgTreasure.style.opacity = 1; // показати скриню зі скарбом
      btnRestart.style.display = "inline-block"; // показати кнопку 'Restart'
      imgMap.style.pointerEvents = "none";           
      color = "red";
      hintText = "Treasure found! Steps taken: " + clickNum; 
    }

    function showResult(dist) {
      if (dist < 30) {
        treasureFound();
      } else if (dist < 50) {
        color = "Crimson";
        hintText = "You'll burn!!!";
      } else if ( dist < 150) {
        color = "OrangeRed";
        hintText = "Very hot!";
      } else if (dist < 250) {
        color = "yellow";
        hintText = "Hot!";
      } else if (dist < 350) {
        color = "violet";
        hintText = "Heat!";
      } else if (dist < 450) {
        color = "DodgerBlue";
        hintText = "Cold!";
      } else if (dist < 601) {
        color = "lightblue";
        hintText = "Very cold!";
      } else {
        color = "white";
        hintText = "You'll freeze!!!";
      }

      imgTreasureHunter.style.left = hunterX + 'px';
      imgTreasureHunter.style.top = hunterY + 'px';     
      imgTreasureHunterCircle.style.left = hunterX + 8 + 'px';
      imgTreasureHunterCircle.style.top = hunterY + 32 + 'px';         
      imgTreasureHunterCircle.style.backgroundColor = color;
      hint.innerHTML = hintText;
    };

    function nextStep(event) {
      clickNum++;
      hunterX = event.offsetX;
      hunterY = event.offsetY;
      let distance = calcDistance();
      showResult(distance);
    }

    imgMap.addEventListener("click", nextStep);

    intitMap();