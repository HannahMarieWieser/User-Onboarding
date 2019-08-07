import React from 'react';
import { withFormik, Form, Field } from "formik";
import axios from 'axios';
import * as Yup from 'yup';

// [x] Name
// -[x] Email
// -[x] Password
// -[] Terms of Service (checkbox)
// -[x] A Submit button to send our form data to the server.



function OnboardForm(){
    return (
        <Form>
            <Field type = 'text' name='name' placeholder= 'Full Name'/>
            <Field type = 'email' name='email' placeholder= 'Email'/>
            <Field type = 'password' name='password' placeholder= 'Password'/>

            <button>Submit!</button>
        </Form>
    )
}  


const OnForm = withFormik({

    mapPropsToValues({name, email, password}){
        return{
            name: name || '',
            email: email || '',
            password: password || ''
        };
    },

    handleSubmit(values){
        console.log(values)
        //form submissoon gode..GET/REQUEST
    }

})(OnboardForm);

export default OnForm