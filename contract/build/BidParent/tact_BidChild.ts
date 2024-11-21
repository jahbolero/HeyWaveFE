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

export type NewBid = {
    $$type: 'NewBid';
    task: string;
}

export function storeNewBid(src: NewBid) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2510749587, 32);
        b_0.storeStringRefTail(src.task);
    };
}

export function loadNewBid(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2510749587) { throw Error('Invalid prefix'); }
    let _task = sc_0.loadStringRefTail();
    return { $$type: 'NewBid' as const, task: _task };
}

function loadTupleNewBid(source: TupleReader) {
    let _task = source.readString();
    return { $$type: 'NewBid' as const, task: _task };
}

function loadGetterTupleNewBid(source: TupleReader) {
    let _task = source.readString();
    return { $$type: 'NewBid' as const, task: _task };
}

function storeTupleNewBid(source: NewBid) {
    let builder = new TupleBuilder();
    builder.writeString(source.task);
    return builder.build();
}

function dictValueParserNewBid(): DictionaryValue<NewBid> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNewBid(src)).endCell());
        },
        parse: (src) => {
            return loadNewBid(src.loadRef().beginParse());
        }
    }
}

export type NewBidResponse = {
    $$type: 'NewBidResponse';
    seqno: bigint;
}

export function storeNewBidResponse(src: NewBidResponse) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2275584747, 32);
        b_0.storeUint(src.seqno, 256);
    };
}

export function loadNewBidResponse(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2275584747) { throw Error('Invalid prefix'); }
    let _seqno = sc_0.loadUintBig(256);
    return { $$type: 'NewBidResponse' as const, seqno: _seqno };
}

function loadTupleNewBidResponse(source: TupleReader) {
    let _seqno = source.readBigNumber();
    return { $$type: 'NewBidResponse' as const, seqno: _seqno };
}

function loadGetterTupleNewBidResponse(source: TupleReader) {
    let _seqno = source.readBigNumber();
    return { $$type: 'NewBidResponse' as const, seqno: _seqno };
}

function storeTupleNewBidResponse(source: NewBidResponse) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.seqno);
    return builder.build();
}

function dictValueParserNewBidResponse(): DictionaryValue<NewBidResponse> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNewBidResponse(src)).endCell());
        },
        parse: (src) => {
            return loadNewBidResponse(src.loadRef().beginParse());
        }
    }
}

export type CompleteBid = {
    $$type: 'CompleteBid';
    seqno: bigint;
}

export function storeCompleteBid(src: CompleteBid) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3415920434, 32);
        b_0.storeUint(src.seqno, 256);
    };
}

export function loadCompleteBid(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3415920434) { throw Error('Invalid prefix'); }
    let _seqno = sc_0.loadUintBig(256);
    return { $$type: 'CompleteBid' as const, seqno: _seqno };
}

function loadTupleCompleteBid(source: TupleReader) {
    let _seqno = source.readBigNumber();
    return { $$type: 'CompleteBid' as const, seqno: _seqno };
}

function loadGetterTupleCompleteBid(source: TupleReader) {
    let _seqno = source.readBigNumber();
    return { $$type: 'CompleteBid' as const, seqno: _seqno };
}

function storeTupleCompleteBid(source: CompleteBid) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.seqno);
    return builder.build();
}

function dictValueParserCompleteBid(): DictionaryValue<CompleteBid> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCompleteBid(src)).endCell());
        },
        parse: (src) => {
            return loadCompleteBid(src.loadRef().beginParse());
        }
    }
}

export type BidParent$Data = {
    $$type: 'BidParent$Data';
    owner: Address;
    numBids: bigint;
}

export function storeBidParent$Data(src: BidParent$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeUint(src.numBids, 256);
    };
}

export function loadBidParent$Data(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _numBids = sc_0.loadUintBig(256);
    return { $$type: 'BidParent$Data' as const, owner: _owner, numBids: _numBids };
}

function loadTupleBidParent$Data(source: TupleReader) {
    let _owner = source.readAddress();
    let _numBids = source.readBigNumber();
    return { $$type: 'BidParent$Data' as const, owner: _owner, numBids: _numBids };
}

function loadGetterTupleBidParent$Data(source: TupleReader) {
    let _owner = source.readAddress();
    let _numBids = source.readBigNumber();
    return { $$type: 'BidParent$Data' as const, owner: _owner, numBids: _numBids };
}

function storeTupleBidParent$Data(source: BidParent$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeNumber(source.numBids);
    return builder.build();
}

function dictValueParserBidParent$Data(): DictionaryValue<BidParent$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBidParent$Data(src)).endCell());
        },
        parse: (src) => {
            return loadBidParent$Data(src.loadRef().beginParse());
        }
    }
}

export type InternalSetTask = {
    $$type: 'InternalSetTask';
    task: string;
}

