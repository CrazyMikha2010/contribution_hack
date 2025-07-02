document.addEventListener('DOMContentLoaded', function () {
  const gridContainer = document.getElementById('gridContainer');
  const palette = document.getElementById('colorPalette');

  const colors = ["#151b23", "#023a16", "#196c2e", "#2da042", "#56d364"]
  const commitNumber = {"rgb(2, 58, 22)": 1, "rgb(25, 108, 46)": 2, "rgb(45, 160, 66)": 3, "rgb(86, 211, 100)": 4};
  let commits = [];
  let isClicked = false;
  let currColor = "#000000"

  document.querySelector('.arrowUp').addEventListener('click', () => {
    const input = document.getElementById('yearInput');
    input.stepUp();

    markInactive()
  });

  document.querySelector('.arrowDown').addEventListener('click', () => {
    const input = document.getElementById('yearInput');
    input.stepDown();

    markInactive()
  });

  document.getElementById('pushButton').onclick = function () {
    const cells = document.querySelectorAll('.cell');

    cells.forEach((cell, index) => {
        const computedStyle = window.getComputedStyle(cell);
        const backgroundColor = computedStyle.backgroundColor;

        if (backgroundColor !== 'rgb(21, 27, 35)' && cell.className !== "cell inactive") {
            const row = Math.floor(index / 53);
            const column = index % 53;
            commits.push([column, row, commitNumber[backgroundColor]])
        }
    });
    const data = {
    year: parseInt(document.getElementById("yearInput").value), 
    commits: commits
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "commits.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
  }

  document.getElementById('clearButton').onclick = function () {
    const cells = document.querySelectorAll('.cell');
    commits = []
    cells.forEach(cell => {
        cell.style.backgroundColor = '#151b23';
    });
  }

  document.getElementById('randomButton').onclick = function () {
    const cells = document.querySelectorAll('.cell');

    cells.forEach(cell => {
        tmpNum = Math.floor(Math.random() * 5);
        cell.style.backgroundColor = colors[tmpNum]
    })
  }

  colors.forEach(color => {
    const colorCell = document.createElement('div');
    colorCell.classList.add('color-cell');
    colorCell.style.backgroundColor = color;
    if (currColor == "#000000" && color == "#56d364") {
        currColor = "#56d364";
        colorCell.classList.add('selected');
    };

    colorCell.addEventListener('click', () => {
      currColor = color;
      document.querySelectorAll('.color-cell').forEach(c => c.classList.remove('selected'));
      colorCell.classList.add('selected');
    });

    palette.appendChild(colorCell);
  });
  
  window.addEventListener('mouseup', () => {
      isClicked = false;
    });

  window.addEventListener('mousedown', () => {
      isClicked = true;
    });

  for (let i = 0; i < 7 * 53; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';

    cell.addEventListener('click', () => {
      cell.style.backgroundColor = `${currColor}`;
    });

    cell.addEventListener('mousedown', () => {
      isClicked = true;
      cell.style.backgroundColor = `${currColor}`;
    });

    cell.addEventListener('mouseenter', () => {
      if (isClicked) {
        cell.style.backgroundColor = `${currColor}`;
      }
    });

    gridContainer.appendChild(cell);
  }
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, index) => {
      cell.addEventListener('mouseover', () => {
          const column = index % 53;
          const row = Math.floor(index / 53);

          document.getElementById('xy').textContent = `x: ${column}, y: ${row}`;

          const tmpDate = new Date(document.getElementById('yearInput').value, 0, 1);
          tmpDate.setDate(tmpDate.getDate() + (column * 7) + row - tmpDate.getDay());

          const options = { day: 'numeric', month: 'short' };
          const formattedDate = tmpDate.toLocaleDateString(undefined, options);
          document.getElementById('date').textContent = formattedDate;
      });
  });
  markInactive()


  function markInactive () {
    const cells = document.querySelectorAll('.cell');
      document.querySelectorAll('.cell').forEach(cell => {
          cell.classList.remove('inactive');
          cell.style.pointerEvents = 'auto';
      })

      const firstDayOfYear = new Date(document.getElementById('yearInput').value, 0, 1).getDay();
      for (let row = 0; row < 7; row++) {
          const cellIndex = row * 53;
          
          if (row < firstDayOfYear) {
              cells[cellIndex].classList.add('inactive');
              cells[cellIndex].style.pointerEvents = 'none';
          }
      }

      const lastDayOfYear = new Date(document.getElementById('yearInput').value, 11, 31).getDay();
      for (let row = lastDayOfYear + 1; row < 7; row++) {
          const cellIndex = row * 53 + 52;
          cells[cellIndex].classList.add('inactive');
          cells[cellIndex].style.pointerEvents = 'none';
    }}
  });
