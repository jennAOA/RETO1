import React, { Component } from 'react';

class App extends Component {

  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      _id: '',
      tasks: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  addTask(e) {
    e.preventDefault();
    if(this.state._id) {
      fetch(`/api/tasks/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: this.state.title,
          description: this.state.description
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          window.M.toast({html: 'Articulo Actualizado'});
          this.setState({_id: '', title: '', description: ''});
          this.fetchTasks();
        });
    } else {
      fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          window.M.toast({html: 'Articulo Guardado'});
          this.setState({title: '', description: ''});
          this.fetchTasks();
        })
        .catch(err => console.error(err));
    }

  }

  deleteTask(id) {
    if(confirm('¿Estas seguro de eliminar el producto?')) {
      fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          M.toast({html: 'Articulo Eliminado'});
          this.fetchTasks();
        });
    }
  }

  editTask(id) {
    fetch(`/api/tasks/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          title: data.title,
          description: data.description,
          _id: data._id
        });
      });
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => {
        this.setState({tasks: data});
        console.log(this.state.tasks);
      });
  }

  render() {
    return (
      <div>

        <h1 class="header center pink-text">TIENDA(RETO 1)</h1>
            <div className="container">
                <div className="row">
                    <div className="col s5">
                        <div className="card">
                            <div className="card-content">
                                <div class="center">
                                    <h6 class="header light">Ingrese los datos de los nuevos productos</h6>
                                </div>
                                <form onSubmit={this.addTask}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input name="title" onChange={this.handleChange} value={this.state.title} type="text" placeholder="Nombre de Articulo" autoFocus/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <textarea name="description" onChange={this.handleChange} value={this.state.description} cols="30" rows="10" placeholder="Cantidad" className="materialize-textarea"></textarea>
                                        </div>
                                    </div>

                                    <button type="submit" className="btn light-pink darken-4">Agregar </button>
                                </form>
                            </div>
                        </div>
                    </div>
           
            <div className="col s7">
                <div>
                    <h3>STORE</h3>
                    <table class="striped">
                        <thead>
                            <tr>
                                <th>Articulo</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            { 
                            this.state.tasks.map(task => {
                                return (
                                    <tr key={task._id}>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>
                                        <button onClick={() => this.deleteTask(task._id)} className="btn light-pink darken-4">
                                        Borrar 
                                        </button>
                                        <button onClick={() => this.editTask(task._id)} className="btn light-pink darken-4" style={{margin: '4px'}}>
                                        Editar
                                        </button>
                                    </td>
                                    </tr>
                                )
                                })
                            }
                        </tbody>
                    </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default App;