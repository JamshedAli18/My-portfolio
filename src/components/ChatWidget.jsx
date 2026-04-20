import { useEffect, useMemo, useRef, useState } from "react";

const API_ENDPOINT = (import.meta.env.VITE_API_ENDPOINT || "https://personal-assistant-rag.onrender.com").replace(/\/+$/, "");

const API_BASE = API_ENDPOINT.replace(/\/(ask|chat|api\/chat|message|api\/message)$/i, "");
const CHAT_ENDPOINT = `${API_BASE}/ask`;
const REQUEST_TIMEOUT_MS = 60000;
const RETRYABLE_STATUS = new Set([429, 502, 503, 504]);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function createSessionId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `chat-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function extractStreamText(value) {
  if (!value) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  if (typeof value !== "object") {
    return "";
  }

  return (
    value.token ||
    value.delta ||
    value.content ||
    value.text ||
    value.answer ||
    value.reply ||
    value?.data?.token ||
    value?.data?.delta ||
    value?.data?.content ||
    value?.data?.text ||
    value?.data?.answer ||
    value?.data?.reply ||
    ""
  );
}

const INITIAL_MESSAGES = [
  {
    id: "welcome",
    sender: "assistant",
    text: "Hi, I’m Jamshed’s portfolio assistant. Ask me about projects, skills, or how to get in touch.",
  },
];

function ChatBubbleIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <circle cx="8" cy="13" r="1.5" />
      <circle cx="12" cy="13" r="1.5" />
      <circle cx="16" cy="13" r="1.5" />
      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L2 22l6.29-1.97C9 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
    </svg>
  );
}

function CloseIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

function SendIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 3 10 14" />
      <path d="M21 3 14 21l-4-7-7-4 18-7Z" />
    </svg>
  );
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const sessionIdRef = useRef(createSessionId());
  const inputRef = useRef(null);
  const messagesRef = useRef(null);
  const endRef = useRef(null);

  const openLabel = useMemo(() => (isOpen ? "Close chat" : "Open chat"), [isOpen]);

  useEffect(() => {
    if (isOpen) {
      window.requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const messagesElement = messagesRef.current;
    if (!messagesElement) {
      return undefined;
    }

    const handleWheelOnMessages = (event) => {
      const element = messagesElement;
      const isAtTop = element.scrollTop <= 0 && event.deltaY < 0;
      const isAtBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 2 && event.deltaY > 0;

      if (!isAtTop && !isAtBottom) {

        event.stopPropagation();

      }
    };

    messagesElement.addEventListener("wheel", handleWheelOnMessages, { passive: true, capture: true });

    return () => {
      messagesElement.removeEventListener("wheel", handleWheelOnMessages, { capture: true });
    };
  }, []);

  useEffect(() => {
    return () => {};
  }, []);

  const sendMessage = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isSending) {
      return;
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: trimmed,
    };

    setMessages((current) => [...current, userMessage]);
    setInputValue("");
    setIsSending(true);

    const loadingId = `loading-${Date.now()}`;
    setMessages((current) => [
      ...current,
      {
        id: loadingId,
        sender: "assistant",
        text: "...",
        isLoading: true,
      },
    ]);

    let didResetSession = false;

    try {
      console.log("Sending to API:", { endpoint: CHAT_ENDPOINT, message: trimmed, session_id: sessionIdRef.current });
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

      const postQuestion = (sessionId) =>
        fetch(CHAT_ENDPOINT, {
          method: "POST",
          mode: "cors",
          credentials: "omit",
          headers: {
            "Content-Type": "application/json",
            "Accept": "text/event-stream, application/json",
          },
          body: JSON.stringify({ question: trimmed, session_id: sessionId }),
          signal: controller.signal,
        });

      let activeSessionId = sessionIdRef.current;
      let response = await postQuestion(activeSessionId);

      if (!response.ok && RETRYABLE_STATUS.has(response.status)) {
        await delay(450);
        response = await postQuestion(activeSessionId);
      }

      // If server keeps failing, recover by starting a new memory session and retry once.
      if (!response.ok && response.status >= 500) {
        activeSessionId = createSessionId();
        sessionIdRef.current = activeSessionId;
        didResetSession = true;
        response = await postQuestion(activeSessionId);
      }

      clearTimeout(timeoutId);

      if (!response.ok) {
        const responseText = await response.text();
        throw new Error(`HTTP ${response.status}: ${responseText}`);
      }

      const contentType = response.headers.get("content-type") || "";
      const isStreamResponse = contentType.includes("text/event-stream") || contentType.includes("application/x-ndjson") || contentType.includes("application/jsonl") || contentType.includes("text/plain");

      if (isStreamResponse && response.body) {
        const assistantId = `assistant-${Date.now()}`;

        setMessages((current) => {
          const filtered = current.filter((msg) => msg.id !== loadingId);
          return [
            ...filtered,
            {
              id: assistantId,
              sender: "assistant",
              text: "",
              isLoading: false,
            },
          ];
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";
        let buffer = "";
        const isSse = contentType.includes("text/event-stream");

        const appendChunk = (chunk) => {
          if (!chunk) {
            return;
          }

          accumulated += chunk;
          setMessages((current) =>
            current.map((msg) => (msg.id === assistantId ? { ...msg, text: accumulated, isLoading: false } : msg))
          );
        };

        let done = false;
        while (!done) {
          const readResult = await reader.read();
          done = readResult.done;
          buffer += decoder.decode(readResult.value || new Uint8Array(), { stream: !done });

          if (isSse) {
            const events = buffer.split("\n\n");
            buffer = events.pop() || "";

            for (const eventBlock of events) {
              const dataLines = eventBlock
                .split("\n")
                .filter((line) => line.startsWith("data:"))
                .map((line) => line.slice(5).trim())
                .filter(Boolean);

              for (const dataLine of dataLines) {
                if (dataLine === "[DONE]") {
                  done = true;
                  break;
                }

                try {
                  const parsed = JSON.parse(dataLine);
                  appendChunk(extractStreamText(parsed));
                } catch {
                  appendChunk(dataLine);
                }
              }

              if (done) {
                break;
              }
            }
          } else {
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmedLine = line.trim();
              if (!trimmedLine) {
                continue;
              }

              try {
                const parsed = JSON.parse(trimmedLine);
                appendChunk(extractStreamText(parsed));
              } catch {
                appendChunk(trimmedLine);
              }
            }
          }
        }

        if (buffer.trim()) {
          if (isSse && buffer.includes("data:")) {
            const trailingData = buffer
              .split("\n")
              .filter((line) => line.startsWith("data:"))
              .map((line) => line.slice(5).trim())
              .filter(Boolean);

            for (const dataLine of trailingData) {
              try {
                const parsed = JSON.parse(dataLine);
                appendChunk(extractStreamText(parsed));
              } catch {
                appendChunk(dataLine);
              }
            }
          } else {
            try {
              const parsed = JSON.parse(buffer.trim());
              appendChunk(extractStreamText(parsed));
            } catch {
              appendChunk(buffer.trim());
            }
          }
        }

        if (!accumulated.trim()) {
          setMessages((current) =>
            current.map((msg) =>
              msg.id === assistantId ? { ...msg, text: "Sorry, I couldn't understand that." } : msg
            )
          );
        }

        return;
      }

      const rawBody = await response.text();
      let data;
      try {
        data = JSON.parse(rawBody);
      } catch {
        data = rawBody;
      }

      let assistantReply = "Sorry, I couldn't understand that.";
      if (data?.answer) {
        assistantReply = data.answer;
      } else if (data?.reply) {
        assistantReply = data.reply;
      } else if (typeof data === "string" && data.trim()) {
        assistantReply = data;
      } else if (data?.response) {
        assistantReply = data.response;
      } else if (data?.message) {
        assistantReply = data.message;
      } else if (data?.text) {
        assistantReply = data.text;
      } else if (data?.result) {
        assistantReply = data.result;
      } else if (data?.data?.reply) {
        assistantReply = data.data.reply;
      }

      setMessages((current) => {
        const filtered = current.filter((msg) => msg.id !== loadingId);
        return [
          ...filtered,
          {
            id: `assistant-${Date.now()}`,
            sender: "assistant",
            text: assistantReply,
          },
        ];
      });
    } catch (error) {
      const errorMsg = error.name === "AbortError"
        ? `Request timed out after ${Math.floor(REQUEST_TIMEOUT_MS / 1000)} seconds`
        : error.message;

      let friendlyErrorText = "Something went wrong. Please try again.";
      if (error.name === "AbortError") {
        friendlyErrorText = "The response took too long. Please try again.";
      } else if (errorMsg.includes("HTTP 429")) {
        friendlyErrorText = "Too many requests right now. Please try again in a few seconds.";
      } else if (didResetSession) {
        friendlyErrorText = "The chat memory was reset after a server issue. Please resend your message.";
      }
      
      console.error("❌ Chat API Error:", errorMsg, {
        endpoint: API_ENDPOINT,
        userMessage: trimmed,
        error: error,
      });

      setMessages((current) => {
        const filtered = current.filter((msg) => msg.id !== loadingId);
        return [
          ...filtered,
          {
            id: `error-${Date.now()}`,
            sender: "assistant",
            text: friendlyErrorText,
            isError: true,
          },
        ];
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  const panelOpenClasses = isOpen
    ? "pointer-events-auto opacity-100 translate-y-0 scale-100"
    : "pointer-events-none opacity-0 translate-y-3 scale-[0.98]";

  return (
    <>
      <div className="fixed bottom-2 right-4 z-[60] sm:bottom-3 sm:right-6">
        <div
          id="portfolio-chat-widget"
          className={`fixed top-20 sm:top-24 right-4 sm:right-6 w-[calc(100vw-2rem)] max-w-[24rem] overflow-hidden rounded-[1.65rem] border border-warm/75 bg-paper/96 shadow-[0_30px_110px_rgba(15,15,13,0.18)] backdrop-blur-2xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] dark:border-[#313842] dark:bg-[#11151b]/96 dark:shadow-[0_30px_110px_rgba(0,0,0,0.42)] sm:w-[23.5rem] lg:w-[27rem] ${panelOpenClasses}`}
          role="dialog"
          aria-modal="false"
          aria-label="Chat with me"
        >
          <div className="border-b border-warm/75 px-4 pb-3 pt-4 dark:border-[#2a3139] sm:px-5">
            <div className="mb-3 h-1.5 w-14 rounded-full bg-accent/85 shadow-[0_0_0_1px_rgba(200,71,42,0.08)]" />
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.24em] text-muted dark:text-[#9ca3ad]">Portfolio chat</p>
                <h3 className="mt-1 font-display text-[1.05rem] sm:text-[1.1rem] font-extrabold tracking-tightest text-ink dark:text-[#f2efea]">Chat with me</h3>
              </div>
            </div>
          </div>

          <div className="flex h-[min(22.5rem,calc(100vh-9rem))] flex-col bg-[linear-gradient(180deg,rgba(255,255,255,0.24),rgba(255,255,255,0.02))] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]">
            <div ref={messagesRef} className="chat-scrollbar-hidden flex-1 space-y-2.5 overflow-y-auto overscroll-contain px-4 py-3.5 sm:px-5">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-[1.55] shadow-sm ring-1 ring-black/5 ${
                      message.sender === "user"
                        ? "rounded-br-md bg-ink text-paper dark:bg-[#f2efea] dark:text-[#101319]"
                        : `rounded-bl-md border border-warm/60 bg-paper text-ink dark:border-[#38404a] dark:bg-[#171c23] dark:text-[#f1ede6] ${
                            message.isError ? "border-red-300/60 dark:border-red-800/60" : ""
                          }`
                    }`}
                  >
                    {message.isLoading ? (
                      <div className="chat-loading text-ink dark:text-[#f1ede6]">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    ) : (
                      message.text
                    )}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <form onSubmit={handleSubmit} className="border-t border-warm/75 p-3 dark:border-[#2a3139] sm:p-3.5">
              <div className="flex items-center gap-2.5 rounded-[1.2rem] border border-warm bg-paper px-3 py-2.5 shadow-[0_1px_0_rgba(255,255,255,0.55)] transition-colors duration-200 focus-within:border-accent dark:border-[#39414a] dark:bg-[#151a21] dark:shadow-none">
                <input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  type="text"
                  placeholder="Ask about my work..."
                  className="min-w-0 flex-1 bg-transparent font-body text-[13px] text-ink outline-none placeholder:text-muted/80 dark:text-[#f2efea] dark:placeholder:text-[#8e97a2]"
                />

                <button
                  type="submit"
                  aria-label="Send message"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-paper transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent hover:text-[#fff7f1] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#f2efea] dark:text-[#101319] dark:hover:bg-accent dark:hover:text-[#fff7f1]"
                  disabled={!inputValue.trim() || isSending}
                >
                  <SendIcon className="h-4 w-4 -translate-x-px translate-y-px" />
                </button>
              </div>
            </form>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          aria-label={openLabel}
          aria-expanded={isOpen}
          aria-controls="portfolio-chat-widget"
          className="group relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-warm/90 bg-[linear-gradient(180deg,#f8f5ef,#f0ebe3)] text-ink shadow-[0_8px_20px_rgba(15,15,13,0.12)] ring-1 ring-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent dark:border-[#38404a] dark:bg-[linear-gradient(180deg,#1a2028,#12161c)] dark:text-[#f2efea] dark:shadow-[0_8px_20px_rgba(0,0,0,0.24)] dark:ring-white/0 dark:hover:border-accent dark:hover:text-accent"
        >
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border-1.5 border-paper bg-accent shadow-[0_0_0_4px_rgba(200,71,42,0.08)] dark:border-[#11151b]" />
          <ChatBubbleIcon className="h-3 w-3 transition-transform duration-300 group-hover:scale-110" />
        </button>
      </div>
    </>
  );
}
