export function* range(from: number, to?: number, step = 1) {
    if (!to) {
        to = from;
        from = 0;
    }
    while (from < to) {
        yield from;
        from += step;
    }
}
