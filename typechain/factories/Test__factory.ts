/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Test, TestInterface } from "../Test";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnerChanged",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "changeOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "users",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526012600260006101000a81548160ff021916908360ff16021790555034801561002c57600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555068056bc75e2d63100000600160008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600360008054906101000a900473ffffffffffffffffffffffffffffffffffffffff169080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506104ce8061016d6000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c8063313ce5671461005c578063365b98b21461007a57806370a08231146100aa5780638da5cb5b146100da578063a6f9dae1146100f8575b600080fd5b610064610114565b60405161007191906103cc565b60405180910390f35b610094600480360381019061008f91906102fd565b610127565b6040516100a19190610376565b60405180910390f35b6100c460048036038101906100bf91906102d4565b610166565b6040516100d191906103b1565b60405180910390f35b6100e261017e565b6040516100ef9190610376565b60405180910390f35b610112600480360381019061010d91906102d4565b6101a2565b005b600260009054906101000a900460ff1681565b6003818154811061013757600080fd5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60016020528060005260406000206000915090505481565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610230576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161022790610391565b60405180910390fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507fa2ea9883a321a3e97b8266c2b078bfeec6d50c711ed71f874a90d500ae2eaf368160405161029f9190610376565b60405180910390a150565b6000813590506102b98161046a565b92915050565b6000813590506102ce81610481565b92915050565b6000602082840312156102e657600080fd5b60006102f4848285016102aa565b91505092915050565b60006020828403121561030f57600080fd5b600061031d848285016102bf565b91505092915050565b61032f816103f8565b82525050565b60006103426009836103e7565b915061034d82610441565b602082019050919050565b6103618161042a565b82525050565b61037081610434565b82525050565b600060208201905061038b6000830184610326565b92915050565b600060208201905081810360008301526103aa81610335565b9050919050565b60006020820190506103c66000830184610358565b92915050565b60006020820190506103e16000830184610367565b92915050565b600082825260208201905092915050565b60006104038261040a565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b7f4e6f74206f776e65720000000000000000000000000000000000000000000000600082015250565b610473816103f8565b811461047e57600080fd5b50565b61048a8161042a565b811461049557600080fd5b5056fea26469706673582212200176175e43e7e84ed58efe00f679bbb34007bcb2f05923f9805b6e15b13f539164736f6c63430008040033";

type TestConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Test__factory extends ContractFactory {
  constructor(...args: TestConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Test> {
    return super.deploy(overrides || {}) as Promise<Test>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Test {
    return super.attach(address) as Test;
  }
  override connect(signer: Signer): Test__factory {
    return super.connect(signer) as Test__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestInterface {
    return new utils.Interface(_abi) as TestInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Test {
    return new Contract(address, _abi, signerOrProvider) as Test;
  }
}
