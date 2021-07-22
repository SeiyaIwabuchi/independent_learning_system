/**
 * @jest-environment jsdom
 */

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import LoginForm from '../pages/Manage/LoginForm';
import fetchMock from 'fetch-mock';

beforeAll(() => {
    jest.spyOn(window, 'alert').mockImplementation((message:string) => {console.log(`Alert Message : ${message}`)});
});

test("loginform_empty", () => {
    const loginform = render(<LoginForm preSessionId="Unauthorised" />);
    const formbutton = loginform.getByTestId(/formbutton/);
    expect(() => {
        fireEvent.click(formbutton);
    }).toBeTruthy();
});

test("loginform_fill", () => {
    fetchMock
    .post("/api/Login",{status:200,sessionId:"12341234"}, {overwriteRoutes:true});
    const loginform = render(<LoginForm preSessionId="Unauthorised" />);
    const userField = loginform.getByLabelText(/ユーザ名/);
    const passwordField = loginform.getByLabelText(/パスワード/);
    const loginButton = loginform.getByTestId(/formbutton/);

    fireEvent.change(userField, { target: { value: "t" } });
    fireEvent.change(passwordField, { target: { value: "t" } });
    fireEvent.click(loginButton);
});

test("loginform_clienterr", () => {
    fetchMock
    .post("/api/Login",{status:400}, {overwriteRoutes:true});
    const loginform = render(<LoginForm preSessionId="Unauthorised" />);
    const userField = loginform.getByLabelText(/ユーザ名/);
    const passwordField = loginform.getByLabelText(/パスワード/);
    const loginButton = loginform.getByTestId(/formbutton/);

    fireEvent.change(userField, { target: { value: "t" } });
    fireEvent.change(passwordField, { target: { value: "t" } });
    fireEvent.click(loginButton);
});

test("loginform_servererr", () => {
    fetchMock
    .post("/api/Login",{status:500}, {overwriteRoutes:true});
    const loginform = render(<LoginForm preSessionId="Unauthorised" />);
    const userField = loginform.getByLabelText(/ユーザ名/);
    const passwordField = loginform.getByLabelText(/パスワード/);
    const loginButton = loginform.getByTestId(/formbutton/);

    fireEvent.change(userField, { target: { value: "t" } });
    fireEvent.change(passwordField, { target: { value: "t" } });
    fireEvent.click(loginButton);
});

test("loginform_fail_fetch", () => {
    fetchMock
    .post("/api/Login",{throws:"失敗メッセージ"}, {overwriteRoutes:true});
    const loginform = render(<LoginForm preSessionId="Unauthorised" />);
    const userField = loginform.getByLabelText(/ユーザ名/);
    const passwordField = loginform.getByLabelText(/パスワード/);
    const loginButton = loginform.getByTestId(/formbutton/);

    fireEvent.change(userField, { target: { value: "t" } });
    fireEvent.change(passwordField, { target: { value: "t" } });
    fireEvent.click(loginButton);
});

test("loginform_Unauthorised", () => {
    fetchMock
    .post("/api/Login",{status:400,sessionId:"Unauthorised"}, {overwriteRoutes:true});
    const loginform = render(<LoginForm preSessionId="Unauthorised" />);
    const userField = loginform.getByLabelText(/ユーザ名/);
    const passwordField = loginform.getByLabelText(/パスワード/);
    const loginButton = loginform.getByTestId(/formbutton/);

    fireEvent.change(userField, { target: { value: "t" } });
    fireEvent.change(passwordField, { target: { value: "t" } });
    fireEvent.click(loginButton);
});

export default "this is a test code.";