export function storeInternalSetTask(src: InternalSetTask) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3152733790, 32);
        b_0.storeStringRefTail(src.task);
    };
}

export function loadInternalSetTask(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3152733790) { throw Error('Invalid prefix'); }
    let _task = sc_0.loadStringRefTail();
    return { $$type: 'InternalSetTask' as const, task: _task };
}

function loadTupleInternalSetTask(source: TupleReader) {
    let _task = source.readString();
    return { $$type: 'InternalSetTask' as const, task: _task };
}

function loadGetterTupleInternalSetTask(source: TupleReader) {
    let _task = source.readString();
    return { $$type: 'InternalSetTask' as const, task: _task };
}

function storeTupleInternalSetTask(source: InternalSetTask) {
    let builder = new TupleBuilder();
    builder.writeString(source.task);
    return builder.build();
}

function dictValueParserInternalSetTask(): DictionaryValue<InternalSetTask> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInternalSetTask(src)).endCell());
        },
        parse: (src) => {
            return loadInternalSetTask(src.loadRef().beginParse());
        }
    }
}

export type InternalComplete = {
    $$type: 'InternalComplete';
    excess: Address;
}

export function storeInternalComplete(src: InternalComplete) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3472919628, 32);
        b_0.storeAddress(src.excess);
    };
}

export function loadInternalComplete(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3472919628) { throw Error('Invalid prefix'); }
    let _excess = sc_0.loadAddress();
    return { $$type: 'InternalComplete' as const, excess: _excess };
}

function loadTupleInternalComplete(source: TupleReader) {
    let _excess = source.readAddress();
    return { $$type: 'InternalComplete' as const, excess: _excess };
}

function loadGetterTupleInternalComplete(source: TupleReader) {
    let _excess = source.readAddress();
    return { $$type: 'InternalComplete' as const, excess: _excess };
}

function storeTupleInternalComplete(source: InternalComplete) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.excess);
    return builder.build();
}

function dictValueParserInternalComplete(): DictionaryValue<InternalComplete> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInternalComplete(src)).endCell());
        },
        parse: (src) => {
            return loadInternalComplete(src.loadRef().beginParse());
        }
    }
}

export type BidDetails = {
    $$type: 'BidDetails';
    task: string;
    completed: boolean;
}

export function storeBidDetails(src: BidDetails) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.task);
        b_0.storeBit(src.completed);
    };
}

export function loadBidDetails(slice: Slice) {
    let sc_0 = slice;
    let _task = sc_0.loadStringRefTail();
    let _completed = sc_0.loadBit();
    return { $$type: 'BidDetails' as const, task: _task, completed: _completed };
}

function loadTupleBidDetails(source: TupleReader) {
    let _task = source.readString();
    let _completed = source.readBoolean();
    return { $$type: 'BidDetails' as const, task: _task, completed: _completed };
}

function loadGetterTupleBidDetails(source: TupleReader) {
    let _task = source.readString();
    let _completed = source.readBoolean();
    return { $$type: 'BidDetails' as const, task: _task, completed: _completed };
}

function storeTupleBidDetails(source: BidDetails) {
    let builder = new TupleBuilder();
    builder.writeString(source.task);
    builder.writeBoolean(source.completed);
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

export type BidChild$Data = {
    $$type: 'BidChild$Data';
    parent: Address;
    seqno: bigint;
    task: string;
    completed: boolean;
}

export function storeBidChild$Data(src: BidChild$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.parent);
        b_0.storeUint(src.seqno, 256);
        b_0.storeStringRefTail(src.task);
        b_0.storeBit(src.completed);
    };
}

export function loadBidChild$Data(slice: Slice) {
    let sc_0 = slice;
    let _parent = sc_0.loadAddress();
    let _seqno = sc_0.loadUintBig(256);
    let _task = sc_0.loadStringRefTail();
    let _completed = sc_0.loadBit();
    return { $$type: 'BidChild$Data' as const, parent: _parent, seqno: _seqno, task: _task, completed: _completed };
}

function loadTupleBidChild$Data(source: TupleReader) {
    let _parent = source.readAddress();
    let _seqno = source.readBigNumber();
    let _task = source.readString();
    let _completed = source.readBoolean();
    return { $$type: 'BidChild$Data' as const, parent: _parent, seqno: _seqno, task: _task, completed: _completed };
}

function loadGetterTupleBidChild$Data(source: TupleReader) {
    let _parent = source.readAddress();
    let _seqno = source.readBigNumber();
    let _task = source.readString();
    let _completed = source.readBoolean();
    return { $$type: 'BidChild$Data' as const, parent: _parent, seqno: _seqno, task: _task, completed: _completed };
}

function storeTupleBidChild$Data(source: BidChild$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.parent);
    builder.writeNumber(source.seqno);
    builder.writeString(source.task);
    builder.writeBoolean(source.completed);
    return builder.build();
}

