function createItem(task, removeCallBack, editCallBack, doneCallBack) {
    let newItem = $(`<div class="item"></div>`);

    if (task.done === true)
        newItem.addClass('done');

    newItem.append(createTextField(task.title));
    newItem.append(createButtons(task, removeCallBack, editCallBack, doneCallBack));

    return newItem;
}

function createTextField(text) {
    let textField = $(`<div class="text">${text}</div>`);
    return textField;
}

function createButtons(task, removeCallBack, editCallBack, doneCallBack) {
    let buttons = $(`<div class="buttons"></div>`);

    let times = $(`<div class="times">${task.time}</div>`);
    let dates = $(`<div class="dates"> ${task.date}</div>`);

    buttons.append(times);
    buttons.append(dates);

    buttons.append(createEditButton(task, editCallBack));
    buttons.append(createDoneButton(task, doneCallBack));
    buttons.append(createRemoveButton(task, removeCallBack));

    return buttons;
}

function createDoneButton(task, callback) {
    let button = $(`
        <button class= "done-button">
            <i class="fas fa-check"></i>
        </button >
    `);

    button.click((event) => {
        let done = true;

        if (task.done === true)
            done = false;

        callback(event, task._id, done);
    });
    return button;
}

function createEditButton(task, callback) {
    let button = $(`
    <button class="edit-button">
        <i class="far fa-edit"></i>
    </button >
    `);

    button.click((event) => {
        callback(event, task);
    });

    return button;
}

function createRemoveButton(task, callback) {
    let button = $(`
    <button class="remove-button">
        <i class="fas fa-trash"></i>
    </button >
    `);

    button.click((event) => {
        callback(event, task._id);
    });

    return button;
}

function createEditItemForm(task, callback) {
    let form = $(`<form class="edit-item"></form> `);

    let input = createTextInputField();
    let button = $(`
    <button class="done-button">
        <i class="fas fa-check"></i>
    </button >
    `);

    form.append(input);
    form.append(button);

    button.click((event) => {
        let newText = input.val().trim();

        if (newText) {
            callback(event, task._id, newText);
        }
    });

    return form;
}

function createTextInputField() {
    let input = $(`<input type = "text" id = "editText" maxlength="8" placeholder = "Edit text..." > `);
    return input;
}

