import type { NextPage } from 'next'
import { useContractFunction, useEthers } from '@usedapp/core'
import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { AddressToCredit, Request } from '@prisma/client';
import { Contract } from 'ethers';
import { CARBON_CREDIT_ADDRESS } from '../constants/address';
import { CarbonCredit, CarbonCredit__factory } from '../typechain';

const OwnedCredit: NextPage = () => {
    const {account,library} = useEthers()
    const [credits,setCredits] = useState<AddressToCredit[]>();
    const getOwnedCredit = async () => {
        const res = await axios.get(`http://localhost:3000/api/getOwnedCredit/${account}`).then((r) => {
            console.log(r);
            setCredits(r.data);
            
        })
    }
    
  return (
      <div>
          <div style={{ paddingLeft: '45rem',paddingTop:'2rem',paddingBottom:'1rem' }}>
          <button onClick={getOwnedCredit} className="btn btn-info">Owned Credit</button>
              
          </div>
          <div>
            <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Address</th>
                        <th scope="col">Credit Id</th>
                        <th scope="col">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                      {credits?.map((c, i) => {
                          return (
                              <>
                                <tr>
                                      <th scope="row" key={i}>{c.id}</th>
                                      <td>{c.address}</td>
                                      <td>{c.credit_id}</td>
                                      <td>{c.amount}</td>
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

export default OwnedCredit
