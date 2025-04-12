export const mockFetch = ({
    json,
    ok,
    status,
}: {
    json: Record<string, unknown>;
    ok: boolean;
    status: number;
}) =>
    (global.fetch as jest.Mock).mockResolvedValue({
        json: async () => {
            return json;
        },
        ok,
        status,
    } as Response);
