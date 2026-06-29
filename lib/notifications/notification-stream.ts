type Client = {
  userId: string;
  controller: ReadableStreamDefaultController;
};

const clients = new Set<Client>();

export function addClient(client: Client) {
  clients.add(client);
}

export function removeClient(controller: ReadableStreamDefaultController) {
  for (const c of clients) {
    if (c.controller === controller) {
      clients.delete(c);
      break;
    }
  }
}

export function sendToUser(userId: string, payload: any) {
  const encoder = new TextEncoder();

  for (const client of clients) {
    if (client.userId === userId) {
      client.controller.enqueue(
        encoder.encode(`data: ${JSON.stringify(payload)}\n\n`)
      );
    }
  }
}