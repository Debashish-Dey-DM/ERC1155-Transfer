import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css'
import { Chain, DAppProvider, FullConfig, getChainById } from '@usedapp/core'
import { SUPPORTED_CHAIN_IDS } from '../constants/network';
import Navbar from '../components/navbar';
function getSupportedChains() {
  const result: Chain[] = [];
  for (let index = 0; index < SUPPORTED_CHAIN_IDS.length; index++) {
    const chain = getChainById(SUPPORTED_CHAIN_IDS[index]);
    if (chain) result.push(chain);
  }
  return result;
}
const dappconfig: Partial<FullConfig> = {
   
    networks: getSupportedChains(),
    multicallAddresses: { 1337: "0x851e54D568f3e13B26BF75b8f360d6a0b47C6D4F" },
    // autoConnect: true,
}

function MyApp({ Component, pageProps }: AppProps) {
  console.log(getSupportedChains());
  
 
  return (
    <DAppProvider config={dappconfig}>
        <Navbar/>
      <Component {...pageProps} />
    </DAppProvider>
  );
}

export default MyApp
