import {  useSelector,useDispatch} from "react-redux";
import { useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserMutation,useDeleteUserMutation } from "../../slices/adminApiSlice";
import { getUsers ,removeUser} from "../../slices/usersSlice";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';

const AdminHome = ()=>{
    
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [getUser] = useGetUserMutation();
    const [deleteUser] = useDeleteUserMutation();
    
    
 
    const {user} = useSelector((state)=> state.user)
  
    useEffect(()=>{
         getAllUsers();
    },[])

    async function getAllUsers(){
        try {
            const res = await getUser().unwrap()
            dispatch(getUsers(res))      
        } catch (err) {
            toast.error(err?.data?.message || err.error);
            
        }
    }

    const deleteUsers =async  (id)=>{
        try {
            const res = await deleteUser(id).unwrap()
            console.log(res);
            dispatch(removeUser(res))
            toast.success("user delted successfully")            
        } catch (error) {
            toast.error(err?.data?.message || err.error);
            
        }
    } 
    return(
      
    
        <div className="container">
            <h2>ADMIN PANEL</h2>
            <ToastContainer/>         
            <button className="btn btn-success my-3" onClick={()=> navigate('/admin/create')}>Create +</button>
            <input className="mx-2 p-1" type="search" placeholder="search here..."></input>           
            <table className="table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>                  
                    {user?.map((user,index)=>
                         <tr key={user._id}>
                         <td>{index+1}</td>
                         <td>{user.name}</td>
                         <td>{user.email}</td>
                         <td>
                             <button className="btn btn-sm btn-primary" onClick={()=> navigate(`/admin/edit/${user._id}`) }>Edit</button>
                             <button className="btn btn-sm btn-danger ms-2" onClick={()=> deleteUsers(user._id)}>Delete</button>
                         </td>
                     </tr>
                    )} 
                </tbody>
            </table>     
        </div>
    )
}

export default AdminHome;