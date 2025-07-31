import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import fs from "fs";

const path = "./data.json";
const { year, commits } = JSON.parse(fs.readFileSync("./commits.json", 'utf-8'))
// const year = XXX;
// const commits = [[x, y, cnt]];
const git = simpleGit();

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const markCommit = async (x, y, index) => {
  const offset = new Date(year, 0, 1).getDay();
  const commitDate = moment().year(year).startOf('y').add(y + x * 7 + 1, 'd').subtract(offset, 'd').add(index, 's');

  const strDate = commitDate.format("YYYY-MM-DD HH:mm:ss");
  
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
