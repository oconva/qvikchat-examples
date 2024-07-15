# QvikChat Examples

This repository contains some selected examples on building powerful chat services using [QvikChat](https://qvikchat.pkural.ca/). These examples range from beginner to advanced level and cover a wide range of topics like working with chat history, response caching, RAG, and more.

## Usage

All examples are present in the `examples` directory. Each example is a self-contained project that you can run on your local machine. These examples were built using the [QvikChat Starter Template](https://github.com/oconva/qvikchat-starter-template), hence they come pre-configured with support for TypeScript, ESLint, Prettier, Jest, SWC, and more.

Simply clone this repository and navigate to the example you want to run. Each example folder contains a `README.md` file that contains the step-by-step guide for that example.

Below is a list of currently available examples. If you wish to add a new example, please create a pull request following the guidelines in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## Examples

1. [Building a simple open-ended chatbot in under 5 minutes](/examples/simple-open-ended-chatbot)

    This example will guide you through building a simple open-ended chatbot using QvikChat. The chatbot will be able to return an LLM generated response to any user input. Good example for getting started with QvikChat.

    Keywords: open ended chat, getting started, beginner

    QvikChat version: 1.0.7

2. [Build chatbot for any webpage in under 5 minutes](/examples/rag-chat-webpage)

    Learn how to quickly build a reliable and accurate chatbot that can answer questions using data from a webpage. This example also demonstrates how to use data loaders available in LangChain to load data and use it in building a RAG-enabled chat endpoint with QvikChat.

    Keywords: webpage chatbot, data loading, langchain, intermediate

    QvikChat version: 1.0.9 

3. [Build a Chatbot on Your Own Data in under 10 minutes with History, Cache, and RAG](/examples/chatbot-on-your-own-data)

    This example will guide you through building a chatbot that can answer questions on your data, with support for continuing conversations using **chat history** and **caching responses** to frequent queries, all in under ten minutes!

    Keywords: RAG, chat history, response caching, intermediate

    QvikChat version: 1.0.7

## QvikChat

**QvikChat** is a [Firebase Genkit](https://github.com/firebase/genkit) and [LangChain](https://js.langchain.com/v0.2/docs/introduction/) based framework that provides you with a solid foundation to build powerful AI-powered chat service endpoints quickly and efficiently. It includes support for **multiple types of conversations (open-ended, close-ended)**, **chat history**, **response caching**, **authentication**, and **information retrieval using Retrieval Augmented Generation (RAG).**

[Get Started](https://qvikchat.pkural.ca/getting-started) | [Documentation](https://qvikchat.pkural.ca)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Oconva

QvikChat is a project by [Oconva](https://github.com/oconva). Oconva is an initiative to make conversational AI more open and accessible to all. Oconva's vision is to create a future where any developer, regardless of their available resources, can empower their apps with the power of conversational AI. Whether it's adding an AI assistant to their app or integrating a translation service, Oconva aims to provide developers with open-source tools and frameworks to support them on this journey.
