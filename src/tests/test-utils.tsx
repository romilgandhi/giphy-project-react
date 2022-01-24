import React, {FC, ReactElement} from 'react';
import {Provider} from 'react-redux'
import {render, RenderOptions} from '@testing-library/react';
import {configureStore} from '@reduxjs/toolkit';
import {BrowserRouter as Router} from 'react-router-dom'
import  store  from '../redux/store';

const AllTheProviders: FC = ({children}) => {
    return (
        <Provider store={store}>
            <Router>
                 {children}
            </Router>
        </Provider>
      
    )
  }

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
  ) => render(ui, {wrapper: AllTheProviders, ...options})
  
  export * from '@testing-library/react'
  export {customRender as render}