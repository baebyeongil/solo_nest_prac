import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  private clients: Set<WebSocket> = new Set();

  handleConnection(client: WebSocket, ...args: any[]) {
    this.clients.add(client);
  }

  handleDisconnect(client: WebSocket, ...args: any[]) {
    this.clients.delete(client);
  }

  // 클라이언트로 메시지를 보내는 메서드
  private sendToClient(client: WebSocket, data: object) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  }

  // 모든 클라이언트에게 메시지를 브로드캐스트하는 메서드
  private broadcastMessage(data: object) {
    this.clients.forEach((client) => {
      this.sendToClient(client, data);
    });
  }

  @SubscribeMessage('mainRoom')
  onMainRoomEvent(client: WebSocket, data: string) {
    // 클라이언트가 보낸 데이터를 그대로 다시 클라이언트로 보내기
    this.broadcastMessage({ event: 'mainRoom', data });
  }

  @SubscribeMessage('mainChat')
  onMainChatEvent(client: WebSocket, data: string) {
    // 클라이언트가 보낸 데이터를 그대로 다시 클라이언트로 보내기
    this.broadcastMessage({ event: 'mainChat', data });
  }
}
