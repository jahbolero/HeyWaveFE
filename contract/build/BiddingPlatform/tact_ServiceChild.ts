import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(8);
    let _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleStdAddress(source: StdAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(32);
    let _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleVarAddress(source: VarAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadGetterTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadGetterTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadGetterTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type NewService = {
    $$type: 'NewService';
    description: string;
}

export function storeNewService(src: NewService) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(874375944, 32);
        b_0.storeStringRefTail(src.description);
    };
}

export function loadNewService(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 874375944) { throw Error('Invalid prefix'); }
    let _description = sc_0.loadStringRefTail();
    return { $$type: 'NewService' as const, description: _description };
}

function loadTupleNewService(source: TupleReader) {
    let _description = source.readString();
    return { $$type: 'NewService' as const, description: _description };
}

function loadGetterTupleNewService(source: TupleReader) {
    let _description = source.readString();
    return { $$type: 'NewService' as const, description: _description };
}

function storeTupleNewService(source: NewService) {
    let builder = new TupleBuilder();
    builder.writeString(source.description);
    return builder.build();
}

function dictValueParserNewService(): DictionaryValue<NewService> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNewService(src)).endCell());
        },
        parse: (src) => {
            return loadNewService(src.loadRef().beginParse());
        }
    }
}

export type NewServiceResponse = {
    $$type: 'NewServiceResponse';
    serviceId: bigint;
}

export function storeNewServiceResponse(src: NewServiceResponse) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3347443311, 32);
        b_0.storeUint(src.serviceId, 256);
    };
}

export function loadNewServiceResponse(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3347443311) { throw Error('Invalid prefix'); }
    let _serviceId = sc_0.loadUintBig(256);
    return { $$type: 'NewServiceResponse' as const, serviceId: _serviceId };
}

function loadTupleNewServiceResponse(source: TupleReader) {
    let _serviceId = source.readBigNumber();
    return { $$type: 'NewServiceResponse' as const, serviceId: _serviceId };
}

function loadGetterTupleNewServiceResponse(source: TupleReader) {
    let _serviceId = source.readBigNumber();
    return { $$type: 'NewServiceResponse' as const, serviceId: _serviceId };
}

function storeTupleNewServiceResponse(source: NewServiceResponse) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.serviceId);
    return builder.build();
}

function dictValueParserNewServiceResponse(): DictionaryValue<NewServiceResponse> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNewServiceResponse(src)).endCell());
        },
        parse: (src) => {
            return loadNewServiceResponse(src.loadRef().beginParse());
        }
    }
}

export type FinalizeService = {
    $$type: 'FinalizeService';
    serviceId: bigint;
}

export function storeFinalizeService(src: FinalizeService) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(391661631, 32);
        b_0.storeUint(src.serviceId, 256);
    };
}

export function loadFinalizeService(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 391661631) { throw Error('Invalid prefix'); }
    let _serviceId = sc_0.loadUintBig(256);
    return { $$type: 'FinalizeService' as const, serviceId: _serviceId };
}

function loadTupleFinalizeService(source: TupleReader) {
    let _serviceId = source.readBigNumber();
    return { $$type: 'FinalizeService' as const, serviceId: _serviceId };
}

function loadGetterTupleFinalizeService(source: TupleReader) {
    let _serviceId = source.readBigNumber();
    return { $$type: 'FinalizeService' as const, serviceId: _serviceId };
}

function storeTupleFinalizeService(source: FinalizeService) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.serviceId);
    return builder.build();
}

function dictValueParserFinalizeService(): DictionaryValue<FinalizeService> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFinalizeService(src)).endCell());
        },
        parse: (src) => {
            return loadFinalizeService(src.loadRef().beginParse());
        }
    }
}

export type BiddingPlatform$Data = {
    $$type: 'BiddingPlatform$Data';
    owner: Address;
    numServices: bigint;
}

export function storeBiddingPlatform$Data(src: BiddingPlatform$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeUint(src.numServices, 256);
    };
}

export function loadBiddingPlatform$Data(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _numServices = sc_0.loadUintBig(256);
    return { $$type: 'BiddingPlatform$Data' as const, owner: _owner, numServices: _numServices };
}

