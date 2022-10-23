import type { NextPage } from 'next'
import { useContractFunction, useEthers } from '@usedapp/core'
import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { Request } from '@prisma/client';
import { Contract } from 'ethers';
import { CARBON_CREDIT_ADDRESS } from '../constants/address';
import { CarbonCredit, CarbonCredit__factory } from '../typechain';

const AllRequest: NextPage = () => {
    const { account,library } = useEthers()
    const [requests, setRequests] = useState<Request[]>()
    const newContract = useMemo(()=>new Contract(CARBON_CREDIT_ADDRESS,CarbonCredit__factory.createInterface(),library?.getSigner(account ?? ""))as CarbonCredit,[account, library])

  const {send:transfer,state: TransferState } = useContractFunction(
       newContract,
        "safeTransferFrom",
        {
            signer: library?.getSigner?.(account ?? "")
        }
    )
    const getRequests = async () => {
        const res = await axios.get(`http://localhost:3000/api/getAllRequest/${account}`).then((r) => {
            console.log(r);
            setRequests(r.data);
            
        })
    }
    const safeTransfer =async (fromAddress:any,toAddress:any,creditId:any,amounts:any,reqid:any) => {
       
        const from = fromAddress.toString();
        const to = toAddress.toString();
        const credit_Id = creditId.toString();
        const amount = amounts.toString();
        const id = reqid.toString();
      transfer(account, to, Number(credit_Id), Number(amount),"0x");
        const res = await axios.post(`http://localhost:3000/api/sendCredit`, {
            from,
            to,
            credit_Id,
            amount,
            id
        }).then((r) => {
            console.log(r);
            
        })
        
    }
  return (
    <div>
      <div style={{paddingLeft:'45rem',paddingTop:'3rem'}}>

      
      <button onClick={getRequests}  className="btn btn-info">Get All Requests</button>
      </div>
      <h5 className='text-warning' style={{paddingTop:'2rem'}}>Transaction Status : {TransferState.status}</h5>

      <div>
              <table className="table table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Requested By</th>
      <th scope="col">Credit Id</th>
      <th scope="col">Amount</th>
      <th scope="col">Accept</th>
    </tr>
  </thead>
  <tbody>
    {requests?.map((r,i)=>{
        return (
            <>
                <tr>
                <th scope="row" key={i}>{r.request_id}</th>
                    <td>{(r.From)}</td>
                    <td>{r.Credit_Id}</td>
                    <td>{r.amount}</td>
              {(r.From == account) ?
                    <td> You Cant transfer  </td>
                    : <td><button className='btn btn-success' onClick={()=>safeTransfer(r.From,r.To,r.Credit_Id,r.amount,r.request_id)}>Transfer</button></td>}
                    
                </tr>
            </>
        )
    })}
    
  </tbody>
</table>
        </div>
    </div>
  )
}

export default AllRequest
