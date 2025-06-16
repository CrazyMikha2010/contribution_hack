import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import fs from "fs";

const path = "./data.json";
const { year, commits } = JSON.parse(fs.readFileSync("./commits.json", 'utf-8'))
// const year = XXXX;
// const commits = [[x, y, cnt]]
const git = simpleGit();

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const markCommit = async (x, y, index) => {
  const date = moment()
    .subtract(moment().year() - year, "y")
    .startOf("y")
    .add(x * 7 + y - new Date(year, 0, 1).getDay(), "d")
    .add(index, "s");

  if (date.isAfter(moment(`${year}-12-31`).endOf('y')) || date.isBefore(moment(`${year}-01-01`).startOf('y'))) {
    console.log(`Skipped: ${date} (x=${x}, y=${y})`)
    return
  }

  const strDate = date.format();
  const data = { strDate };

    jsonfile.writeFile(path, data, ()=>{
        simpleGit().add([path]).commit(strDate, {'--date': strDate});
    });
    console.log(`Committed: ${strDate} (x=${x}, y=${y})`);
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
