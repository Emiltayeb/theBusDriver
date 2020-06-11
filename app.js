const btns = document.querySelector(".buttons");

// instaante deck
let deck = new Card_deck();
deck.creatDeck(suits, values);
deck.shuffel();
console.log(deck);
// instante ui
const ui = new Ui();
// btns.forEach((btn) => btn.addEventListener("click", btn_Click));
btns.addEventListener("click", btn_Click);
//index for cards
let card_index = 0;
// index for what question are we in
let level = 1;
// כמה שאטים אתה צריך לשתות
let shots = 0;
//לחיצה על כפתור אדום או שחור

init();

function init() {
  ui.showCardBack();
}

//מה שיקרה בכל קליק
function btn_Click(e) {
  if (e.target.classList.contains("btn")) {
    let user_choice = e.target;
    const card = deck.deck[card_index];
    // כל לחיצה נראה קלף רנדומלי

    ui.showRandomcard(card["suit"], card["value"], level);
    // נשמור את האופציה שהמשתמש לחץ

    //נבדוק את השתובה
    checkAnswer(level, card, user_choice);
    //נעלה את הקארד אינקדקד
    card_index++;
  }
}

function checkAnswer(level, card, user_choice) {
  switch (level) {
    case 1:
      red_Or_black(card, user_choice, level);
      break;
    case 2:
      higher_or_lower(card, user_choice, level);
      break;
    case 3:
      inside_or_outside(card, user_choice, level);
      break;
    case 4:
      final_Quest(card, user_choice, level);
      break;
  }
}

function red_Or_black(card, user_choice) {
  user_choice = user_choice.innerHTML;
  let color = card["suit"];
  console.log(user_choice);
  if (user_choice == "אדום" && (color === "Hearts" || color == "Diamonds")) {
    // ui.showMassage("תשובה נכונה", "correct");
    level++;
    ui.changeQuestion(level);
    return;
  } else if (
    user_choice == "שחור" &&
    (color === "Spades" || color == "Clubs")
  ) {
    // ui.showMassage("תשובה נכונה", "correct");
    level++;
    ui.changeQuestion(level);
    return;
  } else {
    // ui.showMassage("טעות", "wrong");
    shots++;
    ui.wrongAnswer(shots);
  }
}

function higher_or_lower(card, elem) {
  let choice;

  elem.querySelector("i") != null
    ? (choice = elem.querySelector("i").classList[1])
    : (choice = elem.innerHTML);

  let cardValue = card["value"];
  let currentValue = deck.deck[card_index - 1]["value"];

  cardValue = switchValues(cardValue);
  currentValue = switchValues(currentValue);

  console.log(cardValue, currentValue);
  if (choice == "fa-arrow-down") {
    // הוא לחץ על נמוך
    if (cardValue < currentValue) {
      // ui.showMassage("תשובה נכונה", "correct");
      level++;
      ui.changeQuestion(level);
      return;
    } else {
      // ui.showMassage("טעות", "wrong");
      shots++;
      setTimeout(() => {
        reset();
      }, 1000);
    }
  } else if (choice == "fa-arrow-up") {
    if (cardValue > currentValue) {
      // ui.showMassage("תשובה נכונה", "correct");
      level++;
      ui.changeQuestion(level);
      return;
    } else {
      // ui.showMassage("טעות", "wrong");
      shots++;
      setTimeout(() => {
        reset();
      }, 1000);
    }
  } else {
    if (cardValue === currentValue) {
      ui.gameOver(true, shots, 4);
      level = 1;
      return;
    } else {
      // ui.showMassage("טעות", "wrong");
      shots++;
      setTimeout(() => {
        reset();
      }, 1000);
    }
    // הוא לחץ על על
  }
  // user_choice = user_choice.replace();
}

function inside_or_outside(card, elem) {
  let choice, highCard, lowCard;

  choice = elem.innerHTML;

  //הקלף עכשיו
  let CurrentcardValue = card["value"];
  //הקלף הקודם
  let secondCardvalue = deck.deck[card_index - 1]["value"];
  //הקלף הכי ישן
  let firstCardvalue = deck.deck[card_index - 2]["value"];

  CurrentcardValue = switchValues(CurrentcardValue);
  firstCardvalue = switchValues(firstCardvalue);
  secondCardvalue = switchValues(secondCardvalue);
  console.log(
    `הקלף הכי ישן ${firstCardvalue}, הקלף השני  ${secondCardvalue}, הקלף עכשיו ${CurrentcardValue}`
  );

  //צריך לבדוק מה הכי גדול
  if (firstCardvalue > secondCardvalue) {
    highCard = firstCardvalue;
    lowCard = secondCardvalue;
  } else {
    highCard = secondCardvalue;
    lowCard = firstCardvalue;
  }
  console.log(`הקלף הגבוהה ${highCard} , הקלף הנמוך ${lowCard}`);

  if (choice == "בפנים") {
    // הוא לחץ על נמוך
    if (CurrentcardValue < highCard && CurrentcardValue > lowCard) {
      // ui.showMassage("תשובה נכונה", "correct");
      level++;
      ui.changeQuestion(level);
      return;
    } else {
      // ui.showMassage("טעות", "wrong");
      shots++;
      setTimeout(() => {
        reset();
      }, 1000);
    }
  } else if (choice == "בחוץ") {
    if (CurrentcardValue < lowCard || CurrentcardValue > highCard) {
      // ui.showMassage("תשובה נכונה", "correct");
      level++;
      ui.changeQuestion(level);
      return;
    } else {
      // ui.showMassage("טעות", "wrong");
      shots++;
      setTimeout(() => {
        reset();
      }, 1000);
    }
  } else {
    if (CurrentcardValue === lowCard || CurrentcardValue == highCard) {
      ui.gameOver(true, shots, 4);
      level = 1;
      return;
    } else {
      // ui.showMassage("טעות", "wrong");
      shots++;
      setTimeout(() => {
        reset();
      }, 1000);
    }
  }
}

function final_Quest(card, user_choice) {
  //להעיף את הקנונטיירים בלחיצה

  let status;
  ui.resetCardContainers();
  user_choice = user_choice.innerHTML;
  let color = card["suit"];
  console.log(user_choice);
  if (user_choice == "אדום" && (color === "Hearts" || color == "Diamonds")) {
    status = true;
  } else if (
    user_choice == "שחור" &&
    (color === "Spades" || color == "Clubs")
  ) {
    status = true;
  } else {
    status = false;
  }
  ui.gameOver(status, shots, level);
  level = 1;
}

function reset() {
  console.log("reset");
  card_index = 0;
  level = 1;
  ui.lostRound(shots);
  shots = 0;
  deck.reset();
  ui.resetCardContainers();
  ui.resetBtns();
  ui.resetInstruction();
  ui.changeQuestion(level);
  ui.showCardBack();
}

function switchValues(value) {
  switch (value) {
    case "Jack":
      return 11;

    case "Queen":
      return 12;

    case "King":
      return 13;

    case "Ace":
      return 14;

    default:
      return value;
  }
}
