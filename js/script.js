document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btnEjecutar").onclick = simularPoblacionConejos;
});

function simularPoblacionConejos() {
    let inputInicial = document.getElementById("poblacionInicial").value;
    let inputMeses = document.getElementById("cantidadTerminos").value;
    
    let conejosIniciales = parseInt(inputInicial);
    let meses = parseInt(inputMeses);

    if (isNaN(conejosIniciales) || conejosIniciales < 1) {
        document.getElementById("resultado").innerHTML = "Error: Ingrese una cantidad inicial válida de conejos.";
        return;
    }

    if (isNaN(meses) || meses < 1 || meses > 30) {
        document.getElementById("resultado").innerHTML = "Error: Ingrese un número de meses válido entre 1 y 30.";
        return;
    }

    let a = 0;
    let b = 1;
    let c;

    let reporteHtml = "SIMULACIÓN DE CRECIMIENTO DE POBLACIÓN DE CONEJOS:\n";
    reporteHtml += `Población Inicial: ${conejosIniciales} conejos\n`;
    reporteHtml += "----------------------------------------------------------------------\n";

    for (let i = 1; i <= meses; i++) {
        let factorFibonacci;

        if (i === 1) {
            factorFibonacci = a;
        } else if (i === 2) {
            factorFibonacci = b;
        } else {
            c = a + b;
            a = b;
            b = c;
            factorFibonacci = c;
        }

        let cantidadConejos = factorFibonacci === 0 ? conejosIniciales : factorFibonacci * conejosIniciales;

        let contadorDivisores = 0;
        for (let j = 1; j <= cantidadConejos; j++) {
            if (cantidadConejos % j === 0) {
                contadorDivisores++;
            }
        }

        if (contadorDivisores === 2) {
            reporteHtml += `Mes ${i}: Población de [ ${cantidadConejos} ] conejos -> <span class="badge-primo">[HITO SANITARIO - NÚMERO PRIMO DETECTADO]</span>\n`;
        } else {
            reporteHtml += `Mes ${i}: Población de [ ${cantidadConejos} ] conejos -> [Crecimiento Regular]\n`;
        }
    }

    reporteHtml += "----------------------------------------------------------------------\n";
    reporteHtml += "Simulación completada. Todos los datos han sido renderizados.";

    document.getElementById("resultado").innerHTML = reporteHtml;
}
