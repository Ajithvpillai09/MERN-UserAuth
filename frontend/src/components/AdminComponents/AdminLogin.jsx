import {useState,useEffect} from "react"
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../FormContainer';
import { useDispatch  } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../slices/adminApiSlice";
import { adminLogin } from "../../slices/adminSlice";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';

const AdminLogin = () => {
    const [admin,setAdmin] = useState({
        email:'',
        password:''
    })

const dispatch = useDispatch();
const navigate = useNavigate();

const [login] = useLoginMutation();

const submitHandler = async (e)=>{
    e.preventDefault();
    try {
     const res = await login({email:admin.email,password:admin.password}).unwrap();
     dispatch(adminLogin({...res}))
     navigate('/admin/home')
    
    } catch (err) {
        toast.error(err?.data?.message || err.error);
    }
}
    
  

  return (
    <FormContainer>
     <ToastContainer/>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={admin.email}
            onChange={(e) => setAdmin({...admin,email:e.target.value})}
            // isInvalid={!!emailError}
          ></Form.Control>
            {/* <Form.Control.Feedback type='invalid'>{emailError}</Form.Control.Feedback> */}
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={admin.password}
            onChange={(e) => 
                setAdmin( {...admin ,password:e.target.value})}
            // isInvalid={!!passwordError}
          ></Form.Control>
          {/* <Form.Control.Feedback type='invalid'>{passwordError}</Form.Control.Feedback> */}
        </Form.Group>
        <Button type='submit' variant='primary' className='mt-3'>
          Sign In
        </Button>
      </Form>
    </FormContainer>
  );
};

export default AdminLogin ;