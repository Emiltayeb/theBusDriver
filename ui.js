class Ui {
  constructor() {
    this.card_deck = document.getElementById("card_deck");
    this.result_card = document.getElementById("result_card_1");
    this.result_card_2 = document.getElementById("result_card_2");
    this.drinkText = document.getElementById("shots");
    this.question = document.querySelector(".headerText");
    this.btns = document.querySelectorAll("main .btn");
  }

  showRandomcard(suit, value, level) {
    console.log(suit, value, level);
    // בוחרים את הדיב אלייה נכניס את הקלף
    let parent;
    console.log(level);
    switch (level) {
      case 1:
        parent = this.card_deck;
        break;
      case 2:
        parent = this.result_card;
        break;
      case 3:
        parent = this.result_card_2;
        break;
      case 4:
        parent = this.result_card;

        break;
    }
    parent.classList.add("card", "card_ui");

    if (parent.classList.contains("deck_cover")) {
      parent.classList.remove("deck_cover");
    }
    if (level == 4) {
      parent.classList.add("finalCard");
      console.log(parent);
    } else {
      parent.style.animation = "shotsInc 0.7s ease-in-out";
    }

    parent.addEventListener("animationend", () => {
      parent.style = "";
    });
    parent.innerHTML = `
    <img src="images/${suit}.png"/>
    <p>${value}</p>
  `;
  }

  showCardBack() {
    this.card_deck.innerHTML = `
    <img src="images/card_back.jpg" "/>
    `;
    this.card_deck.classList.add("card_ui", "deck_cover");
  }

  wrongAnswer(shotsCounter) {
    console.log(`[ui.js] - wronganswe, shots: ${shotsCounter}`);
    const shots = document.getElementById("shotsTodrink");
    shots.innerHTML = shotsCounter;
    shots.style.animation = "shotsInc 0.5s ease-in-out";
    shots.style.color = "red";
    shots.style.fontSize = "3 rem";
    shots.addEventListener("animationend", () => {
      shots.style.animation = "";
    });
  }

  inside_outside_Btns() {
    this.btns[0].innerHTML = `Between`;
    this.btns[1].innerHTML = `Outside`;
  }

  // showMassage(massage, className) {
  //   this.btns.forEach((btn) => (btn.disabled = true));
  //   document.querySelector(".massage").innerHTML = `
  //   <span class="${className}">${massage}</span>
  //   `;
  //   setTimeout(() => {
  //     document.querySelector(".massage").innerHTML = "";
  //     this.btns.forEach((btn) => (btn.disabled = false));
  //   }, 2500);
  // }

  changeQuestion(level) {
    console.log("[us.ji] changeQuestion ", `level: ${level} `);
    switch (level) {
      case 1:
        this.question.innerHTML = "Red or Black?";
        break;
      case 2:
        this.question.innerHTML = "Higher, Lower or Equal?";
        this.higher_or_lower_Btns();
        break;
      case 3:
        this.question.innerHTML = "Between, Outside, or Equal?";
        this.inside_outside_Btns();
        break;
      case 4:
        this.question.innerHTML = "Red or Black?";
        ui.resetBtns();
        document.querySelector(".buttons").style.display = "block ";
        break;
    }
  }

  higher_or_lower_Btns() {
    this.btns[0].innerHTML = `<i class="fas fa-arrow-up"></i>`;
    this.btns[1].innerHTML = `<i class="fas fa-arrow-down"></i>`;

    //ניצור אופציה לכפתור על
    const parent = document.querySelector("main .buttons");
    const btn = document.createElement("button");
    btn.innerHTML = "Equal";
    btn.style.color = "black";
    btn.classList.add("btn");
    parent.insertAdjacentElement("beforeend", btn);
  }

  lostRound(shots, level, status, card_index) {
    //צריך לעשות ריסט כי אנחנו מתחילים את המשחק מחדש
    this.btns.forEach((btn) => (btn.disabled = true));
    this.drinkText.innerHTML = "Drink " + shots + " sips from your drink! ";
    this.drinkText.style.color = "red";

    //יצירת כפתור סיימתי לשתות

    const parent = document.querySelector(".interface");
    const btn = document.createElement("button");
    btn.classList.add("drinkBtn", "btn");

    console.log(btn);
    btn.innerHTML = " finished drinking";
    if (level == 4) {
      if (status) {
        if (shots >= 1) {
          this.drinkText.innerHTML =
            "Well done you finished the game! " +
            "</br>" +
            "drink " +
            shots +
            "sips from your drink, and choose the next player";
        } else {
          this.drinkText.innerHTML =
            "Wow! you finished the game wihtout making a single mistake..choose another player";
        }
        btn.innerHTML = "New player found!";
        this.drinkText.style.color = "#99ff99";
      } else {
        this.drinkText.innerHTML =
          "Wrong. you were so close.. " +
          "</br>" +
          "drink " +
          shots +
          "sips from your drink!";
        this.drinkText.style.color = "red";
        shots = 0;
      }
    }

    parent.insertAdjacentElement("beforeend", btn);

    btn.addEventListener("click", (e) => {
      console.log(e);
      console.log("ui.js btn click");
      this.btns.forEach((btn) => (btn.disabled = false));
      if (level === 4) {
        this.result_card.innerHTML = "";
        this.result_card.classList = "";
        this.resetCardContainers();
        this.changeQuestion(level);
        this.showCardBack();
      }

      btn.remove();
      shots = 0;
      this.drinkText.innerHTML = `Shots in owe: <span id="shotsTodrink">${shots}</span>`;
      document.getElementById("cardLeftDiv").innerHTML = "";
      document.querySelector(".buttons").style.display = "block";
      document.querySelector(".headerText").style.display = "block  ";
      this.drinkText.style.color = "white";
    });
  }
  resetCardContainers() {
    console.log("[resetcardcontainers] i have to be called on click");
    let divs = document.querySelectorAll("main .card");

    if (level != 4) {
      divs.forEach((div) => {
        console.log(div);
        div.innerHTML = "";
        div.classList = "";
      });
    } else {
      divs[0].innerHTML = "";
      divs[0].className = "";
      divs[2].innerHTML = "";
      divs[2].className = "";
    }
  }

  gameOver(status, shots, level, card_index) {
    this.btns = document.querySelectorAll("main .btn");
    document.querySelector(".buttons").style.display = "none";
    this.resetInstruction();
    this.resetBtns();
    this.lostRound(shots, level, status, card_index);
  }
  resetBtns() {
    this.btns = document.querySelectorAll("main .btn");

    document.querySelector(".buttons").style.display = "none";

    //מתחילים רק עם אדום שחור
    this.btns[0].innerHTML = `Red`;
    this.btns[1].innerHTML = `Black`;
    if (this.btns.length >= 3) this.btns[2].remove();
  }
  resetInstruction() {
    document.querySelector(".headerText").style.display = "none";
  }
}
