import { IconNameType } from "~components/Icon";

export type NavLink = {
  [k: string]: {
    key: string;
    url: string;
    icon: IconNameType;
  };
};
export const navLinks = <const>{
  privacy: { key: "PRIVACY", url: "/privacy", icon: "Security" },
  AIChatbot: { key: "AI_CHATBOT", url: "/ai-chatbots", icon: "Chat" },
  contact: { key: "CONTACT", url: "/contact", icon: "TouchApp" },
};
