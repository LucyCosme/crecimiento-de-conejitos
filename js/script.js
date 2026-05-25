document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btnEjecutar").onclick = simularPoblacionConejos;
});

function simularPoblacionConejos() {
    let inputMeses = document.getElementById("cantidadTerminos").value;
    let meses = parseInt(inputMeses);

    if (isNaN(meses) || meses < 1 || meses > 30) {
        document.getElementById("resultado").innerHTML = "Error: Ingrese un número de meses válido entre 1 y 30.";
        return;
    }

    let a = 0;
    let b = 1;
    let c;

    let reporteHtml = "SU CRECIMIENTO DE POBLACIÓN DE CONEJITOS ES:\n";
    reporteHtml += "\n";

    for (let i = 1; i <= meses; i++) {
        let cantidadConejos;

        if (i === 1) {
            cantidadConejos = a;
        } else if (i === 2) {
            cantidadConejos = b;
        } else {
            c = a + b;
            a = b;
            b = c;
            cantidadConejos = c;
        }

        let contadorDivisores = 0;
        for (let j = 1; j <= cantidadConejos; j++) {
            if (cantidadConejos % j === 0) {
                contadorDivisores++;
            }
        }

        if (contadorDivisores === 2) {
            reporteHtml += `Mes ${i}: Población de  ${cantidadConejos}  conejos -> <span class="badge-primo">HITO SANITARIO - NÚMERO PRIMO DETECTADO</span>\n`;
        } else {
            reporteHtml += `Mes ${i}: Población de  ${cantidadConejos}  conejos -> Crecimiento Regular \n`;
        }
    }

    reporteHtml += "\n";
    reporteHtml += "Resultado completado.";

    document.getElementById("resultado").innerHTML = reporteHtml;
}