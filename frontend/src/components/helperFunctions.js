const convertIntoMarkup = (e,setText) => {
    let txt = (e)?
    e.target.value
    :
    document.querySelector("#editor").value
    setText(txt);

    let markupText = txt;

    // Text Formatting (Bold and Italics)
    markupText = markupText.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"); // Replace **text** with <strong>text</strong> for bold
    markupText = markupText.replace(/\*([^*]+)\*/g, "<em>$1</em>"); // Replace *text* with <em>text</em> for italics

    // Text Alignment (Left, Center, Right)
    // Center-align text enclosed within => and <=
    markupText = markupText.replace(
      /=>([^=]+)<=/g,
      '<div style="text-align:center">$1</div>'
    );

    // Right-align text enclosed within => and =>
    markupText = markupText.replace(
      /=>([^=]+)=>/g,
      '<div style="text-align:right">$1</div>'
    );

    // Left-align text enclosed within <= and <=
    markupText = markupText.replace(
      /<=([^=]+)<=/g,
      '<div style="text-align:left">$1</div>'
    );

    // Add a Horizontal Rule (hr) for ---
    markupText = markupText.replace(/---/g, "<hr>");

    // Replace <URL> with <img> tag
    // markupText = markupText.replace(/<([^>]+)>/g, '<a href="$1" target="_blank"><img src="$1" width="300px" height="300px" alt="Insert a Correct url" /></a>');
    markupText = markupText.replace(
      /\(img\){([^}]+)}/g,
      '<img src="$1" width="300px" height="300px" alt="Enter a valid link" />'
    );

    // Replace (Text){URL} with <a> tag
    markupText = markupText.replace(
      /\(([^)]+)\){([^}]+)}/g,
      '<a href="$2" target="_blank">$1</a>'
    );

    // New Line: Replace \n with <br> for line breaks
    markupText = markupText.replace(/\n/g, "<br>");

    const result = document.querySelector(".result");
    result.innerHTML = markupText;
    console.log(markupText);
  };


  module.exports = {
    convertIntoMarkup
  }