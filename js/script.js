"use strict";

function showHome() {
  var i = 1;
  while (i <= 3) {
    document.getElementById("module" + i).classList.remove("active");
    document.getElementById("nav" + i).classList.remove("active");
    i++;
  }
  document.getElementById("homeSection").style.display = "block";
  document.getElementById("headerNav").style.display = "none";
}

function showModule(num) {
  document.getElementById("homeSection").style.display = "none";
  document.getElementById("headerNav").style.display = "flex";

  var i = 1;
  while (i <= 3) {
    document.getElementById("module" + i).classList.remove("active");
    document.getElementById("nav" + i).classList.remove("active");
    i++;
  }
  document.getElementById("module" + num).classList.add("active");
  document.getElementById("nav" + num).classList.add("active");
}

function calcularFibonacci() {
  var minStr   = document.getElementById("precioMin").value;
  var maxStr   = document.getElementById("precioMax").value;
  var activo   = document.getElementById("activoNombre").value || "ACTIVO";
  var errorEl  = document.getElementById("fibError");

  errorEl.style.display = "none";

  var minPrecio = parseFloat(minStr);
  var maxPrecio = parseFloat(maxStr);

  if (isNaN(minPrecio) || isNaN(maxPrecio)) {
    errorEl.style.display = "block";
    errorEl.innerHTML = "ERROR: Ambos campos deben contener valores numéricos válidos.";
    return;
  }
  if (minPrecio <= 0 || maxPrecio <= 0) {
    errorEl.style.display = "block";
    errorEl.innerHTML = "ERROR: Los precios deben ser valores positivos mayores a cero.";
    return;
  }
  if (minPrecio >= maxPrecio) {
    errorEl.style.display = "block";
    errorEl.innerHTML = "ERROR: El Precio Máximo debe ser estrictamente superior al Precio Mínimo.";
    return;
  }

  var delta      = maxPrecio - minPrecio;
  var nivel236   = maxPrecio - delta * 0.236;
  var nivel382   = maxPrecio - delta * 0.382;
  var nivel500   = maxPrecio - delta * 0.500;
  var nivelAureo = maxPrecio - delta * 0.618;
  var stopLoss   = minPrecio * 0.98;

  var tablaHTML = '<table class="results-table">';
  tablaHTML += '<thead><tr>';
  tablaHTML += '<th>Ratio Fibonacci</th>';
  tablaHTML += '<th>Descripción</th>';
  tablaHTML += '<th>Nivel de Precio</th>';
  tablaHTML += '</tr></thead><tbody>';

  tablaHTML += '<tr><td>Máximo</td><td>Resistencia superior</td><td>' + formatearPrecio(maxPrecio) + '</td></tr>';
  tablaHTML += '<tr><td>23.6%</td><td>Retroceso menor — zona de absorción rápida</td><td>' + formatearPrecio(nivel236) + '</td></tr>';
  tablaHTML += '<tr><td>38.2%</td><td>Retroceso moderado — primer soporte técnico</td><td>' + formatearPrecio(nivel382) + '</td></tr>';
  tablaHTML += '<tr><td>50.0%</td><td>Retroceso medio — nivel psicológico clave</td><td>' + formatearPrecio(nivel500) + '</td></tr>';
  tablaHTML += '<tr class="golden"><td>61.8% ◈</td><td>ZONA ÁUREA CRÍTICA — máxima probabilidad de reversión</td><td>' + formatearPrecio(nivelAureo) + '</td></tr>';
  tablaHTML += '<tr><td>Mínimo</td><td>Soporte base</td><td>' + formatearPrecio(minPrecio) + '</td></tr>';
  tablaHTML += '</tbody></table>';

  document.getElementById("fibTable").innerHTML = tablaHTML;

  var reporteHTML = '<div class="report-title">DICTAMEN TÉCNICO — ' + activo.toUpperCase() + '</div>';
  reporteHTML += '<p>El diferencial de cotización registrado entre el soporte base (' + formatearPrecio(minPrecio) + ') y la resistencia (' + formatearPrecio(maxPrecio) + ') establece un rango operativo de ' + formatearPrecio(delta) + ', sobre el cual se proyectan los cuatro niveles de retroceso derivados del cociente áureo (φ⁻¹ ≈ 0.618).</p>';
  reporteHTML += '<p>El nivel de mayor relevancia estadística corresponde al retroceso del 61.8% posicionado en ' + formatearPrecio(nivelAureo) + ', denominado Zona Áurea Crítica. En esta región, la convergencia entre presión vendedora residual y demanda institucional genera condiciones de reversión de alta probabilidad dentro del marco de la Teoría de Ondas de Elliott.</p>';
  reporteHTML += '<p>GESTIÓN DE RIESGO — Stop-Loss Sugerido: ' + formatearPrecio(stopLoss) + ' (−2.0% sobre el soporte base). Este umbral delimita la invalidación del escenario alcista y debe ser respetado con disciplina operativa para contener la exposición máxima al riesgo de capital.</p>';

  document.getElementById("fibReport").innerHTML = reporteHTML;
  document.getElementById("fibResultsTitle").innerHTML = "Análisis de Retrocesos Fibonacci — " + activo.toUpperCase();

  document.getElementById("fibPlaceholder").style.display = "none";
  document.getElementById("fibChart").style.display = "block";
  document.getElementById("fibResults").style.display = "block";

  generarGraficoSVG(minPrecio, maxPrecio, nivel236, nivel382, nivel500, nivelAureo);
}

