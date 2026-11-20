import { useState } from "react";
import { Bot, X, Send } from "lucide-react";

export default function AIChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!message.trim()) return;

    // TODO: Send the message to the TransiAI AI assistant API.
    console.log("AI assistant message:", message);
    setMessage("");
  }

  return (
    <div className="fixed bottom-5 left-5 z-50">
      {/* Chat panel */}
      {isOpen && (
        <section
          className="mb-4 flex h-96 w-[min(320px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl"
          aria-label="TransiAI assistant"
        >
          <header className="flex items-center justify-between bg-[#07520c] px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <Bot size={22} />
              <div>
                <h2 className="text-sm font-bold">Transcore AI Assistant</h2>
                <p className="text-xs text-green-200">Transport support</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="rounded p-1 hover:bg-white/15"
            >
              <X size={19} />
            </button>
          </header>

          <div className="flex flex-1 items-start bg-gray-50 p-4">
            <p className="rounded-xl bg-white p-3 text-sm text-gray-700 shadow-sm">
              Hi! I'm your Transcore AI assistant. What would you like help with?
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-gray-200 p-3"
          >
            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Ask something..."
              aria-label="Your message"
              className="min-w-0 flex-1 rounded-full border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />

            <button
              type="submit"
              disabled={!message.trim()}
              aria-label="Send message"
              className="rounded-full bg-[#07520c] p-2 text-white transition hover:bg-green-700 disabled:opacity-40"
            >
              <Send size={17} />
            </button>
          </form>
        </section>
      )}

      {/* Floating chat button */}
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={isOpen}
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#07520c] text-white shadow-lg transition hover:scale-105 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        {isOpen ? <X size={25} /> : <Bot size={27} />}

        {!isOpen && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#78c850] px-1 text-[11px] font-bold text-black">
            3
          </span>
        )}
      </button>
    </div>
  );
}
