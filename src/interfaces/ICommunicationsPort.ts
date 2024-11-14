export interface ICommunicationsPort {
  baudRate: number;
  dataBits: 8 | 7 | 6 | 5 | undefined;
  parity: "none" | "even" | "mark" | "odd" | "space" | undefined;
  stopBits: 1 | 2 | undefined;
}