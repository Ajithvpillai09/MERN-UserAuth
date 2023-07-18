import {  useSelector } from "react-redux";
import { useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";

const AdminHome = ()=>{
    
    const {users} = useSelector((state)=> state.admin);
    const navigate = useNavigate();
    
   
    return(
        <div className="container">
            <h2>ADMIN PANEL</h2>

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
                  
                    {users[0]?.map((user,index)=>
                         <tr key={user._id}>
                         <td>{index+1}</td>
                         <td>{user.name}</td>
                         <td>{user.email}</td>
                         <td>
                             <button className="btn btn-sm btn-primary">Edit</button>
                             <button className="btn btn-sm btn-danger ms-2">Delete</button>
                         </td>
                     </tr>

                    )} 
                   

                </tbody>

            </table>
     
        </div>
    )
}

export default AdminHome;