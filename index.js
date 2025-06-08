import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./data.json";

const markCommit = (x, y) => {
    const date = moment()
        .startOf('y')
        .subtract(10, 'y')
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

markCommit(0, 0);
