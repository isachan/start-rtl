import React from 'react';
// import axios from './__mocks__/axios';
import axios from 'axios';
import { render, screen, waitForElementToBeRemoved } from './custom-render';
import { TodoList } from './TodoList';
import { todos } from './makeTodos';

jest.mock('axios');

beforeEach(() => {
  // jest.setTimeout(10000);
});

describe('<App/>', () => {
  it('should render <TodoList/> component', async () => {
    //arrange
    const apiMock = axios.get.mockImplementation(() =>
      Promise.resolve({ data: todos })
    );

    render(<TodoList />);

    //act
    await waitForElementToBeRemoved(() => screen.getByText(/Fetching todos/i));

    //assert
    expect(apiMock).toHaveBeenCalled();
    todos
      .slice(0, 15)
      .forEach(td => expect(screen.queryByText(td.title)).toBeInTheDocument());
  });
});
