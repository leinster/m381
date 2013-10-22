(function($) {
  // calculate
  var ns;
  var ops;
  var multiplications;

  var max = function(n) {
    return Math.max(2, Math.floor(Math.sqrt(n)));
  };

  var op = function(n, op, p) {
    var o = { n: n, o: op };
    if (p) { o.p = p; }
    ops.push(o);
  };

  var recordPrime = function(n) {
    ns[n] = "p";
    op(n, "p");
  };

  var recordComposite = function(n, p) {
    if (! ns[n]) {
      ns[n] = "c";
      op(n, "c", p);
    }
  };

  var isComposite = function(n) {
    return ns[n] === "c";
  };

  var nextPrime = function(p, n) {
    var i;
    for (i = p + 1; i <= n; i += 1) {
      if (! isComposite(i)) { return i; }
    }
  };

  var seive = function(n) {
    var p = 2;
    var i;
    ns = [];//Array(n);
    ops = [];
    multiplications = 0;
    while (p <= max(n)) {
      recordPrime(p);
      // for (i = 2 * p; i <= n; i += p) {
      for (i = p * p; i <= n; i += p) {
        recordComposite(i, p);
        multiplications += 1;
      }
      p = nextPrime(p, n);
    }
    do {
      recordPrime(p);
    } while (p = nextPrime(p, n));
  };

  var primes = function() {
    var i, l = ns.length, primes = [];
    for (i = 2; i <= l; i += 1) {
      if (ns[i] === "p") { primes.push(i); }
    }
    return primes;
  };

  // display
  var container = $("#seive");

  var clear = function() {
    container.html("");
  };

  var header = function(n) {
    var text = "n = " + n + ", so we calculate multiples of the primes that are less than or equal to " + max(n);
    if (max(n) === 2) {
      text = "n = " + n + ", so we need only consider 2";
    }
    container.append("<h2>" + text);
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

  var bgDifference = function(max) {
    return Math.round((4/max) * (255 - 183));
  };

  var resetCompositeBG = function(max) {
    r = 188;
    g = 255 + bgDifference(max);
    b = 255 + bgDifference(max);
  };

  var darkenCompositeBG = function(max) {
    g -= bgDifference(max);
    b = g;
  };

  var markComposite = function(n, factorisation) {
    integerDiv(n).
      attr("title", factorisation).
      addClass("composite").
      css("backgroundColor", "rgb(" + r + "," + g + "," + b + ")");
  };

  var writePrimes = function() {
    var text = "The ";
    if (primes().length > 1) {
      text += primes().length + " primes up to " + (ns.length - 1) + " are ";
    } else {
      text += "only prime up to 2 is ";
    }
    text += primes().join(", ");
    container.append("<div class='result'><p>" + text + "</p></div>");
  };

  var animate = true;
  var animationDelay = $("#delay").val();
  var animationInterval;
  var stopAnimation = function() {
    if (animationInterval) {
      clearInterval(animationInterval);
      animationInterval = null;
    }
  };

  var displaySeive = function(n) {
    var frame = 0;
    var nextFrame = function() {
      var op = ops[frame];
      switch (op.o) {
      case "p":
        markPrime(op.n);
        darkenCompositeBG(max(n));
        break;
      case "c":
        markComposite(op.n, op.p + "×" + Math.round(op.n/op.p));
        break;
      }
      if (frame < (ops.length - 1)) {
        frame += 1;
      } else {
        stopAnimation();
        writePrimes(n);
      }
    };
    if (n < 2) { return; }
    stopAnimation();
    clear();
    header(n);
    writeIntegers(n);
    seive(n);
    resetCompositeBG(max(n));
    if (animate) {
      nextFrame();
      animationInterval = setInterval(nextFrame, animationDelay);
    } else {
      while (frame < (ops.length - 1)) { nextFrame(); }
      nextFrame();
    }
  };

  $("#set-n").submit(function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  });

  $("#n").change(function(event) {
    event.preventDefault();
    displaySeive(this.value);
  });

  $("#speed").mousedown(function(event) {
    stopAnimation();
  });

  $("#speed").mouseup(function(event) {
    var value = this.max - this.value;
    if (value === 0) {
      animate = false;
    } else {
      animate = true;
      animationDelay = value;
      console.log(value);
    }
    displaySeive($("#n").val());
  });

  $("#restart").click(function(event) {
    displaySeive($("#n").val());
  });

  displaySeive(100);
}(jQuery));
