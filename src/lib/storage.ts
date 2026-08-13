import fs from "fs/promises";
import path from "path";
import { PortfolioData, IDENTITY, INTRO, PHILOSOPHY, SKILLS, PROJECTS, EDUCATION } from "./data";

export type { PortfolioData } from "./data";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
  read: boolean;
}

const PORTFOLIO_FILE_PATH = path.join(process.cwd(), "src", "data", "portfolio.json");
const MESSAGES_FILE_PATH = path.join(process.cwd(), "src", "data", "messages.json");

// Read portfolio data
export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    const fileContent = await fs.readFile(PORTFOLIO_FILE_PATH, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    return {
      identity: IDENTITY,
      intro: INTRO,
      philosophy: PHILOSOPHY,
      skills: SKILLS,
      projects: PROJECTS,
      education: EDUCATION,
    };
  }
}

// Save portfolio data
export async function savePortfolioData(data: PortfolioData): Promise<boolean> {
  try {
    await fs.mkdir(path.dirname(PORTFOLIO_FILE_PATH), { recursive: true });
    await fs.writeFile(PORTFOLIO_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Failed to save portfolio.json:", error);
    return false;
  }
}

// Read contact messages
export async function getContactMessages(): Promise<ContactMessage[]> {
  try {
    const fileContent = await fs.readFile(MESSAGES_FILE_PATH, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    return [];
  }
}

// Save contact message
export async function addContactMessage(message: Omit<ContactMessage, "id" | "createdAt" | "read">): Promise<ContactMessage> {
  const messages = await getContactMessages();
  const newMessage: ContactMessage = {
    ...message,
    id: "msg-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
    createdAt: new Date().toISOString(),
    read: false,
  };
  messages.unshift(newMessage);
  await fs.mkdir(path.dirname(MESSAGES_FILE_PATH), { recursive: true });
  await fs.writeFile(MESSAGES_FILE_PATH, JSON.stringify(messages, null, 2), "utf-8");
  return newMessage;
}

// Delete message
export async function deleteContactMessage(id: string): Promise<boolean> {
  const messages = await getContactMessages();
  const filtered = messages.filter((m) => m.id !== id);
  await fs.writeFile(MESSAGES_FILE_PATH, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}

// Mark message as read
export async function toggleMessageRead(id: string): Promise<boolean> {
  const messages = await getContactMessages();
  const msg = messages.find((m) => m.id === id);
  if (msg) {
    msg.read = !msg.read;
    await fs.writeFile(MESSAGES_FILE_PATH, JSON.stringify(messages, null, 2), "utf-8");
    return true;
  }
  return false;
}
