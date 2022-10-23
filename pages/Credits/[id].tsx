import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserToCredit } from '@prisma/client';
const Home: NextPage = () => {
    const [credits,setCredits] =useState<UserToCredit[]>();
     const router = useRouter();
    const id = router.query.id;
    
    useEffect(() => {
        
    }, [])
    const getData = async () => {
        const res = axios.get(`http://localhost:3000/api/creditById/${id}`).then((r) => { 
            console.log(r);
            setCredits(r.data);
        })
    }
  return (
    <div>
            <table className="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">User ID</th>
                <th scope="col">Carbon Credit Id</th>
                <th scope="col">Amount</th>
                <th scope="col">Purchase</th>
                </tr>
            </thead>
            <tbody>
                  {credits?.map((c, i) => {
                      return (
                          <>
                <tr>
                <th scope="row">{c.id}</th>
                <td>{c.user_id}</td>
                <td>{c.credit_id}</td>
                <td>{c.amount}</td>
                <td><button className='btn btn-success' onClick={()=>router.push(`/Request/${c.user_id}/${c.credit_id}`)}>Buy</button></td>
                
            </tr>
                          </>
                )
            })}
                
            </tbody>
            </table>
          
          <button className='btn btn-info' onClick={getData}>show table</button>

    </div>
  )
}

export default Home
