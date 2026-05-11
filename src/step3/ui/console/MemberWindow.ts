import { question } from "readline-sync";
import ClubMember from "../../../step1/entity/ClubMember";
import RoleInClub from "../../../step1/entity/RoleInClub";
import TravelClub from "../../../step1/entity/TravelClub";
import ClubCoordinator from "../../logic/ClubCoordinator";
import MemberHelper from "../../logic/MemberHelper";

class MemberWindow {
    currentClub: TravelClub | null = null;
    clubCoordinator: ClubCoordinator;
    memberHelper: MemberHelper;

    constructor(clubCoordinator: ClubCoordinator) {
        this.clubCoordinator = clubCoordinator;
        this.memberHelper = clubCoordinator.memberHelper;
    }

    findAnotherClub(): TravelClub | null {
        let clubFound = null;

        if (!this.clubCoordinator.hasClubs()) {
            this.currentClub = null;
            return null;
        }

        while (true) {
            const clubName = question('\n name to find(0.Member menu): ');

            if (this.clubCoordinator.exist(clubName)) {
                clubFound = this.clubCoordinator.find(clubName);
                console.log('\n> Found club: ', clubFound);
                break;
            } else {
                console.log('\n> No such club in the storage. --> ' + clubName);
            }
            clubFound = null;
        }

        this.currentClub = clubFound;
        return clubFound;
    }

    add(): void{
        if (!this.currentClub) {
            console.log('\n> No target club yet. Find target club first.');
            return;
        }
        while (true) {
            const email = question('\n new member\'s email (0.Member menu): ')

            if (email === '0') {
                return;
            }

            if (this.memberHelper.exist(this.currentClub, email)) {
                console.log('\n> Member with this email already exist. --> ' + email);
                continue;
            }

            const name = question(' name: ');
            const phoneNumber = question(' phoneNumber: ');
            const nickName = question(' nickname');
            const birthDay = question(' birthday(yyyy.mm.dd): ');
            const memberRole = question(' President|Member: ');

            try {
                const newMember = new ClubMember(email, name, phoneNumber);

                newMember.nickname = nickName;
                newMember.birthDay = birthDay;

                if (!this.memberHelper.hasMembers(this.currentClub)) {
                    newMember.role = memberRole as RoleInClub;
                }

                this.memberHelper.register(this.currentClub, newMember);
                console.log('\n> Registered member: ', newMember);
            } catch (e) {
                console.error(`Error: ${(e as Error).message}`)
            }
        }
    }

    find(): void {
        if (!this.currentClub) {
            console.log('\n> No target club yet. Find target club first.');
            return;
        }
        if (!this.memberHelper.hasMembers(this.currentClub)) {
            console.log('\n> No members in the target club --> ' + this.currentClub.name);
        }

        while (true) {
            const email = question('\n member email to find (0.Member menu): ');

            if (email === '0' || !email.length) {
                return;
            }

            if (this.memberHelper.exist(this.currentClub, email)) {
                const member = this.memberHelper.find(this.currentClub, email);

                if (member) {
                    console.log('\n> Found member: ', member.name);
                }
            }
            else {
                console.log('\n> No such member in the club storage.')
            }
        }
    }

    modify(): void {
        if (!this.currentClub) {
            console.log('\n> No target club yet. Find target club first.');
            return;
        }

        const memberOfClub = this.memberHelper.hasMembers(this.currentClub);

        if (!memberOfClub) {
            console.log('\n> No members in the target club --> ' + this.currentClub.name);
            return;
        }

        while (true) {
            const email = question('\n member email to modify (0.Member menu): ');

            if (email === '0' || !email.length) {
                return;
            }

            const member = this.memberHelper.exist(this.currentClub, email);

            if (!member) {
                console.log('\n> No such a member --> ' + email);
                continue;
            }

            const foundMember = this.memberHelper.find(this.currentClub, email);

            if (!foundMember) {
                console.log('\n> No such a member ');
            }

            console.log('\n> Found member: ', foundMember);

            const newName = question('\n new name (Enter. no change): ');
            const newPhoneNumber = question(' new phone number (Enter. no change): ');
            const newNickName = question(' new nickname (Enter. no change): ');
            const newBirthday = question(' new birthday(yyyy.mm.dd) (Enter. no change): ');
            const newRole = question(' new President|Member (Enter. no change): ');

            const newValueMap = new Map<string, string>();

            if (foundMember) {
                newValueMap.set('name', newName || foundMember.name);
                newValueMap.set('phoneNumber', newPhoneNumber || foundMember.phoneNumber);
                newValueMap.set('nickname', newNickName || foundMember.nickname);
                newValueMap.set('birthday', newBirthday || foundMember.birthDay);
                newValueMap.set('role', newRole || foundMember.role);

                this.memberHelper.modify(foundMember, newValueMap);
                console.log('\n> No such a member: ', foundMember);
            } else {
                console.log('\n> No such a member ')
            }
        }
    }

    remove(): void {
        if (!this.currentClub) {
            console.log('\n> No target club yet. Find target club first.');
            return;
        }

        while (true) {
            const email = question('\n member email to remove (0.Member menu): ');

            if (email === '0' || !email.length) {
                return;
            }

            if (!this.memberHelper.exist(this.currentClub, email)) {
                console.log('\n> No such member -> ' + email);
                continue;
            }

            const member = this.memberHelper.find(this.currentClub, email);

            if (member) {
                this.memberHelper.remove(this.currentClub, member);
            }
            console.log('\n> Removed by email --> ' + email);
            break;
        }
    }
}

export default MemberWindow;