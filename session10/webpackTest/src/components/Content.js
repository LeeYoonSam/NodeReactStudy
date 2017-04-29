import React, { Component } from 'react';
import Input from './Input';

class Content extends Component {

    constructor() {
        super();

        this.state ={
            formData: [
                { label: "제목", name: "title" },
                { label: "내용", name: "content" },
            ]
        };
    }
    
    render() {
        return (

            <table className="table table-bordered">
                <tbody>
                { 
                    this.state.formData.map( (data, i) => {
                        return (
                            <tr key={i}>
                                <th>{data.label}</th>
                                <td>
                                    <Input name={data.name} />
                                </td>
                            </tr>
                        )
                        
                    })
                }
                </tbody>
            </table>
        );
    }
}
export default Content;