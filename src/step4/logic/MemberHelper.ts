import ClubMember from "../../step1/entity/ClubMember";
import ClubMemberStore from "../storage/ClubMemberStore";

class MemberHelper {
    memberStore: ClubMemberStore;

    constructor() {
        this.memberStore = new ClubMemberStore();
    }

    hasMembers(clubName: string): boolean | undefined {
        return this.memberStore.hasMembers(clubName);
    }

    exist(clubName: string, email: string): boolean{
        return this.memberStore.exist(clubName, email);
    }

    register(clubName: string, newMember: ClubMember): string{
        return this.memberStore.register(clubName, newMember)
    }

    find(clubName: string, email: string): ClubMember | null {
        return this.memberStore.find(clubName, email);
    }

    modify(member: ClubMember, newValueMap: Map<string, string>): void{
        this.memberStore.modify(member, newValueMap)
    }

    remove(clubName: string, memberEmail: string): void {
        this.memberStore.remove(clubName, memberEmail)
    }
}

export default MemberHelper;