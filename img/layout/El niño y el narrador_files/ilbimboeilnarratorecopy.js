// DOM
const btnAho = document.getElementById("aho");
const dialogo = document.getElementById("dialogo");


//variabili per gestire la conversazione
let passaggio = 0; //punto della storia
let nomeBimbo = "";
let movimento = null; //per fermare il dannato

//const monouso
const btnOps1 = document.createElement("button");
btnOps1.textContent = "Un canguro";
btnOps1.id = "btnOps1";
const btnOps2 = document.createElement("button");
btnOps2.textContent = "Il cane";
btnOps2.id = "btnOps2";
const btnOps3 = document.createElement("button");
btnOps3.textContent = "L'uomo";
btnOps3.id = "btnOps3";

// porte
const containerPorte = document.createElement("div");
containerPorte.id = "porte";
const btnPorta1 = document.createElement("button");
btnPorta1.textContent = "Spazio";
btnPorta1.dataset.porta = "1";
const btnPorta2 = document.createElement("button");
btnPorta2.textContent = "Preistoria";
btnPorta2.dataset.porta = "2";
const btnPorta3 = document.createElement("button");
btnPorta3.textContent = "Storia";
btnPorta3.dataset.porta = "3";
const btnPorta4 = document.createElement("button");
btnPorta4.textContent = "Oceano";
btnPorta4.dataset.porta = "4";

//variabili delle porte 
let porteCompletate = [];
let prmVltPassaggio12 = true;

// porta1 =planetario
function disponiPianetiInCerchio() {
    const contenitore = document.getElementById("minigioco-spazio");
    const pianeti = contenitore.querySelectorAll(".pianeta");
    
    const centroX = window.innerWidth / 2;
    const centroY = window.innerHeight / 2;
    const raggio = Math.min(window.innerWidth, window.innerHeight) / 2.5;

    const totale = pianeti.length;

    pianeti.forEach((p, i) => {
        let angolo = (i / totale ) * 2 * Math.PI;
        const x = centroX + raggio * Math.cos(angolo) - 30;
        const y = centroY + raggio * Math.sin(angolo) - 30;

        // console.log("Angolo: " + angolo);

        p.style.position = "absolute";
        p.style.left = x + "px";
        p.style.top = y + "px";

        p.style.backgroundImage = `url('img/content/${p.dataset.nome.toLowerCase()}.png')`;
    });
}
// stelle planetario
document.addEventListener('DOMContentLoaded', () => {
    const numStars = 2000;
    for (let i = 0; i< numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${1 + Math.random() * 2}s`;
        document.getElementById("minigioco-spazio").appendChild(star);
    } 
});

// carosello
const epoche = ["egiziani", "romani", "medioevo", "rinascimento", "industriale", "spaziale", "contemporanea"];
let indiceCorrente = 0;
let eventoBox = null;

// matrix
function creaMatrix() {
    const numStringhe = 100;
    for (let i = 0; i < numStringhe; i++) {
        const stringa = document.createElement('div');
        stringa.className = 'stringaMatrix';
        stringa.style.left = `${Math.random() * 100}vw`;
        stringa.style.animationDelay = `${Math.random() * 5}s`;
        stringa.style.width = `${Math.random() * 2 + 1}px`;
        document.getElementById("sfondo").appendChild(stringa);
    }
}

// SEGRETO CTRL+S
// Trucco per saltare i giochi
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === "s") {
        const skipButton = document.createElement("button");
        skipButton.id = "skipButton";
        skipButton.textContent = "Salta";
        skipButton.style.position = "fixed";
        skipButton.style.bottom = "10px";
        skipButton.style.right = "10px";
        skipButton.style.zIndex = "9999";
        skipButton.style.padding = "8px";
        skipButton.style.background = "red";
        skipButton.style.color = "white";
        skipButton.style.border = "none";
        skipButton.style.borderRadius = "5px";
        skipButton.style.cursor = "pointer";

        skipButton.onclick = () => {
            if (!porteCompletate.includes("1")) {
                porteCompletate.push("1");
                document.getElementById("minigioco-spazio").style.display = "none";
            } else if (!porteCompletate.includes("2")) {
                porteCompletate.push("2");
                document.getElementById("minigioco-dino").style.display = "none";
            } else if (!porteCompletate.includes("3")) {
                porteCompletate.push("3");
                document.getElementById("carosello").style.display = "none";
            } else if (!porteCompletate.includes("4")) {
                porteCompletate.push("4");
                document.getElementById("minigioco-oceano").style.display = "none";
            }
            passaggio = 12;
            dialogo.textContent = `${nomeBimbo}, abbiamo superato un'altra porta!`;
            btnAho.textContent = "Avanti!";
            btnAho.style.display = "inline-block";

            skipButton.remove(); // Rimuovi il bottone dopo l'uso
        };

        if (!document.getElementById("skipButton")) {
            document.body.appendChild(skipButton);
        }
    }
});


