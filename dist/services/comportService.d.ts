/// <reference types="node" />
import { IPort } from '../interfaces/IPort';
export declare class ComportService implements IPort {
    private port;
    constructor();
    connect(): void;
    disconnect(): void;
    on(event: string, callback: (data: any) => void): void;
    write(data: Buffer | number[] | string, callback: (error: Error | null | undefined, bytesWritten: number) => void): void;
}
