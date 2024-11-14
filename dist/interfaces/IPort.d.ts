/// <reference types="node" />
export interface IPort {
    connect(): void;
    disconnect(): void;
    write(data: string | Buffer | number[], callback: (err: Error | null | undefined, bytesWritten: number) => void): void;
}
