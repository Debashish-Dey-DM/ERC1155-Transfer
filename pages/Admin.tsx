import type { NextPage } from 'next'
import axios from "axios";
import { useEthers,useContractCall, useContractFunction} from "@usedapp/core";
import {  CARBON_CREDIT_ADDRESS } from "../constants/address";
import CarbonCreditJson from "../artifacts/contracts/CarbonCredit.sol/CarbonCredit.json";
import { Interface } from 'ethers/lib/utils';
import { Contract } from 'ethers';
import { CarbonCredit,CarbonCredit__factory } from '../typechain';
import { useMemo, useState } from 'react';
const Admin: NextPage = () => {
  const { account, library, activateBrowserWallet, deactivate, chainId } = useEthers();
  const [creator, SetCreator] = useState<any>(
    {
      name: "",
      description: "",
      address: "",
      type:"Organization"
    }
  );
  const [orgAddress, setOrgAddress] = useState("");
  console.log(account);
  // const readme = useContractCall({
  //   address: CARBON_CREDIT_ADDRESS,
  //   abi: new Interface(CarbonCreditJson.abi),
  //   method: "owner",
  //   args: [],
  // })
  // console.log("readme", readme);
    const newContract = useMemo(()=>new Contract(CARBON_CREDIT_ADDRESS,CarbonCredit__factory.createInterface(),library?.getSigner(account ?? ""))as CarbonCredit,[account, library])

  const {send:setAddress,state: AddressState } = useContractFunction(
       newContract,
        "createCreditor",
        {
            signer: library?.getSigner?.(account ?? "")
        }
    )
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setAddress(orgAddress);
    const name = creator.name.toString();
    const description = creator.description.toString();
    const address = creator.address.toString();
    const type = creator.type.toString();

    console.log(name, description, address, type);
    
    const res = await axios.post(
      "http://localhost:3000/api/createOrg", {
        name,
         description,
         address,
         type
      }
    ).then((r) => {
      alert("Organization Created");
      
    })
    
  }
  const handleChange = async (e: any) => {
    setOrgAddress(e.target.value)
    SetCreator({ ...creator, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <h1 style={{textAlign:'center',paddingTop:'1rem',paddingBottom:'1rem'}}>Create Organisation</h1>
      <form action="" onSubmit={handleSubmit} style={{ paddingLeft: '20rem', paddingRight: '22rem' }}>
        <div className="form-outline mb-4">
        <input className="form-control" type="text" name="name" placeholder='Name' onChange={handleChange} />
        </div>
        <div className="form-outline mb-4">
          <input className="form-control" type="text" name="description" placeholder='Description' onChange={handleChange} />
        </div>
        <div className="form-outline mb-4">
          <input className="form-control" type="text" name="address" placeholder='Address' onChange={handleChange} />
        </div>
        <div className="col" style={{textAlign:'center'}}>

          <button className="btn btn-primary btn-block" type="submit">Verify</button>
          <h5 className='text-warning' style={{paddingTop:'2rem'}}>Status : {AddressState.status}</h5>
        
        </div>
      </form>

    
      
    </div>
  )
}

export default Admin;
