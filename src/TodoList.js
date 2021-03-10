import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AppContext } from './AppContext';
import './App.css';

export const TodoList = () => {
  const [loading, setLoading] = useState(true);
  const { appData, appDispatch } = useContext(AppContext);
  // console.log('loading', loading);
  // console.log('appData', appData);
  // useEffect(() => {
  //   //WHY ARE YOU UNDEFINED
  //   axios
  //     .get('https://jsonplaceholder.typicode.com/todos')
  //     .then(res => {
  //       const { data } = res;
  //       appDispatch({ type: 'LOAD_TODOLIST', todoList: data });
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // }, [appDispatch, setLoading]);
  useEffect(async () => {
    try {
      let res = await axios.get('https://jsonplaceholder.typicode.com/todos');
      const { data } = res;
      // console.log('data is', data);
      appDispatch({ type: 'LOAD_TODOLIST', todoList: data });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [appDispatch, setLoading]);

  return (
    <div>
      {loading ? (
        <p>Fetching todos</p>
      ) : (
        <ul>
          {appData.todoList.slice(0, 15).map(item => {
            const { id, title } = item;
            return (
              <li key={id}>
                <Link to={`/item/${id}`} data-testid={id}>
                  {title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

TodoList.propTypes = {};

export default TodoList;
