const quizData = [
  {
    id: 1,
    questionImage: "./images_question/1.jpg",
    answerImage: "./images_answer/1.jpg",
    answer: "キッキング",
    description: "脚でボールを蹴ったとき"
  },
  {
    id: 2,
    questionImage: "./images_question/2.jpg",
    answerImage: "./images_answer/2.jpg",
    answer: "ハッキング",
    description: "身体に当たったとき"
  },
  {
    id: 3,
    questionImage: "./images_question/3.jpg",
    answerImage: "./images_answer/3.jpg",
    answer: "スライディング",
    description: "転んだり、手や足がついたとき"
  },
  {
    id: 4,
    questionImage: "./images_question/4.jpg",
    answerImage: "./images_answer/4.jpg",
    answer: "ハイスティック",
    description: "膝より上にブレードが上がったとき"
  },
  {
    id: 5,
    questionImage: "./images_question/5.jpg",
    answerImage: "./images_answer/5.jpg",
    answer: "クラッシング",
    description: "スティックをたたいたとき"
  },
  {
    id: 6,
    questionImage: "./images_question/6.jpg",
    answerImage: "./images_answer/6.jpg",
    answer: "フッキング",
    description: "相手の股の間にスティックを入れたとき"
  },
  {
    id: 7,
    questionImage: "./images_question/7.jpg",
    answerImage: "./images_answer/7.jpg",
    answer: "シャフトボール",
    description: "膝より上のボールをシャフトで操作したとき"
  },
  {
    id: 8,
    questionImage: "./images_question/8.jpg",
    answerImage: "./images_answer/8.jpg",
    answer: "スローイング",
    description: "スティックを落としたとき"
  },
  {
    id: 9,
    questionImage: "./images_question/9.jpg",
    answerImage: "./images_answer/9.jpg",
    answer: "ダブルストローク",
    description: "フリーストロークで二回触る。ボールをヒットしないで打ったとき"
  },
  {
    id: 10,
    questionImage: "./images_question/10.jpg",
    answerImage: "./images_answer/10.jpg",
    answer: "オーバータイム",
    description: "フリーストローク時に笛の合図から3秒以内に打たなかったとき"
  },
  {
    id: 11,
    questionImage: "./images_question/11.jpg",
    answerImage: "./images_answer/11.jpg",
    answer: "ステップインオフェンス",
    description: "ゴールエリア内に攻撃側が入ったとき"
  },
  {
    id: 12,
    questionImage: "./images_question/12.jpg",
    answerImage: "./images_answer/12.jpg",
    answer: "ステップインディフェンス",
    description: "ゴールエリア内に防御側が入ったとき"
  },
  {
    id: 13,
    questionImage: "./images_question/13.jpg",
    answerImage: "./images_answer/13.jpg",
    answer: "スティックインゴール",
    description: "ゴール内にスティックを入れてプレーしたとき"
  },
  {
    id: 14,
    questionImage: "./images_question/14.jpg",
    answerImage: "./images_answer/14.jpg",
    answer: "プッシングゴール",
    description: "ゴールを動かしたり、握ってプレーしたとき"
  },
  {
    id: 15,
    questionImage: "./images_question/15.jpg",
    answerImage: "./images_answer/15.jpg",
    answer: "チャージング",
    description: "相手を蹴る・掴む・押す・タックルしたとき"
  },
  {
    id: 16,
    questionImage: "./images_question/16.jpg",
    answerImage: "./images_answer/16.jpg",
    answer: "オブストラクション",
    description: "故意、粗暴な行為、暴言、フェンス、ゴールを叩く。危険な行為。"
  }
];

