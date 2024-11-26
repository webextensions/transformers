import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import { AppWrapper } from './App/AppWrapper.js';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<AppWrapper />);
