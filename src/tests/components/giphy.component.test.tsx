import "babel-polyfill";
import '@testing-library/jest-dom';
import React from 'react';
import {render, fireEvent, waitFor, screen} from '../test-utils';
import  GiphyComp  from '../../components/DisplayGiphy';
import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test("displays a button", async () => {
    mockedAxios.get.mockResolvedValue({ data: {} });
    render(<GiphyComp />);
    
    const text = screen.getByText(/go/i);
    expect(text).toBeInTheDocument();
  });