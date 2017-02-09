import React, { Component } from 'react';
import Projects from './components/Projects';
import AddProject from './components/AddProject';
import './App.css';
import uuid from 'uuid';
import $ from 'jquery';
import Todos from './components/Todos';

class App extends Component {
      constructor() {
          super();
          this.state = {
              projects: [],
              todos: []
          }
      }
      getTodos(){
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/todos',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({todos:data}, () => {
                    console.log(this.state);
                });
            }.bind(this),
            error: function(xhr, status, err){
                console.log(err);
            }
        });
      }
      getProjects(){
          this.setState({projects: [
              {
                  id: uuid.v4(),
                  title: 'Business Website',
                  category: 'Web Design'
              },
              {
                  id: uuid.v4(),
                  title: 'Social App',
                  category: 'Mobile Development'
              },
              {
                  id: uuid.v4(),
                  title: 'Ecommerce Shopping Cart',
                  category: 'Web Development'
              }
          ]});
      }
      componentWillMount(){
        this.getTodos();
        this.getProjects();
      }
      componentDidMount(){
          this.getTodos();
      }
      handleAddProject(project){
        let projects = this.state.projects;
        projects.push(project);
        this.setState({projects:projects});
      }
      handleDeleteProject(id){
          let projects = this.state.projects;
          let index = projects.findIndex(x => x.id === id);
          projects.splice(index, 1);
          this.setState({projects:projects});
      }
    render() {
        return (
            <div className="App">
                <AddProject addProject={this.handleAddProject.bind(this)}/>
                My App
                <h3>Latest Projects</h3>
                <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)} />
                <br />
                <h3>My Todos</h3>
                <Todos todos={this.state.todos}/>
            </div>
        );
    }
}

export default App;