function loadTupleBiddingPlatform$Data(source: TupleReader) {
    let _owner = source.readAddress();
    let _numServices = source.readBigNumber();
    return { $$type: 'BiddingPlatform$Data' as const, owner: _owner, numServices: _numServices };
}

function loadGetterTupleBiddingPlatform$Data(source: TupleReader) {
    let _owner = source.readAddress();
    let _numServices = source.readBigNumber();
    return { $$type: 'BiddingPlatform$Data' as const, owner: _owner, numServices: _numServices };
}

function storeTupleBiddingPlatform$Data(source: BiddingPlatform$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeNumber(source.numServices);
    return builder.build();
}

function dictValueParserBiddingPlatform$Data(): DictionaryValue<BiddingPlatform$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBiddingPlatform$Data(src)).endCell());
        },
        parse: (src) => {
            return loadBiddingPlatform$Data(src.loadRef().beginParse());
        }
    }
}

export type InternalSetDescription = {
    $$type: 'InternalSetDescription';
    description: string;
}

export function storeInternalSetDescription(src: InternalSetDescription) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1681999323, 32);
        b_0.storeStringRefTail(src.description);
    };
}

export function loadInternalSetDescription(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1681999323) { throw Error('Invalid prefix'); }
    let _description = sc_0.loadStringRefTail();
    return { $$type: 'InternalSetDescription' as const, description: _description };
}

function loadTupleInternalSetDescription(source: TupleReader) {
    let _description = source.readString();
    return { $$type: 'InternalSetDescription' as const, description: _description };
}

function loadGetterTupleInternalSetDescription(source: TupleReader) {
    let _description = source.readString();
    return { $$type: 'InternalSetDescription' as const, description: _description };
}

function storeTupleInternalSetDescription(source: InternalSetDescription) {
    let builder = new TupleBuilder();
    builder.writeString(source.description);
    return builder.build();
}

function dictValueParserInternalSetDescription(): DictionaryValue<InternalSetDescription> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInternalSetDescription(src)).endCell());
        },
        parse: (src) => {
            return loadInternalSetDescription(src.loadRef().beginParse());
        }
    }
}

export type PlaceBid = {
    $$type: 'PlaceBid';
    bidAmount: bigint;
}

export function storePlaceBid(src: PlaceBid) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2965759896, 32);
        b_0.storeUint(src.bidAmount, 256);
    };
}

export function loadPlaceBid(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2965759896) { throw Error('Invalid prefix'); }
    let _bidAmount = sc_0.loadUintBig(256);
    return { $$type: 'PlaceBid' as const, bidAmount: _bidAmount };
}

function loadTuplePlaceBid(source: TupleReader) {
    let _bidAmount = source.readBigNumber();
    return { $$type: 'PlaceBid' as const, bidAmount: _bidAmount };
}

function loadGetterTuplePlaceBid(source: TupleReader) {
    let _bidAmount = source.readBigNumber();
    return { $$type: 'PlaceBid' as const, bidAmount: _bidAmount };
}

function storeTuplePlaceBid(source: PlaceBid) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.bidAmount);
    return builder.build();
}

function dictValueParserPlaceBid(): DictionaryValue<PlaceBid> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePlaceBid(src)).endCell());
        },
        parse: (src) => {
            return loadPlaceBid(src.loadRef().beginParse());
        }
    }
}

export type FinalizeBidding = {
    $$type: 'FinalizeBidding';
    excess: Address;
}

export function storeFinalizeBidding(src: FinalizeBidding) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1374796672, 32);
        b_0.storeAddress(src.excess);
    };
}

export function loadFinalizeBidding(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1374796672) { throw Error('Invalid prefix'); }
    let _excess = sc_0.loadAddress();
    return { $$type: 'FinalizeBidding' as const, excess: _excess };
}

function loadTupleFinalizeBidding(source: TupleReader) {
    let _excess = source.readAddress();
    return { $$type: 'FinalizeBidding' as const, excess: _excess };
}

