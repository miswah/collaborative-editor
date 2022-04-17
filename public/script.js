window.onload = function () {
  const converter = new showdown.Converter();
  const pad = document.getElementById("pad");
  const markdownArea = document.getElementById("markdown");

  let previousMarkdownValue;

  const convertTextAreaToMarkdown = function () {
    let markdownText = pad.value;
    previousMarkdownValue = markdownText;
    html = converter.makeHtml(markdownText);
    markdownArea.innerHTML = html;
  };

  const didChangeOccur = function () {
    if (previousMarkdownValue != pad.value) {
      return true;
    }
    return false;
  };

  setInterval(function () {
    if (didChangeOccur()) {
      convertTextAreaToMarkdown();
    }
  }, 1000);

  pad.addEventListener("input", convertTextAreaToMarkdown);

  // convertTextAreaToMarkdown();

  sharejs.open("home", "text", function (error, doc) {
    doc.attach_textarea(pad);
  });
};
