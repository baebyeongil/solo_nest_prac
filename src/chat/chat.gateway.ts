import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('mainRoom')
  onMainRoomEvent(client: any, data: any): WsResponse<any> {
    // 클라이언트가 보낸 데이터를 그대로 다시 클라이언트로 보내기
    return { event: 'mainRoom', data };
  }

  @SubscribeMessage('mainChat')
  onMainChatEvent(client: any, data: any): WsResponse<any> {
    // 클라이언트가 보낸 데이터를 그대로 다시 클라이언트로 보내기
    return { event: 'mainChat', data };
  }
}
