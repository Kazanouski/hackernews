import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];
function isSearched(searchTerm) {
  return function(item) {
  return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list,
      searchTerm: '',
      };
      this.onSearchChange = this.onSearchChange.bind(this);

      this.onDismiss = this.onDismiss.bind
      (this);
    }
    onSearchChange(event) {
      this.setState({ searchTerm: event.target.value });
    }
  
      onDismiss(id) {
        const isNotId = item => item.objectID !== id;
        const updatedList = this.state.list.filter(isNotId);
        this.setState({ list: updatedList });
    }

  render() {
    const { searchTerm, list } = this.state;
    return (
      <div className="page">
        <div className="interactions">
      <Search 
       value={searchTerm}
       onChange={this.onSearchChange}
     >
       Поиск
     </Search>
    </div>
    <Table
      list={list}
      pattern={searchTerm}
      onDismiss={this.onDismiss}
    />
      </div>
    );
  }
}

const Search = ({ value, onChange, children }) =>
    <form>
      {children} <input
        type="text"
        value={value}
        onChange={onChange}
      />
    </form>

function Table({list, pattern, onDismiss}){
  return (
    <div className="table">
      {list.filter(isSearched(pattern)).map(item =>
        <div key={item.objectID} className="table-row">
          <span style={{ width: '40%' }}>
            <a href={item.url}>{item.title}</a>
            </span>
        <span style={{ width: '30%' }}>
          {item.author}
        </span>
        <span style={{ width: '10%' }}>
          {item.num_comments}
        </span>
        <span style={{ width: '10%' }}>
          {item.points}
        </span>
        <span style={{ width: '10%' }}>
          <Button
            onClick={() => onDismiss(item.objectID)}
            className="button-inline"
          >
            Отбросить
          </Button>
        </span>

        </div>
      )}
    </div>
  );
}

function Button({onClick, className='', children}){
  return (
    <button
      onClick={onClick}
      className={className}
      type="button"
    >
      {children}
    </button>
  );
}

export default App;