import { createContext, useContext, useState, ReactNode } from "react";
import { AnimatePresence } from "motion/react";
import ContactModal from "../components/ContactModal";

interface ContactContextType {
  openContact: () => void;
}

const ContactContext = createContext<ContactContextType>({ openContact: () => {} });

export function useContact() {
  return useContext(ContactContext);
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ContactContext.Provider value={{ openContact: () => setIsOpen(true) }}>
      {children}
      <AnimatePresence>
        {isOpen && <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </ContactContext.Provider>
  );
}
