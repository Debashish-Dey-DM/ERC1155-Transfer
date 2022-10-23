import type { NextPage } from 'next'
import axios from "axios";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Credit } from '@prisma/client';
const MarketPlace: NextPage = () => {
    const router = useRouter();
    const[credits,setCredits] = useState<Credit[]>();
    useEffect(() => {
        axios.get("http://localhost:3000/api/getAllCredits").then((r) => {
            console.log(r);
            setCredits(r.data);
        })
    },[])
  return (
    <div>
      <h1 style={{textAlign:'center',paddingTop:'4rem',paddingBottom:'3rem'}}>MarketPlace Page</h1>
          <div>
              <div className="container">
                  <div className="row" style={{flexWrap:'wrap'}}>
                      
              {credits?.map((c,i) => {
                  return (
                      <>
                <div className="col-sm" style={{paddingTop:'1rem'}}>
                <div className="card" style={ {width:"12rem"} } key={i}>
                <img className="card-img-top" src={c?.image} alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{c.name}</h5>
                    <p className="card-text">{c.amount}</p>
                                  <a href="#" className="btn btn-primary" onClick={()=>router.push(`Credits/${c.credit_id}`)}>see details</a>
                  </div>       
              </div>
            </div>      </>
                  )
              })}
              
    
  </div>
</div>
        </div>
    </div>
  )
}

export default MarketPlace
