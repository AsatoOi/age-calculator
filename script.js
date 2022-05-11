const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const ageCalculate = () => {
    // 今の日時情報の取得
    let today = new Date();
    // カレンダーに入力された生まれた日時情報を取得
    let inputDate = new Date(document.getElementById("date-input").value);
    let birthMonth, birthDate, birthYear;
    //変数「birthDetails」に、年/月/日の情報をオブジェクト形式で格納
    let birthDetails = {
        date: inputDate.getDate(),
        month: inputDate.getMonth() + 1,
        year: inputDate.getFullYear(),
    };
    //変数「currentYear」に現在の年を格納
    let currentYear = today.getFullYear();
    //変数「currentYear」に現在の月を格納
    let currentMonth = today.getMonth() + 1;
    //変数「currentYear」に現在の日を格納
    let currentDate = today.getDate();

    //うるう年をチェックする関数の実行
    checker(currentYear);

    //もし、現在より未来に生まれていたらエラーを吐き出すようにする
    if (
        birthDetails.year > currentYear ||
        (birthDetails.month > currentMonth && birthDetails.year == currentYear) ||
        (birthDetails.date > currentDate &&
        birthDetails.month == currentMonth &&
        birthDetails.year == currentYear)
    ) {
        alert("生まれていません！");
        displayResult("-", "-", "-");
        return;
    }
    //年の計算
    birthYear = currentYear - birthDetails.year;

    //月の計算
    //条件１：現在の月が生まれた月よりも数が大きい時
    if (currentMonth >= birthDetails.month) {
        birthMonth = currentMonth - birthDetails.month;
    //条件２：現在の月が生まれた月よりも数が小さい時
    } else {
        //年の数を１減らす
        birthYear--;
        //12ヶ月足した状態で、計算する
        birthMonth = 12 + currentMonth - birthDetails.month;
    }

    //日の計算
    //条件１：現在の日が生まれた日よりも数が大きい時
    if (currentDate >= birthDetails.date) {
        birthDate = currentDate - birthDetails.date;
    //条件２：現在の日が生まれた日よりも数が小さい時
    } else {
        //月の数を１減らす
        birthMonth--;
        //先月の日数を変数「days」に格納
        let days = months[currentMonth - 2];
        //先月の日数と現在の日数を足した状態で、生まれた日数を引く
        birthDate = days + currentDate - birthDetails.date;
        //もし月の数が0以下になる場合があるが、必ず11月となり、年度の数を１引く
        if (birthMonth < 0) {
            birthMonth = 11;
            birthYear--;
        }
    }
    //結果をHTMLに出力
    result(birthDate, birthMonth, birthYear);
};

const result=(bDate, bMonth, bYear) => {
    document.getElementById("years").textContent = bYear;
    document.getElementById("months").textContent = bMonth;
    document.getElementById("days").textContent = bDate;
}

const checker = (year) => {
    if (year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)) {
        months[1] = 29;
    } else {
        months[1] = 28;
    }
};
