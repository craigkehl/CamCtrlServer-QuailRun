/// <reference types="node" />
import { IPort } from '../interfaces/IPort';
declare class IPPort implements IPort {
    private ip;
    private port;
    private client;
    private sequenceNumber;
    constructor();
    connect(): void;
    disconnect(): void;
    write(data: string | number[] | Buffer, callback: (err: Error | null | undefined, bytesWritten: number) => void): void;
}
export default IPPort;
