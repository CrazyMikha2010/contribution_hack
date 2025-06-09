import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import fs from "fs";

const path = "./data.json";
const { year, commits } = JSON.parse(fs.readFileSync("./commits-5.json", 'utf-8'))
const git = simpleGit();

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const markCommit = async (x, y, index) => {
  const date = moment()
    .startOf("y")
    .subtract(moment().year() - year, "y")
    .add(x, "w")
    .add(y, "d")
    .add(index, "s")
    .format();

  const data = { date };

    jsonfile.writeFile(path, data, ()=>{
        simpleGit().add([path]).commit(date, {'--date': date});
    });
    console.log(`Committed: ${date} (x=${x}, y=${y})`);
};

(async () => {
  for (const [x, y, count] of commits) {
    for (let i = 0; i < count; i++) {
      await markCommit(x, y, i);
      await delay(100); 
    }
  }
  await git.push();
  console.log("All commits pushed!");
})();
