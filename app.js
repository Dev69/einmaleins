class FragenDefinition {
    constructor(zahl1, zahl2, ant1, ant2, ant3) {
        this.zahl1 = zahl1;
        this.zahl2 = zahl2;
        this.falsch = [ant1, ant2, ant3]
    }
}

class Frage {
    constructor(zahl1, zahl2, ant1, ant2, ant3, ant4) {
        let number = Math.floor(Math.random() * 2) + 1;
        if (number === 1) {
            this.zahl1 = zahl1;
            this.zahl2 = zahl2;
        }
        else {
            this.zahl1 = zahl2;
            this.zahl2 = zahl1;
        }
        this.ergebnis = zahl1 * zahl2;
        let antworten = [ant1, ant2, ant3, ant4];
        for (let i = 0; i < antworten.length; i++) {
            let pos1 = Math.floor(Math.random() * 4);
            let pos2 = Math.floor(Math.random() * 4);
            let temp = antworten[pos1];
            antworten[pos1] = antworten[pos2];
            antworten[pos2] = temp;
        }
        this.ant1 = antworten[0];
        this.ant2 = antworten[1];
        this.ant3 = antworten[2];
        this.ant4 = antworten[3];
    }

    getNrderRichtenAntwort() {
        if (this.ergebnis === this.ant1) {
            return 1;
        }
        if (this.ergebnis === this.ant2) {
            return 2;
        }
        if (this.ergebnis === this.ant3) {
            return 3;
        }
        if (this.ergebnis === this.ant4) {
            return 4;
        }
    }
}

class Spiel {
    constructor(fragendefinitionen, punktziel) {
        this.punkteziel = punktziel;
        this.aktuellePunktzahl = 0;
        this.fragendefinitionen = fragendefinitionen;
        this.aktuelleDefinitionen = [];
        this.Frage = null;
    }

    resetSpiel() {
        this.aktuelleDefinitionen = [];
        this.aktuellePunktzahl = 0;
        this.Frage = null;
    }

    starteSpiel() {
        this.aktuellePunktzahl = 0;
        this.aktuelleDefinitionen = this.fragendefinitionen.slice(0);
        this.Frage = this.generiereNeueFrage();
    }

    generiereNeueFrage() {
        const defNummer = Math.floor(Math.random() * this.aktuelleDefinitionen.length);
        let defFrage = this.aktuelleDefinitionen[defNummer];

        let frage = new Frage(
            defFrage.zahl2,
            defFrage.zahl1,
            defFrage.falsch[0],
            defFrage.falsch[1],
            defFrage.falsch[2],
            defFrage.zahl2 * defFrage.zahl1);
        this.aktuelleDefinitionen.splice(defNummer, 1);
        if (this.aktuelleDefinitionen.length === 0) {
            this.aktuelleDefinitionen = this.fragendefinitionen.slice(0);
        }
        return frage;
    }

    beantworteFrage(antwortNr) {
        if (this.Frage.getNrderRichtenAntwort() === antwortNr) {
            this.aktuellePunktzahl += 1;
        }
        this.Frage = this.generiereNeueFrage();
    }

    isSpielFertig(){
        return this.punkteziel ===this.aktuellePunktzahl;
    }


    getSpielFortschrittInProzent() {
        return Math.round(this.aktuellePunktzahl / this.punkteziel * 100);
    }
}

class UI {
    constructor() {
        this.uistartbutton = document.querySelector('#startbutton');
        this.uinochmalbutton = document.querySelector('#nochmalbutton');
        this.uistartview = document.querySelector('#startview');
        this.uifrageview = document.querySelector('#frageview');
        this.uiendview = document.querySelector('#endview');
        this.uiprogressbar = document.querySelector("#progress");
        this.uizahl1 = document.querySelector('#zahl1');
        this.uizahl2 = document.querySelector('#zahl2');
        this.uiantwort1 = document.querySelector('#btn1');
        this.uiantwort2 = document.querySelector('#btn2');
        this.uiantwort3 = document.querySelector('#btn3');
        this.uiantwort4 = document.querySelector('#btn4');
    }

    showStartPage() {
        this.uistartview.style.display = "block";
        this.uifrageview.style.display = "none";
        this.uiendview.style.display = "none";
    }

