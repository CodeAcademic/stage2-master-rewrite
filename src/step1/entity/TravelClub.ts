import Dateutil from "../../util/DateUtil";
import ClubMember from "./ClubMember";

class TravelClub {
  private readonly MINIMUM_NAME_LENGTH: number = 3;
  private readonly MINIMUM_INTRO_LENGTH: number = 10;

  name: string = "";
  intro: string = "";
  foundedDate: string = "";

  members: ClubMember[] = [];

  constructor(name: string, intro: string) {
    this.setName(name);
    this.setIntro(intro);
    this.foundedDate = Dateutil.today();
  }

  setName(name: string): void {
    if (name.length < this.MINIMUM_NAME_LENGTH) {
      throw new Error(
        "\n> Name should be longer than " + this.MINIMUM_NAME_LENGTH,
      );
    }
    this.name = name;
  }

  setIntro(intro: string): void {
    if (intro.length < this.MINIMUM_INTRO_LENGTH) {
      throw new Error(
        "\n> Intro should be longer than " + this.MINIMUM_INTRO_LENGTH,
      );
    }
    this.intro = intro;
  }
}

export default TravelClub;
