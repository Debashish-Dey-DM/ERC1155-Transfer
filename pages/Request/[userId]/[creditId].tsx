import {useState} from 'react';
import type { NextPage } from 'next'
import { useEthers } from '@usedapp/core';
import { useRouter } from 'next/router'
import axios from 'axios';
const Request: NextPage = () => {
  const { account } = useEthers();
    const router = useRouter();
  const userId = router.query.userId;
  const creditId = router.query.creditId;
  const [amount, setAmount] = useState<any>("");
  const handleSubmit = async (e: any) => { 
    e.preventDefault();
    const credit = await axios.get(`http://localhost:3000/api/getCreditById/${creditId}`);
    const user = await axios.get(`http://localhost:3000/api/getUserById/${userId}`);
    console.log("credit",credit.data);
    console.log("user", user.data);
    console.log(account);
    
    const from = account;
    const to = user.data.address.toString();
    const credit_Id = credit.data.credit_id?.toString();
    
    const res = await axios.post(`http://localhost:3000/api/createRequest`,
      {
        from,
        to,
        credit_Id,
        amount
    }
    ).then((r)=>console.log(r))
    
    router.push('/AllRequest');
  }
  return (
    <div>
      <form action="" className="form-group mx-sm-3 mb-2" style={{paddingLeft: '45rem',paddingTop: '10rem'}} onSubmit={handleSubmit}>
        <input type="text" className="form-control" style={{width:'15%'}} onChange={(e) => {
          setAmount(e.target.value);
        }} placeholder='Amount' />
        <div style={{marginTop:'1rem',paddingLeft:'2.2rem'}}>
          <button className="btn btn-primary mb-2" type="submit" >Request</button>
        </div>
      </form>


    </div>
  )
}

export default Request
