import React from 'react';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import Header from './Header';

let wrapper: RenderResult;
let input: HTMLInputElement;
const addUndoItem = jest.fn();

beforeEach(()=>{
    wrapper = render(<Header addUndoItem={addUndoItem} />);
    input = wrapper.getByTestId('header-input') as HTMLInputElement;
});

afterEach(()=>{
    wrapper = null;
    input= null;
});

describe("Header 组件测试单元", ()=>{
    it("组件初始化正常", ()=>{
        expect(input).not.toBeNull();
        expect(input.value).toEqual('');
    });

    it("输入框应该能输入", ()=>{
        const inputEvent={
            target:{
                value:'Learn Jest'
            }
        };

        fireEvent.change(input, inputEvent);
        expect(input.value).toEqual(inputEvent.target.value);
    });

    it("输入框回车后应提交并清空",()=>{
        const inputEvent={
            target:{
                value:'Learn Jest'
            }
        };

        // 模拟回车
        const keyboardEvent = {
            keyCode: 13
        };

        fireEvent.change(input, inputEvent);
        fireEvent.keyUp(input, keyboardEvent);
        expect(addUndoItem).toHaveBeenCalled();
        expect(addUndoItem).toHaveBeenCalledWith(inputEvent.target.value);
        expect(input.value).toEqual("");
    })

})


