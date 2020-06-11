class Ui {
  constructor() {
    this.card_deck = document.getElementById("card_deck");
    this.result_card = document.getElementById("result_card_1");
    this.result_card_2 = document.getElementById("result_card_2");
    this.drinkText = document.getElementById("shots");
    this.question = document.querySelector(".headerText");
    this.btns = document.querySelectorAll(".btn");
  }

  showRandomcard(suit, value, level) {
    // בוחרים את הדיב אלייה נכניס את הקלף
    let parent;
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
    } else {
      parent.style.animation = "shotsInc 1s ease-in-out";
    }

    parent.addEventListener("animationend", () => {
      parent.style = "";
    });
    parent.innerHTML = `
    <img src="images/${suit}.png"/>
    <p>${value}</p>
  `;
  }
  wrongAnswer(shotsCounter) {
    const shots = document.getElementById("shotsTodrink");
    shots.innerHTML = shotsCounter;

    shots.style.animation = "shotsInc 0.5s ease-in-out";
    shots.style.color = "red";
    shots.style.fontSize = "3 rem";
    shots.addEventListener("animationend", () => {
      shots.style.animation = "";
    });
  }

  showMassage(massage, className) {
    this.btns.forEach((btn) => (btn.disabled = true));
    document.querySelector(".massage").innerHTML = `
    <span class="${className}">${massage}</span>
    `;
    setTimeout(() => {
      document.querySelector(".massage").innerHTML = "";
      this.btns.forEach((btn) => (btn.disabled = false));
    }, 2500);
  }

  changeQuestion(level) {
    console.log(level);
    switch (level) {
      case 1:
        this.question.innerHTML = "אדום או שחור?";
        break;
      case 2:
        this.question.innerHTML = "גבוהה, נמוך או על?";
        this.higher_or_lower_Btns();
        break;
      case 3:
        this.question.innerHTML = "בפנים, בחוץ או על?";
        this.inside_outside_Btns();
        break;
      case 4:
        this.question.innerHTML = "אדום או שחור?";
        ui.resetBtns();
        document.querySelector(".buttons").style.display = "block ";
        break;
    }
  }

  showCardBack() {
    this.card_deck.innerHTML = `
    <img src="images/card_back.jpg" "/>
    `;
    this.card_deck.classList.add("card_ui", "deck_cover");
  }

  higher_or_lower_Btns() {
    this.btns[0].innerHTML = `<i class="fas fa-arrow-up"></i>`;
    this.btns[1].innerHTML = `<i class="fas fa-arrow-down"></i>`;

    //ניצור אופציה לכפתור על
    const parent = document.querySelector(".buttons");
    const btn = document.createElement("button");
    btn.innerHTML = "על";
    btn.style.color = "black";
    btn.classList.add("btn");
    parent.insertAdjacentElement("beforeend", btn);
  }
  inside_outside_Btns() {
    this.btns[0].innerHTML = `בפנים`;
    this.btns[1].innerHTML = `בחוץ`;
  }
  lostRound(shots, level, status) {
    if (shots == 0 && status == false) {
      shots = 1;
    }

    this.btns.forEach((btn) => (btn.disabled = true));
    this.drinkText.innerHTML = "שתה " + shots + " שאטים / לגימות מהמשקה! ";
    this.drinkText.style.color = "red";

    //יצירת כפתור סיימתי לשתות

    const parent = document.querySelector(".interface");
    const btn = document.createElement("button");
    btn.classList.add("drinkBtn", "btn");

    btn.innerHTML = "סיימתי לשתות";
    if (level == 4) {
      if (status) {
        if (shots >= 1) {
          this.drinkText.innerHTML =
            "כל הכבוד סיימת את המשחק! " +
            "</br>" +
            "שתה " +
            shots +
            " שאטים / לגימות מהמשקה!  ובחור מי ינהג באוטבוס ";
        } else {
          this.drinkText.innerHTML =
            "סיימת את המשחק בלי לשתות! י'א פיקח.. בחר נהג חדש";
        }
        btn.innerHTML = "יש נהג חדש!";
        this.drinkText.style.color = "#99ff99";
      } else {
        this.drinkText.innerHTML =
          "היית כל כך קרוב..  " +
          "</br>" +
          "שתה " +
          shots +
          " שאטים / לגימות מהמשקה! ";
        this.drinkText.style.color = "red";
      }
    }
    parent.insertAdjacentElement("beforeend", btn);

    btn.addEventListener("click", () => {
      this.btns.forEach((btn) => (btn.disabled = false));

      if (level == 4) {
        this.result_card.innerHTML = "";
        this.result_card.classList = "";

        level = 1;
        this.resetCardContainers();
        this.changeQuestion(level);

        this.showCardBack();
      }
      btn.remove();
      this.drinkText.innerHTML = `שאטים בחוב: <span id="shotsTodrink">0</span>`;
      document.querySelector(".buttons").style.display = "block";
      document.querySelector(".headerText").style.display = "block  ";
      this.drinkText.style.color = "white";
    });
  }
  resetCardContainers() {
    let divs = document.querySelectorAll(".card");
    if (level != 4) {
      divs.forEach((div) => {
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

  gameOver(status, shots, level) {
    this.btns = document.querySelectorAll(".btn");
    document.querySelector(".buttons").style.display = "none";
    this.resetInstruction();
    this.resetBtns();
    this.lostRound(shots, level, status);
  }
  resetBtns() {
    this.btns = document.querySelectorAll(".btn");
    document.querySelector(".buttons").style.display = "none";

    //מתחילים רק עם אדום שחור
    this.btns[0].innerHTML = `אדום`;
    this.btns[1].innerHTML = `שחור`;
    if (this.btns.length >= 3) this.btns[2].remove();
  }
  resetInstruction() {
    document.querySelector(".headerText").style.display = "none";
  }
}
