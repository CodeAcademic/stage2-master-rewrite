class Dateutil {

    static today(): string {
        const date = new Date();
        const year = date.getFullYear()
        const month = date.getMonth()
        const day = date.getDate()


        return `${year}-${this.formatNumber(month)}-${this.formatNumber(day)}`
    }

    private static formatNumber(n: number) {
        return n < 10 ? `0${n}` : n;
    }
}

export default Dateutil;