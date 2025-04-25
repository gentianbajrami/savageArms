import React from 'react';
import { Form, Link, useLoaderData, useSubmit } from 'react-router-dom';
import FormRow from './FormRow';
import FormRowSelect from './FormRowSelect';
import FormRange from './FormRange';
import styled from 'styled-components';

const Filters = () => {
  const { params, meta } = useLoaderData();
  console.log('🚀 ~ Filters ~ meta:', params);
  const { search, caliber, model, type, order, price } = params;

  const submit = useSubmit();

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };

  return (
    <Wrapper>
      <Form>
        <FormRow
          type="search"
          label="search product"
          name="search"
          size="input-sm"
          defaultValue={search}
          onChange={debounce((form) => submit(form))}
        />
        <FormRowSelect
          label="select caliber"
          name="caliber"
          list={['all', ...Object.values(meta.FIREARMS_CALIBER)]}
          size="select-sm"
          defaultValue={caliber}
          onChange={(e) => submit(e.currentTarget.form)}
        />
        <FormRowSelect
          label="select model"
          name="model"
          list={['all', ...Object.values(meta.FIREARMS_MODEL)]}
          size="select-sm"
          defaultValue={model}
          onChange={(e) => submit(e.currentTarget.form)}
        />
        <FormRowSelect
          label="select type"
          name="type"
          list={['all', ...Object.values(meta.FIREARMS_TYPE)]}
          size="select-sm"
          defaultValue={type}
          onChange={(e) => submit(e.currentTarget.form)}
        />

        <FormRowSelect
          label="sort by"
          name="order"
          list={['a-z', 'z-a', 'high', 'low']}
          size="select-sm"
          defaultValue={order}
          onChange={(e) => submit(e.currentTarget.form)}
        />
        {/* PRICE */}
        <FormRange
          name="price"
          label="select price"
          price={price}
          onChange={(e) => submit(e.currentTarget.form)}
        />

        <Link to="/products" className="btn">
          reset
        </Link>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 1rem;
  form {
    display: grid;
    background-color: var(--grey-200);
    padding: 2rem;
    border-radius: 10px;
    align-items: center;
    select,
    input {
      border: none;
    }
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (min-width: 992px) {
    form {
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1rem;
    }
  }
`;

export default Filters;
