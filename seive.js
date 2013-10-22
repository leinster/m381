(function($) {
  var additions = 0;
  var container = $("#js-seive");

  var clear = function() {
    additions = 0;
    container.html("");
  };

  var max = function(n) {
    return Math.max(2, Math.floor(Math.sqrt(n)));
  };

  var writeHeader = function(n) {
    var text = "n = " + n + ", so we consider primes ≤ " + max(n);
    if (max(n) === 2) {
      text = "n = " + n + ", so we need only consider 2";
    }
    container.append("<h2>" + text);
  };

  var integerDiv = function(n) {
    return $("#n" + n);
  };

  var writeIntegers = function(n) {
    var wrapper = $("<div class='integers'>");
    for (var i = 1; i <= n; i++) {
      wrapper.append($("<div class='integer'>").attr("id", "n" + i).text(i));
    }
    wrapper.find("#n1").text("");
    container.append(wrapper);
  };

  var prime = function(n) {
    integerDiv(n).addClass("prime");
  };

  var mustBePrime = function(n) {
    integerDiv(n).addClass("mustBePrime");
  };

  var composite = function(n) {
    integerDiv(n).addClass("composite");
    additions += 1;
  };

  var isComposite = function(n) {
    return integerDiv(n).hasClass("composite");
  };

  var isPrime = function(n) {
    return integerDiv(n).hasClass("prime") || integerDiv(n).hasClass("mustBePrime");
  }

  var findNextPrime = function(p, n) {
    var i;
    for (i = p + 1; i <= n; i++) {
      if (! isComposite(i)) {
        return i;
      }
    }
  };

  var seive = function(n) {
    var p = 2;
    while (p <= max(n)) {
      prime(p);
      for (i = 2 * p; i <= n; i += p) {
        composite(i);
      }
      p = findNextPrime(p, n);
    }
    do {
      mustBePrime(p);
    } while (p = findNextPrime(p, n));
  };

  var writePrimes = function(n) {
    var primes = [];
    for (i = 2; i <= n; i++) {
      if (isPrime(i)) {
        primes.push(i);
      }
    }
    container.append("<div class='result'>So the " + primes.length +
                     " primes up to " + n + " are " + primes.join(", ") +
                     ". This required " + additions + " addition" +
                     (additions === 1 ? "" : "s") + " to determine composites.");
  };

  var display = function(n) {
    if (n < 2) return;
    clear();
    writeHeader(n);
    writeIntegers(n);
    seive(n);
    writePrimes(n);
  };

  $("#js-set-n").submit(function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  });

  $("#js-n").change(function(event) {
    event.preventDefault();
    display(this.value);
  });

  display(100);
}(jQuery));