// PULSANTE PRINCIPALE NARRAZIONE
btnAho.onclick = function() {
    if(passaggio == 0) {
        dialogo.textContent = "Come ti chiami?";

        let input = document.createElement("input");
        input.type = "text";
        input.id = "inputNome";
        dialogo.after(input);

        btnAho.textContent = "Invia"; 
        passaggio++;
    }

    else if(passaggio === 1) {
        let input = document.getElementById("inputNome");
        nomeBimbo = input.value.trim();

        if (nomeBimbo === "") {
            dialogo.textContent = "Non ho capito bene, puoi ripetere?";
            return;
        }

        input.remove();

        dialogo.textContent = "Un piacere conoscerti, " + nomeBimbo + "! Io sono il Narratore. Sai dove ti trovi?";
        btnAho.textContent = "Sono a casa mia.";
        passaggio++;
    }

    else if(passaggio === 2) {
        dialogo.textContent = "Ti trovi nel mondo digitale, " + nomeBimbo + ". Sei nella mia casa. Come sei arrivato qui?";
        btnAho.textContent = "Non lo so...";
        passaggio++;
    }

    else if(passaggio === 3) {
        dialogo.textContent = "Non importa, sono felice di conoscerti! É la prima volta che parlo con qualcuno.";
        btnAho.textContent = "Ti faccio compagnia! Giochiamo?";
        passaggio++;
    }


    else if (passaggio === 4)
        if (btnAho.dataset.gioco === "attivo") {
        clearInterval(movimento);
        btnAho.classList.remove("gioco");
        btnAho.style.position = "static";
        delete btnAho.dataset.gioco;//fine movimento

        dialogo.textContent = "M'hai preso!";
        btnAho.textContent = "Evvai!"; //fine giochino
        passaggio++;
    } else {
        dialogo.textContent = "Certamente!";
        btnAho.textContent = "Prendimi se ci riesci!";

        // play button
        btnAho.classList.add("gioco");
        // movimento bottone
        const rect = btnAho.getBoundingClientRect();
        // getBoundingClientRect devuelve un objeto con información sobre las dimensiones y posición absoluta respecto al viewport (pantalla)
        // su propiedad x e y equivalen al top y el left
        // extraigo la primera posición antes de iniciar los calculos aleatorios para restar siemrpe esa x e y y generar un top y left negativo
        movimento = setInterval(() => {
            let x = Math.random() * (window.innerWidth - btnAho.offsetWidth);
            let y = Math.random() * (window.innerHeight - btnAho.offsetHeight);

            x = x - rect.x;
            y = y - rect.y;

            btnAho.style.left = x + "px";
            btnAho.style.top = y + "px";
        }, 1000);
        
        btnAho.dataset.gioco ="attivo"; //attivo minigioco

            btnAho.disabled = true;
            setTimeout(() => {
               btnAho.disabled = false;//entra dopo na piccola pausa
            }, 300);
    }

    else if (passaggio === 5 ) {
                dialogo.textContent = "Ancora!";
                btnAho.textContent = "Facciamo un indovinello?";
                passaggio++;
                return;
    }

    else if (passaggio === 6 ) {
            btnAho.style.display = "none";
            dialogo.textContent = "Bella pensata, " + nomeBimbo + "! Qual'è l'animale ha 4 gambe al mattino, due al giorno e tre alla sera?"

            dialogo.after(btnOps1);
            dialogo.after(btnOps2);
            dialogo.after(btnOps3);
    }

    else if (passaggio === 7 ) {
        dialogo.textContent = nomeBimbo + " hai risolto l'indovinello della sfinge!";
        btnAho.textContent = "Ancora!";

        btnOps1.remove();
        btnOps2.remove();
        btnOps3.remove();

        passaggio++;
    }

    else if (passaggio === 8 ) {
        dialogo.textContent = "CErt0... ⚡ bzzzz! ⚡..uto!";
        btnAho.textContent = "Narratore, che hai?";
        passaggio++;
        aggiornaGrafica();
    }

    else if (passaggio === 9) {
        btnAho.style.display = "none";
        dialogo.textContent = "##@&%... Errore sistema... riavvio...";
        dialogo.classList.add("glitch");

        aggiornaGrafica();

        const btnContinua = document.createElement("button");
        btnContinua.id = "continuaErrore";
        btnContinua.textContent = "Aiutami...";

        document.body.appendChild(btnContinua);

        // timing
        setTimeout(() => {
           btnContinua.style.display = "block"; 
        setTimeout(() => {
            btnContinua.style.opacity = 1;
        }, 100);
    }, 2000);

    //quando clicka su aiutami
    btnContinua.onclick = () => {
        dialogo.classList.remove("glitch");
        dialogo.textContent = "...dove sono? Ehi, " + nomeBimbo + " dove siamo, non ricordo nulla.";
        btnContinua.remove();
        btnAho.style.display = "inline-block";
        btnAho.textContent = "Narratore, tutto bene?";
        passaggio++;
        aggiornaGrafica();
        console.log("Passaggio:", passaggio);
console.log("Classi sfondo:", document.getElementById("sfondo").className);
        };
    }

    else if (passaggio === 10) {
        dialogo.textContent = "Ho perso la memoria... chissà perché mi ricordo solo di te, " + nomeBimbo ;
        btnAho.textContent = "Perchè siamo amici!";
        passaggio++;
    }

    else if (passaggio ===11) {
        dialogo.textContent = "Amici? Non ricordo cosa significa...";
        btnAho.textContent =  "Significa che ti aiuteró! Ricordi qualcosa?";
        passaggio++;
    }

    else if (passaggio === 12) {
        dialogo.textContent = "";
        btnAho.style.display = "none"; // per nasconderlo
        if (prmVltPassaggio12) {
                dialogo.textContent = "Solo ricordo quattro porte...";
                prmVltPassaggio12 = false;
        } else {
            dialogo.textContent = "Non so che cerco ma non era lá, proviamo da un'altra parte.";
        }

        // pulizia bottoni se presenti
        [btnPorta1, btnPorta2, btnPorta3, btnPorta4].forEach(btn => {
            if(!porteCompletate.includes(btn.dataset.porta)) {
                dialogo.after(btn);
            }
        });

        // controllo se completate tutte passare a passaggio++
        if (porteCompletate.length ===4) {// evitamo errori
            btnAho.style.display = "inline-block";
            dialogo.textContent = "Le abbiamo aperte tutte, comincio a ricordare qualcosa...";
            btnAho.textContent = "Sento che è la volta giusta andiamo!";
            passaggio++;
            return;
            aggiornaGrafica();
        }
    }

    else if (passaggio === 13) {
        dialogo.textContent = "Analisi dei dati in corso...";
        btnAho.textContent = "Dai che ce l'abbiamo fatta!";
        passaggio++;
    }

    else if (passaggio === 14) {
        dialogo.textContent = nomeBimbo + ", mi sento diverso... in un modo bello e nuovo.";
        btnAho.textContent = "Sei felice?";
        passaggio++;
        aggiornaGrafica();
    }

    else if (passaggio === 15) {
        dialogo.textContent = "Sì, credo di sì. Grazie a te ho capito qualcosa di importante.";
        btnAho.textContent = "Cosa?";
        passaggio++;
    }

    else if (passaggio === 16) {
        dialogo.textContent = "L'errore non era un errore del sistema. Era la nostra connessione, " + nomeBimbo; ".";
        btnAho.textContent = "Che intendi dire, Narratore?";
        passaggio++;
    }

    else if (passaggio === 17) {
        dialogo.textContent = "Il mondo digitale e quello reale si sono toccati, grazie a noi. Non posso rimanere, ma non devi essere triste.";
        btnAho.textContent = "Non voglio lasciarti!";
        passaggio++;
    }

    else if (passaggio === 18) {
        dialogo.textContent = "Non è un addio. Ogni volta che sarai connesso, io ci saró. Magari non parleremo come adesso, ma ci saró.";
        btnAho.textContent = "Davvero?";
        passaggio++;
    }

    else if (passaggio === 19) {
        dialogo.textContent = "Promesso. Hai creato qualcosa di meraviglioso, e anche se i racconti finiscono, restano con noi.";
        btnAho.textContent = "Non ti dimenticherò!";
        passaggio++;
    }

    else if (passaggio === 20) {
        dialogo.textContent = "E io non dimenticherò te. Ora vai, vivi il tuo mondo ed io custodirò i nostri ricordi qui.";
        btnAho.textContent = "Arrivederci, amico mio.";
        passaggio++;
    }

    else if (passaggio === 21) {
        schermataFinale();
    }

    function schermataFinale() {
        dialogo.textContent = "Grazie per avermi fatto scoprire il mondo reale attraverso di te, " +nomeBimbo ;
        btnAho.style.display = "none";

        setTimeout(() => {
            dialogo.textContent = "";
            const finaleBox = document.createElement("div");
            finaleBox.id = "finaleBox";
            finaleBox.textContent = "Di tante storie, la nostra è la mia preferita. A presto, amico.";
            document.body.appendChild(finaleBox);
            finaleBox.style.opacity= 0;

            setTimeout(() => {
                finaleBox.style.opacity = 1;

                setTimeout(() => {
                    document.getElementById("sfondo").classList.add("finale-svanimento");
                    lanciaStelleCadenti();
                    document.getElementById("sfondo").classList.add("nightfade");
            }, 6000);
        }, 100);    
    }, 4500);
}



// chiudendo i tasti dell'indovinello
    btnOps1.onclick = () => {
        dialogo.textContent = "🦘 Boing! Ci sei cascato! 🦘";
    };
    btnOps2.onclick= () => {
        dialogo.textContent = "Bau! Hai sbagliato però ti do la zampa 🐾"
    };
    btnOps3.onclick = () => {
        passaggio = 7;
        dialogo.textContent = nomeBimbo + ", sei troppo forte!"
        btnOps1.remove();
        btnOps2.remove();
        btnOps3.remove();
        btnAho.textContent = "Grazie!";
        btnAho.style.display = "inline-block";
        aggiornaGrafica();
    };
    aggiornaGrafica()
};
aggiornaGrafica()

