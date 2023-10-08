import { Pinecone } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
let pinecone: Pinecone | null = null;

export const getPineconeClient = async () => {
  if (!pinecone) {
    pinecone = new Pinecone({
      environment: process.env.PINECONE_ENVIRONMENT!,
      apiKey: process.env.PINECONE_API_KEY!,
    });
    await pinecone.listIndexes();
  }
};

export async function loadS3IntoPincone(fileKey: string) {
  const file_name = await downloadFromS3(fileKey);

  if (!file_name) {
    throw new Error("could not find name");
  }

  const loader = new PDFLoader(file_name);
  const pages = await loader.load();
  return pages;
}
