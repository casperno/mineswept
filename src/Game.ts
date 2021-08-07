class Game {
    constructor () {
        const boardContainer = document.getElementById('board');
        this.generateBoard(boardContainer, 10, 10);
        console.log("main");
    }

    private generateBoard (target:HTMLElement, rows:number, cols:number) {
        target.appendChild(this.createCell());
    }
    private createCell() {
        const div = document.createElement('div');
        div.className = "mine";
        div.innerHTML = "O"

        return div;
    }
}