import React, { useState } from "react";
import "./App.css";
//import produce from "immer";
import { useImmer } from "use-immer";
const chalk = require("chalk");
//NOTE Todo是todolist中的每一项,需要有todo内容, index索引用于检测是否激活, completeTodo完成的方法, removeTodo 移除的方法
const initialSate = [
  {
    text: "Learn about React"
  },
  {
    text: "Meet friend for lunch"
  },
  {
    text: "Build really cool todo app"
  }
];

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}

      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value); //useState的方法,
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => {
          console.log(e.target.value);
          setValue(e.target.value);
          console.log(value);
        }}
      />
    </form>
  );
}

function App() {
  //这里是最顶层的state以及setState方法的配置位置
  const [todos, setTodos] = useImmer(initialSate);
  //添加时可以不加isComplete, 在点击complete时，如果是完成的话，就加上
  const addTodo = text => {
    //const newTodos = [...todos, { text }];
    console.table(todos);
    setTodos(draft => {
      draft.push({ text });
    });
  };

  const completeTodo = index => {
    //克隆一个todos,在克隆的todos上做出修改
    //const newTodos = [...todos];
    //
    //newTodos[index].isCompleted = true;

    //console.log(newTodos[index]);
    //setTodos(newTodos);

    setTodos(draft => {
      draft[index].isCompleted = true;
    });
  };

  const removeTodo = index => {
    //克隆一个todos,在克隆的todos上做出修改
    //const newTodos = [...todos];
    //newTodos.splice(index, 1);
    //setTodos(newTodos);
    setTodos(draft => {
      draft.splice(index, 1);
    });
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
