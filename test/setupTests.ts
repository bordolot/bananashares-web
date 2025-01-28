import { vi } from "vitest";

Object.defineProperty(window, "scrollTo", {
    value: vi.fn(), // or vi.fn() if using Vitest
    writable: true,
});




Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
        // matches: query.includes("(max-width: 768px)"),
        matches: query.includes("(max-width: 769px)"),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});



