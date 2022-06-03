import React, { useRef, useEffect, useState } from "react";
import "./styles.css";
import { Todo } from '../model';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDownloadDone } from "react-icons/md";
import { Draggable } from 'react-beautiful-dnd';

type Props = {
  index: number;  
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
};

const SingleTodo = ({ index, todo, todos, setTodos }: Props) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

     const handleEdit = (e: React.FormEvent, id: number) => {
       e.preventDefault();

       setTodos(
         todos.map((todo) =>
           todo.id === id ? { ...todo, todo: editTodo } : todo
         )
       );

       setEdit(false);
     };
    

    const handleDelete = (id: number) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleDone = (id: number) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, isDone: !todo.isDone } : todo));
    }

    const inputRef = useRef<HTMLInputElement>(null);


    // for when you click on the edit icon, the input will be already selected
    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);
    

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {edit ? (
            <input
              value={editTodo}
              ref={inputRef}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo} </s>
          ) : (
            <span className="todos__single--text">{todo.todo} </span>
          )}

          <div>
            <span
              className="icon"
              onClick={() => {
               
                  setEdit(!edit);
                
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDownloadDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
}

export default SingleTodo;