import React from 'react';
import {cleanup, render, screen} from '@testing-library/react';
import App from "./App"

/*cleans up for the next test */
afterEach(cleanup);

/* makes sure the app renders */
it("renders without crashing", () => {
  const div = document.createElement("div");
  render(<App></App>, div);
})