function dictValueParserBidChild$Data(): DictionaryValue<BidChild$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBidChild$Data(src)).endCell());
        },
        parse: (src) => {
            return loadBidChild$Data(src.loadRef().beginParse());
        }
    }
}

 type BidChild_init_args = {
    $$type: 'BidChild_init_args';
    parent: Address;
    seqno: bigint;
}

function initBidChild_init_args(src: BidChild_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.parent);
        b_0.storeInt(src.seqno, 257);
    };
}

async function BidChild_init(parent: Address, seqno: bigint) {
    const __code = Cell.fromBase64('te6ccgECDQEAAnIAART/APSkE/S88sgLAQIBYgIDAu7QAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVE9s88uCCyPhDAcx/AcoAVTBQQyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsv/yFADzxbJWMzKAMntVAoEAgJ2CAkBkAGSMH/gcCHXScIflTAg1wsf3iCCELvq5l66jiAw0x8BghC76uZeuvLggdQB0DEyggDUhPhCUlDHBfL0f+CCEM8AjEy64wIwcAUBlNMfAYIQzwCMTLry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMTGCANSE+EJSUMcF8vR/AXCBAIJ/VSBtbW3bPDB/BgHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wgHAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMABGwr7tRNDSAAGACEbAats82zxsQoAoLAd7tRNDUAfhj0gABjiz6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdP/1AHQAdIAVTBsFOD4KNcLCoMJuvLgifpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wBZAtEB2zwMAAJcAAaLCHA=');
    const __system = Cell.fromBase64('te6cckECDwEAAnwAAQHAAQEFofhbAgEU/wD0pBP0vPLICwMCAWIECQLu0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRPbPPLggsj4QwHMfwHKAFUwUEMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbL/8hQA88WyVjMygDJ7VQMBQGQAZIwf+BwIddJwh+VMCDXCx/eIIIQu+rmXrqOIDDTHwGCELvq5l668uCB1AHQMTKCANSE+EJSUMcF8vR/4IIQzwCMTLrjAjBwBgGU0x8BghDPAIxMuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgxMYIA1IT4QlJQxwXy9H8BcIEAgn9VIG1tbds8MH8HAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7CAgAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwCAnYKCwARsK+7UTQ0gABgAhGwGrbPNs8bEKAMDgHe7UTQ1AH4Y9IAAY4s+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHT/9QB0AHSAFUwbBTg+CjXCwqDCbry4In6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAWQLRAds8DQAGiwhwAAJczInjxA==');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initBidChild_init_args({ $$type: 'BidChild_init_args', parent, seqno })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const BidChild_errors: { [key: number]: { message: string } } = {
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
    29259: { message: `Bid does not exist` },
    54404: { message: `Parent only` },
}

const BidChild_types: ABIType[] = [
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
    {"name":"NewBid","header":2510749587,"fields":[{"name":"task","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"NewBidResponse","header":2275584747,"fields":[{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"CompleteBid","header":3415920434,"fields":[{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"BidParent$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"numBids","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"InternalSetTask","header":3152733790,"fields":[{"name":"task","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"InternalComplete","header":3472919628,"fields":[{"name":"excess","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"BidDetails","header":null,"fields":[{"name":"task","type":{"kind":"simple","type":"string","optional":false}},{"name":"completed","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"BidChild$Data","header":null,"fields":[{"name":"parent","type":{"kind":"simple","type":"address","optional":false}},{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"task","type":{"kind":"simple","type":"string","optional":false}},{"name":"completed","type":{"kind":"simple","type":"bool","optional":false}}]},
]

const BidChild_getters: ABIGetter[] = [
    {"name":"details","arguments":[],"returnType":{"kind":"simple","type":"BidDetails","optional":false}},
]

export const BidChild_getterMapping: { [key: string]: string } = {
    'details': 'getDetails',
}

const BidChild_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"InternalSetTask"}},
    {"receiver":"internal","message":{"kind":"typed","type":"InternalComplete"}},
]

export class BidChild implements Contract {
    
    static async init(parent: Address, seqno: bigint) {
        return await BidChild_init(parent, seqno);
    }
    
    static async fromInit(parent: Address, seqno: bigint) {
        const init = await BidChild_init(parent, seqno);
        const address = contractAddress(0, init);
        return new BidChild(address, init);
    }
    
    static fromAddress(address: Address) {
        return new BidChild(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  BidChild_types,
        getters: BidChild_getters,
        receivers: BidChild_receivers,
        errors: BidChild_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: InternalSetTask | InternalComplete) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InternalSetTask') {
            body = beginCell().store(storeInternalSetTask(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InternalComplete') {
            body = beginCell().store(storeInternalComplete(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getDetails(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('details', builder.build())).stack;
        const result = loadGetterTupleBidDetails(source);
        return result;
    }
    
}