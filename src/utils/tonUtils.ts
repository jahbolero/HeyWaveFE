import { TonClient } from '@ton/ton';
import { Cell } from '@ton/core';

export async function retry<T>(fn: () => Promise<T>, options: { retries: number, delay: number }): Promise<T> {
  let lastError: Error | undefined;
  for (let i = 0; i < options.retries; i++) {
    try {
      return await fn();
    } catch (e) {
      lastError = e instanceof Error ? e : new Error('Unknown error');
      await new Promise(resolve => setTimeout(resolve, options.delay));
    }
  }
  throw lastError;
}

interface TonApiTransaction {
  hash: string;
  lt: string;
  success: boolean;
  out_msgs: Array<{
    msg_type: string;
    raw_body: string;
  }>;
  in_msg?: {
    decoded_body?: {
      value?: {
        body?: {
          op_code: number;
        };
      };
    };
  };
}

export async function getTransactionDetails(txHash: string): Promise<TonApiTransaction> {
  return retry(
    async () => {
      const response = await fetch(`https://tonapi.io/v2/blockchain/transactions/${txHash}`);
      if (!response.ok) {
        throw new Error('Transaction not found yet');
      }
      return response.json();
    },
    { 
      retries: 10,  // Try 10 times
      delay: 2000   // Wait 2 seconds between attempts
    }
  );
}

export async function getServiceResponse(transaction: TonApiTransaction): Promise<bigint | null> {
  if (!transaction.success) {
    throw new Error('Transaction failed');
  }

  // Check if this is a contract message (not a wallet message)
  if (transaction.in_msg?.decoded_op_name === "wallet_signed_external_v5_r1") {
    // This is just the wallet transaction, we need to wait for the next one
    throw new Error('Waiting for contract response');
  }

  // Look for NewServiceResponse in out_msgs
  for (const msg of transaction.out_msgs) {
    if (!msg?.raw_body) continue;

    try {
      const slice = Cell.fromBase64(msg.raw_body).beginParse();
      const op = slice.loadUint(32);
      
      if (op === 3347443311) { // NewServiceResponse opcode
        return slice.loadUintBig(256);
      }
    } catch (e) {
      console.error('Error parsing message:', e);
    }
  }

  throw new Error('Service response not found');
} 