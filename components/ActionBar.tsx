import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux'

const Input = styled.input`
  padding: 1px 3px;
  width: 100%;
`;

const searchResults = () => {
  const count = useSelector(state => state.count)
  const dispatch = useDispatch()
  const filter = val =>
    dispatch({
      type: 'FILTER_TEXT',
      value: val
    })
  const order = ord =>
    dispatch({
      type: 'FILTER_DATE',
      value: ord
    })
  return { count, filter, order }
}

const ActionBar: React.FC = () => {
  const { filter, order, count } = searchResults()
  return (
    <nav>
      <hr />
      <Input type="text" onKeyUp={el => filter(el.currentTarget.value)}></Input>
      <div>
        <em>Number of result found: {count}</em>
      </div>
      <hr />
      <div>
        <h6>Order by post date</h6>
        <button type="button" onClick={el => order(el.currentTarget.value)}>asc</button>
        <button type="button" onClick={el => order(el.currentTarget.value)}>desc</button>
      </div>
      <hr />
    </nav>
  );
}

export default ActionBar;
