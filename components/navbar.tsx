import type { NextPage } from 'next'
import { useEthers } from '@usedapp/core'
import { ADMIN_ADDRESS } from '../constants/address'
const Navbar: NextPage = () => {
  const{account,activateBrowserWallet,deactivate} = useEthers()
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        
        <h3 className="navbar-brand" onClick={()=>activateBrowserWallet}>{(account==ADMIN_ADDRESS)?"Admin":account}</h3>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav" style={{flexFlow:'column'}}>
    <ul className="navbar-nav">
      <li className="nav-item active">
        <a className="nav-link" href="MarketPlace">Market Place <span className="sr-only"></span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="Admin">Create Organisations</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="CreateCredit">Mint Carbon Credit</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="AllRequest">Request</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="OwnedCredit">Owned Credit</a>
      </li>
      
            {account ? <button onClick={()=>deactivate()} className='btn btn-danger'>Disconnect Wallet</button>:<button onClick={()=>activateBrowserWallet()} className='btn btn-success'>Connect Wallet</button>}
    </ul>
  </div>
</nav>

    </div>
  )
}

export default Navbar
