let sketchGrid = createGrid(64);
const gridSizeChange = document.querySelector('#grid-size-change');
gridSizeChange.addEventListener('click', changeGridSize);

function createGrid(n) {
    function resetSketch(e) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const box = document.querySelector(`.row-${i} .col-${j}`);
                box.style.backgroundColor = 'white';
            }
        }
        console.log('Clicked');
    }

    const grid = document.createElement('div');
    grid.style.cssText = 'display: flex; flex-direction: column; justify-content: center; align-items: center;';
    for (let i = 0; i < n; i++) {
        const row = document.createElement('div');
        row.style.cssText = `flex: 1 1 ${760 / n}px; display: flex; justify-content: center; margin: 0;`;
        row.classList.add(`row-${i}`);
        for (let j = 0; j < n; j++) {
            const box = document.createElement('div');
            box.style.cssText = `width: ${760 / n}px; flex: 1 1 auto; margin: 0;`;
            box.classList.add(`col-${j}`);
            box.classList.add('box');
            box.addEventListener('mouseover', addBackground);
            row.appendChild(box);
            if (i === 0) {
                box.style.cssText += 'border-top: black solid 1px;';
            }
            if (i === n - 1) {
                box.style.cssText += 'border-bottom: black solid 1px;';
            }
            if (j === 0) {
                box.style.cssText += 'border-left: black solid 1px;';
            }
            if (j === n - 1) {
                box.style.cssText += 'border-right: black solid 1px;';
            }
        }
        grid.appendChild(row);
    }

    const resetButton = document.querySelector('#reset');
    resetButton.addEventListener('click', resetSketch);

    document.querySelector('body').insertBefore(grid, resetButton);

    return grid;
}

function addBackground(e) {
    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    e.target.style.backgroundColor = randomColor;
}

function changeGridSize(e) {
    let size = prompt('Enter new grid size (less than 128)');
    if (size < 0 || size > 128 || !size) {
        return;
    } 
    document.querySelector('body').removeChild(sketchGrid);
    sketchGrid = createGrid(Math.floor(size));
}