function loadGetterTupleFinalizeBidding(source: TupleReader) {
    let _excess = source.readAddress();
    return { $$type: 'FinalizeBidding' as const, excess: _excess };
}

function storeTupleFinalizeBidding(source: FinalizeBidding) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.excess);
    return builder.build();
}

function dictValueParserFinalizeBidding(): DictionaryValue<FinalizeBidding> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFinalizeBidding(src)).endCell());
        },
        parse: (src) => {
            return loadFinalizeBidding(src.loadRef().beginParse());
        }
    }
}

export type BidDetails = {
    $$type: 'BidDetails';
    bidder: Address | null;
    bidAmount: bigint;
}

export function storeBidDetails(src: BidDetails) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.bidder);
        b_0.storeUint(src.bidAmount, 256);
    };
}

export function loadBidDetails(slice: Slice) {
    let sc_0 = slice;
    let _bidder = sc_0.loadMaybeAddress();
    let _bidAmount = sc_0.loadUintBig(256);
    return { $$type: 'BidDetails' as const, bidder: _bidder, bidAmount: _bidAmount };
}

function loadTupleBidDetails(source: TupleReader) {
    let _bidder = source.readAddressOpt();
    let _bidAmount = source.readBigNumber();
    return { $$type: 'BidDetails' as const, bidder: _bidder, bidAmount: _bidAmount };
}

function loadGetterTupleBidDetails(source: TupleReader) {
    let _bidder = source.readAddressOpt();
    let _bidAmount = source.readBigNumber();
    return { $$type: 'BidDetails' as const, bidder: _bidder, bidAmount: _bidAmount };
}

function storeTupleBidDetails(source: BidDetails) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.bidder);
    builder.writeNumber(source.bidAmount);
    return builder.build();
}

function dictValueParserBidDetails(): DictionaryValue<BidDetails> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBidDetails(src)).endCell());
        },
        parse: (src) => {
            return loadBidDetails(src.loadRef().beginParse());
        }
    }
}

export type ServiceChild$Data = {
    $$type: 'ServiceChild$Data';
    parent: Address;
    serviceId: bigint;
    description: string;
    highestBid: bigint;
    highestBidder: Address | null;
    isFinalized: boolean;
}

export function storeServiceChild$Data(src: ServiceChild$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.parent);
        b_0.storeUint(src.serviceId, 256);
        b_0.storeStringRefTail(src.description);
        b_0.storeUint(src.highestBid, 256);
        let b_1 = new Builder();
        b_1.storeAddress(src.highestBidder);
        b_1.storeBit(src.isFinalized);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadServiceChild$Data(slice: Slice) {
    let sc_0 = slice;
    let _parent = sc_0.loadAddress();
    let _serviceId = sc_0.loadUintBig(256);
    let _description = sc_0.loadStringRefTail();
    let _highestBid = sc_0.loadUintBig(256);
    let sc_1 = sc_0.loadRef().beginParse();
    let _highestBidder = sc_1.loadMaybeAddress();
    let _isFinalized = sc_1.loadBit();
    return { $$type: 'ServiceChild$Data' as const, parent: _parent, serviceId: _serviceId, description: _description, highestBid: _highestBid, highestBidder: _highestBidder, isFinalized: _isFinalized };
}

function loadTupleServiceChild$Data(source: TupleReader) {
    let _parent = source.readAddress();
    let _serviceId = source.readBigNumber();
    let _description = source.readString();
    let _highestBid = source.readBigNumber();
    let _highestBidder = source.readAddressOpt();
    let _isFinalized = source.readBoolean();
    return { $$type: 'ServiceChild$Data' as const, parent: _parent, serviceId: _serviceId, description: _description, highestBid: _highestBid, highestBidder: _highestBidder, isFinalized: _isFinalized };
}

function loadGetterTupleServiceChild$Data(source: TupleReader) {
    let _parent = source.readAddress();
    let _serviceId = source.readBigNumber();
    let _description = source.readString();
    let _highestBid = source.readBigNumber();
    let _highestBidder = source.readAddressOpt();
    let _isFinalized = source.readBoolean();
    return { $$type: 'ServiceChild$Data' as const, parent: _parent, serviceId: _serviceId, description: _description, highestBid: _highestBid, highestBidder: _highestBidder, isFinalized: _isFinalized };
}