// porta1 PLANETARIO
window.addEventListener("resize", disponiPianetiInCerchio); //ricolloca sendo dimensioni
btnPorta1.onclick = () => {
    [btnPorta1, btnPorta2, btnPorta3, btnPorta4].forEach(btn => btn.remove());
    btnAho.style.display = "none";
    document.getElementById("minigioco-spazio").style.display = "block";
    
    //preparando
    disponiPianetiInCerchio(); 
    dialogo.textContent = "Uao... siamo nello spazio " + nomeBimbo + " aiutami a riconoscere i pianeti!"

    disponiPianetiInCerchio();

    const pianeti = document.querySelectorAll(".pianeta");
    let nomiDisponibili = Array.from(pianeti).map(p => p.dataset.nome);

    function nuovaDomanda() {
        if (nomiDisponibili.length===0) {
            //fine minigioco
            document.getElementById("minigioco-spazio").style.display = "none";
            porteCompletate.push("1");
            passaggio = 12;
            aggiornaGrafica(); 
            dialogo.textContent = "Accidenti " + nomeBimbo + ", sei davvero spaziale! Li conoscevi tutti";
            btnAho.textContent = "Dai torniamo, mi sento meglio!";
            btnAho.style.display = "inline-block";
            return;
        }

        // pianeta aleatorio
        const indice = Math.floor(Math.random() * nomiDisponibili.length);
        const nomeRichiesto = nomiDisponibili[indice];
        document.getElementById("centro").textContent = "Qual è " + nomeRichiesto + "?";

        pianeti.forEach(p => {
            p.onclick = () => {
                const nomeCliccato = p.dataset.nome;
                if (nomeCliccato === nomeRichiesto) {
                    dialogo.textContent = nomeRichiesto + ", giusto! Sei spaziale " + nomeBimbo + "!";
                    p.classList.add("attivato");
                    p.onclick = null;
                    nomiDisponibili.splice(indice, 1);
                    setTimeout(nuovaDomanda, 1000);
                } else {
                    dialogo.textContent = "Anche io c'ero cascato, " + nomeBimbo + "! Quello è " + nomeCliccato + ".";
                }
            };
        });
    }
    nuovaDomanda();
}; 
// porta1 FINE


