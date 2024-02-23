
import './App.css';
import { useState } from 'react';

function App() {

  const [task, setTask] = useState("");
  const [todo, setTodo] = useState([]);
  const [edit, setEdit] = useState(null);
  const [search, setSearch] = useState("");
  const [final, setFinal] = useState([]);
  const [searchInfor,setSearchinfo] = useState([])

  const add = () => {
    if (edit !== null) {
      const updated = [...todo];
      setSearchinfo([...todo])

      updated[edit] = { task: task, checked: false };
      setTodo(updated);
      setFinal(updated);
      setEdit(null);
      setTask("");
    }
    else {
      setTodo([...todo, {  task: task, checked: false }]);
      setSearchinfo([...todo])
      setFinal([...todo, {  task: task, checked: false }]);
      setTask("");
    }
  }

  const del = (index) => {
    console.log("index = " + index)
    let d = todo.filter((val, id) => {
      console.log("id =", id)
      return id !== index;
    })
    setTodo(d);
    setFinal(d);
  }

  const update = (index) => {
    setEdit(index);
    setTask(todo[index].task);
  };

  const handlecheck = (index) => {
    const check = [...todo];
    check[index].checked = !check[index].checked;
    setTodo(check);
  }

  const searchhanlder = () => {
   
    let info = final.filter((val, id) => {
      return val.task === search;
    })
    console.log('info',info)
    setTodo(info);
  }

  const completed = () => {
    let com = final.filter((val, id) => {
      return val.checked === true ? val : false
    });
    setTodo(com);
  }

  const uncompleted = () => {
    let uncom = final.filter((val, id) => {
      return val.checked === false ? val : false
    });
    setTodo(uncom);
  }

  const all = () => {
    var data = [...final];
    setTodo(data);
  }

  return (
    <div className="">
      <div className="wrapper">
        <div className='form'>
          <input type="text" className='input' value={task} placeholder='Enter Task' onChange={(e) => { setTask(e.target.value) }} />
          <input type='button' className='btn' value={"Add"} onClick={() => { add() }}/><br />
          <input type='text' className='input' placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
          <input type='button' className='btn' value={"Search"} onClick={() => { searchhanlder() }} />
          <input type='button' className='btn' value={"Completed"} onClick={() => { completed() }} />
          <input type='button' className='btn' value={"UnCompleted"} onClick={() => { uncompleted() }} />
          <input type='button' className='btn' value={"All"} onClick={() => { all() }}/>

        </div>

        <ul>
          {
            todo.map((ele, index) => {
              return (
                <li key={index}>
                  <table border={2}>
                 <tr><td><input type='checkbox' checked={ele.checked} onChange={() => handlecheck(index)} /></td>
                    <td><span style={{ textDecoration: ele.checked ? "line-through" : "" }}>{ele.task}</span></td>
                    <td><input type='button' value={"Del"} className='del' onClick={() => { del(index) }} /></td>
                    <td><input type='button' value={"Edit"} onClick={() => { update(index) }} /></td>
                      </tr>
                    </table>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default App;

