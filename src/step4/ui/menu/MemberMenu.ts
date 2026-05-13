import { question } from "readline-sync";
import TravelClub from "../../../step1/entity/TravelClub";
import ClubCoordinator from "../../logic/ClubCoordinator";
import MemberWindow from "../window/MemberWindow";


class MemberMenu {
    memberWindow: MemberWindow;

    constructor(clubCoordinator: ClubCoordinator) {
        this.memberWindow = new MemberWindow(clubCoordinator);
    }

    showMenu(currentClub: TravelClub | null): void {
        let inputNumber = 0;

        if (!currentClub) {
            console.log('\n> Club is not selected yet!');
            return;
        }
        this.memberWindow.currentClub = currentClub;

        while (true) {
            this.displayMenu();
            inputNumber = this.selectMenu();

            switch (inputNumber) {
                case 1:
                    this.memberWindow.findAnotherClub();
                    break;
                case 2:
                    this.memberWindow.add();
                    break;
                case 3:
                    this.memberWindow.find();
                    break;
                case 4:
                    this.memberWindow.modify();
                    break;
                case 5:
                    this.memberWindow.remove();
                    break;
                case 0:
                    return;
                default: 
                    console.log('Choose Again!')
            }
        }
    }

    displayMenu(): void {
        console.log('..........................');
        console.log('[Members Menu]');
        console.log('..........................');
        console.log('1. Find a club');
        console.log('2. Add member');
        console.log('3. Find a member');
        console.log('4. Modify a member');
        console.log('5. Remove a member');
        console.log('...........................');
        console.log('0. Previous');
        console.log('...........................');
    }

    selectMenu(): number {
        const answer = question('Select number : ');
        const menuNumber = parseInt(answer);

        if (menuNumber >= 0 && menuNumber <= 5) {
            return menuNumber;
        } else {
            console.log('It\'s a invalid number --> ' + menuNumber);
            return -1;
        }
    }
}

export default MemberMenu;