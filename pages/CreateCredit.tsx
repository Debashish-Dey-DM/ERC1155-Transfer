import type { NextPage } from 'next'
import axios from "axios";
import { useEthers,useContractCall, useContractFunction} from "@usedapp/core";
import {  CARBON_CREDIT_ADDRESS } from "../constants/address";
import CarbonCreditJson from "../artifacts/contracts/CarbonCredit.sol/CarbonCredit.json";
import { Interface } from 'ethers/lib/utils';
import { Contract } from 'ethers';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage, uploadFile } from "../lib/firebase";
import { CarbonCredit,CarbonCredit__factory } from '../typechain';
import { useMemo, useState } from 'react';
const CreateCredit: NextPage = () => {
  const { account, library, activateBrowserWallet, deactivate, chainId } = useEthers();
  const [nft, SetNft] = useState<any>(
    {
      name: "",
      description: "",
      amount: "",
    }
  );
  
  

  const newContract = useMemo(()=>new Contract(CARBON_CREDIT_ADDRESS,CarbonCredit__factory.createInterface(),library?.getSigner(account ?? ""))as CarbonCredit,[account, library])

  const {send:mintCredit,state: mintState } = useContractFunction(
       newContract,
        "mint",
        {
            signer: library?.getSigner?.(account ?? "")
        }
    )
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const imageFile = e.target[3]?.files[0];
    const imageUrl = await uploadFile(imageFile, "CategoryLogo");
    
    
    
    mintCredit(nft.amount,"metadataUrl");
    const name = nft.name.toString();
    const description = nft.description.toString();
    const amount = nft.amount.toString();
    const newAddress = account?.toString();
   
   
    const res = await axios.post(
      "http://localhost:3000/api/createCredit", {
        name,
         description,
         amount,
        newAddress,
         imageUrl
      }
    ).then((r) => {
      console.log(r);
      
      
    })
    
  }
  const handleChange = async (e: any) => {
    
    SetNft({ ...nft, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <h1 style={{textAlign:'center'}}>Create Credit Page </h1>
      <form action="" onSubmit={handleSubmit} style={{ paddingLeft: '20rem', paddingRight: '22rem' }}>
        <div className="form-outline mb-4">
          <input className="form-control" type="text" name="name" placeholder='Name' onChange={handleChange} />
         
         </div>
        
        <div className="form-outline mb-4">
          <input className="form-control"type="text" name="description" placeholder='Description'onChange={handleChange} />
          
         </div>
        <div className="form-outline mb-4">
          <input className="form-control"type="text" name="amount" placeholder='Amount' onChange={handleChange} />
         
        </div>
        <div className="form-outline mb-4">
          <input type="file" className="form-control" />
         
         </div>
        <div className="col" style={{textAlign:'center'}}>
      
          <button type="submit" className="btn btn-primary btn-block">Mint</button>
          <h5 className='text-warning' style={{paddingTop:'2rem'}}>Status : {mintState.status}</h5>
    </div>
        
      </form>

      

    </div>
  )
}

export default CreateCredit;