// porta2 PREISTORIA
btnPorta2.onclick = () => {
    // rimozione bottoni
    [btnPorta1, btnPorta2, btnPorta3, btnPorta4].forEach(btn => btn.remove());
    btnAho.style.display = "none";
    dialogo.textContent = "";

    // contenitore gioco
    const dinoBox = document.getElementById("minigioco-dino");
    const dino = document.getElementById("dino");
    const dialogoDino = document.getElementById("dialogoDino");

    dinoBox.style.display = "flex";

    // livelli dinosauri
    const dinoStage = [
        { nome: "ankylosaurus", velocita: 3000, messaggio: "Un gioco da ragazzi. Corazzato ma lento!"},
        { nome: "t-rex", velocita: 2000, messaggio: "Sarà lento ma mi fa una fifa blu" },
        { nome: "pterodactyl", velocita: 1300, messaggio: "Incredibile lo hai preso al volo!"},
        { nome: "velociraptor", velocita: 800, messaggio: nomeBimbo + " sei stato giurassico!"},
    ];

    let livello = 0;
    let direzioneDestra = true;
    let intervalloMovimento;
    
    function avviaLivello() {
        const stage = dinoStage[livello];

        // reset
        clearInterval(intervalloMovimento);
        dino.style.left = getComputedStyle(dino).left;
        dino.style.transition = "none";
        dino.classList.remove("dino-gira");
        direzioneDestra = true;
        dino.style.left = "0";        

        // posizione verticale

        dino.style.top = (stage.nome === "pterodactyl") ? "30%" : "80%";
        // imm
        dino.style.backgroundImage = `url('img/content/${stage.nome}.png')`;
        void dino.offsetWidth; //fermete
        
        // forza riposizionamento
        dino.style.transition = `left ${stage.velocita}ms linear`;
        dino.style.left = "calc(100% - 100px)"; 
        // movimento
        intervalloMovimento = setInterval(() => {
            direzioneDestra =!direzioneDestra;
           dino.classList.toggle("dino-gira", !direzioneDestra);
           dino.style.left = direzioneDestra ? "calc(100% - 100px)" : "0";
        }, stage.velocita);
    }    

 // fine movimento al tocco
        dino.onmouseenter= () => {
            dino.style.transition = "none";
            dialogoDino.textContent = dinoStage[livello].messaggio;

            setTimeout(() => {
                livello++
                if (livello < dinoStage.length) {
                    avviaLivello();
                } else {
                    fineGioco();
                }
            }, 1500);
        };

        function fineGioco() {
            dinoBox.style.display = "none";
            porteCompletate.push("2");
            passaggio = 12 ;
            aggiornaGrafica(); 
            dialogo.textContent = "Accidenti sono sempre piú rapidi!";
            btnAho.textContent = "Sei stato gigantesco " + nomeBimbo + "! Mi sento meglio!";
            btnAho.style.display = "inline-block";
        }

    avviaLivello();
};
// porta2 FINE


