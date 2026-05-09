import { question } from "readline-sync";
import ClubWindow from "../console/ClubWindow";
import MemberMenu from "./MemberMenu";


class ClubMenu {
    clubWindow: ClubWindow;
    memberMenu: MemberMenu;

    constructor() {
        this.clubWindow = new ClubWindow();
        this.memberMenu = new MemberMenu();
    }

    showMenu(): void {

        let inputNumber = 0;

        while (true) {
            
            this.displayMainMenu();
            inputNumber = this.selectMainMenu();

            switch (inputNumber) {
                case 1:
                    this.clubWindow.register();
                    break;
                case 2:
                    this.clubWindow.find();
                    break;
                case 3:
                    this.clubWindow.modify();
                    break;
                case 4:
                    this.clubWindow.remove();
                    break;
                case 5:
                    this.memberMenu.showMenu();
                    break;
                case 0:
                    this.exitProgram();
                    return;
                default:
                    console.log('Choose Again!')
            }
        }
    }
    
    displayMainMenu(): void {
        console.log('......................')
        console.log('[Travel Club Menu]')
        console.log('......................')
        console.log(' 1. Register');
        console.log(' 2. Find')
        console.log(' 3. Modify')
        console.log(' 4. Remove')
        console.log('......................')
        console.log(' 5. Member Menu')
        console.log('.......................')
        console.log(' 0. Exit program')
        console.log('.......................')
    }

    selectMainMenu(): number {
        const answer = question('Select number : ')
        const menuNumber = parseInt(answer);

        if (menuNumber >= 0 && menuNumber <= 5) {
            return menuNumber;
        } else {
            console.log('It\'s a invalid number -> ' + menuNumber);
            return -1;
        }
    }

    exitProgram(): void {
        console.log('Program exit. Bye...');
        process.exit(0);
    }
}


export default ClubMenu;