const appCard = document.getElementById("appCard");
const screenTitle = document.getElementById("screenTitle");
const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const flashcardScreen = document.getElementById("flashcardScreen");
const finishScreen = document.getElementById("finishScreen");
const flashcardModeButton = document.getElementById("flashcardModeButton");
const choiceModeButton = document.getElementById("choiceModeButton");
const inputModeButton = document.getElementById("inputModeButton");
const restartButton = document.getElementById("restartButton");
const topReturnButton = document.getElementById("topReturnButton");
const confirmDialog = document.getElementById("confirmDialog");
const confirmReturnButton = document.getElementById("confirmReturnButton");
const cancelReturnButton = document.getElementById("cancelReturnButton");
const nextButton = document.getElementById("nextButton");
const checkChoiceButton = document.getElementById("checkChoiceButton");
const questionImage = document.getElementById("questionImage");
const flashcardImage = document.getElementById("flashcardImage");
const flipCardButton = document.getElementById("flipCardButton");
const prevCardButton = document.getElementById("prevCardButton");
const nextCardButton = document.getElementById("nextCardButton");
const choices = document.getElementById("choices");
const inputAnswerForm = document.getElementById("inputAnswerForm");
const answerInput = document.getElementById("answerInput");
const resultBox = document.getElementById("resultBox");
const resultTitle = document.getElementById("resultTitle");
const answerText = document.getElementById("answerText");
const descriptionText = document.getElementById("descriptionText");
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("scoreText");
const finalScore = document.getElementById("finalScore");
const finalMessage = document.getElementById("finalMessage");

let questions = [];
let currentIndex = 0;
let score = 0;
let answered = false;
let currentMode = "choice";
let audioContext = null;
let flashcardIndex = 0;
let flashcardRevealed = false;
let selectedChoice = null;

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

async function startQuiz(mode) {
  await playStartSound();
  currentMode = mode;
  screenTitle.textContent = mode === "choice" ? "ファール暗記クイズ　4択モード" : "ファール暗記クイズ　入力モード";
  questions = shuffle(quizData);
  currentIndex = 0;
  score = 0;
  appCard.classList.remove("is-start");
  startScreen.classList.add("is-hidden");
  flashcardScreen.classList.add("is-hidden");
  finishScreen.classList.add("is-hidden");
  quizScreen.classList.remove("is-hidden");
  showQuestion();
}

async function startFlashcards() {
  await playStartSound();
  screenTitle.textContent = "ファール暗記クイズ　フラッシュカードモード";
  flashcardIndex = 0;
  flashcardRevealed = false;
  appCard.classList.remove("is-start");
  startScreen.classList.add("is-hidden");
  quizScreen.classList.add("is-hidden");
  finishScreen.classList.add("is-hidden");
  flashcardScreen.classList.remove("is-hidden");
  showFlashcard();
}

function showQuestion() {
  const question = questions[currentIndex];
  answered = false;
  selectedChoice = null;

  resultBox.classList.add("is-hidden");
  resultBox.classList.remove("is-correct", "is-wrong");
  nextButton.classList.add("is-hidden");
  checkChoiceButton.classList.add("is-hidden");
  checkChoiceButton.disabled = true;
  questionImage.src = question.questionImage;
  questionImage.alt = `${currentIndex + 1}問目のファール画像`;
  progressText.textContent = `${currentIndex + 1} / ${questions.length}`;
  scoreText.textContent = `${score}点`;

  if (currentMode === "choice") {
    choices.classList.remove("is-hidden");
    inputAnswerForm.classList.add("is-hidden");
    checkChoiceButton.classList.remove("is-hidden");
    renderChoices(question);
  } else {
    choices.classList.add("is-hidden");
    choices.innerHTML = "";
    inputAnswerForm.classList.remove("is-hidden");
    answerInput.value = "";
    answerInput.placeholder = currentIndex === 0 ? "例：キッキング" : "";
    answerInput.disabled = false;
    setTimeout(() => answerInput.focus(), 0);
  }
}

function renderChoices(question) {
  const wrongChoices = shuffle(quizData.filter((item) => item.id !== question.id)).slice(0, 3);
  const options = shuffle([question, ...wrongChoices]);

  choices.innerHTML = "";
  options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.type = "button";
    button.dataset.answer = option.answer;
    button.innerHTML = `<span class="choice-mark" aria-hidden="true"></span><span class="choice-label">${option.answer}</span>`;
    button.addEventListener("click", () => selectChoiceAnswer(option, question, button));
    choices.appendChild(button);
  });
}

function selectChoiceAnswer(selected, question, selectedButton) {
  if (answered) return;

  [...choices.children].forEach((button) => {
    button.classList.remove("selected", "correct", "wrong");
    button.querySelector(".choice-mark").textContent = "";
  });

  selectedButton.classList.add("selected");
  selectedChoice = { selected, question, selectedButton };
  checkChoiceButton.disabled = false;
}

