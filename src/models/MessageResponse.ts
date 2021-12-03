export class MessageReponse {
  message:string = "";

  static toMessage(token: string) {
    let message = new MessageReponse();
    message.message = token;
    return message;
  }
}

export class TokenResponse {
  token:string = "";
}
