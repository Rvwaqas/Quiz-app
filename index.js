import inquirer from 'inquirer';
import chalk from 'chalk';
const apiLink = "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple";
let fetchData = async (data) => {
    let fetchQuiz = await fetch(data);
    let res = await fetchQuiz.json();
    return res;
};
let data = await fetchData(apiLink);
let startQuiz = async () => {
    let score = 0;
    //for user name
    let name = await inquirer.prompt({
        type: "input",
        name: "fname",
        message: "Enter your name?"
    });
    for (let i = 1; i <= 5; i++) {
        let answer = [...data[i].incorrect_answers, data[i].correct_answer];
        let ans = await inquirer.prompt({
            type: "list",
            name: "quiz",
            message: data[i].question,
            choices: answer.map((val) => val),
        });
        if (ans.quiz == data[i].correct_answer) {
            ++score;
        }
        else {
            console.log(`${--score} your answer is wornd`);
        }
    }
    console.log(`Dear ${name.fname} your score is ${chalk.bold(score)}`);
};
startQuiz();
