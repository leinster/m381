/*jshint maxstatements:30 */
(function($) {
  // calculate
  var ns;

  var max = function(n) {
    return Math.floor(Math.sqrt(n));
  };

  var recordPrime = function(n) {
    ns[n] = true;
  };

  var recordComposite = function(n) {
    if (n !== false) { ns[n] = false; }
  };

  var nextPrime = function(p, n) {
    var i;
    for (i = p + 1; i <= n; i += 1) {
      if (ns[i] !== false) { return i; }
    }
  };

  var seive = function(n) {
    var p = 2;
    var i;
    ns = [];
    while (p <= max(n)) {
      recordPrime(p);
      for (i = p * p; i <= n; i += p) {
        recordComposite(i, p);
      }
      p = nextPrime(p, n);
    }
    do {
      recordPrime(p);
      p = nextPrime(p, n);
    } while (p);
  };

  var primes = function() {
    var i, l = ns.length, primes = [];
    for (i = 2; i <= l; i += 1) {
      if (ns[i] === true) { primes.push(i); }
    }
    return primes;
  };

  // display
  var container = $("#seive");

  var clear = function() {
    container.html("");
  };

  var header = function(n) {
    var text = "<i>n</i> = " + n + ", so we mark multiples of the primes <i>p</i>" +
      " ≤ &radic;(" + n + ") as composites";
    if (max(n) === 2) {
      text = "n = " + n + ", so we need only consider 2";
    }
    container.append("<h2>" + text);
  };

  var operationDiv = $("<div id='operation'>");

  var appendOperationDiv = function() {
    container.append(operationDiv);
  };

  var writePrimes = function() {
    operationDiv.empty();
    var p = primes();
    var text = "The ";
    if (p.length > 1) {
      text += p.length + " primes up to " + (ns.length - 1) + " are ";
    } else {
      text += "only prime up to 2 is ";
    }
    text += p.join(", ");
    operationDiv.append(text + ".");
  };

  var writeIntegers = function(n) {
    var div = $("<div class='integers'>");
    for (var i = 1; i <= n; i += 1) {
      div.append($("<div class='integer'>").attr("id", "n" + i).text(i));
    }
    div.find("#n1").text("");
    container.append(div);
  };

  var integerDiv = function(n) {
    return $("#n" + n);
  };

  var markPrime = function(n) {
    integerDiv(n).addClass("prime");
  };

  var r, g, b;

  var resetCompositeBG = function() {
    r = 188;
    g = 255;
    b = 255;
  };

  var darkenCompositeBG = function(max) {
    var difference = Math.round((4/max) * (255 - 188));
    r -= difference;
    g -= difference;
    b = g;
  };

  var markComposite = function(n, factorisation) {
    integerDiv(n).not(".composite").
      attr("title", factorisation).
      addClass("composite").
      css("backgroundColor", "rgb(" + r + "," + g + "," + b + ")");
  };

  var markMultiplesOf = function(p, n) {
    var i;
    for (i = p * p; i <= n; i += p) {
      markComposite(i, p + "×" + Math.round(i/p));
    }
    darkenCompositeBG(max(n));
  };

  var markRemainingPrimes = function() {
    primes().forEach(function(p) {
      markPrime(p);
    });
  };

  var writeNextOperation = function(n, p) {
    operationDiv.empty();
    var text;
    var button = $("<button>");
    if (p <= max(n)) {
      text = (p === 2) ? "The first" : "The next";
      text += " prime number <i>p</i> = " + p + ", so we mark multiples of  " +
        p + ", starting with <i>p<sup>2</sup></i> = " + Math.pow(p, 2) +
        ", as composites";
      button.text("Mark multiples of " + p);
      button.click(function() {
        markMultiplesOf(p, n);
        writeNextOperation(n, nextPrime(p, n));
      });
      markPrime(p);
    } else {
      text = "The next prime <i>p</i> = " + p + " &gt; &radic;(" + n +
        "), so we have finished. All remaining unmarked integers are primes";
      button.text("Mark remaining primes");
      button.click(function() {
        markRemainingPrimes();
        writePrimes();
      });
    }
    operationDiv.append(text, button);
  };

  var displaySeive = function(n) {
    if (n < 2) { return; }
    clear();
    resetCompositeBG();
    header(n);
    appendOperationDiv();
    writeIntegers(n);
    seive(n);
    writeNextOperation(n, 2);
  };

  $("#set-n").submit(function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  });

  $("#n").change(function(event) {
    event.preventDefault();
    displaySeive(this.value);
  });

  displaySeive(100);
}(jQuery));