function generarGraficoSVG(minP, maxP, n236, n382, n500, nAureo) {
  var W = 560; var H = 260;
  var padLeft = 80; var padRight = 20; var padTop = 20; var padBot = 20;
  var chartW = W - padLeft - padRight; var chartH = H - padTop - padBot;

  function yPos(precio) { return padTop + chartH - ((precio - minP) / (maxP - minP)) * chartH; }

  var x0 = padLeft; var x1 = padLeft + chartW * 0.12; var x2 = padLeft + chartW * 0.28;
  var x3 = padLeft + chartW * 0.45; var x4 = padLeft + chartW * 0.62; var x5 = padLeft + chartW * 0.78;
  var x6 = padLeft + chartW;

  var y0 = yPos(minP  + (maxP - minP) * 0.15); var y1 = yPos(minP  + (maxP - minP) * 0.40);
  var y2 = yPos(minP  + (maxP - minP) * 0.62); var y3 = yPos(maxP);
  var y4 = yPos(n236); var y5 = yPos(n382); var y6 = yPos(n500);

  var pathD = "M " + x0 + " " + y0 +
              " C " + x0 + " " + y0 + ", " + x1 + " " + (y0 - 15) + ", " + x1 + " " + y1 +
              " S " + x2 + " " + (y2 - 10) + ", " + x2 + " " + y2 +
              " S " + (x3 - 10) + " " + (y3 + 5) + ", " + x3 + " " + y3 +
              " S " + x4 + " " + (y4 + 8) + ", " + x4 + " " + y4 +
              " S " + x5 + " " + (y5 + 5) + ", " + x5 + " " + y5 +
              " S " + (x6 - 5) + " " + (y6 - 5) + ", " + x6 + " " + y6;

  function lineaNivel(precio, etiqueta, color, dashArray, isBold) {
    var y = yPos(precio);
    var sw = isBold ? "1.5" : "0.8";
    return '<line x1="' + padLeft + '" y1="' + y + '" x2="' + (padLeft + chartW) + '" y2="' + y + '" stroke="' + color + '" stroke-width="' + sw + '" stroke-dasharray="' + dashArray + '" opacity="0.7"/>' +
           '<text x="' + (padLeft - 5) + '" y="' + (y + 4) + '" fill="' + color + '" font-size="10" font-family="Share Tech Mono, monospace" text-anchor="end">' + formatearPrecio(precio) + '</text>' +
           '<text x="' + (padLeft + chartW + 5) + '" y="' + (y + 4) + '" fill="' + color + '" font-size="9" font-family="Share Tech Mono, monospace">' + etiqueta + '</text>';
  }

  var svgHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">';
  var areaD = pathD + " L " + x6 + " " + (padTop + chartH) + " L " + x0 + " " + (padTop + chartH) + " Z";
  svgHTML += '<path d="' + areaD + '" fill="url(#areaGrad)" opacity="0.25"/>';
  svgHTML += '<defs><linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#10f49c"/><stop offset="100%" stop-color="#10f49c" stop-opacity="0"/></linearGradient></defs>';

  svgHTML += lineaNivel(maxP,   "MAX",   "#f0f4f8", "4,3", false);
  svgHTML += lineaNivel(n236,   "23.6%", "#00e5ff", "4,3", false);
  svgHTML += lineaNivel(n382,   "38.2%", "#00e5ff", "4,3", false);
  svgHTML += lineaNivel(n500,   "50.0%", "#a8b3cc", "4,3", false);
  svgHTML += lineaNivel(nAureo, "61.8% ◈", "#10f49c", "0", true);
  svgHTML += lineaNivel(minP,   "MIN",   "#f0f4f8", "4,3", false);

  svgHTML += '<path d="' + pathD + '" fill="none" stroke="#10f49c" stroke-width="2" stroke-linecap="round"/>';
  svgHTML += '<circle cx="' + x3 + '" cy="' + y3 + '" r="4" fill="#10f49c"/>';
  svgHTML += '</svg>';

  document.getElementById("fibChart").innerHTML = svgHTML;
}