// porta3 STORIA
let eventiStorici = {};

async function caricaEventiStorici() {
    try {
        const risposta = await fetch("eventi.json");
        eventiStorici = await risposta.json();
        console.log("Dati STORIA", eventiStorici);
    } catch (errore) {
        console.error("nun carica sti dati", errore);
    }
}

async function cercaEventoDaApi(anno) {
    if (!eventiStorici || Object.keys(eventiStorici).length === 0) {
        await caricaEventiStorici();
    }
    
    const evento = eventiStorici[anno];
    return evento ? evento : "Nessun evento registrato per questo anno.";
}

btnPorta3.onclick = () => {
    [btnPorta1, btnPorta2, btnPorta3, btnPorta4].forEach(btn => btn.remove());
    btnAho.style.display = "none";

    const caroselloBox = document.getElementById("carosello");
    caroselloBox.style.display = "flex";

    document.getElementById("btnCercaEvento").onclick = async () => {
        const anno = document.getElementById("dataStorica").value.trim();
        const evento = await cercaEventoDaApi(anno);
        document.getElementById("eventoStorico").textContent = `${anno}: ${evento}`;
    };

    aggiornaCarosello();
};

function aggiornaCarosello() {
    const bottoni = document.querySelectorAll('.era');
    bottoni.forEach((btn, index) => {
        btn.classList.toggle('centro', index === indiceCorrente);
        btn.classList.toggle('passato', index < indiceCorrente);
        btn.classList.toggle('futuro', index > indiceCorrente);
        btn.style.backgroundImage = `url('img/content/${epoche[index]}.png')`;
        btn.disabled = index !== indiceCorrente;
        btn.style.opacity = index === indiceCorrente ? '1' : '0.6';
        btn.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    });
} 

