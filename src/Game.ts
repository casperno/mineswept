export class Game {

    private demoMode = true;

    constructor() {
        const boardContainer = document.getElementById('board');
        this.generateBoard(boardContainer, 20, 20);
        console.log("main");
    }

    private generateBoard(target: HTMLElement, cols: number, rows: number,) {
        (target as HTMLDivElement).style.gridTemplateColumns = `repeat(${cols}, 27px)`;

        for (let i = rows * cols; i > 0; i--) {
            target.appendChild(this.createCell());
        }

    }

    private createCell() {
        const div = document.createElement('div');
        div.className = "cell";

        if (this.demoMode) {

            if (Math.random() > .2) {

                if (Math.random() > .2) {
                    const icon = Math.random() > .5 ? 'icon-flag' : 'icon-bomb';
                    div.innerHTML = `<i class='${icon}'></i>`
                } else {

                    div.innerHTML = `<span class='count'>${Math.ceil(Math.random() * 7).toString()}</span>`;
                }
            }
        }

        return div;
    }
}