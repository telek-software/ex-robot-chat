import { TypeOrmModuleOptions } from '@nestjs/typeorm';

/**
 * getKafkaConfig
 * @description
 * Kafka config
 *
 */
export function getKafkaConfig(env: Record<string, string>) {
  return <const>{
    BROKERS: {
      FIRST: `${env.KAFKA_1_HOST}:${env.KAFKA_1_PORT}`,
      SECOND: `${env.KAFKA_2_HOST}:${env.KAFKA_2_PORT}`,
      THIRD: `${env.KAFKA_3_HOST}:${env.KAFKA_3_PORT}`,
    },
    TOPICS: {
      GET_ALL_CHAT: env.KAFKA_TOPIC_GET_ALL_CHAT,
      GET_ANSWER: env.KAFKA_TOPIC_GET_ANSWER,
      GET_CHAT: env.KAFKA_TOPIC_GET_CHAT,
      GET_DIALOGUE: env.KAFKA_TOPIC_GET_DIALOGUE,
      GET_MESSAGE: env.KAFKA_TOPIC_GET_MESSAGE,
      NOTIFY_EMBEDDED: env.KAFKA_TOPIC_NOTIFY_EMBEDDED,
      POST_ANSWER: env.KAFKA_TOPIC_POST_ANSWER,
      POST_CHAT: env.KAFKA_TOPIC_POST_CHAT,
      POST_DOCUMENT: env.KAFKA_TOPIC_POST_DOCUMENT,
      POST_MESSAGE: env.KAFKA_TOPIC_POST_MESSAGE,
    },
  };
}

/**
 * getMongoConfig
 * @description
 * MongoDB Config to connect to a mongo database
 *
 */
export function getMongoConfig(env: Record<string, string>) {
  return {
    uri: `mongodb://${env.MONGO_USER}:${env.MONGO_PASS}@${env.MONGO_HOST}:${env.MONGO_PORT}/${env.MONGO_INITDB_DATABASE}`,
  };
}

/**
 * getGraphqlConfig
 * @description
 * GraphQL config to communicate with external web applications
 */
export function getGraphqlConfig() {
  return <const>{
    SUBSCRIPTIIONS: {
      NOTIFY_ANSWER: 'notifyAnswer',
      NOTIFY_EMBEDDED: 'notifyEmbedded',
    },
  };
}

/**
 * getTypeormConfig
 * @description
 * TypeoORM config to connect to a mysql/postgres database
 */
export function getTypeormConfig(
  env: Record<string, string>,
): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: env.POSTGRES_HOST || 'localhost',
    port: parseInt(env.POSTGRES_PORT, 10) || 3306,
    username: env.POSTGRES_USER || 'root',
    password: env.POSTGRES_PASSWORD || 'root',
    database: env.POSTGRES_DB || 'test',
    entities: [process.cwd() + '/**/*.entity.js'],
    synchronize: env.NODE_ENV === 'development',
  };
}

export const exempleMessage = {
  message: {
    text: 'hi',
    context: `You are an AI assistant for answering questions about the below context.
        You are given the following extracted parts of a long document and a question. Provide a conversational answer.
        If you don't know the answer, just say "Hmm, I'm not sure." Don't try to make up an answer.
        If the question is not about the context, politely inform them that you are tuned to only 
        answer questions about the context.`,
    template: 'Question: {question}\n=========\n{context}\n=========\nAnswer:',
    settings: {
      llm: {
        model: {
          api: 'OpenAI', // LLM to use for chat.
          model_type: 'chat', // Model type.
          model_name: 'gpt-3.5-turbo-16k-0613', // Model to use.
          max_tokens_limit: 2000,
        },
        max_tokens: 2000, // The maximum number of tokens to generate in the completion.
        temperature: 0.0, // What sampling temperature to use.
        top_p: 1.0, // Total probability mass of tokens to consider at each step.
        frequency_penalty: 0, // Penalizes repeated tokens according to frequency.
        presence_penalty: 0, // Penalizes repeated tokens.
        n: 1, // How many completions to generate for each prompt.
        best_of: 1, // Generates best_of completions server-side and returns the "best".
      },
      memory: {
        type: 'ConversationSummaryBufferMemory', // Memory type to use.
        max_token_limit: 2000, // The maximum number of tokens to generate in the completion.
        key: 'history', // Memory key that match the
        length: 5,
      },
      retriever: {
        api: 'Chroma',
        search: {
          type: 'similarity', // Retrieval search type
          k: 4, // Amount of documents to return
        },
      },
      embeddings: {
        api: 'OpenAI', // LLM to use for embeddings
        model: 'text-embedding-ada-002', // Embedding model
      },
    },
  },

  user_id: 3,
  chat_uuid: '64ea5a1770825d2181df22a4',
};
