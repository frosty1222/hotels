export default defineI18nLocale(async (locale) => {
    const enLangs = import.meta.glob('./modules/en/*.js', {
        eager: true,
        import: 'default',
    })

    const viMessages = {};

    for (const path in enLangs) {
        if (enLangs.hasOwnProperty(path)) {
            const fileName = path.replace(/^.*[\\/]/, '').replace(/\.js$/, '');
            viMessages[fileName] = enLangs[path];
        }
    }

    return viMessages;
})