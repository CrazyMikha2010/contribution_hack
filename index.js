import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./data.json";
const commits = [[1, 0, 3], [0, 1, 1], [1, 1, 4]] // [x, y, count]
const markCommit = (x, y) => {
    const date = moment()
        .startOf('y')
        .subtract(1, 'y')
        .add(x, 'w')
        .add(y, 'd')
        .format();

    const data = {
        date: date,
    };

    jsonfile.writeFile(path, data, ()=>{
        simpleGit().add([path]).commit(date, {'--date': date});
    });
}

for (const [x, y, count] of commits) {
    for (let i = 0; i < count; i++) {
        markCommit(x, y)
    }
}
simpleGit().push();