function storeTupleServiceChild$Data(source: ServiceChild$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.parent);
    builder.writeNumber(source.serviceId);
    builder.writeString(source.description);
    builder.writeNumber(source.highestBid);
    builder.writeAddress(source.highestBidder);
    builder.writeBoolean(source.isFinalized);
    return builder.build();
}

function dictValueParserServiceChild$Data(): DictionaryValue<ServiceChild$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeServiceChild$Data(src)).endCell());
        },
        parse: (src) => {
            return loadServiceChild$Data(src.loadRef().beginParse());
        }
    }
}

 type ServiceChild_init_args = {
    $$type: 'ServiceChild_init_args';
    parent: Address;
    serviceId: bigint;
}

function initServiceChild_init_args(src: ServiceChild_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.parent);
        b_0.storeInt(src.serviceId, 257);
    };
}

async function ServiceChild_init(parent: Address, serviceId: bigint) {
    const __code = Cell.fromBase64('te6ccgECEwEAA48AART/APSkE/S88sgLAQIBYgIDA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVFds88uCCDwQFAgEgCgsCpAGSMH/gcCHXScIflTAg1wsf3iCCEGRBRdu6jiAw0x8BghBkQUXbuvLggdQB0DE0ggDUhPhCUnDHBfL0f+AgghCwxeeYuuMCghBR8buAuuMCMHAGBwDWyPhDAcx/AcoAVVBQZSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhPL/8hYzxbJAczL/8hQAyBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiygDJAczJ7VQC7jDTHwGCELDF55i68uCB0/8BMYIA3v0is/L0ggCihlMUvPL0ggDkD/hBbyQTXwMivvL0Im6zjpICIG7y0IBQA3J/VSBtbW3bPDCSbCLiIPhC+EFvJBNfAyO8jpf4QvhBbyQTXwNQBKETcn9VIG1tbds8MJEy4gJ/CAgBsNMfAYIQUfG7gLry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMYIA1IT4QlKAxwXy9IFTHQKzEvL0fyPCAI6NUROAQn9VIG1tbds8MJEx4n8IAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7CAkAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwCEbwsrtnm2eNjDA8MAgFqDQ4AAiMAEbCvu1E0NIAAYAIRsS22zzbPGxigDxAB9u1E0NQB+GPSAAGOZvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0//UAdAB0//UAdAg1wsBwwCOH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiUctchbeIB0gAwECYQJRAkECNsFuD4KNcLCoMJuhEABFMSAVzy4In6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAWQLRAds8EgAKiwhwbXA=');
    const __system = Cell.fromBase64('te6cckECFQEAA5kAAQHAAQEFoT7lAgEU/wD0pBP0vPLICwMCAWIECwN60AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRXbPPLgghEFCgKkAZIwf+BwIddJwh+VMCDXCx/eIIIQZEFF27qOIDDTHwGCEGRBRdu68uCB1AHQMTSCANSE+EJScMcF8vR/4CCCELDF55i64wKCEFHxu4C64wIwcAYHAu4w0x8BghCwxeeYuvLggdP/ATGCAN79IrPy9IIAooZTFLzy9IIA5A/4QW8kE18DIr7y9CJus46SAiBu8tCAUANyf1UgbW1t2zwwkmwi4iD4QvhBbyQTXwMjvI6X+EL4QW8kE18DUAShE3J/VSBtbW3bPDCRMuICfwgIAbDTHwGCEFHxu4C68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDGCANSE+EJSgMcF8vSBUx0CsxLy9H8jwgCOjVETgEJ/VSBtbW3bPDCRMeJ/CAHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wgJAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMANbI+EMBzH8BygBVUFBlINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WE8v/yFjPFskBzMv/yFADIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuLKAMkBzMntVAIBIAwOAhG8LK7Z5tnjYwwRDQACIwIBag8QABGwr7tRNDSAAGACEbEtts82zxsYoBEUAfbtRNDUAfhj0gABjmb6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdP/1AHQAdP/1AHQINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAdIAMBAmECUQJBAjbBbg+CjXCwqDCboSAVzy4In6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAWQLRAds8EwAKiwhwbXAABFMSK3f39w==');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initServiceChild_init_args({ $$type: 'ServiceChild_init_args', parent, serviceId })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const ServiceChild_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    11: { message: `'Unknown' error` },
    12: { message: `Fatal error` },
    13: { message: `Out of gas error` },
    14: { message: `Virtualization error` },
    32: { message: `Action list is invalid` },
    33: { message: `Action list is too long` },
    34: { message: `Action is invalid or not supported` },
    35: { message: `Invalid source address in outbound message` },
    36: { message: `Invalid destination address in outbound message` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    39: { message: `Outbound message does not fit into a cell after rewriting` },
    40: { message: `Cannot process a message` },
    41: { message: `Library reference is null` },
    42: { message: `Library change action error` },
    43: { message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree` },
    50: { message: `Account state size exceeded limits` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    17448: { message: `Service does not exist` },
    21277: { message: `Already finalized` },
    41606: { message: `Bid must be higher than current highest` },
    54404: { message: `Parent only` },
    57085: { message: `Bidding is finalized` },
    58383: { message: `Insufficient funds sent` },
}

const ServiceChild_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"NewService","header":874375944,"fields":[{"name":"description","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"NewServiceResponse","header":3347443311,"fields":[{"name":"serviceId","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"FinalizeService","header":391661631,"fields":[{"name":"serviceId","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"BiddingPlatform$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"numServices","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"InternalSetDescription","header":1681999323,"fields":[{"name":"description","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"PlaceBid","header":2965759896,"fields":[{"name":"bidAmount","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"FinalizeBidding","header":1374796672,"fields":[{"name":"excess","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"BidDetails","header":null,"fields":[{"name":"bidder","type":{"kind":"simple","type":"address","optional":true}},{"name":"bidAmount","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"ServiceChild$Data","header":null,"fields":[{"name":"parent","type":{"kind":"simple","type":"address","optional":false}},{"name":"serviceId","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"description","type":{"kind":"simple","type":"string","optional":false}},{"name":"highestBid","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"highestBidder","type":{"kind":"simple","type":"address","optional":true}},{"name":"isFinalized","type":{"kind":"simple","type":"bool","optional":false}}]},
]

const ServiceChild_getters: ABIGetter[] = [
    {"name":"highestBidDetails","arguments":[],"returnType":{"kind":"simple","type":"BidDetails","optional":false}},
    {"name":"serviceInfo","arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
]

export const ServiceChild_getterMapping: { [key: string]: string } = {
    'highestBidDetails': 'getHighestBidDetails',
    'serviceInfo': 'getServiceInfo',
}

const ServiceChild_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"InternalSetDescription"}},
    {"receiver":"internal","message":{"kind":"typed","type":"PlaceBid"}},
    {"receiver":"internal","message":{"kind":"typed","type":"FinalizeBidding"}},
]

export class ServiceChild implements Contract {
    
    static async init(parent: Address, serviceId: bigint) {
        return await ServiceChild_init(parent, serviceId);
    }
    
    static async fromInit(parent: Address, serviceId: bigint) {
        const init = await ServiceChild_init(parent, serviceId);
        const address = contractAddress(0, init);
        return new ServiceChild(address, init);
    }
    
    static fromAddress(address: Address) {
        return new ServiceChild(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  ServiceChild_types,
        getters: ServiceChild_getters,
        receivers: ServiceChild_receivers,
        errors: ServiceChild_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: InternalSetDescription | PlaceBid | FinalizeBidding) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InternalSetDescription') {
            body = beginCell().store(storeInternalSetDescription(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'PlaceBid') {
            body = beginCell().store(storePlaceBid(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'FinalizeBidding') {
            body = beginCell().store(storeFinalizeBidding(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getHighestBidDetails(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('highestBidDetails', builder.build())).stack;
        const result = loadGetterTupleBidDetails(source);
        return result;
    }
    
    async getServiceInfo(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('serviceInfo', builder.build())).stack;
        let result = source.readString();
        return result;
    }
    
}