    showFrage(frage) {
        this.uistartview.style.display = "none";
        this.uifrageview.style.display = "block";
        this.uiendview.style.display = "none";
        this.uizahl1.innerHTML = `${frage.zahl1}`;
        this.uizahl2.innerHTML = `${frage.zahl2}`;
        this.uiantwort1.innerHTML = `${frage.ant1}`;
        this.uiantwort2.innerHTML = `${frage.ant2}`;
        this.uiantwort3.innerHTML = `${frage.ant3}`;
        this.uiantwort4.innerHTML = `${frage.ant4}`;
    }

    showEnde() {
        this.uistartview.style.display = "none";
        this.uifrageview.style.display = "none";
        this.uiendview.style.display = "block";
    }

    setprogress(prozent) {
        this.uiprogressbar.style.width = prozent + '%';
    }
}


class Controller {
    constructor(spiel, ui) {
        this.spiel = spiel;
        this.ui = ui;
        this.ui.uistartbutton.addEventListener("click", () => {
            this.starteSpiel();
        });
        this.ui.uinochmalbutton.addEventListener("click", () => {
            this.starteSpiel();
        });
        this.ui.uiantwort1.addEventListener("click", () => {
            this.antworte(1);
        });
        this.ui.uiantwort2.addEventListener("click", () => {
            this.antworte(2);
        });
        this.ui.uiantwort3.addEventListener("click", () => {
            this.antworte(3);
        });
        this.ui.uiantwort4.addEventListener("click", () => {
            this.antworte(4);
        });
    };

    reset() {
        this.spiel.resetSpiel();
        this.ui.showStartPage();
    }

    starteSpiel() {
        this.spiel.starteSpiel();
        ui.showFrage(this.spiel.Frage);
        ui.setprogress(this.spiel.getSpielFortschrittInProzent());
    };

    antworte(antwortnr) {
        spiel.beantworteFrage(antwortnr);
        ui.showFrage(this.spiel.Frage);
        ui.setprogress(this.spiel.getSpielFortschrittInProzent());
        if (spiel.isSpielFertig()) {
            ui.showEnde();
        }
    };

}

let fragendefinitionen = [
    new FragenDefinition(2, 3, 4, 8, 5),
    new FragenDefinition(2, 4, 10, 6, 9),
    new FragenDefinition(2, 5, 9, 8, 12),
    new FragenDefinition(2, 6, 10, 8, 14),
    new FragenDefinition(2, 7, 9, 12, 16),
    new FragenDefinition(2, 8, 12, 14, 18),
    new FragenDefinition(2, 9, 20, 16, 21),
    new FragenDefinition(3, 3, 6, 12, 10),
    new FragenDefinition(3, 4, 10, 14, 15),
    new FragenDefinition(3, 5, 12, 25, 20),
    new FragenDefinition(3, 6, 16, 20, 36),
    new FragenDefinition(3, 7, 18, 24, 27),
    new FragenDefinition(3, 8, 21, 27, 32),
    new FragenDefinition(3, 9, 21, 28, 18),
    new FragenDefinition(4, 4, 12, 14, 18),
    new FragenDefinition(4, 5, 16, 18, 25),
    new FragenDefinition(4, 6, 16, 27, 28),
    new FragenDefinition(4, 7, 27, 24, 32),
    new FragenDefinition(4, 8, 28, 30, 36),
    new FragenDefinition(4, 9, 24, 32, 38),
    new FragenDefinition(5, 5, 20, 30, 35),
    new FragenDefinition(5, 6, 25, 35, 32),
    new FragenDefinition(5, 7, 40, 32, 36),
    new FragenDefinition(5, 8, 35, 42, 48),
    new FragenDefinition(5, 9, 40, 47, 42),
    new FragenDefinition(6, 6, 32, 38, 34),
    new FragenDefinition(6, 7, 44, 48, 46),
    new FragenDefinition(6, 8, 46, 52, 54),
    new FragenDefinition(6, 9, 52, 48, 63),
    new FragenDefinition(7, 7, 44, 52, 63),
    new FragenDefinition(7, 8, 54, 58, 62),
    new FragenDefinition(7, 9, 58, 64, 72),
    new FragenDefinition(8, 8, 56, 54, 66),
    new FragenDefinition(8, 9, 66, 60, 76),
    new FragenDefinition(9, 9, 63, 99, 72),
];

const spiel = new Spiel(fragendefinitionen, 3);
const ui = new UI();
const controller = new Controller(spiel, ui);
controller.reset();