function checkChoiceAnswer() {
  if (answered || !selectedChoice) return;

  const { selected, question, selectedButton } = selectedChoice;
  const isCorrect = selected.id === question.id;
  if (isCorrect) score += 1;

  [...choices.children].forEach((button) => {
    button.disabled = true;
    const isCorrectChoice = button.dataset.answer === question.answer;
    const isSelectedChoice = button === selectedButton;

    if (isCorrectChoice) {
      button.classList.add("correct");
      button.querySelector(".choice-mark").textContent = "○";
    } else if (isSelectedChoice) {
      button.classList.add("wrong");
      button.querySelector(".choice-mark").textContent = "×";
    }
  });

  checkChoiceButton.disabled = true;
  showAnswer(question, isCorrect);
}

function checkTypedAnswer(event) {
  event.preventDefault();
  if (answered) return;

  const question = questions[currentIndex];
  const typedAnswer = answerInput.value.trim();
  const isCorrect = typedAnswer === question.answer;

  if (isCorrect) score += 1;
  answerInput.disabled = true;
  showAnswer(question, isCorrect);
}

function showAnswer(question, isCorrect = false) {
  answered = true;
  questionImage.src = question.answerImage;
  questionImage.alt = `${question.answer}の答え画像`;

  [...choices.children].forEach((button) => {
    button.disabled = true;
    if (button.dataset.answer === question.answer && !button.classList.contains("correct")) {
      button.classList.add("correct");
      button.querySelector(".choice-mark").textContent = "○";
    }
  });

  answerInput.disabled = true;
  playAnswerSound(isCorrect);
  resultBox.classList.toggle("is-correct", isCorrect);
  resultBox.classList.toggle("is-wrong", !isCorrect);
  resultTitle.textContent = isCorrect ? "○ 正解！" : "× 不正解";
  answerText.textContent = `答え：${question.answer}`;
  descriptionText.textContent = `解説：${question.description}`;
  resultBox.classList.remove("is-hidden");
  nextButton.classList.remove("is-hidden");
  scoreText.textContent = `${score}点`;
}

function showFinish() {
  quizScreen.classList.add("is-hidden");
  flashcardScreen.classList.add("is-hidden");
  finishScreen.classList.remove("is-hidden");
  progressText.textContent = `${questions.length} / ${questions.length}`;
  scoreText.textContent = `${score}点`;
  finalScore.textContent = `${questions.length}問中 ${score}問 正解`;

  if (score === questions.length) {
    finalMessage.textContent = "全問正解です。ばっちり覚えられています。";
  } else if (score >= Math.ceil(questions.length * 0.7)) {
    finalMessage.textContent = "かなり覚えています。まちがえた問題をもう一度見てみましょう。";
  } else {
    finalMessage.textContent = "まずは絵とファール名をセットで見ながら、少しずつ覚えましょう。";
  }

  if (score === questions.length) {
    playPerfectSound();
  } else {
    playFinishSound();
  }
}

function showStartScreen() {
  quizScreen.classList.add("is-hidden");
  flashcardScreen.classList.add("is-hidden");
  finishScreen.classList.add("is-hidden");
  confirmDialog.classList.add("is-hidden");
  startScreen.classList.remove("is-hidden");
  appCard.classList.add("is-start");
  screenTitle.textContent = "ファール暗記クイズ";
  progressText.textContent = "1 / 16";
  scoreText.textContent = "0点";
}

function showFlashcard() {
  const card = quizData[flashcardIndex];
  flashcardImage.src = flashcardRevealed ? card.answerImage : card.questionImage;
  flashcardImage.alt = `${flashcardIndex + 1}枚目のフラッシュカード`;
  flipCardButton.textContent = flashcardRevealed ? "もう一度かくす" : "カードをめくる";
  flipCardButton.classList.toggle("is-hide-again", flashcardRevealed);
  prevCardButton.disabled = flashcardIndex === 0;
  nextCardButton.disabled = false;
  nextCardButton.textContent = flashcardIndex === quizData.length - 1 ? "最初に戻る" : "次へ";
  progressText.textContent = `${flashcardIndex + 1} / ${quizData.length}`;
  scoreText.textContent = "暗記";
}

