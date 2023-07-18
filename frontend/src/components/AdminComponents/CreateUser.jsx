import {useState,useEffect} from "react"
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from "../FormContainer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateMutation } from "../../slices/adminApiSlice";
import { createUser } from "../../slices/adminSlice";
import { toast } from 'react-toastify';
import { ToastContainer } from "react-toastify";



const CreateUser = () => {

    const [user,setUser] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [create] = useCreateMutation();

    const submitHandler = async (e)=>{
        e.preventDefault();
        if(user.password !== user.confirmPassword){
            toast.error('Passwords do not match');
        }else{
            try {
                const res = await create(user).unwrap();
                dispatch(createUser({...res}))
                // navigate('/admin/home')
                toast.success("user created successfully")
                
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }

    }

  return (
    <FormContainer>
         <ToastContainer/>
      <h1>Create</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={user.name}
            onChange={(e) => setUser({...user,name:e.target.value})}
            // isInvalid={!!nameError}
          ></Form.Control>
           {/* <Form.Control.Feedback type='invalid'>{nameError}</Form.Control.Feedback> */}
        </Form.Group>

        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            
            placeholder='Enter email'
            value={user.email}
            onChange={(e) => setUser({...user,email:e.target.value})}
            // isInvalid={!!emailError}
          ></Form.Control>
            {/* <Form.Control.Feedback type='invalid'>{emailError}</Form.Control.Feedback> */}
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            
            placeholder='Enter password'
            value={user.password}
            onChange={(e) => setUser({...user,password:e.target.value})}
            // isInvalid={!!passwordError}
          ></Form.Control>
          {/* <Form.Control.Feedback type='invalid'>{passwordError}</Form.Control.Feedback> */}
        </Form.Group>


        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='confirm password'
            value={user.confirmPassword}
            onChange={(e) => setUser({...user,confirmPassword:e.target.value})}
            // isInvalid={!!confirmPasswordError}
          ></Form.Control>
          {/* <Form.Control.Feedback type='invalid'>{confirmPasswordError}</Form.Control.Feedback> */}
        </Form.Group>
       
        <Button type='submit' variant='primary' className='mt-3'>
          Create
        </Button>
      </Form>

    
    </FormContainer>
  );
};

export default CreateUser;