# Simple Open-ended Chatbot

This project demonstrates how to build a simple open-ended chatbot using QvikChat. The chatbot can generate responses to any user input using the Google GenAI model.

## Getting Started

An open-ended chat endpoint lets you have unrestricted chat with no restrictions on what topic the queries can be related to, quite similar to OpenAI's ChatGPT or Google's Gemini front-ends.

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

The chat endpoint is defined in the `src/index.ts` file. To configure an open-ended chat endpoint without any additional features, the only thing we need to provide to the `defineChatEndpoint` function is the `endpoint` name. This will be the endpoint at which we will send our queries.

```typescript
// Open-ended chat endpoint
defineChatEndpoint({
  endpoint: "chat-open",
});
```

As always, we setup Genkit before defining the chat endpoint and run the server after defining the chat endpoint.

### Running the Project

You can run the following commands to get started:

```bash
npm install # or pnpm install
npm run dev # or pnpm dev
```

The starter template predefines some chat endpoints. Once, you run the project, you can test the endpoints from terminal using command below:

```bash
curl -X POST "http://127.0.0.1:3400/chat" -H "Content-Type: application/json"  -d '{"data": { "query": "What are some good places to visit in Paris, France?" } }'
```

Above example points to `http://127.0.0.1:3400`. You can change this port and host depending on where you are running the server and on which port.

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