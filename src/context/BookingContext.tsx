import { createContext, useContext, useState, ReactNode } from "react";
import { AnimatePresence } from "motion/react";
import BookingModal from "../components/BookingModal";

interface BookingContextType {
  openBooking: () => void;
}

const BookingContext = createContext<BookingContextType>({ openBooking: () => {} });

export function useBooking() {
  return useContext(BookingContext);
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BookingContext.Provider value={{ openBooking: () => setIsOpen(true) }}>
      {children}
      <AnimatePresence>
        {isOpen && <BookingModal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </BookingContext.Provider>
  );
}
