import { setupGenkit, runServer } from "@oconva/qvikchat/genkit";
import { defineChatEndpoint } from "@oconva/qvikchat/endpoints";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";

// Setup Genkit
setupGenkit();

// Method to define all endpoints of the project and run the server
const defineEndpointsRunServer = async () => {
  // configure and instantiate data loader
  const loader = new CheerioWebBaseLoader(
    "https://qvikchat.pkural.ca/rag-guide"
  );

  // load data and get docs
  const docs = await loader.load();

  // define RAG chat endpoint with docs
  defineChatEndpoint({
    endpoint: "chat",
    enableRAG: true,
    topic: "QvikChat - RAG chat endpoint",
    retrieverConfig: {
      docs: docs,
      dataType: "text",
      generateEmbeddings: true,
    },
  });

  // Run server
  runServer();
};

// execute method to define endpoints and run server
defineEndpointsRunServer();
