import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./data.json";
const commits = [] // [x, y, count]
const markCommit = (x, y) => {
    const date = moment()
        .startOf('y')
        .subtract(8, 'y')
        .add(x, 'w')
        .add(y, 'd')
        .format();

    const data = {
        date: date,
    };

    jsonfile.writeFile(path, data, ()=>{
    simpleGit().add([path]).commit(date, {'--date': date}).push();
    });
}

for (let i = 0; i < commits.length; i ++) {
    const commit = commits[i]
    for (let j = 0; j < commit[2]; j ++) {
        markCommit(commit[0], commit[1])
    }
}
