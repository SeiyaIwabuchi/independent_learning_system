/**
 * @jest-environment jsdom
 */

import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import renderer from 'react-test-renderer';
import OuterFrame from '../components/OuterFrame';
import LoginForm from '../pages/Manage/LoginForm';

test("greeting",()=>{
    const cmpt = render(<LoginForm preSessionId="1234567890"/>);
    console.log(cmpt.getByText(/ログイン/));
});

export default "this is test code.";