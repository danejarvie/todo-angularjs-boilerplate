angular.module("app", [])
    .controller("TodoController", function() {
        var todoList = this;

        todoList.listItems = [
            { text:"learn Angularjs", done: true },
            { text:"build Todo list app", done: false }
        ];

        todoList.addItem = function() {
            var listText = todoList.todoText;
            if(listText && /\S/.test(listText)) {
                todoList.listItems.push({text: listText, done: false});
            }
            todoList.todoText = '';
        };

        todoList.removeItem = function(todo) {
            todoList.listItems = todoList.listItems.filter(x => x.text != todo.text);
        };


    });