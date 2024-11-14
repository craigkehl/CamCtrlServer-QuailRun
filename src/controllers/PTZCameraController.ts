import dgram from 'dgram';
import { Request, Response } from 'express';
import PTZCameraModel from '../models/PTZCameraModel';
import dotenv from 'dotenv';
import os from 'os';

dotenv.config({ path: os.platform() === "win32" ? '.env.windows' : '.env.macos' });

class PTZCameraController {
  private ptzCamera: PTZCameraModel;
  private cameraPort: number;
  private cameraAddress: string;
  private sequenceNumber: number;

  constructor(cameraPort: number, cameraAddress: string) {
    this.ptzCamera = new PTZCameraModel();
    this.cameraPort = cameraPort;
    this.cameraAddress = cameraAddress;
    this.sequenceNumber = 0;
  }
  
  public recallPresetId = (req: Request, res: Response): void => {
    const { presetId } = req.params;
    const data = this.ptzCamera.presetGet(parseInt(presetId));

    const udpClient = dgram.createSocket('udp4');
    this.sequenceNumber++;
    const payload = Buffer.from(data);
    const payloadLength = payload.length;

    const header = Buffer.alloc(8);
    header.writeUInt8(0x01, 0); // Payload type Byte 1
    header.writeUInt8(0x01, 1); // Payload type Byte 2
    header.writeUInt16BE(payloadLength, 2); // Payload length (Bytes 2-3)
    header.writeUInt32BE(this.sequenceNumber, 4); // Sequence number (Bytes 4-7)

    const message = Buffer.concat([header, payload]);
    console.log('Message Buffer:', message);
    console.log('Message Hex:', message.toString('hex'));

    udpClient.send(message, this.cameraPort, this.cameraAddress, (error) => {
      if (error) {
        console.error('Error sending command:', error);
        res.status(500).send('Error sending command');
      } else {
        console.log(`Preset ${presetId} has been called and set`);
        res.status(200).json({
          Message: `Preset ${presetId} has been called and set`,
        });
      }
      udpClient.close();
    });
  };
  
  public setPresetId = (req: Request, res: Response): void => {
    const presetId = req.body.presetId;
    const data = this.ptzCamera.presetSet(parseInt(presetId));

    const udpClient = dgram.createSocket('udp4');
    this.sequenceNumber++;
    const payload = Buffer.from(data);
    const payloadLength = payload.length;

    const header = Buffer.alloc(8);
    header.writeUInt8(0x01, 0); // Payload type Byte 1
    header.writeUInt8(0x01, 1); // Payload type Byte 2
    header.writeUInt16BE(payloadLength, 2); // Payload length (Bytes 2-3)
    header.writeUInt32BE(this.sequenceNumber, 4); // Sequence number (Bytes 4-7)

    const message = Buffer.concat([header, payload]);
    console.log('Message Buffer:', message);
    console.log('Message Hex:', message.toString('hex'));

    udpClient.send(message, this.cameraPort, this.cameraAddress, (error) => {
      if (error) {
        console.error('Error sending command:', error);
        res.status(500).send('Error sending command');
      } else {
        console.log(`Preset ${presetId} has been stored`);
        res.status(201).json({
          Message: `Preset ${presetId} has been stored`,
        });
      }
      udpClient.close();
    });
  };
  
  public zoom = (req: Request, res: Response): void => {
    const { speed } = req.params;
    const data = this.ptzCamera.zoom(parseInt(speed));

    const udpClient = dgram.createSocket('udp4');
    this.sequenceNumber++;
    const payload = Buffer.from(data);
    const payloadLength = payload.length;

    const header = Buffer.alloc(8);
    header.writeUInt8(0x01, 0); // Payload type Byte 1
    header.writeUInt8(0x01, 1); // Payload type Byte 2
    header.writeUInt16BE(payloadLength, 2); // Payload length (Bytes 2-3)
    header.writeUInt32BE(this.sequenceNumber, 4); // Sequence number (Bytes 4-7)

    const message = Buffer.concat([header, payload]);
    console.log('Message Buffer:', message);
    console.log('Message Hex:', message.toString('hex'));

    udpClient.send(message, this.cameraPort, this.cameraAddress, (error) => {
      if (error) {
        console.error('Error sending command:', error);
        res.status(500).send('Error sending command');
      } else {
        console.log(`Zoom ${speed} has been called and set`);
        res.status(200).json({
          Message: `Zoom ${speed} has been called and set`,
        });
      }
      udpClient.close();
    });
  };
  
  public moveVarSpeed = (req: Request, res: Response): void => {
    const { pan, tilt } = req.query;
    const data = this.ptzCamera.moveVarSpeed(
      parseInt(pan as string),
      parseInt(tilt as string)
    );

    const udpClient = dgram.createSocket('udp4');
    this.sequenceNumber++;
    const payload = Buffer.from(data);
    const payloadLength = payload.length;

    const header = Buffer.alloc(8);
    header.writeUInt8(0x01, 0); // Payload type Byte 1
    header.writeUInt8(0x01, 1); // Payload type Byte 2
    header.writeUInt16BE(payloadLength, 2); // Payload length (Bytes 2-3)
    header.writeUInt32BE(this.sequenceNumber, 4); // Sequence number (Bytes 4-7)

    const message = Buffer.concat([header, payload]);
    console.log('Message Buffer:', message);
    console.log('Message Hex:', message.toString('hex'));

    udpClient.send(message, this.cameraPort, this.cameraAddress, (error) => {
      if (error) {
        console.error('Error sending command:', error);
        res.status(500).send('Error sending command');
      } else {
        console.log(
          `The pan and tilt speeds of: ${pan} and ${tilt} have been called and set`
        );
        res.status(200).json({
          Message: `The pan and tilt speeds of: ${pan} and ${tilt} have been called and set`,
        });
      }
      udpClient.close();
    });    
  };

  // public openMenu = async (req: Request, res: Response): Promise<void> => {
  //   try {
  //     const result = await this.ptzCamera.openMenu()

  //   }
  // }
}

export default PTZCameraController;