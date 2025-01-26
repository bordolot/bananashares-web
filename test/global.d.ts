declare global {
    interface Window {
        ethereum: {
            isMetaMask: boolean;
            request: ({ method, params }: { method: string; params?: any[] }) => Promise<any>;
        };
    }

}
export { };