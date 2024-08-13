document.addEventListener("DOMContentLoaded", () => {
    const words = ["VACA", "TOMATE", "GALINHA", "PORCO", "CAVALO", "CARNEIRO", "OVELHA", "CEBOLA", "ALFACE", "MILHO", "FAZENDA", "AGRINHO"];
    const gridSize = 10;
    const gridContainer = document.querySelector(".grid-container");
    const wordList = document.getElementById("word-list");

    // Função para criar a grade do caça-palavras
    function createGrid() {
        let grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(""));

        // Adiciona palavras na grade
        function addWord(word) {
            let direction = Math.random() < 0.5 ? "H" : "V";
            let row, col;

            if (direction === "H") {
                row = Math.floor(Math.random() * gridSize);
                col = Math.floor(Math.random() * (gridSize - word.length));
            } else {
                row = Math.floor(Math.random() * (gridSize - word.length));
                col = Math.floor(Math.random() * gridSize);
            }

            for (let i = 0; i < word.length; i++) {
                if (direction === "H") {
                    grid[row][col + i] = word[i];
                } else {
                    grid[row + i][col] = word[i];
                }
            }
        }

        words.forEach(addWord);

        // Preenche espaços vazios com letras aleatórias
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let r = 0; r < gridSize; r++) {
            for (let c = 0; c < gridSize; c++) {
                if (grid[r][c] === "") {
                    grid[r][c] = letters.charAt(Math.floor(Math.random() * letters.length));
                }
            }
        }

        return grid;
    }

    // Renderiza a grade no HTML
    function renderGrid(grid) {
        grid.forEach(row => {
            row.forEach(cell => {
                const div = document.createElement("div");
                div.className = "grid-item";
                div.textContent = cell;
                gridContainer.appendChild(div);
            });
        });
    }

    // Adiciona palavras à lista
    function renderWordList(words) {
        words.forEach(word => {
            const li = document.createElement("li");
            li.textContent = word;
            wordList.appendChild(li);
        });
    }
    
// Event listener para clicar nas células da tabela
    wordsearchGrid.addEventListener("click", function (e) {
        if (e.target.tagName === "TD") {
            const cell = e.target;
            selectedWord += cell.textContent;
            selectedCells.push(cell);
            cell.classList.add("selected");

            checkWord();
        }
    });

    function checkWord() {
        const words = Array.from(wordList.getElementsByTagName("li"));
        for (let word of words) {
            if (word.textContent === selectedWord) {
                word.style.textDecoration = "line-through"; // Risca a palavra da lista
                word.style.color = "gray"; // Opcional: muda a cor para cinza
                clearSelection();
                return;
            }
        }
    }

    function clearSelection() {
        selectedCells.forEach(cell => cell.classList.remove("selected"));
        selectedCells = [];
        selectedWord = "";
    }

    document.addEventListener("dblclick", clearSelection);
});
    const grid = createGrid();
    renderGrid(grid);
    renderWordList(words);
});
