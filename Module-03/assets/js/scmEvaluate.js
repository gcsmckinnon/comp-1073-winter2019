document.addEventListener("DOMContentLoaded", function () {
  let myStorage = window.localStorage;
  let idCounter = 1;
  CODEMIRRORS = {};

  // Initializing CodeMirror
  let textareas = document.querySelectorAll('textarea.practice');
  for (let cm of textareas) {
    // add an identifier to each practice block on load
    cm.id = `p${idCounter}`;

    if (myStorage[`p${idCounter}`])
      cm.textContent = myStorage[`p${idCounter}`];

    idCounter++;

    // initialize codemirror
    let cmObj = CodeMirror.fromTextArea(cm, {
      lineNumbers: true,
      mode: "javascript",
      theme: "duotone-light"
    });

    CODEMIRRORS[cm.id] = cmObj;

    // create an evaluation button
    let button = document.createElement('button');
    button.classList.add('practice', 'evaluate');
    button.textContent = "Execute";

    // store our value in local storage
    button.addEventListener('click', function () {
      console.clear();
      myStorage.setItem(cm.id, cmObj.getValue("\n"));

      if (window[cm.id] && typeof window[cm.id] === "function") {
        let scmeval = new Evaluator;
        scmeval.evaluate(cmObj.getValue());

        window[cm.id].env = scmeval.env;
        window[cm.id].code = cmObj.getValue();
        window[cm.id].codeFormatted = cmObj.getValue("\n");
        window[cm.id].cmObj = cmObj;

        try {
          window[cm.id]();
        } catch (e) {
          console.log("ERROR:", e.message);
        }
      }
    });

    cm.parentNode.append(button);
  }

  // Get the lab
  let getCode = document.querySelector('#printCode');
  const codeoutput = document.querySelector('#codeoutput');

  getCode.addEventListener('click', function () {
    textareas.forEach(function (ele) {
      codeoutput.append(myStorage[ele.id]);
    });
  });
});