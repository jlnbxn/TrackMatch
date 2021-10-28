export const createCsv = (list) => {
    return list.map(({ term, match }) => ({
        term: term.replace(
            /"/g,
            '""' /* replace quote with double quote according to csv spec */
        ),
        id: match.id,
    }));
};