function flipFlashcard() {
  flashcardRevealed = !flashcardRevealed;
  showFlashcard();
}

function moveFlashcard(direction) {
  const nextIndex = flashcardIndex + direction;
  if (direction > 0 && nextIndex >= quizData.length) {
    flashcardIndex = 0;
    flashcardRevealed = false;
    showFlashcard();
    return;
  }
  if (nextIndex < 0 || nextIndex >= quizData.length) return;
  flashcardIndex = nextIndex;
  flashcardRevealed = false;
  showFlashcard();
}

function openReturnDialog() {
  confirmDialog.classList.remove("is-hidden");
}

function closeReturnDialog() {
  confirmDialog.classList.add("is-hidden");
}

function getAudioContextClass() {
  return window.AudioContext || window.webkitAudioContext;
}

async function ensureAudioReady() {
  const AudioContextClass = getAudioContextClass();
  if (!AudioContextClass) return false;

  if (!audioContext) {
    audioContext = new AudioContextClass();
  }

  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }

  return audioContext.state === "running";
}

function playTone(frequency, startTime, duration, volume = 0.08, type = "sine") {
  if (!audioContext) return;

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startTime);
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.02);
}

async function playAnswerSound(isCorrect) {
  const isReady = await ensureAudioReady();
  if (!isReady || !audioContext) return;

  const now = audioContext.currentTime + 0.02;
  if (isCorrect) {
    playTone(988, now, 0.22, 0.105, "triangle");
    playTone(1319, now + 0.18, 0.42, 0.11, "sine");
  } else {
    playTone(180, now, 0.2, 0.09, "square");
    playTone(135, now + 0.22, 0.25, 0.085, "square");
  }
}

async function playStartSound() {
  const isReady = await ensureAudioReady();
  if (!isReady || !audioContext) return;

  const now = audioContext.currentTime + 0.02;
  playTone(659, now, 0.13, 0.065, "triangle");
  playTone(784, now + 0.12, 0.13, 0.07, "triangle");
  playTone(1047, now + 0.25, 0.28, 0.08, "sine");
}

async function playFinishSound() {
  const isReady = await ensureAudioReady();
  if (!isReady || !audioContext) return;

  const now = audioContext.currentTime + 0.02;
  playTone(523, now, 0.15, 0.07);
  playTone(659, now + 0.14, 0.15, 0.075);
  playTone(784, now + 0.28, 0.17, 0.08);
  playTone(1047, now + 0.45, 0.38, 0.085);
}

async function playPerfectSound() {
  const isReady = await ensureAudioReady();
  if (!isReady || !audioContext) return;

  const now = audioContext.currentTime + 0.02;
  playTone(784, now, 0.18, 0.065, "triangle");
  playTone(988, now + 0.12, 0.2, 0.07, "triangle");
  playTone(1175, now + 0.24, 0.22, 0.075, "sine");
  playTone(1568, now + 0.38, 0.5, 0.08, "sine");
  playTone(1976, now + 0.56, 0.46, 0.045, "sine");
}

flashcardModeButton.addEventListener("click", startFlashcards);
choiceModeButton.addEventListener("click", () => startQuiz("choice"));
inputModeButton.addEventListener("click", () => startQuiz("input"));
restartButton.addEventListener("click", showStartScreen);
topReturnButton.addEventListener("click", openReturnDialog);
confirmReturnButton.addEventListener("click", showStartScreen);
cancelReturnButton.addEventListener("click", closeReturnDialog);
inputAnswerForm.addEventListener("submit", checkTypedAnswer);
checkChoiceButton.addEventListener("click", checkChoiceAnswer);
flipCardButton.addEventListener("click", flipFlashcard);
flashcardImage.addEventListener("click", flipFlashcard);
prevCardButton.addEventListener("click", () => moveFlashcard(-1));
nextCardButton.addEventListener("click", () => moveFlashcard(1));

nextButton.addEventListener("click", () => {
  currentIndex += 1;
  if (currentIndex >= questions.length) {
    showFinish();
  } else {
    showQuestion();
  }
});