function formatearPrecio(valor) { return valor.toFixed(2); }

function verificarPrimo() {
  var inputVal = document.getElementById("rsaNumero").value;
  var errorEl = document.getElementById("rsaError");
  errorEl.style.display = "none";

  var numero = parseInt(inputVal);

  if (isNaN(numero) || inputVal.trim() === "") {
    errorEl.style.display = "block";
    errorEl.innerHTML = "ERROR: Ingrese un número entero válido para el análisis.";
    return;
  }
  if (numero < 2) {
    errorEl.style.display = "block";
    errorEl.innerHTML = "ERROR: El análisis de primalidad requiere un número mayor o igual a 2.";
    return;
  }

  var contador = 0;
  var i = 1;
  while (i <= numero) {
    if (numero % i === 0) { contador++; }
    i++;
  }

  var esPrimo = (contador === 2);
  var resultEl = document.getElementById("rsaResult");
  var badgeClass = esPrimo ? "primo" : "noprimo";
  var badgeText = esPrimo ? "NÚMERO PRIMO — Viable como clave RSA" : "NÚMERO COMPUESTO — No recomendado como clave";

  var html = '<div class="rsa-verdict">';
  html += '<div class="verdict-num">' + numero.toLocaleString() + '</div>';
  html += '<div class="verdict-badge ' + badgeClass + '">' + badgeText + '</div>';

  if (esPrimo) {
    html += '<div class="verdict-body">El número <strong>' + numero + '</strong> es primo. En el protocolo RSA, este número podría actuar como uno de los factores secretos.</div>';
  } else {
    html += '<div class="verdict-body">El número <strong>' + numero + '</strong> es compuesto. No cumple la condición asimétrica básica requerida.</div>';
  }
  html += '</div>';

  document.getElementById("rsaPlaceholder").style.display = "none";
  resultEl.style.display = "block";
  resultEl.innerHTML = html;
}

function simularPlaga() {
  var plagaSeleccionada = document.getElementById("tipoPlaga").value;
  var cantidadInicial   = parseInt(document.getElementById("cantidadInicial").value) || 1;
  var totalSemanas      = parseInt(document.getElementById("semanasSimulacion").value) || 1;
  var cajaResultado     = document.getElementById("resultadoPlagas");

  var codigoHtml = "";

  var a = 0;
  var b = cantidadInicial;
  var c;

  var i = 1;
  while (i <= totalSemanas) {
    var poblacionActual;

    if (i === 1) {
      poblacionActual = a;
    } else if (i === 2) {
      poblacionActual = b;
    } else {
      c = a + b;
      a = b;
      b = c;
      poblacionActual = c;
    }

    var esPrimo = calcularSiEsPrimo(poblacionActual);

    var numeroDia = (poblacionActual % 7);
    if (numeroDia === 0) {
      numeroDia = 7;
    }

    var diasTexto = ["", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    var diaExactoTexto = diasTexto[numeroDia];

    if (esPrimo) {
      codigoHtml += '<div class="caja-plaga-item alerta-critica">' +
                      '<span><span style="color: var(--accent-amber);">[!]</span> <strong>Semana ' + i + ':</strong> ' + poblacionActual.toLocaleString() + ' ' + plagaSeleccionada + '</span>' +
                      '<span class="badge-accion">ERRADICAR: SEMANA ' + i + ' — ' + diaExactoTexto.toUpperCase() + '</span>' +
                    '</div>';
    } else {
      codigoHtml += '<div class="caja-plaga-item">' +
                      '<span><span style="color: var(--accent-green);">[OK]</span> <strong>Semana ' + i + ':</strong> ' + poblacionActual.toLocaleString() + ' ' + plagaSeleccionada + '</span>' +
                      '<span style="color: var(--text-muted); font-size: 0.78rem;">Población Estable / Monitorear</span>' +
                    '</div>';
    }

    i++;
  }

  cajaResultado.innerHTML = codigoHtml;
}

function calcularSiEsPrimo(numero) {
  if (numero <= 1) { return false; }

  var divisores = 0;
  var divisorActual = 1;

  while (divisorActual <= numero) {
    if (numero % divisorActual === 0) {
      divisores++;
    }
    divisorActual++;
  }

  return divisores === 2;
}
