import { setupGenkit, runServer } from "@oconva/qvikchat/genkit";
import { defineChatEndpoint } from "@oconva/qvikchat/endpoints";

// Setup Genkit
setupGenkit();

// Open-ended chat endpoint
defineChatEndpoint({
  endpoint: "chat",
});

// run the server
runServer();
