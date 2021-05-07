$(() => {
  let todoList = $("#todo-list");
  let addButton = $("#add-button");
  let input = $("#input");
  let isEdit = false;
  getData();

  addButton.click((event) => {
    event.preventDefault();

    let text = input.val().trim();

    if (text) {
      $.ajax({
        method: "POST",
        url: "http://localhost:5555/todo",
        data: {
          title: text,
        },
      }).done(populateToDoList);
    }
  });

  function editOperation(event, task) {
    event.preventDefault();

    if (isEdit === true) return;

    if (task.done === true) {
      swal({
        title: "Already done!",
        text: "Do you still want to edit?",
        icon: "success",
        buttons: ["No", "YES!"],
      }).then((willEdit) => {
        if (willEdit) {
          isEdit = true;
          let element = $(event.target).parent().closest(".item");
          element.replaceWith(createEditItemForm(task, updateTextOperation));
        }
      });
    } else {
      isEdit = true;
      let element = $(event.target).parent().closest(".item");
      element.replaceWith(createEditItemForm(task, updateTextOperation));
    }
  }

  function updateTextOperation(event, id, text) {
    event.preventDefault();

    $.ajax({
      url: "http://localhost:5555/todo/" + id,
      method: "PUT",
      data: { title: text },
    }).done(getData);
  }

  function updateDoneOperation(event, id, done) {
    event.preventDefault();

    $.ajax({
      url: "http://localhost:5555/todo/" + id,
      method: "PUT",
      data: { done: done },
    }).done(getData);
  }

  function removeOperation(event, id) {
    event.preventDefault();

    $.ajax({
      url: "http://localhost:5555/todo/" + id,
      method: "DELETE",
    }).done(getData);
  }

  function getData() {
    $.ajax({
      method: "GET",
      url: "http://localhost:5555/todo",
    }).done(populateToDoList);
    isEdit = false;
  }

  function populateToDoList(res) {
    todoList.empty();

    res.sort(function (x, y) {
      return x.done === y.done ? 0 : x.done ? 1 : -1;
    });

    for (let i = 0; i < res.length; i++) {
      let newItem = createItem(
        res[i],
        removeOperation,
        editOperation,
        updateDoneOperation
      );
      todoList.append(newItem);
    }
  }
});
