const main = document.getElementById("posts");

function make_text_element(tag, text) {
    const element = document.createElement(tag);
    const userText = document.createTextNode(text);
    element.appendChild(userText);
    return element;
}

const comment_blocks = [];

for (let i = 0; i < posts.length; i++) {
    const outerDiv = document.createElement("div");
    const innerDiv = document.createElement("div");
    innerDiv.style.border = "thin solid black";
    innerDiv.style.padding = "15px";
    innerDiv.id = posts[i][0];
    outerDiv.style.padding = "2px";
    outerDiv.style.paddingLeft = "25px";
    const user = make_text_element("b", posts[i][2]);
    user.style.fontSize = "20px";
    const date = make_text_element("div", posts[i][4]);
    date.style.fontSize = "12px";
    const comment = make_text_element('div', posts[i][3]);

    const form = document.createElement('form');
    form.action = "/forum";
    form.method = "POST";
    const textbox = make_text_element("input", "");
    textbox.type = "text";
    textbox.name = "posttext";
    const idbox = make_text_element("input", "");
    idbox.value = posts[i][0];
    idbox.type = "hidden";
    idbox.name = "postid";
    idbox.style.display = "none";
    const button = make_text_element("input", "post");
    button.value = "Reply";
    button.type = "submit";
    const reply = document.createElement("button");
    reply.innerText = "Show replies";

    innerDiv.appendChild(user);
    innerDiv.appendChild(date);
    innerDiv.appendChild(comment);
    innerDiv.appendChild(form);
    innerDiv.appendChild(reply);
    form.appendChild(idbox);
    form.appendChild(textbox);
    form.appendChild(button);
    outerDiv.appendChild(innerDiv);

    comment_blocks[i] = outerDiv;

    reply.addEventListener("click", () => {
        const children = comment_blocks[i].childNodes;
        for (let i = 1; i < children.length; i++) {
            if (children[i].style.display === "none") {
                reply.innerText = "Hide replies";
                children[i].style.display = "block";
            }
            else {
                reply.innerText = "Show replies";
                children[i].style.display = "none";
            }
        }
    })
}

for (let i = 0; i < posts.length; i++) {
    for (let j = 0; j < posts.length; j++) {
        if (posts[i][0] == posts[j][1]) {
            comment_blocks[i].appendChild(comment_blocks[j]);
        }
    }
}

for (let i = 0; i < posts.length; i++) {
    const children = comment_blocks[i].childNodes;
    if(children.length == 1){
        children[0].lastChild.style.display = "none";
    }
    for (let j = 1; j < children.length; j++) {
        children[j].style.display = "none";
        if (children[j].childNodes.length == 1) {
            children[j].childNodes[0].lastChild.style.display = "none";
        }
    }
}

for (let i = 0; i < posts.length; i++) {
    if (posts[i][1] == -1) {
        main.appendChild(comment_blocks[i]);
    }
}