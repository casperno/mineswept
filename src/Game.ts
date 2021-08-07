export class Game {
    constructor () {
        const boardContainer = document.getElementById('board');
        this.generateBoard(boardContainer, 30, 10);
        console.log("main");
    }

    private generateBoard (target:HTMLElement,  cols:number,rows:number,) {
        (target as HTMLDivElement).style.gridTemplateColumns = `repeat(${cols}, 10px)`;
        for(let i = rows*cols; i>0; i--) {
            target.appendChild(this.createCell());
        }
        
    }
    private createCell() {
        const div = document.createElement('div');
        div.className = "mine";
        div.innerHTML = "O"

        return div;
    }
}