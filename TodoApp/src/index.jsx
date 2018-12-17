import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';

console.clear();

const TodoForm = ({addTodo}) => {
  let input;

  return (
    <form onSubmit ={(e) => {
      e.preventDefault();
      addTodo(input.value);
      input.value = '';
    }}>
    <input className="form-control col-md-12" ref={node => {
      input = node;
    }} />
    <br />
    </form>
  );
};

const Todo = ({todo, remove}) => {
  return(
  <a href="#" className="list-group-item" onClick={() => {remove(todo.id)}}>{todo.text}</a>
  );
}

const TodoList = ({todos, remove}) => {
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove} />)
  });
  return (<div className="list-group" style={{marginTop:'30px'}}>{todoNode}</div>);
}





window.id = 0;

class TodoApp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
    this.apiUrl= 'https://57b1924b46b57d1100a3c3f8.mockapi.io/api/todos'
  }
  componentDidMount(){
    axios.get(this.apiUrl).then((res) => {
        this.setState({data:res.data});
      });
  }

  addTodo(val){
    const todo = {text: val}

    axios.post(this.apiUrli, todo).then((res) => {
      this.state.data.push(res.data);
      this.setState({data: this.setState.data});
    });
  }

  handleRemove(id){
    const remainder = this.state.data.filter((todo) => {
      if(todo.id !== id) return todo;
    });

    axios.delete(this.apiUrl+'/'+id).then((res) => {
      this.setState({data: remainder});
    })
  }

  render(){
    return(
      <div>
        <Title todoCount={this.state.data.length} />
        <TodoForm addTodo={this.addTodo.bind(this)}/>
        <TodoList
          todos={this.state.data}
          remove={this.handleRemove.bind(this)}
          />

      </div>
    );
  }
}
render(<TodoApp />, document.getElementById('container'));