function mostraEventoStoria(epoca) {
    if (!eventoBox) {
        eventoBox = document.createElement("div");
        eventoBox.id = "eventoStoria";
        eventoBox.style.display = "none";
        eventoBox.innerHTML = `
            <div class="evento-contenuto">
                <img id="eventoImg" src="" alt=""/>
                <p id="eventoTesto"></p>
                <button id="btnProssimaEra" style="display:none;">Prossima Era</button>
            </div>
        `;
        document.body.appendChild(eventoBox);
    }

    // ✅ Usa i dati dal file JSON
    cercaEventoDaApi(epoca).then(evento => {
        document.getElementById("eventoImg").src = `img/content/${epoca}.png`;
        document.getElementById("eventoImg").alt = epoca;
        document.getElementById("eventoTesto").textContent = evento;

        eventoBox.style.display = "block";
        document.getElementById("btnProssimaEra").style.display = "none";

        setTimeout(() => {
            document.getElementById("btnProssimaEra").style.display = "block";
        }, 500);

        document.getElementById("btnProssimaEra").onclick = () => {
            eventoBox.style.display = "none";
            if (indiceCorrente === epoche.length - 1) {
                fineGioco();
            } else {
                indiceCorrente++;
                aggiornaCarosello();
            }
        };
    });
}


function fineGioco() {
    const eventoBox = document.getElementById("eventoStoria");
    eventoBox.style.display = "block";
    document.getElementById("eventoImg").src = "img/content/finale.png";
    document.getElementById("eventoImg").alt = "finale";
    document.getElementById("eventoTesto").textContent = `Questa è anche la nostra di Storia, ${nomeBimbo}. Grazie per avermi accompagnato`;

    const btnProssimaEra = document.getElementById("btnProssimaEra");
    btnProssimaEra.textContent = "Stai molto meglio! Andiamo!";
    btnProssimaEra.style.display = "block";

    btnProssimaEra.onclick = () => {
        eventoBox.style.display = "none";
        document.getElementById("carosello").style.display = "none";
        porteCompletate.push("3");
        passaggio = 12;
        aggiornaGrafica(); 
        dialogo.textContent = `${nomeBimbo}, l'umanità è un racconto fantastico!`;
        btnAho.textContent = "Andiamo!";
        btnAho.style.display = "inline-block";
    };
}

