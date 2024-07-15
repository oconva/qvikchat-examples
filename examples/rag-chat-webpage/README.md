# RAG Chat Webpage

This project demonstrates how you can easily build a chatbot that answers questions using data from a webpage.

This example illustrates below key points:

- Building a RAG-enabled chat endpoint with QvikChat.
- Using a custom data loader from LangChain to load data for the RAG chat endpoint.
- Building a chatbot that answers questions using data from a webpage.

## Getting Started

To get started with this example, you need to have Node.js installed on your machine. You can download and install Node.js from [here](https://nodejs.org/).

### Prerequisites

Begin by cloning the QvikChat Examples repository:

```bash
git clone https://github.com/oconva/qvikchat-examples.git
```

Navigate to the `rag-chat-webpage` directory:

```bash
cd qvikchat-examples/examples/rag-chat-webpage
```

### Install Dependencies

Install the project dependencies using npm or pnpm:

```bash
npm install
```

Or

```bash
pnpm install
```

Since, we are loading data from a web page, we will also need to install a tool that will help us download the data from the webpage.

QvikChat by default doesn't provide a data loader for web pages. So, in this example, we are going to a custom web loader from LangChain to load data from a webpage.

In this example, we're going to use the [Cheerio](https://js.langchain.com/v0.2/docs/integrations/document_loaders/web_loaders/web_cheerio) web loader. Cheerio is a fast and lightweight library that can help you extract data from web pages, without the need for a full browser environment.

<blockquote>
  <strong>Note:</strong> Cheerio is not a browser, it doesn't execute JavaScript. It is a library that parses markup and provides an API for traversing/manipulating the resulting data structure. If the web page you are trying to extract data from uses JavaScript, you can check LangChain web loaders like [Puppeteer](https://js.langchain.com/v0.2/docs/integrations/document_loaders/web_loaders/web_puppeteer) or [Playwright](https://js.langchain.com/v0.2/docs/integrations/document_loaders/web_loaders/web_playwright).
</blockquote>

To install Cheerio, you can run the following command:

```bash
npm install cheerio
```

Or

```bash
pnpm add cheerio
```

### Setup Environment Variables

By default, QvikChat uses Google's Gemini API for text generation and embedding models. If you don't yet have a Google Gen AI API key, you can get one from [Gemini API - Get an API Key](https://ai.google.dev/gemini-api/docs/api-key).

You can also use OpenAI API instead of Gemini API. You'll have to provide your OpenAI API key as the `OPENAI_API_KEY` environment variable and configure your chat endpoints to use the LLM model you want it to use.

QvikChat being built on top of Firebase Genkit, allows you to easily add Genkit plugins. You can easily use any LLM model available through any Genkit plugin by simply configuring that plugin when setting up Genkit.

To learn more about configuring chat endpoints to use a specific LLM model, check [here](/chat-endpoints/chat-endpoint-configurations#chat-agent-config).

If using the default Gemini API models or OpenAI models, there should be a `.env` file at the root level of your project directory, and it should have a value for at least one of the following, depending on which API you want to use:

```bash
GOOGLE_GENAI_API_KEY=
OPENAI_API_KEY=
```

Alternatively, you can copy the `.env.tmp` file or rename it to `.env` and fill in the values.

### Defining Chat Endpoint

The chat endpoint is defined in the `src/index.ts` file.

To configure our RAG chat endpoint, we will need:

- `endpoint` where queries can be sent
- `retriever` or `retrieverConfig`: Either an instance of a data retriever that can be used to retrieve context information (from processed data of the webpage) or we can provide the configurations for the data retriever directly to the endpoint and the endpoint will create the data retriever instance for us.

We are going to:

- Use the `Cheerio` web loader to load data from a webpage. For our example, we are going to use the [RAG Guide](https://qvikchat.pkural.ca/rag-guide) webpage from the QvikChat documentation.
- Provide `retrieverConfig` when defining our RAG-enabled chat endpoint, and provide the data loaded previously as `docs`.

```typescript
// configure and instantiate data loader
const loader = new CheerioWebBaseLoader("https://qvikchat.pkural.ca/rag-guide");

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
```

For more information on defining RAG chat endpoints, check [RAG Chat Endpoints](https://qvikchat.pkural.ca/chat-endpoints/rag-chat).

As always, we setup Genkit before defining the chat endpoint and run the server after defining the chat endpoint.

### Running the Project

You can run the following commands to get started:

```bash
npm run dev # or pnpm dev
```

The `dev` script is set in `package.json` to run `build` and then `start` the server. When using the default configurations, the server will start on `http://localhost:3400`.

Once, you run the project, you can test the endpoint defined in `src/index.ts` from terminal using command below:

```bash
curl -X POST "http://127.0.0.1:3400/chat" -H "Content-Type: application/json"  -d '{"data": { "query": "What does the getDataRetriever function do?" } }'
```

Above example points to `http://127.0.0.1:3400`. You can change this port and host depending on where you are running the server and on which port.

An example of the response you receive is given below:

```bash
rag-chat-webpage % curl -X POST "http://127.0.0.1:3400/chat" -H "Content-Type: application/json"  -d '{"data": { "query": "What does the getDataRetriever function do?" } }'

{"result":"The `getDataRetriever` function performs the following steps:\n\n1. **Loads the data** from the specified file path.\n2. **Splits the data into chunks** based on the specified chunking strategy. If no chunking strategy is specified, it tries to use an appropriate default strategy based on the data type.\n3. **Encodes the data chunks into embeddings** using the specified embedding model. If no embedding model is specified, it uses a default model.\n4. **Stores the embeddings in a vector store**. If no vector store is specified, it uses an in-memory vector store. (Note: using an in-memory vector store is not recommended for production. You can easily switch to a persistent vector store like Faiss or ChromaDB by providing an instance of that vector store in configurations.)\n5. **Creates and returns a retriever instance** that can be used to retrieve context information from the vector store. \n"}%
```

You could also use the [Genkit Developer UI](#genkit-developer-ui) to test the endpoints.

### Genkit Developer UI

You can run the Genkit developer UI to test the endpoints. Testing the endpoints using a graphical interface is probably the easiest way to get started. You can know more about the Genkit Developer UI [here](https://firebase.google.com/docs/genkit/devtools#genkit_developer_ui).

Start the Genkit developer UI:

```bash copy
npx genkit start
```

OR, you can install the Genkit CLI globally:

```bash copy
npm i -g genkit
```

Then start the Genkit developer UI:

```bash copy
genkit start
```

You should be able to see the defined `chat` endpoint under the **Flows** section in the left sidebar. Simply click on the endpoint and enter the query you want to test with. Clicking the **Run** button will send the query to the endpoint and the response generation process will start.

## QvikChat

**QvikChat** is a [Firebase Genkit](https://github.com/firebase/genkit) and [LangChain](https://js.langchain.com/v0.2/docs/introduction/) based framework that provides you with a solid foundation to build powerful AI-powered chat service endpoints quickly and efficiently. It includes support for **multiple types of conversations (open-ended, close-ended)**, **chat history**, **response caching**, **authentication**, and **information retrieval using Retrieval Augmented Generation (RAG).**

[Get Started](https://qvikchat.pkural.ca/getting-started) | [Documentation](https://qvikchat.pkural.ca)

## QvikChat Starter Template

This project was scaffolded using the [QvikChat starter template](https://github.com/oconva/qvikchat-starter-template). It comes pre-configured with the following features:

- **QvikChat**: QvikChat installed and configured to start serving chat endpoints.
- **TypeScript**: TypeScript to allow you to write type-safe code efficiently.
- **ESLint**: ESLint to enforce code quality and consistency.
- **Prettier**: Prettier to format your code automatically and ensure consistent code style.
- **GitHub Actions**: GitHub Actions to run your tests and lint your code automatically on every push.
- **SWC**: For faster and more efficient TypeScript compilation.
- **PNPM**: PNPM to manage your dependencies efficiently.

### Setup Git

If you plan on using this example as a standalone project, you should initialize a new Git repository:

```bash
git init
git add .
git commit -m "Initial commit"
```

You can copy the `.gitignore` file from the root of the QvikChat Examples repository to your project directory. This will ensure that you don't commit unnecessary files to your repository.

```bash
curl -o .gitignore https://raw.githubusercontent.com/oconva/qvikchat-examples/main/.gitignore
```

## Issues

If you encounter any issues or bugs while using this example project, please report them by following these steps:

1. Check if the issue has already been reported by searching through [current issues](https://github.com/oconva/qvikchat-examples/issues).
2. If the issue hasn't been reported, create a new issue and provide a detailed description of the problem.
3. Include steps to reproduce the issue and any relevant error messages or screenshots.
