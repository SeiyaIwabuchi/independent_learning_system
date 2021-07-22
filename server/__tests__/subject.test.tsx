/**
 * @jest-environment jsdom
 */

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import Add from '../pages/Manage/Subject/Add';
import Edit from '../pages/Manage/Subject/Edit';

describe("追加テスト", () => {
    beforeAll(() => {
        jest.spyOn(window, 'alert').mockImplementation((message: string) => { console.log(`Alert Message : ${message}`) });
    });

    test("追加1", () => {
        fetchMock
            .post("/api/Subject", { status: 200 }, { overwriteRoutes: true });
        const addform = render(<Add sessionId="123456789" />);
        fireEvent.click(addform.getByTestId(/formbutton/));
        fireEvent.change(addform.getByLabelText(/教科名/), { target: { value: "" } });
    });

    test("追加2", () => {
        fetchMock
            .post("/api/Subject", { status: 200 }, { overwriteRoutes: true });
        const addform = render(<Add sessionId="123456789" />);
        fireEvent.change(addform.getByLabelText(/教科名/), { target: { value: "" } });
        fireEvent.change(addform.getByLabelText(/説明/), { target: { value: "" } });
        fireEvent.click(addform.getByTestId(/formbutton/));
    });

    test("追加_クライアントエラー", () => {
        fetchMock
            .post("/api/Subject", { status: 400 }, { overwriteRoutes: true });
        const addform = render(<Add sessionId="123456789" />);
        fireEvent.change(addform.getByLabelText(/教科名/), { target: { value: "" } });
        fireEvent.change(addform.getByLabelText(/説明/), { target: { value: "" } });
        fireEvent.click(addform.getByTestId(/formbutton/));
    });    

    test("追加_サーバーエラー", () => {
        fetchMock
            .post("/api/Subject", { status: 500 }, { overwriteRoutes: true });
        const addform = render(<Add sessionId="123456789" />);
        fireEvent.change(addform.getByLabelText(/教科名/), { target: { value: "" } });
        fireEvent.change(addform.getByLabelText(/説明/), { target: { value: "" } });
        fireEvent.click(addform.getByTestId(/formbutton/));
    });

    test("追加_fetch失敗", () => {
        fetchMock
            .post("/api/Subject", { throws:"失敗メッセージ" }, { overwriteRoutes: true });
        const addform = render(<Add sessionId="123456789" />);
        fireEvent.change(addform.getByLabelText(/教科名/), { target: { value: "" } });
        fireEvent.change(addform.getByLabelText(/説明/), { target: { value: "" } });
        fireEvent.click(addform.getByTestId(/formbutton/));
    });
});

describe("編集テスト",()=>{
    beforeAll(() => {
        jest.spyOn(window, 'alert').mockImplementation((message: string) => { console.log(`Alert Message : ${message}`) });
    });

    test("通常", () => {
        fetchMock
            .put("/api/Subject", { status: 200 }, { overwriteRoutes: true });
        const editform = render(<Edit sessionId="123456789" subject={{name:"テスト",description:"テスト", hash:"114514"}} />);
        const nameInput = editform.getByLabelText(/教科名/) as HTMLInputElement;
        const descInput = editform.getByLabelText(/説明/) as HTMLInputElement;
        expect(nameInput.value).toBe("テスト");
        expect(descInput.value).toBe("テスト");
        fireEvent.change(editform.getByLabelText(/教科名/), { target: { value: "テテテテスト" } });
        fireEvent.click(editform.getByTestId(/formbutton/));
    });

    test("fetch_失敗", () => {
        fetchMock
            .put("/api/Subject", { throws:"失敗メッセージ" }, { overwriteRoutes: true });
        const editform = render(<Edit sessionId="123456789" subject={{name:"テスト",description:"テスト", hash:"114514"}} />);
        const nameInput = editform.getByLabelText(/教科名/) as HTMLInputElement;
        const descInput = editform.getByLabelText(/説明/) as HTMLInputElement;
        expect(nameInput.value).toBe("テスト");
        expect(descInput.value).toBe("テスト");
        fireEvent.change(editform.getByLabelText(/教科名/), { target: { value: "テテテテスト" } });
        fireEvent.click(editform.getByTestId(/formbutton/));
    });

    test("無効な更新", () => {
        fetchMock
            .put("/api/Subject", { status:400 }, { overwriteRoutes: true });
        const editform = render(<Edit sessionId="123456789" subject={{name:"テスト",description:"テスト", hash:"114514"}} />);
        const nameInput = editform.getByLabelText(/教科名/) as HTMLInputElement;
        const descInput = editform.getByLabelText(/説明/) as HTMLInputElement;
        expect(nameInput.value).toBe("テスト");
        expect(descInput.value).toBe("テスト");
        fireEvent.change(editform.getByLabelText(/教科名/), { target: { value: "" } });
        fireEvent.click(editform.getByTestId(/formbutton/));
    });
});


export default "this is a test code.";