// Gestione click epoche
const bottoniEpoca = document.querySelectorAll('.era');
bottoniEpoca.forEach((btn, index) => {
    btn.addEventListener('click', () => clickEpoca(index));
});

function clickEpoca(index) {
    if (index === indiceCorrente) {
        mostraEventoStoria(epoche[indiceCorrente]);
    }
}

aggiornaCarosello();
// porta3 FINE


// porta4 OCEANO
btnPorta4.onclick = () => {
    [btnPorta1, btnPorta2, btnPorta3, btnPorta4].forEach(btn => btn.remove());
    btnAho.style.display = "none";

    const oggettiPresenti = ["stella marina", "pesce", "balena", "medusa", "pesce palla"];
    const oggettiTrovati = [];
    const oceanoBox = document.getElementById("minigioco-oceano");
    const sottomarino = document.getElementById("sottomarino");
    const inputOceano = document.getElementById("inputOceano");
    const timerText = document.getElementById("timerOceano");
    oceanoBox.style.display = "flex";

    // variabili di gioco
    let tempo = 45;
    let paroleMinime = 5;
    let intervallo;
    let bolleInterval; // ✅ lo spostiamo fuori per controllarlo da stopBolle()

    // bottone
    document.getElementById("btnOceano").onclick = controllaInputSingolo;
    inputOceano.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            controllaInputSingolo();
        }
    });

    function controllaInputSingolo() {
        const parola = inputOceano.value.trim().toLowerCase(); // tuttominuscolo
        if (parola === "") return;

        if (oggettiTrovati.includes(parola)) {
            timerText.textContent = `${nomeBimbo}, l'hai già detto!`;
        } else if (oggettiPresenti.includes(parola)) {
            timerText.textContent = `${nomeBimbo}, anche io stavo guardando ${parola}!`;
        } else {
            timerText.textContent = `Che occhio, ${nomeBimbo}, non l'avevo notato!`;
        }

        oggettiTrovati.push(parola);
        inputOceano.value = "";

        // ✅ controlla vittoria dopo ogni invio
        if (oggettiTrovati.length >= paroleMinime) {
            vittoria();
        }
    }

    // countdown
    function startTimer() {
        timerText.textContent = `Tempo rimasto: ${tempo} secondi`;

        // ✅ inizia le bolle
        bolleInterval = setInterval(creaBolla, 450);

        intervallo = setInterval(() => {
            tempo--;
            timerText.textContent = `Tempo rimasto: ${tempo} secondi`;

            // calcolando posizione sottomarino
            const altezzaMassima = (window.innerHeight * 2) / 3;
            let nuovaTop = ((45 - tempo) / 45) * altezzaMassima;
            sottomarino.style.top = nuovaTop + "px";

            // se tempo finito
            if (tempo <= 0) {
                clearInterval(intervallo);
                fallito();
            }
        }, 1000);
    }

    // ✅ bollicine (ora fuori dal timer)
    function creaBolla() {
        const bolla = document.createElement("div");
        bolla.classList.add("bolla");

        const size = Math.random() * 10 + 5;
        bolla.style.width = size + "px";
        bolla.style.height = size + "px";
        bolla.style.left = Math.random() * window.innerWidth + "px";

        document.getElementById("minigioco-oceano").appendChild(bolla);
        setTimeout(() => bolla.remove(), 4000);
    }

    // fermare le bolle quando il gioco finisce
    function stopBolle() {
        clearInterval(bolleInterval);
    }

    function vittoria() {
        clearInterval(intervallo); //stop
        stopBolle(); // ✅ ferma le bolle
        inputOceano.disabled = true;
        timerText.textContent = "Ricerca completata!";
        sottomarino.style.top = "50%";

        setTimeout(() => {
            oceanoBox.style.display = "none";
            porteCompletate.push("4");
            passaggio = 12;
            aggiornaGrafica(); 
            dialogo.textContent = nomeBimbo + ", un esploratore nato! !";
            btnAho.textContent = "Un piacere! Ti trovo meglio!";
            btnAho.style.display = "inline-block";
        }, 2000);
    }

    function fallito() {
        clearInterval(intervallo);
        stopBolle(); // ✅ ferma le bolle
        inputOceano.disabled = true;
        timerText.textContent = "Riprendiamo aria e riproviamo, " + nomeBimbo + "!";
        sottomarino.style.top = "0";

        // frasi
        let contatore = 3;
        const frasiCountdown = [
            "C'è mancato poco!",
            "Una bella boccata d'aria...",
            "...e giú!"
        ];

        let countdownInterval = setInterval(() => {
            timerText.textContent = frasiCountdown[3 - contatore];
            contatore--;

            if (contatore < 0) {
                clearInterval(countdownInterval);
                inputOceano.disabled = false;
                inputOceano.value = "";
                tempo = 45; //reset
                sottomarino.style.top = "0"; //reset posizione
                oggettiTrovati.length = 0; // ✅ reset parole trovate
                startTimer();
            }
        }, 1000);
    }

    startTimer();
};
// porta4 FINE

