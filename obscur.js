function setup() {
    createCanvas(windowWidth, windowHeight, SVG);
    background(255);
    frameRate(1);
    strokeWeight(1);
    stroke(0,0,0,100);
    noLoop();
}

function draw(){
    background(255);
    dibuja = new Trazo;
    dibuja.arte();
}

function mousePressed() {
    save();
}
class Trazo {
    // contruye los puntos iniciales y finales en el centro 
    // de la ventana y define el color del trazo
    constructor(){
        this.Pi = [floor(windowWidth / 2) , floor(windowHeight / 2)];
        this.Pf = [floor(windowWidth / 2) , floor(windowHeight / 2)];
    }

    ultimaDireccion = 'inicial';
    trazosMin = 10;
    trazosMax = 20;
    segmentosMin = 10;
    segmentosMax = 15;

    // devuelve una cantidad de segmentos para el trazo
    // :number
    segmentos() {
        return floor(random(this.segmentosMin, this.segmentosMax));
    }

    // devuelve una cantidad de trazos para el arte
    // :number
    trazos() {
        return floor(random(this.trazosMin,this.trazosMax));
    }

    // una suerte de reset para antes de cada trazo
    // :void
    centrar() {
        this.Pi = [floor(windowWidth / 2) , floor(windowHeight / 2)];
        this.Pf = [floor(windowWidth / 2) , floor(windowHeight / 2)];
    }

    // el nuevo punto inicial del trazo es el final del anterior
    // :void
    nuevoPi() {
        this.Pi = this.Pf;
    }   

    // :number
    largoSegmentoVertical() {
        return floor(random(height * .25));
    }

    // :number
    largoSegmentoHorizontal() {
        return floor(random(width * .25));
    }

    direccionOpuesta(direccion) {
        switch (direccion) {
            case 'arriba':
                return 'abajo';

            case 'abajo':
                return 'arriba';

            case 'derecha':
                return 'izquierda';

            case 'izquierda':
                return 'derecha';
        }
    }

    // un nuevo punto final para el trazo según las reglas elegidas.
    // :void
    nuevoPf() {
        let direcciones = ['arriba', 'abajo', 'izquierda', 'derecha'];
        let vert = this.largoSegmentoVertical();
        let hor = this.largoSegmentoHorizontal();
        let direccion = random(direcciones);
       
        console.log('ultima direccion: ' + this.ultimaDireccion);
        console.log('direccion: ' + direccion);


        while( ( (direccion == this.ultimaDireccion) 
              || (direccion == this.direccionOpuesta(this.ultimaDireccion)) ) ) {

            console.log(direccion == this.ultimaDireccion);
            console.log(direccion == this.direccionOpuesta(direccion));

            direccion = random(direcciones);
            console.log('cambiando direccion ' + direccion);
        }

        switch (direccion) {
            case 'arriba':
                this.ultimaDireccion = direccion;
                return this.Pf = this.Pf[1] + vert >=  windowHeight * .95
                        ? [this.Pf[0], this.Pf[1] - vert]
                        : [this.Pf[0], this.Pf[1] + vert];

            case 'abajo':
                this.ultimaDireccion = direccion;
                return this.Pf = this.Pf[1] - vert <= windowHeight * .05 
                        ? [this.Pf[0], this.Pf[1] + vert]
                        : [this.Pf[0], this.Pf[1] - vert];

            case 'derecha':
                this.ultimaDireccion = direccion;
                return this.Pf = this.Pf[0] + hor >= windowWidth * .95
                        ? [this.Pf[0] - hor, this.Pf[1]]
                        : [this.Pf[0] + hor, this.Pf[1]];

            case 'izquierda':
                this.ultimaDireccion = direccion;
                return this.Pf = this.Pf[0] - hor <= windowWidth * .05
                        ? [this.Pf[0] + hor, this.Pf[1]]
                        : [this.Pf[0] - hor, this.Pf[1]];
        }
    }

    // :display
    dibujaSegmento() {
        line(this.Pi[0], this.Pi[1],this.Pf[0], this.Pf[1]);
    }

    // :display
    arte() {
        for(let j = 0; j <= this.trazos(); j++) {
            this.centrar();
            let cantidad = this.segmentos();
            for(let i = 0; i <= cantidad; i++) {
                this.nuevoPi();
                this.nuevoPf();
                console.log('segmento ' + i);
                for(let k = 0; k <= cantidad - i; k++) this.dibujaSegmento();
            }
        }
    }
}
