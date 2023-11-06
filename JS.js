// Javascriptファイル
// お手伝いごとに設定されたポイント
const points = {
  dish: 10,
  trash: 10,
  laundry: 20,
  clean: 20,
  study: 30
};

// ご褒美と必要なポイント
const rewards = {
  ice: 50,
  cake: 100,
  game: 200,
  toy: 300
};

// 現在の日付を取得
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();

// カレンダーに日付を表示
const calendar = document.getElementById("calendar");
for (let i = 1; i <= 31; i++) {
  const div = document.createElement("div");
  div.textContent = i;
  // 今日の日付には赤い枠線をつける
  if (i === date) {
    div.classList.add("today");
  }
  calendar.appendChild(div);
}

// フォームの送信ボタンを取得
const submit = document.getElementById("submit");

// フォームの送信時に実行する関数を定義
submit.addEventListener("click", function(event) {
  // デフォルトの送信動作をキャンセル
  event.preventDefault();
  // メッセージを表示する要素を取得
  const message = document.getElementById("message");
  // チェックボックスの要素を取得
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  // チェックされたお手伝いの数をカウント
  let count = 0;
  // チェックされたお手伝いのポイントを合計
  let total = 0;
  // チェックボックスの要素を1つずつ処理
  checkboxes.forEach(function(checkbox) {
    // チェックされている場合
    if (checkbox.checked) {
      // カウントを増やす
      count++;
      // ポイントを加算する
      total += points[checkbox.value];
    }
  });
  // カウントが0の場合
  if (count === 0) {
    // メッセージを表示
    message.textContent = "お手伝いを選んでください！";
  } else {
    // メッセージを空にする
    message.textContent = "";
    // 今日の日付の要素を取得
    const todayDiv = document.querySelector(".today");
    // お手伝い完了のクラスをつける
    todayDiv.classList.add("done");
    // ポイントを表示する要素を取得
    const point = document.getElementById("point");
    // ポイントを表示
    point.textContent = `今日のお手伝いで${total}ポイントゲット！`;
    // ご褒美を表示する要素を取得
    const reward = document.getElementById("reward");
    // ご褒美の要素を作成
    for (let key in rewards) {
      const div = document.createElement("div");
      div.textContent = key;
      // ポイントがご褒美に必要なポイント以上の場合
      if (total >= rewards[key]) {
        // ご褒美交換可能のクラスをつける
        div.classList.add("available");
        // クリック時に実行する関数を定義
        div.addEventListener("click", function() {
          // 確認ダイアログを表示
          const result = confirm(`${key}と交換しますか？`);
          // OKの場合
          if (result) {
            // ポイントを減らす
            total -= rewards[key];
            // ポイントを表示
            point.textContent = `残りのポイントは${total}ポイントです。`;
            // ご褒美交換可能のクラスを外す
            div.classList.remove("available");
            // クリックイベントを削除
            div.removeEventListener("click", arguments.callee);
            // アラートを表示
            alert(`${key}と交換しました！`);
          }
        });
      }
      // ご褒美を表示する要素に追加
      reward.appendChild(div);
    }