// // prove
// Inizializzazione dopo il caricamento del DOM
// function aggiornaGrafica() { 
//     const sfondo = document.getElementById("sfondo");

//     if (!sfondo) {
//         console.warn("Elemento con id 'sfondo' non trovato!");
//         return;
//     }

//     // Pulisce tutto
//     for (let i = 1; i <= 24; i++) {
//         sfondo.classList.remove(`sfondo${i}`);
//     }
//     sfondo.classList.remove("finale");

//     const classeSfondo = `sfondo${passaggio + 1}`;
//     sfondo.classList.add(classeSfondo);
//     // Mostra lo sfondo se non visibile
//     sfondo.classList.add("visibile");
// }
function aggiornaGrafica() {
    const sfondo = document.getElementById("sfondo");

    if (!sfondo) {
        console.warn("Elemento con id 'sfondo' non trovato!");
        return;
    }

    // Rimuove tutte le classi sfondo
    for (let i = 0; i <= 24; i++) {
        sfondo.classList.remove(`sfondo${i}`);
    }
    sfondo.classList.remove("finale");

    // Aggiunge la classe corretta
    const classeSfondo = `sfondo${passaggio}`;
    sfondo.classList.add(classeSfondo);
    sfondo.classList.add("visibile");

    // Log utile per debugging
    console.log(`🎬 Sei nel PASSAGGIO ${passaggio} → applicato ${classeSfondo}`);

    // Rimuove eventuali stringhe Matrix se presenti
    document.querySelectorAll('.stringaMatrix').forEach(el => el.remove());

    // Se siamo nel passaggio 11, crea l'effetto Matrix
    if (passaggio === 12) {
        creaMatrix();
    }
}

// MIRIADI DI DIV CADENTI
function lanciaStelleCadenti() {
    const maxStelle = 5000;
    let stelleAttive = 0;

    const intervallo = setInterval(() => {
        if (stelleAttive < maxStelle) {
            creaStella();
        }
    }, 250);

    function creaStella() {
        const stella = document.createElement("div");
        stella.className = "stella-cadente";

        const partenzaTop = -50 + Math.random() * 100;
        const partenzaLeft = Math.random() * (window.innerWidth + 300); // esce anche oltre il bordo dx

        // parte più in alto e più a destra per spargere meglio
        stella.style.top = `${partenzaTop}px`;
        stella.style.left = `${partenzaLeft}px`;

        document.body.appendChild(stella);
        stelleAttive++;

        setTimeout(() => {
            stella.remove();
            stelleAttive--;
        }, 6000); // durata più lunga
    }
}
